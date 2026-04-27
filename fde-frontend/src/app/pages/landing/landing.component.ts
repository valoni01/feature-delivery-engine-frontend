import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- NAVBAR -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200">
      <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a routerLink="/" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-surface-900 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-lg font-bold text-surface-900 tracking-tight">FDE</span>
        </a>

        <div class="hidden md:flex items-center gap-8 text-sm text-surface-500">
          <a href="#features" class="hover:text-surface-900 transition-colors">Features</a>
          <a href="#how-it-works" class="hover:text-surface-900 transition-colors">How It Works</a>
          <a href="#metrics" class="hover:text-surface-900 transition-colors">Results</a>
        </div>

        <a routerLink="/app/dashboard"
           class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-surface-900 hover:bg-surface-800 transition-colors">
          Launch App
        </a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="pt-36 pb-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <div class="animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-200 text-xs font-medium text-surface-500 mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Now in public beta
          </div>
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-surface-900 animate-fade-in-up delay-100">
          Ship features,<br>not boilerplate
        </h1>

        <p class="mt-6 text-lg md:text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          FDE turns your product requirements into production-ready pull requests.
          Intelligent agents parse, plan, code, and review — so you can focus on what matters.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 animate-fade-in-up delay-300">
          <a routerLink="/app/dashboard"
             class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-surface-900 hover:bg-surface-800 transition-colors">
            Get Started
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="#how-it-works"
             class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-surface-600 hover:text-surface-900 hover:bg-surface-100 transition-colors">
            See how it works
          </a>
        </div>
      </div>

      <!-- Terminal mockup -->
      <div class="max-w-2xl mx-auto mt-20 animate-fade-in delay-400">
        <div class="rounded-xl border border-surface-200 bg-surface-50 shadow-sm overflow-hidden">
          <div class="flex items-center gap-2 px-4 py-3 border-b border-surface-200 bg-white">
            <div class="w-3 h-3 rounded-full bg-surface-200"></div>
            <div class="w-3 h-3 rounded-full bg-surface-200"></div>
            <div class="w-3 h-3 rounded-full bg-surface-200"></div>
            <span class="ml-3 text-xs text-surface-400 font-mono">fde-workflow.log</span>
          </div>
          <div class="p-5 font-mono text-sm leading-relaxed space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-emerald-600">&#10003;</span>
              <span class="text-surface-500">FRD parsed</span>
              <span class="text-surface-300">&mdash;</span>
              <span class="text-surface-400">8 tasks extracted</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600">&#10003;</span>
              <span class="text-surface-500">Technical design generated</span>
              <span class="text-surface-300">&mdash;</span>
              <span class="text-surface-400">3 services, 2 models</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600">&#10003;</span>
              <span class="text-surface-500">Code implemented</span>
              <span class="text-surface-300">&mdash;</span>
              <span class="text-surface-400">+342 lines across 6 files</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-600">&#10003;</span>
              <span class="text-surface-500">Review passed</span>
              <span class="text-surface-300">&mdash;</span>
              <span class="text-surface-400">0 issues, 12 tests</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-primary-600 font-bold">&#8594;</span>
              <span class="text-surface-900 font-medium">PR #247 opened</span>
              <span class="text-surface-300">&mdash;</span>
              <span class="text-primary-600">feat: add OAuth2 authentication</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="py-24 px-6 border-t border-surface-100">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-primary-600 mb-3">Capabilities</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight">
            Four agents, one pipeline
          </h2>
          <p class="mt-4 text-surface-500 leading-relaxed">
            Each agent handles a distinct stage of delivery, collaborating to turn specs into shipped code.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="group rounded-2xl border border-surface-200 bg-white p-7 hover:shadow-md hover:border-surface-300 transition-all">
            <div class="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-surface-900 mb-2">FRD Parser</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Ingests requirement documents and extracts structured tasks, acceptance criteria, and dependencies.
            </p>
          </div>

          <div class="group rounded-2xl border border-surface-200 bg-white p-7 hover:shadow-md hover:border-surface-300 transition-all">
            <div class="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-surface-900 mb-2">Code Generator</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Generates production-quality code that follows your conventions, writes tests, and creates PR-ready branches.
            </p>
          </div>

          <div class="group rounded-2xl border border-surface-200 bg-white p-7 hover:shadow-md hover:border-surface-300 transition-all">
            <div class="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-surface-900 mb-2">Review Agent</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Reviews code for quality, security vulnerabilities, and adherence to your team's standards automatically.
            </p>
          </div>

          <div class="group rounded-2xl border border-surface-200 bg-white p-7 hover:shadow-md hover:border-surface-300 transition-all">
            <div class="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-surface-900 mb-2">Orchestrator</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Coordinates all agents, manages execution order, handles retries, and gives you real-time visibility.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="py-24 px-6 bg-surface-50 border-t border-surface-100">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-primary-600 mb-3">How It Works</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight">
            Three steps to shipped code
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-surface-900 text-white flex items-center justify-center text-sm font-bold mb-5">1</div>
            <h3 class="text-base font-semibold text-surface-900 mb-3">Upload requirements</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Paste your FRD, user story, or feature spec. The parser breaks it into structured, actionable tasks.
            </p>
          </div>

          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-surface-900 text-white flex items-center justify-center text-sm font-bold mb-5">2</div>
            <h3 class="text-base font-semibold text-surface-900 mb-3">Agents execute</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Design, implementation, and review happen automatically. Watch progress in real time on your dashboard.
            </p>
          </div>

          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-surface-900 text-white flex items-center justify-center text-sm font-bold mb-5">3</div>
            <h3 class="text-base font-semibold text-surface-900 mb-3">Review and merge</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              A tested, reviewed pull request lands in your repo. Approve it, merge, and ship.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- METRICS -->
    <section id="metrics" class="py-24 px-6 border-t border-surface-100">
      <div class="max-w-6xl mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-extrabold text-surface-900 mb-1">10x</div>
            <p class="text-sm text-surface-500">Faster from spec to PR</p>
          </div>
          <div>
            <div class="text-4xl font-extrabold text-surface-900 mb-1">85%</div>
            <p class="text-sm text-surface-500">Less boilerplate time</p>
          </div>
          <div>
            <div class="text-4xl font-extrabold text-surface-900 mb-1">100%</div>
            <p class="text-sm text-surface-500">Test coverage per PR</p>
          </div>
          <div>
            <div class="text-4xl font-extrabold text-surface-900 mb-1">24/7</div>
            <p class="text-sm text-surface-500">Agents always running</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 bg-surface-50 border-t border-surface-100">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight mb-4">
          Ready to ship faster?
        </h2>
        <p class="text-surface-500 mb-8">
          Stop writing boilerplate. Start delivering features.
        </p>
        <a routerLink="/app/dashboard"
           class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-surface-900 hover:bg-surface-800 transition-colors">
          Launch FDE
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-surface-200 py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-md bg-surface-900 flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-surface-500">Feature Delivery Engine</span>
        </div>
        <p class="text-sm text-surface-400">&copy; 2026 FDE</p>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      background: white;
    }
  `],
})
export class LandingComponent {}
