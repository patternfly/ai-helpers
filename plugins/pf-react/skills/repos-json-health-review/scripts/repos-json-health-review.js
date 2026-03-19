#!/usr/bin/env node
/**
 * Reads repos.json and checks each remote for archive status and last activity.
 * GitHub: prefers `gh api` (same auth as daily use); falls back to HTTPS + GITHUB_TOKEN.
 * GitLab: HTTPS API v4 + GITLAB_TOKEN (or PRIVATE-TOKEN-compatible env).
 *
 * Usage (from the project that contains repos.json, default file ./repos.json):
 *   node plugins/pf-react/skills/repos-json-health-review/scripts/repos-json-health-review.js repos.json
 *   node .../repos-json-health-review.js --days 730 repos.json
 *   node .../repos-json-health-review.js --json repos.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawnSync } = require('child_process');

const DEFAULT_DAYS = 730;
const DEFAULT_REPOS = path.join(process.cwd(), 'repos.json');

function parseArgs(argv) {
  const out = { file: DEFAULT_REPOS, days: DEFAULT_DAYS, json: false };
  const rest = [];
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') out.json = true;
    else if (a === '--days' && argv[i + 1]) {
      out.days = Number(argv[++i]);
      if (Number.isNaN(out.days) || out.days < 1) {
        console.error('Invalid --days value');
        process.exit(1);
      }
    } else if (a.startsWith('-')) {
      console.error(`Unknown option: ${a}`);
      process.exit(1);
    } else rest.push(a);
  }
  if (rest[0]) out.file = path.resolve(rest[0]);
  return out;
}

function parseGitHubRepo(gitUrl) {
  const u = gitUrl.trim();
  const ssh = /^git@github\.com:([^/]+)\/(.+?)(?:\.git)?$/i;
  const sm = u.match(ssh);
  if (sm) return { owner: sm[1], repo: sm[2].replace(/\.git$/i, '') };
  try {
    const parsed = new URL(u);
    const host = parsed.hostname.toLowerCase();
    if (host !== 'github.com' && !host.endsWith('.github.com')) return null;
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/i, ''),
    };
  } catch {
    return null;
  }
}

function parseGitLabProject(gitUrl) {
  try {
    const parsed = new URL(gitUrl.trim());
    const projectPath = parsed.pathname
      .replace(/^\/+|\/+$/g, '')
      .replace(/\.git$/i, '');
    if (!projectPath) return null;
    return {
      host: parsed.hostname,
      port: parsed.port || null,
      protocol: parsed.protocol,
      projectPath,
    };
  } catch {
    return null;
  }
}

function httpsJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { headers: { 'User-Agent': 'patternfly-analytics-repos-health', ...headers } },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(new Error(`Invalid JSON (${res.statusCode}): ${e.message}`));
            }
          } else {
            reject(
              new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`)
            );
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function fetchGitHubRest(owner, repo) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('gh failed and GITHUB_TOKEN is not set');
  }
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  return httpsJson(url, {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  });
}

function fetchGitHubViaGh(owner, repo) {
  const r = spawnSync(
    'gh',
    ['api', `repos/${owner}/${repo}`],
    { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
  );
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || '').trim() || `exit ${r.status}`;
    throw new Error(err);
  }
  return JSON.parse(r.stdout);
}

async function checkGitHub(name, gitUrl) {
  const parsed = parseGitHubRepo(gitUrl);
  if (!parsed) {
    return {
      name,
      git: gitUrl,
      status: 'unknown',
      reason: 'Could not parse as github.com URL',
    };
  }
  const { owner, repo } = parsed;
  let data;
  try {
    data = fetchGitHubViaGh(owner, repo);
  } catch (e) {
    try {
      data = await fetchGitHubRest(owner, repo);
    } catch (e2) {
      return {
        name,
        git: gitUrl,
        status: 'unknown',
        reason: `GitHub: ${e.message}; REST: ${e2.message}`,
      };
    }
  }
  const archived = Boolean(data.archived);
  const activityAt = data.pushed_at || null;
  const htmlUrl = data.html_url || gitUrl;
  return {
    name,
    git: gitUrl,
    host: 'github',
    archived,
    activityAt,
    activityField: data.pushed_at ? 'pushed_at' : null,
    htmlUrl,
    apiResolved: data.full_name ? `${data.full_name}` : `${owner}/${repo}`,
  };
}

function gitLabApiBase(host, port, protocol) {
  const p = port ? `:${port}` : '';
  return `${protocol}//${host}${p}`;
}

async function checkGitLab(name, gitUrl) {
  const gl = parseGitLabProject(gitUrl);
  if (!gl) {
    return {
      name,
      git: gitUrl,
      status: 'unknown',
      reason: 'Could not parse GitLab URL',
    };
  }
  const token =
    process.env.GITLAB_TOKEN ||
    process.env.GITLAB_PRIVATE_TOKEN ||
    process.env.PRIVATE_TOKEN;
  const encoded = encodeURIComponent(gl.projectPath);
  const base = gitLabApiBase(gl.host, gl.port, gl.protocol);
  const url = `${base}/api/v4/projects/${encoded}`;
  if (!token) {
    return {
      name,
      git: gitUrl,
      status: 'unknown',
      reason: 'GITLAB_TOKEN (or PRIVATE_TOKEN) not set',
    };
  }
  try {
    const data = await httpsJson(url, { 'PRIVATE-TOKEN': token });
    const archived = Boolean(data.archived);
    const activityAt =
      data.last_repository_update || data.last_activity_at || null;
    const activityField = data.last_repository_update
      ? 'last_repository_update'
      : data.last_activity_at
        ? 'last_activity_at'
        : null;
    return {
      name,
      git: gitUrl,
      host: 'gitlab',
      archived,
      activityAt,
      activityField,
      htmlUrl: data.web_url || gitUrl,
      apiResolved: data.path_with_namespace || gl.projectPath,
    };
  } catch (e) {
    return {
      name,
      git: gitUrl,
      status: 'unknown',
      reason: `GitLab API: ${e.message}`,
    };
  }
}

function classify(row, cutoffMs) {
  if (row.status === 'unknown') return 'unknown';
  if (row.archived) return 'archived';
  if (!row.activityAt) return 'stale';
  const t = Date.parse(row.activityAt);
  if (Number.isNaN(t)) return 'unknown';
  if (t < cutoffMs) return 'stale';
  return 'ok';
}

function formatMarkdown(rows, days, cutoffMs, generatedAt) {
  const cutoff = new Date(cutoffMs).toISOString().slice(0, 10);
  const archived = rows.filter((r) => r.bucket === 'archived');
  const stale = rows.filter((r) => r.bucket === 'stale');
  const unknown = rows.filter((r) => r.bucket === 'unknown');
  const ok = rows.filter((r) => r.bucket === 'ok');

  const lines = [
    '## repos.json health review',
    '',
    `**Threshold:** no activity for ${days}+ days`,
    `**Cutoff (approx):** ${cutoff}`,
    `**Generated:** ${generatedAt}`,
    '',
  ];

  lines.push('### Archived (remove from analytics)', '');
  if (archived.length === 0) lines.push('*None*', '');
  else {
    lines.push('| name | git | html |', '|------|-----|------|');
    for (const r of archived) {
      lines.push(
        `| ${r.name} | ${r.git} | ${r.htmlUrl || '—'} |`
      );
    }
    lines.push('');
  }

  lines.push('### Stale — last activity before cutoff', '');
  if (stale.length === 0) lines.push('*None*', '');
  else {
    lines.push('| name | git | last activity | field |', '|------|-----|---------------|-------|');
    for (const r of stale) {
      lines.push(
        `| ${r.name} | ${r.git} | ${r.activityAt || '—'} | ${r.activityField || '—'} |`
      );
    }
    lines.push('');
  }

  lines.push('### Could not verify', '');
  if (unknown.length === 0) lines.push('*None*', '');
  else {
    lines.push('| name | git | reason |', '|------|-----|--------|');
    for (const r of unknown) {
      lines.push(`| ${r.name} | ${r.git} | ${r.reason} |`);
    }
    lines.push('');
  }

  lines.push('### Clean / active', '', `- **Count:** ${ok.length}`, '');
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv);
  const raw = fs.readFileSync(args.file, 'utf8');
  const doc = JSON.parse(raw);
  const list = doc.repos;
  if (!Array.isArray(list)) {
    console.error('repos.json must contain a "repos" array');
    process.exit(1);
  }

  const cutoffMs = Date.now() - args.days * 86400000;
  const generatedAt = new Date().toISOString();
  const rows = [];

  for (const entry of list) {
    const gitUrl = entry.git;
    const name = entry.name || gitUrl;
    const lower = gitUrl.toLowerCase();
    let row;
    if (lower.includes('github.com')) {
      row = await checkGitHub(name, gitUrl);
    } else if (lower.includes('gitlab')) {
      row = await checkGitLab(name, gitUrl);
    } else {
      row = {
        name,
        git: gitUrl,
        status: 'unknown',
        reason: 'Unsupported host (expected github.com or gitlab)',
      };
    }
    rows.push(row);
  }

  for (const row of rows) {
    row.bucket = classify(row, cutoffMs);
  }

  if (args.json) {
    console.log(
      JSON.stringify(
        {
          file: args.file,
          days: args.days,
          cutoffIso: new Date(cutoffMs).toISOString(),
          generatedAt,
          summary: {
            archived: rows.filter((r) => r.bucket === 'archived').length,
            stale: rows.filter((r) => r.bucket === 'stale').length,
            unknown: rows.filter((r) => r.bucket === 'unknown').length,
            ok: rows.filter((r) => r.bucket === 'ok').length,
          },
          rows,
        },
        null,
        2
      )
    );
    return;
  }

  console.log(formatMarkdown(rows, args.days, cutoffMs, generatedAt));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
