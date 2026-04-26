import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  template: `
    <div class="mx-auto max-w-5xl">
      <!-- Hero -->
      <div class="mb-12 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-2xl font-bold text-white shadow-lg shadow-primary-200"
        >
          F
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-surface-900">
          Feature Delivery Engine
        </h1>
        <p class="mt-2 text-base text-surface-500">
          AI-Powered Software Delivery Automation
        </p>
      </div>

      <!-- Problem Statement -->
      <section
        class="mb-8 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-8"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-sm"
            >&#9888;</span
          >
          <h2 class="text-lg font-bold text-red-900">The Problem</h2>
        </div>
        <p class="mb-5 text-sm leading-relaxed text-surface-700">
          Turning a feature request into a production pull request is one of the
          most resource-intensive processes in software engineering. Today, this
          journey is slow, error-prone, and expensive.
        </p>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-red-100 bg-white p-5">
            <p class="text-2xl font-bold text-red-600">2–4 weeks</p>
            <p class="mt-1 text-xs text-surface-500">
              Average time from feature request to merged PR — involving
              multiple handoffs between PMs, architects, and developers.
            </p>
          </div>
          <div class="rounded-xl border border-red-100 bg-white p-5">
            <p class="text-2xl font-bold text-red-600">60%</p>
            <p class="mt-1 text-xs text-surface-500">
              Of engineering time spent on boilerplate translation — converting
              requirements to specs to tickets to code.
            </p>
          </div>
          <div class="rounded-xl border border-red-100 bg-white p-5">
            <p class="text-2xl font-bold text-red-600">3–5 people</p>
            <p class="mt-1 text-xs text-surface-500">
              Typically involved per feature — PM, architect, tech lead,
              developer, reviewer — each a bottleneck and handoff risk.
            </p>
          </div>
        </div>
      </section>

      <!-- Solution -->
      <section
        class="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm"
            >&#10024;</span
          >
          <h2 class="text-lg font-bold text-emerald-900">The Solution</h2>
        </div>
        <p class="mb-5 text-sm leading-relaxed text-surface-700">
          FDE replaces the manual pipeline with a coordinated team of
          <strong>7 AI agents</strong> orchestrated by LangGraph. Give it a
          plain-English feature request and a GitHub repo — it delivers a
          production-ready pull request in minutes.
        </p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-emerald-100 bg-white p-5">
            <p class="text-2xl font-bold text-emerald-600">&lt; 2 min</p>
            <p class="mt-1 text-xs text-surface-500">
              Average end-to-end pipeline time from FRD to pull request.
            </p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-white p-5">
            <p class="text-2xl font-bold text-emerald-600">~$0.05</p>
            <p class="mt-1 text-xs text-surface-500">
              Average cost per feature delivery using GPT-4o token pricing.
            </p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-white p-5">
            <p class="text-2xl font-bold text-emerald-600">7 Agents</p>
            <p class="mt-1 text-xs text-surface-500">
              Specialized AI agents covering every stage from parsing to PR.
            </p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-white p-5">
            <p class="text-2xl font-bold text-emerald-600">3 Loops</p>
            <p class="mt-1 text-xs text-surface-500">
              Built-in quality gates: clarification, design review, code review.
            </p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section
        class="mb-8 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8"
      >
        <div class="mb-5 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-sm"
            >&#9881;</span
          >
          <h2 class="text-lg font-bold text-primary-900">How It Works</h2>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (step of pipelineSteps; track step.num) {
            <div class="rounded-xl border border-primary-100 bg-white p-5">
              <div
                class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
              >
                {{ step.num }}
              </div>
              <h3 class="text-sm font-semibold text-surface-900">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-xs leading-relaxed text-surface-500">
                {{ step.desc }}
              </p>
            </div>
          }
        </div>
      </section>

      <!-- Architecture Diagram -->
      <section class="mb-8 rounded-2xl border border-surface-200 bg-white p-8">
        <div class="mb-5 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-100 text-sm"
            >&#9638;</span
          >
          <h2 class="text-lg font-bold text-surface-900">
            System Architecture
          </h2>
        </div>
        <img
          src="fde-architecture-diagram.png"
          alt="FDE System Architecture — 4-layer diagram showing User Interface, API & Orchestration, AI Agent Pipeline, and Infrastructure"
          class="w-full rounded-xl border border-surface-100 shadow-sm"
        />
      </section>

      <!-- Tech Stack -->
      <section class="mb-8 rounded-2xl border border-surface-200 bg-white p-8">
        <div class="mb-5 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-100 text-sm"
            >&#9998;</span
          >
          <h2 class="text-lg font-bold text-surface-900">Tech Stack</h2>
        </div>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of techStack; track item.name) {
            <div
              class="flex items-center gap-3 rounded-lg border border-surface-100 px-4 py-3"
            >
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                [class]="item.color"
                >{{ item.abbr }}</span
              >
              <div>
                <p class="text-sm font-medium text-surface-900">
                  {{ item.name }}
                </p>
                <p class="text-xs text-surface-400">{{ item.role }}</p>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class HelpComponent {
  readonly pipelineSteps = [
    {
      num: 1,
      title: 'Describe the Feature',
      desc: 'A product manager writes a plain-English feature request. The FRD Parser agent asks clarifying business questions — no technical jargon.',
    },
    {
      num: 2,
      title: 'Design & Review',
      desc: 'The Technical Designer produces a spec with file changes, API endpoints, and data models. A Design Reviewer agent validates it with a rework loop.',
    },
    {
      num: 3,
      title: 'Implement & Review',
      desc: 'Tasks are planned and implemented by a Code Implementer with full repo access. A Code Reviewer agent checks correctness, security, and quality.',
    },
    {
      num: 4,
      title: 'Ship the PR',
      desc: 'The PR Creator generates a descriptive branch, commits the changes, pushes to GitHub, and opens a pull request — all automated.',
    },
  ];

  readonly techStack = [
    {
      name: 'FastAPI',
      role: 'Async Python backend',
      abbr: 'FA',
      color: 'bg-teal-100 text-teal-700',
    },
    {
      name: 'Angular',
      role: 'Frontend SPA',
      abbr: 'NG',
      color: 'bg-red-100 text-red-700',
    },
    {
      name: 'LangGraph',
      role: 'Agent orchestration',
      abbr: 'LG',
      color: 'bg-violet-100 text-violet-700',
    },
    {
      name: 'OpenAI GPT-4o',
      role: 'LLM inference',
      abbr: 'AI',
      color: 'bg-green-100 text-green-700',
    },
    {
      name: 'PostgreSQL',
      role: 'Workflows & state',
      abbr: 'PG',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'OpenTelemetry',
      role: 'Distributed tracing',
      abbr: 'OT',
      color: 'bg-amber-100 text-amber-700',
    },
  ];
}
