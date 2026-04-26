export interface AgentRun {
  id: number;
  workflow_id: number;
  agent_name: string;
  status: string;
  model_used: string | null;
  tokens_used: number | null;
  duration_ms: number | null;
  error: string | null;
  created_at: string;
}
