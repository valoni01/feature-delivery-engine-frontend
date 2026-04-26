export type IntegrationType = 'ticketing' | 'source_control';
export type TicketingProvider = 'jira' | 'linear' | 'github_issues';
export type SourceControlProvider = 'github' | 'gitlab';

export interface Integration {
  id: number;
  service_id: number;
  integration_type: IntegrationType;
  provider: string;
  external_identifier: string | null;
  base_url: string | null;
  config: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IntegrationCreate {
  service_id: number;
  integration_type: IntegrationType;
  provider: string;
  external_identifier?: string | null;
  base_url?: string | null;
  config?: Record<string, unknown> | null;
}
