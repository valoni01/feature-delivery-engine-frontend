import { Component, inject, OnInit, signal, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import {
  AgentRun,
  Workflow,
  ClarificationQuestion,
  WorkflowStatus,
} from '../../core/models';
import { StatusBadgeComponent } from '../../shared/status-badge.component';

const PIPELINE_STEPS: { key: WorkflowStatus; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'parsing', label: 'Parsing FRD' },
  { key: 'awaiting_clarification', label: 'Clarification' },
  { key: 'designing', label: 'Technical Design' },
  { key: 'reviewing', label: 'Design Review' },
  { key: 'ticketing', label: 'Task Planning' },
  { key: 'implementing', label: 'Implementation' },
  { key: 'code_reviewing', label: 'Code Review' },
  { key: 'pr_created', label: 'PR Created' },
  { key: 'completed', label: 'Completed' },
];

@Component({
  selector: 'app-workflow-detail',
  imports: [DatePipe, FormsModule, StatusBadgeComponent],
  template: `
    <div class="mx-auto max-w-5xl">
      @if (!workflow()) {
        <div class="py-12 text-center text-surface-400">
          Loading workflow...
        </div>
      } @else {
        <!-- Header -->
        <div class="mb-6 flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold text-surface-900">
              {{ workflow()!.title }}
            </h1>
            <p class="mt-1 text-sm text-surface-500">
              Workflow #{{ workflow()!.id }} &middot; Created
              {{ workflow()!.created_at | date: 'medium' }}
            </p>
          </div>
          <app-status-badge [status]="workflow()!.status" />
        </div>

        <!-- Pipeline progress -->
        <div
          class="mb-8 rounded-xl border border-surface-200 bg-white p-6"
        >
          <h2 class="mb-4 text-sm font-semibold text-surface-700">
            Pipeline Progress
          </h2>
          <div class="flex items-center gap-1">
            @for (step of pipelineSteps; track step.key; let i = $index) {
              <div class="flex flex-1 flex-col items-center">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                  [class]="stepClass(step.key)"
                >
                  @if (isStepDone(step.key)) {
                    &#10003;
                  } @else {
                    {{ i + 1 }}
                  }
                </div>
                <span
                  class="mt-1.5 text-center text-[10px] leading-tight"
                  [class]="
                    step.key === workflow()!.status
                      ? 'font-semibold text-primary-700'
                      : 'text-surface-400'
                  "
                >
                  {{ step.label }}
                </span>
              </div>
              @if (i < pipelineSteps.length - 1) {
                <div
                  class="mt-[-16px] h-0.5 flex-1"
                  [class]="
                    isStepDone(step.key) ? 'bg-primary-500' : 'bg-surface-200'
                  "
                ></div>
              }
            }
          </div>
        </div>

        <!-- Failed / re-run -->
        @if (workflow()!.status === 'failed') {
          <div
            class="mb-8 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div class="flex items-center justify-between">
              <p class="text-sm text-red-800">
                <strong>Pipeline failed.</strong> This can happen if the server
                was restarted during processing. You can re-run the pipeline.
              </p>
              <button
                (click)="rerun()"
                [disabled]="submitting()"
                class="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {{ submitting() ? 'Starting...' : 'Re-run Pipeline' }}
              </button>
            </div>
          </div>
        }

        <!-- Clarification chat -->
        @if (
          workflow()!.status === 'awaiting_clarification' &&
          questions().length > 0
        ) {
          <div
            class="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6"
          >
            <h2 class="mb-4 text-sm font-semibold text-amber-800">
              The agent needs your input
            </h2>
            <div class="space-y-4">
              @for (q of questions(); track q.id) {
                <div>
                  <p class="text-sm font-medium text-surface-900">
                    {{ q.question }}
                  </p>
                  <p class="mb-2 text-xs text-surface-500 italic">
                    {{ q.why }}
                  </p>
                  <textarea
                    [value]="answers()[q.id] || ''"
                    (input)="setAnswer(q.id, $any($event.target).value)"
                    rows="2"
                    class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                    placeholder="Your answer..."
                  ></textarea>
                </div>
              }
            </div>
            <div class="mt-4 flex items-center justify-between">
              <button
                (click)="skipQuestions()"
                [disabled]="submitting()"
                class="rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Skip &mdash; proceed with what you have
              </button>
              <button
                (click)="submitAnswers()"
                [disabled]="submitting() || !allAnswered()"
                class="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ submitting() ? 'Submitting...' : 'Submit Answers' }}
              </button>
            </div>
          </div>
        }

        <!-- Data sections -->
        <div class="space-y-6">
          <!-- Requirement Summary -->
          @if (workflow()!.requirement_summary; as rs) {
            <details
              class="rounded-xl border border-surface-200 bg-white"
              open
            >
              <summary
                class="cursor-pointer px-6 py-4 text-sm font-semibold text-surface-900"
              >
                Requirement Summary
              </summary>
              <div class="border-t border-surface-100 px-6 py-4 space-y-5">
                <!-- Title & Summary -->
                @if ($any(rs)['title']) {
                  <div>
                    <h3 class="text-base font-semibold text-surface-900">{{ $any(rs)['title'] }}</h3>
                    @if ($any(rs)['summary']) {
                      <p class="mt-1 text-sm leading-relaxed text-surface-600">{{ $any(rs)['summary'] }}</p>
                    }
                  </div>
                }

                <!-- Goals -->
                @if ($any(rs)['goals']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Goals</h4>
                    <ul class="space-y-1">
                      @for (goal of $any(rs)['goals']; track $index) {
                        <li class="flex items-start gap-2 text-sm text-surface-700">
                          <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></span>
                          {{ goal }}
                        </li>
                      }
                    </ul>
                  </div>
                }

                <!-- Functional Requirements -->
                @if ($any(rs)['functional_requirements']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Functional Requirements</h4>
                    <div class="space-y-2">
                      @for (fr of $any(rs)['functional_requirements']; track fr.id ?? $index) {
                        <div class="flex items-start gap-3 rounded-lg border border-surface-100 px-4 py-3">
                          <span class="shrink-0 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-primary-700">{{ fr.id }}</span>
                          <p class="flex-1 text-sm text-surface-700">{{ fr.description }}</p>
                          <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                            [class]="fr.priority === 'must-have' ? 'bg-red-100 text-red-700'
                              : fr.priority === 'should-have' ? 'bg-amber-100 text-amber-700'
                              : 'bg-surface-100 text-surface-500'">
                            {{ fr.priority }}
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- Non-Functional Requirements -->
                @if ($any(rs)['non_functional_requirements']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Non-Functional Requirements</h4>
                    <div class="space-y-2">
                      @for (nfr of $any(rs)['non_functional_requirements']; track nfr.id ?? $index) {
                        <div class="flex items-start gap-3 rounded-lg border border-surface-100 px-4 py-3">
                          <span class="shrink-0 rounded bg-violet-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-violet-700">{{ nfr.id }}</span>
                          <p class="flex-1 text-sm text-surface-700">{{ nfr.description }}</p>
                          <span class="shrink-0 rounded-full bg-surface-100 px-2 py-0.5 text-xs font-medium text-surface-500">
                            {{ nfr.category }}
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- Acceptance Criteria -->
                @if ($any(rs)['acceptance_criteria']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Acceptance Criteria</h4>
                    <ul class="space-y-1">
                      @for (ac of $any(rs)['acceptance_criteria']; track $index) {
                        <li class="flex items-start gap-2 text-sm text-surface-700">
                          <span class="mt-0.5 text-green-500">&#10003;</span>
                          {{ ac }}
                        </li>
                      }
                    </ul>
                  </div>
                }

                <!-- Assumptions -->
                @if ($any(rs)['assumptions']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Assumptions</h4>
                    <ul class="space-y-1">
                      @for (a of $any(rs)['assumptions']; track $index) {
                        <li class="flex items-start gap-2 text-sm text-surface-500">
                          <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-surface-300"></span>
                          {{ a }}
                        </li>
                      }
                    </ul>
                  </div>
                }

                <!-- Open Questions -->
                @if ($any(rs)['open_questions']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Open Questions</h4>
                    <ul class="space-y-1">
                      @for (q of $any(rs)['open_questions']; track $index) {
                        <li class="flex items-start gap-2 text-sm text-amber-700">
                          <span class="mt-0.5">?</span>
                          {{ q }}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            </details>
          }

          <!-- Technical Design -->
          @if (workflow()!.technical_design; as td) {
            <details class="rounded-xl border border-surface-200 bg-white">
              <summary
                class="cursor-pointer px-6 py-4 text-sm font-semibold text-surface-900"
              >
                Technical Design
              </summary>
              <div class="border-t border-surface-100 px-6 py-4 space-y-5">
                <!-- Overview -->
                @if ($any(td)['overview']) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Overview</h4>
                    <p class="whitespace-pre-line text-sm leading-relaxed text-surface-700">{{ $any(td)['overview'] }}</p>
                  </div>
                }

                <!-- File Changes -->
                @if ($any(td)['file_changes']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">
                      File Changes ({{ $any(td)['file_changes'].length }})
                    </h4>
                    <div class="space-y-2">
                      @for (fc of $any(td)['file_changes']; track fc.file_path ?? $index) {
                        <div class="rounded-lg border border-surface-100 px-4 py-3">
                          <div class="flex items-center gap-2">
                            <span class="rounded px-1.5 py-0.5 text-xs font-semibold"
                              [class]="fc.action === 'create' ? 'bg-green-100 text-green-700'
                                : fc.action === 'modify' ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'">
                              {{ fc.action }}
                            </span>
                            <code class="text-sm font-medium text-surface-900">{{ fc.file_path }}</code>
                          </div>
                          <p class="mt-1 text-xs text-surface-500">{{ fc.description }}</p>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- API Endpoints -->
                @if ($any(td)['api_endpoints']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">API Endpoints</h4>
                    <div class="overflow-hidden rounded-lg border border-surface-200">
                      <table class="w-full text-left text-sm">
                        <thead class="bg-surface-50 text-xs text-surface-500">
                          <tr>
                            <th class="px-4 py-2">Method</th>
                            <th class="px-4 py-2">Path</th>
                            <th class="px-4 py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-100">
                          @for (ep of $any(td)['api_endpoints']; track ep.path ?? $index) {
                            <tr>
                              <td class="px-4 py-2">
                                <span class="rounded bg-surface-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-surface-700">{{ ep.method }}</span>
                              </td>
                              <td class="px-4 py-2">
                                <code class="text-xs text-surface-700">{{ ep.path }}</code>
                              </td>
                              <td class="px-4 py-2 text-xs text-surface-500">{{ ep.description }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                }

                <!-- Data Model Changes -->
                @if ($any(td)['data_model_changes']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Data Model Changes</h4>
                    <div class="space-y-2">
                      @for (dm of $any(td)['data_model_changes']; track dm.entity ?? $index) {
                        <div class="rounded-lg border border-surface-100 px-4 py-3">
                          <div class="flex items-center gap-2">
                            <span class="rounded px-1.5 py-0.5 text-xs font-semibold"
                              [class]="dm.action === 'create' ? 'bg-green-100 text-green-700'
                                : dm.action === 'modify' ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'">
                              {{ dm.action }}
                            </span>
                            <code class="text-sm font-semibold text-surface-900">{{ dm.entity }}</code>
                          </div>
                          @if (dm.fields?.length) {
                            <ul class="mt-2 space-y-0.5">
                              @for (field of dm.fields; track $index) {
                                <li class="text-xs font-mono text-surface-500">{{ field }}</li>
                              }
                            </ul>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- Dependencies -->
                @if ($any(td)['dependencies']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Dependencies</h4>
                    <div class="flex flex-wrap gap-2">
                      @for (dep of $any(td)['dependencies']; track $index) {
                        <span class="rounded-full border border-surface-200 bg-surface-50 px-3 py-1 text-xs font-mono text-surface-700">{{ dep }}</span>
                      }
                    </div>
                  </div>
                }

                <!-- Migration Notes -->
                @if ($any(td)['migration_notes']) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Migration Notes</h4>
                    <p class="whitespace-pre-line text-sm text-surface-600">{{ $any(td)['migration_notes'] }}</p>
                  </div>
                }

                <!-- Testing Strategy -->
                @if ($any(td)['testing_strategy']) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Testing Strategy</h4>
                    <p class="whitespace-pre-line text-sm text-surface-600">{{ $any(td)['testing_strategy'] }}</p>
                  </div>
                }

                <!-- Risks & Tradeoffs -->
                @if ($any(td)['risks_and_tradeoffs']?.length) {
                  <div>
                    <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Risks &amp; Tradeoffs</h4>
                    <ul class="space-y-1">
                      @for (risk of $any(td)['risks_and_tradeoffs']; track $index) {
                        <li class="flex items-start gap-2 text-sm text-surface-600">
                          <span class="mt-0.5 text-amber-500">&#9888;</span>
                          {{ risk }}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            </details>
          }

          <!-- Implementation Tasks -->
          @if (workflow()!.tasks) {
            <details class="rounded-xl border border-surface-200 bg-white">
              <summary
                class="cursor-pointer px-6 py-4 text-sm font-semibold text-surface-900"
              >
                Implementation Tasks ({{ workflow()!.tasks!.length }})
              </summary>
              <div class="border-t border-surface-100 px-6 py-4">
                <div class="space-y-3">
                  @for (task of workflow()!.tasks!; track $index) {
                    <div class="rounded-lg border border-surface-100 p-4">
                      <div class="flex items-start gap-3">
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-100 text-xs font-semibold text-surface-500">{{ $index + 1 }}</span>
                        <div class="flex-1">
                          <p class="text-sm font-medium text-surface-900">
                            {{ $any(task)['title'] ?? 'Task ' + ($index + 1) }}
                          </p>
                          @if ($any(task)['description']) {
                            <p class="mt-1 text-xs leading-relaxed text-surface-500">
                              {{ $any(task)['description'] }}
                            </p>
                          }
                          @if ($any(task)['dependencies']?.length) {
                            <div class="mt-2 flex flex-wrap gap-1">
                              @for (dep of $any(task)['dependencies']; track $index) {
                                <span class="rounded bg-surface-100 px-1.5 py-0.5 text-[10px] text-surface-400">depends on: {{ dep }}</span>
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </details>
          }

          <!-- PR link -->
          @if (workflow()!.pr_url) {
            <div
              class="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-sm font-semibold text-emerald-800">
                    Pull Request
                  </h3>
                  <p class="mt-1 text-sm">
                    @if (workflow()!.pr_url!.startsWith('http')) {
                      <a
                        [href]="workflow()!.pr_url!"
                        target="_blank"
                        class="font-medium text-emerald-700 hover:underline"
                        >{{ workflow()!.pr_url }}</a
                      >
                    } @else {
                      <span class="text-surface-600">{{
                        workflow()!.pr_url
                      }}</span>
                    }
                  </p>
                </div>
                @if (!workflow()!.pr_url!.startsWith('http')) {
                  <button
                    (click)="retryPush()"
                    [disabled]="submitting()"
                    class="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {{ submitting() ? 'Pushing...' : 'Retry Push' }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Repo info -->
          <div class="rounded-xl border border-surface-200 bg-white px-6 py-4">
            <h3 class="text-sm font-semibold text-surface-700">Repository</h3>
            <p class="mt-1 text-sm text-surface-500">
              <a
                [href]="workflow()!.repo_url"
                target="_blank"
                class="text-primary-600 hover:underline"
                >{{ workflow()!.repo_url }}</a
              >
              @if (workflow()!.branch) {
                <span class="text-surface-400">
                  ({{ workflow()!.branch }})</span
                >
              }
            </p>
          </div>

          <!-- Agent Runs -->
          @if (agentRuns().length > 0) {
            <details class="rounded-xl border border-surface-200 bg-white">
              <summary
                class="cursor-pointer px-6 py-4 text-sm font-semibold text-surface-900"
              >
                Agent Runs ({{ agentRuns().length }}) &mdash;
                {{ totalTokens().toLocaleString() }} tokens &middot;
                {{ totalDuration() }}
              </summary>
              <div class="border-t border-surface-100">
                <table class="w-full text-left text-sm">
                  <thead class="bg-surface-50 text-xs text-surface-500">
                    <tr>
                      <th class="px-4 py-2">Agent</th>
                      <th class="px-4 py-2">Status</th>
                      <th class="px-4 py-2">Model</th>
                      <th class="px-4 py-2 text-right">Tokens</th>
                      <th class="px-4 py-2 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-100">
                    @for (run of agentRuns(); track run.id) {
                      <tr>
                        <td class="px-4 py-2 font-medium text-surface-900">
                          {{ run.agent_name }}
                        </td>
                        <td class="px-4 py-2">
                          <span
                            class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                            [class]="
                              run.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : run.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                            "
                          >
                            {{ run.status }}
                          </span>
                        </td>
                        <td class="px-4 py-2 text-surface-500">
                          {{ run.model_used ?? '—' }}
                        </td>
                        <td class="px-4 py-2 text-right text-surface-700">
                          {{ run.tokens_used?.toLocaleString() ?? '—' }}
                        </td>
                        <td class="px-4 py-2 text-right text-surface-500">
                          {{
                            run.duration_ms != null
                              ? (run.duration_ms / 1000).toFixed(1) + 's'
                              : '—'
                          }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </details>
          }

          <!-- FRD text -->
          <details class="rounded-xl border border-surface-200 bg-white">
            <summary
              class="cursor-pointer px-6 py-4 text-sm font-semibold text-surface-900"
            >
              Feature Requirement Document
            </summary>
            <div class="border-t border-surface-100 px-6 py-4">
              <pre
                class="whitespace-pre-wrap text-sm leading-relaxed text-surface-700"
              >{{ workflow()!.feature_doc_text }}</pre>
            </div>
          </details>
        </div>
      }
    </div>
  `,
})
export class WorkflowDetailComponent implements OnInit {
  private readonly api = inject(ApiService);

  id = input.required<string>();

  readonly workflow = signal<Workflow | null>(null);
  readonly questions = signal<ClarificationQuestion[]>([]);
  readonly answers = signal<Record<string, string>>({});
  readonly submitting = signal(false);
  readonly pipelineSteps = PIPELINE_STEPS;
  readonly agentRuns = signal<AgentRun[]>([]);

  readonly totalTokens = computed(() =>
    this.agentRuns().reduce((sum, r) => sum + (r.tokens_used ?? 0), 0),
  );

  readonly totalDuration = computed(() => {
    const ms = this.agentRuns().reduce(
      (sum, r) => sum + (r.duration_ms ?? 0),
      0,
    );
    return ms >= 60000
      ? `${(ms / 60000).toFixed(1)}m`
      : `${(ms / 1000).toFixed(1)}s`;
  });

  readonly allAnswered = computed(() => {
    const qs = this.questions();
    const ans = this.answers();
    return qs.length > 0 && qs.every((q) => (ans[q.id] ?? '').trim().length > 0);
  });

  private pollingTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.loadWorkflow();
  }

  private loadWorkflow(): void {
    const wfId = Number(this.id());
    this.api.getWorkflow(wfId).subscribe((wf) => {
      this.workflow.set(wf);
      if (wf.status === 'awaiting_clarification' && wf.pending_questions?.length) {
        this.questions.set(wf.pending_questions);
        this.answers.set({});
      }
      this.startPollingIfActive(wf);
    });
    this.api.getAgentRuns(wfId).subscribe((runs) => this.agentRuns.set(runs));
  }

  private startPollingIfActive(wf: Workflow): void {
    if (this.pollingTimer) clearInterval(this.pollingTimer);

    const activeStatuses: WorkflowStatus[] = [
      'parsing',
      'designing',
      'reviewing',
      'ticketing',
      'implementing',
      'code_reviewing',
    ];

    if (activeStatuses.includes(wf.status)) {
      this.pollingTimer = setInterval(() => {
        this.api.getWorkflow(wf.id).subscribe((updated) => {
          this.workflow.set(updated);
          if (!activeStatuses.includes(updated.status)) {
            clearInterval(this.pollingTimer!);
            this.pollingTimer = null;
          }
        });
        this.api
          .getAgentRuns(wf.id)
          .subscribe((runs) => this.agentRuns.set(runs));
      }, 5000);
    }
  }

  setAnswer(questionId: string, value: string): void {
    this.answers.update((prev) => ({ ...prev, [questionId]: value }));
  }

  rerun(): void {
    const wf = this.workflow();
    if (!wf) return;
    this.submitting.set(true);

    this.api.runPipeline(wf.id).subscribe({
      next: (updated) => {
        this.submitting.set(false);
        this.workflow.set(updated);
        if (updated.pending_questions?.length) {
          this.questions.set(updated.pending_questions);
          this.answers.set({});
        } else {
          this.questions.set([]);
          this.startPollingIfActive(updated);
        }
      },
      error: () => this.submitting.set(false),
    });
  }

  retryPush(): void {
    const wf = this.workflow();
    if (!wf) return;
    this.submitting.set(true);

    this.api.retryPush(wf.id).subscribe({
      next: (updated) => {
        this.submitting.set(false);
        this.workflow.set(updated);
      },
      error: () => this.submitting.set(false),
    });
  }

  skipQuestions(): void {
    const wf = this.workflow();
    if (!wf) return;
    this.submitting.set(true);

    this.api.skipClarification(wf.id).subscribe({
      next: (updated) => {
        this.submitting.set(false);
        this.workflow.set(updated);
        this.questions.set([]);
        this.startPollingIfActive(updated);
      },
      error: () => this.submitting.set(false),
    });
  }

  submitAnswers(): void {
    const wf = this.workflow();
    if (!wf) return;
    this.submitting.set(true);

    this.api
      .submitClarifications(wf.id, { answers: this.answers() })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          const updated = res as Workflow;
          this.workflow.set(updated);

          if (updated.status === 'awaiting_clarification' && updated.pending_questions?.length) {
            this.questions.set(updated.pending_questions);
            this.answers.set({});
          } else {
            this.questions.set([]);
            this.startPollingIfActive(updated);
          }
        },
        error: () => this.submitting.set(false),
      });
  }

  stepClass(stepKey: WorkflowStatus): string {
    const wf = this.workflow();
    if (!wf) return 'bg-surface-100 text-surface-400';
    if (stepKey === wf.status)
      return 'bg-primary-600 text-white ring-4 ring-primary-100';
    if (this.isStepDone(stepKey)) return 'bg-primary-500 text-white';
    return 'bg-surface-100 text-surface-400';
  }

  isStepDone(stepKey: WorkflowStatus): boolean {
    const wf = this.workflow();
    if (!wf) return false;
    const order = PIPELINE_STEPS.map((s) => s.key);
    const currentIdx = order.indexOf(wf.status);
    const stepIdx = order.indexOf(stepKey);
    if (stepKey === 'awaiting_clarification') {
      return currentIdx > order.indexOf('parsing');
    }
    return stepIdx < currentIdx;
  }
}
