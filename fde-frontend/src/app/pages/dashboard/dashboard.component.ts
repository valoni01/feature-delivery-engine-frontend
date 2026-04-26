import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Workflow, WorkflowStatus } from '../../core/models';
import { StatusBadgeComponent } from '../../shared/status-badge.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe, StatusBadgeComponent],
  template: `
    <div class="mx-auto max-w-6xl">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p class="mt-1 text-sm text-surface-500">
          Overview of your feature delivery pipeline.
        </p>
      </div>

      <!-- Stats -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (stat of stats(); track stat.label) {
          <div class="rounded-xl border border-surface-200 bg-white p-5">
            <p class="text-sm font-medium text-surface-500">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-semibold text-surface-900">
              {{ stat.value }}
            </p>
          </div>
        }
      </div>

      <!-- Recent workflows -->
      <div class="rounded-xl border border-surface-200 bg-white">
        <div class="flex items-center justify-between border-b border-surface-200 px-6 py-4">
          <h2 class="font-semibold text-surface-900">Recent Workflows</h2>
          <a
            routerLink="/app/workflows/new"
            class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            + New Workflow
          </a>
        </div>

        @if (workflows().length === 0) {
          <div class="px-6 py-12 text-center">
            <p class="text-sm text-surface-400">No workflows yet.</p>
            <a
              routerLink="/app/workflows/new"
              class="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Create your first workflow &rarr;
            </a>
          </div>
        } @else {
          <div class="divide-y divide-surface-100">
            @for (wf of workflows(); track wf.id) {
              <a
                [routerLink]="['/app/workflows', wf.id]"
                class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface-50"
              >
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium text-surface-900">
                    {{ wf.title }}
                  </p>
                  <p class="mt-0.5 text-xs text-surface-400">
                    {{ wf.created_at | date: 'medium' }}
                  </p>
                </div>
                <app-status-badge [status]="wf.status" />
              </a>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly workflows = signal<Workflow[]>([]);
  readonly stats = signal<{ label: string; value: number }[]>([]);

  ngOnInit(): void {
    this.api.getWorkflows().subscribe((wfs) => {
      this.workflows.set(wfs.slice(0, 10));
      this.stats.set([
        { label: 'Total Workflows', value: wfs.length },
        {
          label: 'In Progress',
          value: wfs.filter((w) =>
            ['parsing', 'designing', 'reviewing', 'ticketing', 'implementing'].includes(w.status),
          ).length,
        },
        {
          label: 'Awaiting Input',
          value: wfs.filter((w) => w.status === 'awaiting_clarification')
            .length,
        },
        {
          label: 'Completed',
          value: wfs.filter((w) => w.status === 'completed').length,
        },
      ]);
    });
  }
}
