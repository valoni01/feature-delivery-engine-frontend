import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ============================================================ -->
    <!-- NAVBAR                                                        -->
    <!-- ============================================================ -->
    <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-surface-950/60 border-b border-white/5">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a routerLink="/" class="flex items-center gap-3 group">
          <div class="relative w-10 h-10">
            <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 animate-gradient"></div>
            <div class="absolute inset-[2px] rounded-[10px] bg-surface-950 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <span class="text-xl font-bold text-white tracking-tight">FDE</span>
        </a>

        <div class="hidden md:flex items-center gap-8 text-sm text-surface-300">
          <a href="#features" class="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" class="hover:text-white transition-colors">How It Works</a>
          <a href="#metrics" class="hover:text-white transition-colors">Results</a>
        </div>

        <a routerLink="/app/dashboard"
           class="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-500/40 hover:scale-105">
          Launch App
        </a>
      </div>
    </nav>

    <!-- ============================================================ -->
    <!-- HERO                                                          -->
    <!-- ============================================================ -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-surface-950">
      <!-- Ambient background -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[128px] animate-pulse-glow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/15 rounded-full blur-[128px] animate-pulse-glow delay-500"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[200px] animate-pulse-glow delay-300"></div>
      </div>

      <!-- Grid overlay -->
      <div class="absolute inset-0 opacity-[0.03]"
           style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                  background-size: 60px 60px;">
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left: copy -->
          <div>
            <div class="animate-fade-in-up">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-medium mb-8">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AI-Powered Feature Delivery
              </div>
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight animate-fade-in-up delay-100">
              <span class="text-white">Ship features</span><br>
              <span class="bg-gradient-to-r from-primary-400 via-accent-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                at lightspeed
              </span>
            </h1>

            <p class="mt-6 text-lg md:text-xl text-surface-300 max-w-xl leading-relaxed animate-fade-in-up delay-200">
              From product requirements to deployed code — FDE orchestrates your entire delivery pipeline
              with intelligent AI agents that parse, plan, generate, and ship.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up delay-300">
              <a routerLink="/app/dashboard"
                 class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 shadow-2xl shadow-primary-600/30 hover:shadow-primary-500/50 transition-all hover:scale-[1.03]">
                Get Started
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#how-it-works"
                 class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-surface-200 border border-surface-700 hover:border-surface-500 hover:bg-surface-800/50 transition-all">
                See How It Works
              </a>
            </div>
          </div>

          <!-- Right: orbital visual -->
          <div class="hidden lg:flex items-center justify-center animate-fade-in delay-400">
            <div class="relative w-[420px] h-[420px]">
              <!-- Orbital rings -->
              <div class="absolute inset-8 rounded-full border border-surface-700/50"></div>
              <div class="absolute inset-16 rounded-full border border-surface-700/30"></div>
              <div class="absolute inset-0 rounded-full border border-surface-800/40"></div>

              <!-- Center node -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative">
                  <div class="absolute -inset-4 rounded-2xl bg-primary-500/20 blur-xl animate-pulse-glow"></div>
                  <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/40">
                    <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Orbiting agents -->
              <div class="absolute inset-0 animate-orbit" style="animation-duration: 18s;">
                <div class="w-14 h-14 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center shadow-xl">
                  <svg class="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              </div>

              <div class="absolute inset-0 animate-orbit" style="animation-duration: 24s; animation-delay: -6s;">
                <div class="w-14 h-14 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center shadow-xl">
                  <svg class="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
              </div>

              <div class="absolute inset-0 animate-orbit" style="animation-duration: 22s; animation-delay: -11s;">
                <div class="w-14 h-14 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center shadow-xl">
                  <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div class="absolute inset-0 animate-orbit" style="animation-duration: 26s; animation-delay: -18s;">
                <div class="w-14 h-14 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center shadow-xl">
                  <svg class="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700">
        <span class="text-xs text-surface-500 tracking-widest uppercase">Scroll</span>
        <div class="w-5 h-8 rounded-full border-2 border-surface-600 flex items-start justify-center pt-1.5">
          <div class="w-1 h-2 rounded-full bg-surface-400 animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- FEATURES                                                      -->
    <!-- ============================================================ -->
    <section id="features" class="relative py-32 bg-surface-950 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <p class="text-sm font-semibold text-primary-400 tracking-widest uppercase mb-4">Capabilities</p>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Everything you need to<br>
            <span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">deliver features faster</span>
          </h2>
          <p class="mt-6 text-lg text-surface-400 leading-relaxed">
            Four intelligent AI agents work in concert, turning your product requirements into production-ready code — automatically.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- FRD Parser -->
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 hover:border-primary-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/5">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">FRD Parser Agent</h3>
              <p class="text-surface-400 leading-relaxed">
                Ingests your Feature Requirement Documents and extracts structured tasks, acceptance criteria, and dependencies — transforming specs into actionable work items.
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">NLP Extraction</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">Task Breakdown</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">Dependency Mapping</span>
              </div>
            </div>
          </div>

          <!-- Code Generator -->
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 hover:border-accent-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/5">
            <div class="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Code Generator Agent</h3>
              <p class="text-surface-400 leading-relaxed">
                Generates production-quality code from parsed tasks. Understands your codebase conventions, writes tests, and creates pull-request-ready branches.
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20">Multi-Language</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20">Test Generation</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20">PR Automation</span>
              </div>
            </div>
          </div>

          <!-- Reviewer -->
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5">
            <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Review Agent</h3>
              <p class="text-surface-400 leading-relaxed">
                Automatically reviews generated code for quality, security vulnerabilities, and adherence to your team's coding standards before any human sees it.
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Quality Gates</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Security Scan</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Style Checks</span>
              </div>
            </div>
          </div>

          <!-- Orchestrator -->
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 hover:border-yellow-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/5">
            <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Workflow Orchestrator</h3>
              <p class="text-surface-400 leading-relaxed">
                The brain that coordinates all agents. Manages execution order, handles failures gracefully, and provides real-time visibility into every step of delivery.
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">DAG Execution</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">Auto-Retry</span>
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">Live Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- HOW IT WORKS                                                  -->
    <!-- ============================================================ -->
    <section id="how-it-works" class="relative py-32 bg-surface-950 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <p class="text-sm font-semibold text-accent-400 tracking-widest uppercase mb-4">How It Works</p>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Three steps to<br>
            <span class="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent">shipped features</span>
          </h2>
        </div>

        <div class="relative">
          <!-- Connecting line -->
          <div class="hidden md:block absolute top-24 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5">
            <div class="h-full bg-gradient-to-r from-primary-500/60 via-accent-500/60 to-emerald-500/60"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-12">
            <!-- Step 1 -->
            <div class="relative text-center">
              <div class="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl shadow-primary-500/30 mb-8">
                <span class="text-xl font-bold text-white">1</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Upload Requirements</h3>
              <p class="text-surface-400 leading-relaxed">
                Paste your FRD, user story, or feature spec. Our AI parses it into structured, actionable tasks with clear acceptance criteria.
              </p>
              <div class="mt-8 rounded-2xl border border-surface-800 bg-surface-900/80 p-4 text-left">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div class="space-y-2 font-mono text-xs">
                  <p class="text-surface-500">// feature-requirement.md</p>
                  <p class="text-primary-300">## User Authentication</p>
                  <p class="text-surface-400">As a user, I want to log in</p>
                  <p class="text-surface-400">with OAuth2 so that I can</p>
                  <p class="text-surface-400">access my dashboard securely.</p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="relative text-center">
              <div class="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-xl shadow-accent-500/30 mb-8">
                <span class="text-xl font-bold text-white">2</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">AI Agents Execute</h3>
              <p class="text-surface-400 leading-relaxed">
                Agents collaborate — parsing requirements, generating code, running reviews, and assembling pull requests. Watch it happen in real time.
              </p>
              <div class="mt-8 rounded-2xl border border-surface-800 bg-surface-900/80 p-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div class="flex-1 text-left">
                      <p class="text-xs font-medium text-white">FRD Parsing</p>
                      <div class="mt-1 h-1.5 rounded-full bg-surface-800 overflow-hidden"><div class="h-full w-full bg-primary-500 rounded-full"></div></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div class="flex-1 text-left">
                      <p class="text-xs font-medium text-white">Code Generation</p>
                      <div class="mt-1 h-1.5 rounded-full bg-surface-800 overflow-hidden"><div class="h-full w-full bg-accent-500 rounded-full"></div></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <div class="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div class="flex-1 text-left">
                      <p class="text-xs font-medium text-white">Code Review</p>
                      <div class="mt-1 h-1.5 rounded-full bg-surface-800 overflow-hidden"><div class="h-full w-3/4 bg-emerald-500 rounded-full"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative text-center">
              <div class="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-8">
                <span class="text-xl font-bold text-white">3</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Ship with Confidence</h3>
              <p class="text-surface-400 leading-relaxed">
                Review the AI-generated PR, approve, and merge. Every line is tested, reviewed, and documented — ready for production.
              </p>
              <div class="mt-8 rounded-2xl border border-surface-800 bg-surface-900/80 p-4">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="text-sm font-medium text-white">PR #247 Ready</p>
                    <p class="text-xs text-surface-500">feat: add OAuth2 authentication</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <div class="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">+342 lines</div>
                  <div class="px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-400">12 tests</div>
                  <div class="px-3 py-1.5 rounded-lg bg-accent-500/10 border border-accent-500/20 text-xs font-medium text-accent-400">0 issues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- METRICS                                                       -->
    <!-- ============================================================ -->
    <section id="metrics" class="relative py-32 bg-surface-950 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <p class="text-sm font-semibold text-emerald-400 tracking-widest uppercase mb-4">Impact</p>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Results that<br>
            <span class="bg-gradient-to-r from-emerald-400 to-primary-400 bg-clip-text text-transparent">speak for themselves</span>
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 text-center hover:border-primary-500/30 transition-all">
            <div class="text-5xl font-extrabold bg-gradient-to-b from-white to-surface-400 bg-clip-text text-transparent mb-2">10x</div>
            <p class="text-surface-400 text-sm">Faster feature delivery from spec to PR</p>
          </div>
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 text-center hover:border-accent-500/30 transition-all">
            <div class="text-5xl font-extrabold bg-gradient-to-b from-white to-surface-400 bg-clip-text text-transparent mb-2">85%</div>
            <p class="text-surface-400 text-sm">Reduction in boilerplate engineering time</p>
          </div>
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 text-center hover:border-emerald-500/30 transition-all">
            <div class="text-5xl font-extrabold bg-gradient-to-b from-white to-surface-400 bg-clip-text text-transparent mb-2">100%</div>
            <p class="text-surface-400 text-sm">Auto-generated test coverage on every PR</p>
          </div>
          <div class="group relative rounded-3xl border border-surface-800 bg-surface-900/50 p-8 text-center hover:border-yellow-500/30 transition-all">
            <div class="text-5xl font-extrabold bg-gradient-to-b from-white to-surface-400 bg-clip-text text-transparent mb-2">24/7</div>
            <p class="text-surface-400 text-sm">AI agents working while you sleep</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- CTA                                                           -->
    <!-- ============================================================ -->
    <section class="relative py-32 bg-surface-950 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-600/15 rounded-full blur-[120px]"></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          Ready to supercharge<br>your delivery pipeline?
        </h2>
        <p class="text-lg text-surface-400 mb-10 max-w-xl mx-auto">
          Stop writing boilerplate. Start shipping features. Let AI handle the heavy lifting while you focus on what matters.
        </p>
        <a routerLink="/app/dashboard"
           class="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_auto] animate-gradient shadow-2xl shadow-primary-600/30 hover:shadow-primary-500/50 transition-all hover:scale-[1.03]">
          Launch FDE Now
          <svg class="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- FOOTER                                                        -->
    <!-- ============================================================ -->
    <footer class="border-t border-surface-800 bg-surface-950 py-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-sm font-semibold text-surface-400">Feature Delivery Engine</span>
        </div>
        <p class="text-sm text-surface-600">&copy; 2026 FDE. Built with AI, shipped with confidence.</p>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class LandingComponent {}
