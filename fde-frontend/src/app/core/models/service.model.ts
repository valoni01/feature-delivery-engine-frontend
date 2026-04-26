export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  department: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCreate {
  name: string;
  slug: string;
  description?: string | null;
  department?: string | null;
  is_active?: boolean;
}

export interface ServiceUpdate {
  name?: string;
  description?: string | null;
  department?: string | null;
  is_active?: boolean;
}
