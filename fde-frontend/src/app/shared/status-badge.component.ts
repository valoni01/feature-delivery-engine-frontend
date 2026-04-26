import { Component, computed, input } from '@angular/core';

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-surface-100 text-surface-600',
  parsing: 'bg-blue-100 text-blue-700',
  awaiting_clarification: 'bg-amber-100 text-amber-700',
  designing: 'bg-indigo-100 text-indigo-700',
  reviewing: 'bg-purple-100 text-purple-700',
  ticketing: 'bg-cyan-100 text-cyan-700',
  implementing: 'bg-orange-100 text-orange-700',
  code_reviewing: 'bg-violet-100 text-violet-700',
  pr_created: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

@Component({
  selector: 'app-status-badge',
  template: `
    <span
      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
      [class]="classes()"
    >
      {{ label() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  status = input.required<string>();

  readonly classes = computed(() => STATUS_STYLES[this.status()] ?? STATUS_STYLES['draft']);
  readonly label = computed(() => this.status().replace(/_/g, ' '));
}
