export enum AnsibleTypes {
  AUTOMATION_PLATFORM = 'Ansible Automation Platform',
  ANALYSIS_AGENT = 'Analysis Agent',
}

export enum AnsibleSubTypes {
  TRIGGER = 'Trigger application',
  AGENT = 'Agent',
  APPLICATION = 'Application'
}

export type AnsibleObjectType = {
  id: string;
  type: AnsibleTypes;
  aiConfigured: boolean,
  subType: AnsibleSubTypes;
  description: string;
  integrations: string[];
  action: string;
  playbook: string
}