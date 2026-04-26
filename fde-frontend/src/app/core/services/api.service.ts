import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AgentRun,
  Service,
  ServiceCreate,
  ServiceUpdate,
  Workflow,
  WorkflowCreate,
  ClarificationAnswers,
  Integration,
  IntegrationCreate,
  GitHubRepo,
} from '../models';
import { SettingsService } from './settings.service';

const BASE = '/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly settings = inject(SettingsService);

  // ── Services ──────────────────────────────────────────────────────

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${BASE}/services`);
  }

  getService(id: number): Observable<Service> {
    return this.http.get<Service>(`${BASE}/services/${id}`);
  }

  createService(body: ServiceCreate): Observable<Service> {
    return this.http.post<Service>(`${BASE}/services`, body);
  }

  updateService(id: number, body: ServiceUpdate): Observable<Service> {
    return this.http.patch<Service>(`${BASE}/services/${id}`, body);
  }

  deactivateService(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE}/services/${id}`);
  }

  // ── Workflows ─────────────────────────────────────────────────────

  getWorkflows(serviceId?: number, status?: string): Observable<Workflow[]> {
    let params = new HttpParams();
    if (serviceId != null) params = params.set('service_id', serviceId);
    if (status) params = params.set('status', status);
    return this.http.get<Workflow[]>(`${BASE}/workflows`, { params });
  }

  getWorkflow(id: number): Observable<Workflow> {
    return this.http.get<Workflow>(`${BASE}/workflows/${id}`);
  }

  createWorkflow(body: WorkflowCreate): Observable<Workflow> {
    return this.http.post<Workflow>(`${BASE}/workflows`, body);
  }

  private get authHeaders(): Record<string, string> {
    const token = this.settings.githubToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  runPipeline(workflowId: number): Observable<Workflow> {
    return this.http.post<Workflow>(
      `${BASE}/workflows/${workflowId}/run`,
      {},
      { headers: this.authHeaders },
    );
  }

  submitClarifications(
    workflowId: number,
    body: ClarificationAnswers,
  ): Observable<Workflow> {
    return this.http.post<Workflow>(
      `${BASE}/workflows/${workflowId}/clarify`,
      body,
      { headers: this.authHeaders },
    );
  }

  skipClarification(workflowId: number): Observable<Workflow> {
    return this.http.post<Workflow>(
      `${BASE}/workflows/${workflowId}/skip-clarification`,
      {},
      { headers: this.authHeaders },
    );
  }

  getAgentRuns(workflowId: number): Observable<AgentRun[]> {
    return this.http.get<AgentRun[]>(`${BASE}/workflows/${workflowId}/agent-runs`);
  }

  retryPush(workflowId: number): Observable<Workflow> {
    return this.http.post<Workflow>(
      `${BASE}/workflows/${workflowId}/retry-push`,
      {},
      { headers: this.authHeaders },
    );
  }

  // ── Integrations ──────────────────────────────────────────────────

  getIntegrations(serviceId?: number): Observable<Integration[]> {
    let params = new HttpParams();
    if (serviceId != null) params = params.set('service_id', serviceId);
    return this.http.get<Integration[]>(`${BASE}/integrations`, { params });
  }

  createIntegration(body: IntegrationCreate): Observable<Integration> {
    return this.http.post<Integration>(`${BASE}/integrations`, body);
  }

  // ── GitHub ────────────────────────────────────────────────────────

  getGithubRepos(page = 1, perPage = 30): Observable<GitHubRepo[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('per_page', perPage);
    return this.http.get<GitHubRepo[]>(`${BASE}/github/repos`, {
      params,
      headers: { Authorization: `Bearer ${this.settings.githubToken()}` },
    });
  }
}
