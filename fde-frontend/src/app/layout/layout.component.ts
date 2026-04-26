import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="flex w-64 flex-col border-r border-surface-200 bg-white"
      >
        <div class="flex h-16 items-center gap-2 border-b border-surface-200 px-6">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white"
          >
            F
          </div>
          <span class="text-lg font-semibold tracking-tight text-surface-900"
            >FDE Copilot</span
          >
        </div>

        <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-primary-50 text-primary-700 font-medium"
              [routerLinkActiveOptions]="{ exact: item.path === '/app/dashboard' || item.path === '/app/workflows' }"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900"
            >
              <span class="text-base" [innerHTML]="item.icon"></span>
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="border-t border-surface-200 p-4">
          <div class="rounded-lg bg-surface-50 p-3">
            <p class="text-xs font-medium text-surface-500">Feature Delivery Engine</p>
            <p class="text-xs text-surface-400">v0.1.0</p>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <header
          class="flex h-16 shrink-0 items-center justify-between border-b border-surface-200 bg-white px-8"
        >
          <div></div>
          <a
            routerLink="/app/settings"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-900"
          >
            &#9881; Settings
          </a>
        </header>

        <main class="flex-1 overflow-y-auto p-8">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class LayoutComponent {
  readonly navItems: NavItem[] = [
    { path: '/app/dashboard', label: 'Dashboard', icon: '&#9632;' },
    { path: '/app/workflows', label: 'Workflows', icon: '&#9776;' },
    { path: '/app/workflows/new', label: 'New Workflow', icon: '&#10010;' },
    { path: '/app/help', label: 'Help', icon: '&#9432;' },
    { path: '/app/settings', label: 'Settings', icon: '&#9881;' },
  ];
}
