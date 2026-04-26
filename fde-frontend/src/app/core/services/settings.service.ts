import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'fde_github_token';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _githubToken = signal(localStorage.getItem(STORAGE_KEY) ?? '');
  readonly githubToken = this._githubToken.asReadonly();
  readonly hasToken = computed(() => this._githubToken().length > 0);

  setGithubToken(token: string): void {
    this._githubToken.set(token);
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
