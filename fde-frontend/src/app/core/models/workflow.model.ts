export type WorkflowStatus =
  | 'draft'
  | 'parsing'
  | 'awaiting_clarification'
  | 'designing'
  | 'reviewing'
  | 'ticketing'
  | 'implementing'
  | 'code_reviewing'
  | 'pr_created'
  | 'completed'
  | 'failed';

export interface Workflow {
  id: number;
  service_id: number | null;
  title: string;
  status: WorkflowStatus;
  feature_doc_text: string;
  repo_url: string;
  branch: string | null;
  pending_questions: ClarificationQuestion[] | null;
  requirement_summary: Record<string, unknown> | null;
  technical_design: Record<string, unknown> | null;
  tasks: Record<string, unknown>[] | null;
  pr_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowCreate {
  title: string;
  feature_doc_text: string;
  repo_url: string;
  branch?: string | null;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  why: string;
}

export interface ClarificationResponse {
  workflow_id: number;
  status: string;
  clarifying_questions: ClarificationQuestion[];
}

export interface ClarificationAnswers {
  answers: Record<string, string>;
}

export function isClarificationResponse(
  obj: unknown,
): obj is ClarificationResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'clarifying_questions' in obj &&
    Array.isArray((obj as ClarificationResponse).clarifying_questions)
  );
}
