import { ArrowRight, Check, CheckSquare, Clock, Compass, Square } from 'lucide-react';
import {
  MODULE_SUMMARIES,
  OBJECTIVE_COVERAGE,
  PRE_SESSION_CHECKLIST,
  SESSION_AGENDA,
  WORKSHOP_DETAILS,
} from '../data/workshopData';
import { ActiveSection, ModuleId } from '../types/workshop';

interface OverviewSectionProps {
  completedModules: ModuleId[];
  checklistState: boolean[];
  onToggleChecklist: (index: number) => void;
  onOpenModule: (moduleId: ModuleId) => void;
  onNavigate: (section: ActiveSection) => void;
}

export function OverviewSection({
  completedModules,
  checklistState,
  onToggleChecklist,
  onOpenModule,
  onNavigate,
}: OverviewSectionProps) {
  const readyCount = checklistState.filter(Boolean).length;

  return (
    <div className="space-y-12">
      {/* Hero Banner — 2-column balanced layout with 4-metric strip below */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-slate-500 tracking-wide">
                Elysium Academy · Milestone of Cognizance · 90-Minute Hands-On Workshop
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] text-balance">
                Build, Style, Enhance with AI, and Publish Your First Website
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                A personal website works like your 24-hour digital visiting card and portfolio. Write
                clean HTML and CSS from scratch, refine it using guided AI prompts, deploy live with
                GitHub Pages, and apply four essential on-page SEO checks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenModule(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Start Interactive Modules
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('codelab')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Open Live HTML &amp; CSS Lab
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Workshop Architecture Map */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-1 pb-4 border-b border-slate-800">
              <p className="text-xs font-medium text-amber-400">Workshop Journey</p>
              <h2 className="font-display text-xl font-semibold text-white">
                Six Modules to a Live Portfolio
              </h2>
            </div>

            <ol className="space-y-3 my-5">
              {MODULE_SUMMARIES.map((mod) => {
                const isDone = completedModules.includes(mod.id);
                return (
                  <li key={mod.id}>
                    <button
                      type="button"
                      onClick={() => onOpenModule(mod.id)}
                      className="w-full text-left flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md text-xs font-mono font-semibold flex items-center justify-center shrink-0 tabular-nums ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : mod.id}
                        </span>
                        <span className="text-sm font-medium text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                          {mod.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 shrink-0 tabular-nums">
                        {mod.duration}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Progress: {completedModules.length} of 6 modules complete</span>
              <span className="font-mono tabular-nums text-amber-400">
                {Math.round((completedModules.length / 6) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* 4-column workshop facts strip */}
        <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500">Workshop Duration</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
              90 Minutes
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Sat, 14 Nov 2026 · 11:00 AM IST</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Practice Ratio</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
              70% Hands-On
            </p>
            <p className="mt-0.5 text-xs text-slate-500">30% concept · 70% live building</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Prerequisites</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900">Beginner</p>
            <p className="mt-0.5 text-xs text-slate-500">No coding experience needed</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Final Deliverable</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900">Live URL</p>
            <p className="mt-0.5 text-xs text-slate-500 font-mono truncate">
              username.github.io/my-website
            </p>
          </div>
        </div>
      </section>

      {/* Pre-Session Technical Checklist & Joining Details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Pre-Session Technical Checklist
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Verify your setup before diving into Module 1. Your progress saves automatically.
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {readyCount} / {PRE_SESSION_CHECKLIST.length}
              </span>
              <p className="text-xs text-slate-500">items ready</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {PRE_SESSION_CHECKLIST.map((item, idx) => {
              const checked = checklistState[idx] ?? false;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onToggleChecklist(idx)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      checked
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-slate-700">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </span>
                    <span className={`text-sm leading-snug ${checked ? 'line-through text-slate-500' : ''}`}>
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Workshop Details & Teams Joining Info */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Workshop &amp; Joining Details
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Organised by Elysium Academy · Trainer: Ms Malar
              </p>
            </div>

            <dl className="divide-y divide-slate-100 text-sm">
              {WORKSHOP_DETAILS.map((row) => (
                <div key={row.label} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <dt className="text-slate-500 font-medium">{row.label}</dt>
                  <dd className="text-slate-900 sm:text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-900 text-sm">Microsoft Teams Access</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Meeting ID</span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                469 409 911 286 970
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Passcode (case-sensitive)</span>
              <span className="font-mono font-medium text-slate-900">92qy7WN7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Join time</span>
              <span>Join by 10:50 AM · Starts 11:00 AM sharp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 90-Minute Session Agenda */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              90-Minute Session Agenda
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Click any module row below to jump directly into its interactive simulation and code lab.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Total Duration: 90 minutes</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-3 pr-4">Time (IST)</th>
                <th className="py-3 pr-4">Session</th>
                <th className="py-3 pr-4">Topic</th>
                <th className="py-3 pr-4">Activity Type</th>
                <th className="py-3 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SESSION_AGENDA.map((item) => {
                const isModule = Boolean(item.moduleId);
                return (
                  <tr
                    key={`${item.time}-${item.session}`}
                    className={isModule ? 'hover:bg-slate-50 transition-colors' : 'bg-slate-50/40'}
                  >
                    <td className="py-3 pr-4 font-mono text-xs text-slate-600 whitespace-nowrap tabular-nums">
                      {item.time}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                      {item.moduleId ? (
                        <button
                          type="button"
                          onClick={() => onOpenModule(item.moduleId!)}
                          className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                        >
                          {item.session}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        item.session
                      )}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{item.topic}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{item.activityType}</td>
                    <td className="py-3 text-right font-mono text-xs text-slate-600 whitespace-nowrap tabular-nums">
                      {item.duration}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Objective Coverage Map */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-600" />
          <h2 className="font-display text-xl font-bold text-slate-900">
            Learning Objectives &amp; Assessment Map
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBJECTIVE_COVERAGE.map((obj) => (
            <div
              key={obj.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <p className="text-xs font-mono font-semibold text-amber-700 tabular-nums">
                  Objective 0{obj.id}
                </p>
                <p className="text-sm font-medium text-slate-900 leading-snug">{obj.objective}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-between gap-2">
                <span>{obj.modules}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">{obj.assessedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
