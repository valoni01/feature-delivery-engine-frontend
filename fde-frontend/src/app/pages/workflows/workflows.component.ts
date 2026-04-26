import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Service, Workflow, WorkflowStatus } from '../../core/models';
import { StatusBadgeComponent } from '../../shared/status-badge.component';

const ALL_STATUSES: WorkflowStatus[] = [
  'draft',
  'parsing',
  'awaiting_clarification',
  'designing',
  'reviewing',
  'ticketing',
  'implementing',
  'pr_created',
  'completed',
  'failed',
];

@Component({
  selector: 'app-workflows',
  imports: [RouterLink, DatePipe, FormsModule, StatusBadgeComponent],
  template: `
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-surface-900">Workflows</h1>
          <p class="mt-1 text-sm text-surface-500">
            Browse all feature delivery workflows.
          </p>
        </div>
        <a
          routerLink="/workflows/new"
          class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          + New Workflow
        </a>
      </div>

      <!-- Filters -->
      <div
        class="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-surface-200 bg-white px-4 py-3"
      >
        <input
          [(ngModel)]="searchQuery"
          placeholder="Search by title..."
          class="w-64 rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
        />

        <select
          [(ngModel)]="filterService"
          (ngModelChange)="applyFilters()"
          class="rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
        >
          <option value="">All Services</option>
          @for (svc of services(); track svc.id) {
            <option [value]="svc.id">{{ svc.name }}</option>
          }
        </select>

        <select
          [(ngModel)]="filterStatus"
          (ngModelChange)="applyFilters()"
          class="rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
        >
          <option value="">All Statuses</option>
          @for (s of statuses; track s) {
            <option [value]="s">{{ s.replace('_', ' ') }}</option>
          }
        </select>

        @if (filterService || filterStatus || searchQuery) {
          <button
            (click)="clearFilters()"
            class="text-xs text-surface-500 hover:text-surface-700"
          >
            Clear filters
          </button>
        }

        <span class="ml-auto text-xs text-surface-400">
          {{ filtered().length }} workflow{{ filtered().length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Table -->
      <div class="rounded-xl border border-surface-200 bg-white">
        @if (loading()) {
          <div class="px-6 py-12 text-center text-sm text-surface-400">
            Loading workflows...
          </div>
        } @else if (filtered().length === 0) {
          <div class="px-6 py-12 text-center">
            <p class="text-sm text-surface-400">No workflows found.</p>
            <a
              routerLink="/workflows/new"
              class="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Create your first workflow &rarr;
            </a>
          </div>
        } @else {
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 text-left">
                <th class="px-6 py-3 font-medium text-surface-500">Title</th>
                <th class="px-6 py-3 font-medium text-surface-500">Status</th>
                <th class="px-6 py-3 font-medium text-surface-500">
                  Repository
                </th>
                <th class="px-6 py-3 font-medium text-surface-500">
                  Tech Design
                </th>
                <th class="px-6 py-3 font-medium text-surface-500">Tasks</th>
                <th class="px-6 py-3 font-medium text-surface-500">Created</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              @for (wf of filtered(); track wf.id) {
                <tr
                  class="cursor-pointer transition-colors hover:bg-surface-50"
                  [routerLink]="['/workflows', wf.id]"
                >
                  <td class="px-6 py-3">
                    <p
                      class="max-w-xs truncate font-medium text-surface-900"
                    >
                      {{ wf.title }}
                    </p>
                    <p class="text-xs text-surface-400">#{{ wf.id }}</p>
                  </td>
                  <td class="px-6 py-3">
                    <app-status-badge [status]="wf.status" />
                  </td>
                  <td class="px-6 py-3">
                    <p class="max-w-[180px] truncate text-xs text-surface-500">
                      {{ repoName(wf.repo_url) }}
                    </p>
                  </td>
                  <td class="px-6 py-3">
                    @if (wf.technical_design) {
                      <span
                        class="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                        >Available</span
                      >
                    } @else {
                      <span class="text-xs text-surface-300">&mdash;</span>
                    }
                  </td>
                  <td class="px-6 py-3">
                    @if (wf.tasks && wf.tasks.length > 0) {
                      <span
                        class="inline-flex rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700"
                        >{{ wf.tasks.length }} task{{
                          wf.tasks.length !== 1 ? 's' : ''
                        }}</span
                      >
                    } @else {
                      <span class="text-xs text-surface-300">&mdash;</span>
                    }
                  </td>
                  <td class="px-6 py-3 text-xs text-surface-400">
                    {{ wf.created_at | date: 'mediumDate' }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
})
export class WorkflowsComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly services = signal<Service[]>([]);
  readonly workflows = signal<Workflow[]>([]);
  readonly loading = signal(true);
  readonly statuses = ALL_STATUSES;

  searchQuery = '';
  filterService = '';
  filterStatus = '';

  readonly filtered = computed(() => {
    let list = this.workflows();
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((w) => w.title.toLowerCase().includes(q));
    }
    if (this.filterService) {
      list = list.filter((w) => w.service_id === Number(this.filterService));
    }
    if (this.filterStatus) {
      list = list.filter((w) => w.status === this.filterStatus);
    }
    return list;
  });

  ngOnInit(): void {
    this.api.getServices().subscribe((s) => this.services.set(s));
    this.loadWorkflows();
  }

  applyFilters(): void {
    // Filters are reactive via computed — this is just a hook for ngModelChange
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.filterService = '';
    this.filterStatus = '';
  }

  repoName(url: string): string {
    try {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : url;
    } catch {
      return url;
    }
  }

  private loadWorkflows(): void {
    this.loading.set(true);
    this.api.getWorkflows().subscribe({
      next: (wfs) => {
        this.workflows.set(wfs);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
