import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { SettingsService } from '../../core/services/settings.service';
import { GitHubRepo } from '../../core/models';

@Component({
  selector: 'app-workflow-new',
  imports: [ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-surface-900">New Workflow</h1>
        <p class="mt-1 text-sm text-surface-500">
          Describe a feature and pick a repository to start the delivery
          pipeline.
        </p>
      </div>

      @if (!settings.hasToken()) {
        <div
          class="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          <strong>GitHub token required.</strong> Go to
          <a routerLink="/settings" class="font-medium underline">Settings</a>
          to add your personal access token before selecting a repository.
        </div>
      }

      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="space-y-6 rounded-xl border border-surface-200 bg-white p-6"
      >
        <!-- Title -->
        <div>
          <label class="mb-1 block text-sm font-medium text-surface-700"
            >Workflow Title</label
          >
          <input
            formControlName="title"
            class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            placeholder="e.g. Add user notification system"
          />
        </div>

        <!-- Repository picker -->
        <div>
          <label class="mb-1 block text-sm font-medium text-surface-700"
            >GitHub Repository</label
          >
          @if (!settings.hasToken()) {
            <p class="text-sm text-surface-400 italic">
              Add a GitHub token in Settings to browse your repos.
            </p>
          } @else if (loadingRepos()) {
            <p class="text-sm text-surface-400">Loading repositories...</p>
          } @else {
            <div class="space-y-2">
              <!-- Search -->
              <input
                [value]="repoSearch()"
                (input)="repoSearch.set($any($event.target).value)"
                class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                placeholder="Search repositories..."
              />

              <div
                class="max-h-48 divide-y divide-surface-100 overflow-y-auto rounded-lg border border-surface-200"
              >
                @for (repo of filteredRepos(); track repo.id) {
                  <button
                    type="button"
                    (click)="selectRepo(repo)"
                    class="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-primary-50"
                    [class.bg-primary-50]="
                      form.get('repo_url')?.value === repo.html_url
                    "
                    [class.ring-1]="
                      form.get('repo_url')?.value === repo.html_url
                    "
                    [class.ring-primary-500]="
                      form.get('repo_url')?.value === repo.html_url
                    "
                  >
                    <div class="min-w-0">
                      <p class="truncate text-sm font-medium text-surface-900">
                        {{ repo.full_name }}
                      </p>
                      <p class="truncate text-xs text-surface-400">
                        {{ repo.description ?? 'No description' }}
                      </p>
                    </div>
                    <div class="ml-3 flex shrink-0 items-center gap-2">
                      @if (repo.language) {
                        <span
                          class="rounded-full bg-surface-100 px-2 py-0.5 text-xs text-surface-500"
                          >{{ repo.language }}</span
                        >
                      }
                      @if (repo.private) {
                        <span
                          class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
                          >Private</span
                        >
                      }
                    </div>
                  </button>
                } @empty {
                  <p class="px-4 py-3 text-sm text-surface-400">
                    No repositories match your search.
                  </p>
                }
              </div>
            </div>
          }
          @if (selectedRepo()) {
            <p class="mt-2 text-xs text-surface-500">
              Selected: <strong>{{ selectedRepo()!.full_name }}</strong> ({{
                selectedRepo()!.default_branch
              }})
            </p>
          }
        </div>

        <!-- Branch override -->
        <div>
          <label class="mb-1 block text-sm font-medium text-surface-700"
            >Branch (optional)</label
          >
          <input
            formControlName="branch"
            class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            [placeholder]="
              selectedRepo()
                ? 'Default: ' + selectedRepo()!.default_branch
                : 'e.g. main'
            "
          />
        </div>

        <!-- FRD -->
        <div>
          <label class="mb-1 block text-sm font-medium text-surface-700"
            >Feature Requirement Document</label
          >
          <p class="mb-2 text-xs text-surface-400">
            Describe the feature you want to build. Be as detailed as you can
            — the agent will ask follow-up questions if anything is unclear.
          </p>
          <textarea
            formControlName="feature_doc_text"
            rows="10"
            class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm leading-relaxed transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            placeholder="As a user, I want to receive real-time notifications when..."
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="flex items-center justify-between border-t border-surface-100 pt-4">
          @if (error()) {
            <p class="text-sm text-red-600">{{ error() }}</p>
          } @else {
            <div></div>
          }
          <button
            type="submit"
            [disabled]="form.invalid || submitting()"
            class="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ submitting() ? 'Creating...' : 'Create & Start Pipeline' }}
          </button>
        </div>
      </form>
    </div>
  `,
})
export class WorkflowNewComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly settings = inject(SettingsService);

  readonly repos = signal<GitHubRepo[]>([]);
  readonly loadingRepos = signal(false);
  readonly repoSearch = signal('');
  readonly selectedRepo = signal<GitHubRepo | null>(null);
  readonly submitting = signal(false);
  readonly error = signal('');

  readonly filteredRepos = computed(() => {
    const q = this.repoSearch().toLowerCase();
    return this.repos().filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        (r.description?.toLowerCase().includes(q) ?? false),
    );
  });

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    repo_url: ['', Validators.required],
    branch: [''],
    feature_doc_text: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.settings.hasToken()) {
      this.loadRepos();
    }
  }

  private loadRepos(): void {
    this.loadingRepos.set(true);
    this.api.getGithubRepos(1, 100).subscribe({
      next: (repos) => {
        this.repos.set(repos);
        this.loadingRepos.set(false);
      },
      error: () => this.loadingRepos.set(false),
    });
  }

  selectRepo(repo: GitHubRepo): void {
    this.selectedRepo.set(repo);
    this.form.patchValue({ repo_url: repo.html_url });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    this.error.set('');

    const val = this.form.getRawValue();
    this.api
      .createWorkflow({
        title: val.title,
        repo_url: val.repo_url,
        feature_doc_text: val.feature_doc_text,
        branch: val.branch || null,
      })
      .subscribe({
        next: (wf) => {
          this.api.runPipeline(wf.id).subscribe({
            next: () => this.router.navigate(['/workflows', wf.id]),
            error: (err) => {
              this.submitting.set(false);
              this.error.set(
                err?.error?.detail ?? 'Pipeline failed to start.',
              );
              this.router.navigate(['/workflows', wf.id]);
            },
          });
        },
        error: (err) => {
          this.submitting.set(false);
          this.error.set(err?.error?.detail ?? 'Failed to create workflow.');
        },
      });
  }
}
