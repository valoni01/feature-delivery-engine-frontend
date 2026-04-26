import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  template: `
    <div class="mx-auto max-w-2xl">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-surface-900">Settings</h1>
        <p class="mt-1 text-sm text-surface-500">
          Configure your GitHub credentials and preferences.
        </p>
      </div>

      <div class="rounded-xl border border-surface-200 bg-white p-6">
        <h2 class="mb-1 font-semibold text-surface-900">
          GitHub Personal Access Token
        </h2>
        <p class="mb-4 text-sm text-surface-500">
          Required to list and clone your repositories. The token is stored
          locally in your browser and sent to the backend per-request.
        </p>

        <div class="flex gap-3">
          <input
            [type]="showToken() ? 'text' : 'password'"
            [(ngModel)]="tokenValue"
            class="flex-1 rounded-lg border border-surface-300 px-3 py-2 text-sm font-mono transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          />
          <button
            (click)="showToken.set(!showToken())"
            class="rounded-lg border border-surface-300 px-3 py-2 text-sm text-surface-600 transition-colors hover:bg-surface-50"
          >
            {{ showToken() ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <button
            (click)="save()"
            class="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Save Token
          </button>
          @if (settings.hasToken()) {
            <button
              (click)="clear()"
              class="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Remove Token
            </button>
          }
          @if (saved()) {
            <span class="text-sm text-green-600">Saved!</span>
          }
        </div>
      </div>

      @if (settings.hasToken()) {
        <div
          class="mt-6 rounded-xl border border-green-200 bg-green-50 px-6 py-4"
        >
          <p class="text-sm text-green-800">
            <strong>Token configured.</strong> Your GitHub repositories will be
            available when creating a new workflow.
          </p>
        </div>
      }
    </div>
  `,
})
export class SettingsComponent {
  readonly settings = inject(SettingsService);
  readonly showToken = signal(false);
  readonly saved = signal(false);

  tokenValue = this.settings.githubToken();

  save(): void {
    this.settings.setGithubToken(this.tokenValue.trim());
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  clear(): void {
    this.tokenValue = '';
    this.settings.setGithubToken('');
    this.saved.set(false);
  }
}
