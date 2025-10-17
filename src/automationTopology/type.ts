export enum AnsibleTypes {
  AUTOMATION_PLATFORM = 'Ansible Automation Platform',
  ANALYSIS_AGENT = 'Analysis Agent',
}

export type AnsibleObjectType = {
  id: string;
  type: AnsibleTypes;
  aiConfigured: boolean,
  subType: string;
  description: string;
  integrations: string[];
  action: string;
  playbook: string
}