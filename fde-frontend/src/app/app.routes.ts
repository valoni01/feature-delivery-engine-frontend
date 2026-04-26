import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'workflows',
        loadComponent: () =>
          import('./pages/workflows/workflows.component').then(
            (m) => m.WorkflowsComponent,
          ),
      },
      {
        path: 'workflows/new',
        loadComponent: () =>
          import('./pages/workflow-new/workflow-new.component').then(
            (m) => m.WorkflowNewComponent,
          ),
      },
      {
        path: 'workflows/:id',
        loadComponent: () =>
          import('./pages/workflow-detail/workflow-detail.component').then(
            (m) => m.WorkflowDetailComponent,
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./pages/help/help.component').then(
            (m) => m.HelpComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
      },
    ],
  },
];
