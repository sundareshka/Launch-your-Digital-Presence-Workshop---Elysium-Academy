import { useState } from 'react';
import { BookOpen, Check } from 'lucide-react';
import { MODULE_SUMMARIES } from '../data/workshopData';
import { ActiveSection, ModuleId, PersonalDetails } from '../types/workshop';
import { Module1WebSetup } from './modules/Module1WebSetup';
import { Module2HtmlBasics } from './modules/Module2HtmlBasics';
import { Module3CssBasics } from './modules/Module3CssBasics';
import { Module4AiStudio } from './modules/Module4AiStudio';
import { Module5GithubPages } from './modules/Module5GithubPages';
import { Module6SeoLab } from './modules/Module6SeoLab';

interface ModulesWorkspaceProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  completedModules: ModuleId[];
  onToggleComplete: (id: ModuleId) => void;
  htmlCode: string;
  cssCode: string;
  onChangeHtml: (html: string) => void;
  onChangeCss: (css: string) => void;
  details: PersonalDetails;
  onUpdateDetails: (details: PersonalDetails) => void;
  onNavigate: (section: ActiveSection) => void;
}

export function ModulesWorkspace({
  activeModule,
  onSelectModule,
  completedModules,
  onToggleComplete,
  htmlCode,
  cssCode,
  onChangeHtml,
  onChangeCss,
  details,
  onUpdateDetails,
  onNavigate,
}: ModulesWorkspaceProps) {
  const [showTrainerNotes, setShowTrainerNotes] = useState(false);

  const currentMeta =
    MODULE_SUMMARIES.find((m) => m.id === activeModule) ?? MODULE_SUMMARIES[0];

  return (
    <div className="space-y-6">
      {/* Module Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Curriculum Modules</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {completedModules.length} / 6 completed
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTrainerNotes((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              showTrainerNotes
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showTrainerNotes ? 'Hide Trainer Notes' : 'Trainer Guide Notes'}
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Workshop Modules"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {MODULE_SUMMARIES.map((mod) => {
            const isSelected = activeModule === mod.id;
            const isDone = completedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectModule(mod.id)}
                className={`text-left p-3 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-1 text-xs">
                  <span
                    className={`font-mono font-semibold ${
                      isSelected ? 'text-amber-400' : 'text-amber-700'
                    }`}
                  >
                    M{mod.id}
                  </span>
                  {isDone ? (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    />
                  ) : (
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {mod.duration}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-semibold leading-snug line-clamp-2">
                  {mod.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Module Header */}
        <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">
              Module {currentMeta.id} · {currentMeta.duration} · {currentMeta.type}
            </p>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {currentMeta.title}
            </h2>
            <p className="text-sm text-slate-600">{currentMeta.summary}</p>
          </div>
        </div>

        {showTrainerNotes && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-semibold">Section 10 Trainer Guide Note (Ms Malar):</p>
            <p>{currentMeta.trainerNote}</p>
          </div>
        )}
      </div>

      {/* Active Module Interactive Stage */}
      {activeModule === 1 && (
        <Module1WebSetup
          isCompleted={completedModules.includes(1)}
          onCompleteModule={() => onToggleComplete(1)}
          onNextModule={() => onSelectModule(2)}
        />
      )}
      {activeModule === 2 && (
        <Module2HtmlBasics
          htmlCode={htmlCode}
          onChangeHtml={onChangeHtml}
          details={details}
          onUpdateDetails={onUpdateDetails}
          isCompleted={completedModules.includes(2)}
          onCompleteModule={() => onToggleComplete(2)}
          onNextModule={() => onSelectModule(3)}
        />
      )}
      {activeModule === 3 && (
        <Module3CssBasics
          htmlCode={htmlCode}
          cssCode={cssCode}
          onChangeCss={onChangeCss}
          isCompleted={completedModules.includes(3)}
          onCompleteModule={() => onToggleComplete(3)}
          onNextModule={() => onSelectModule(4)}
        />
      )}
      {activeModule === 4 && (
        <Module4AiStudio
          htmlCode={htmlCode}
          cssCode={cssCode}
          details={details}
          onChangeHtml={onChangeHtml}
          onChangeCss={onChangeCss}
          isCompleted={completedModules.includes(4)}
          onCompleteModule={() => onToggleComplete(4)}
          onNextModule={() => onSelectModule(5)}
        />
      )}
      {activeModule === 5 && (
        <Module5GithubPages
          htmlCode={htmlCode}
          cssCode={cssCode}
          details={details}
          onUpdateDetails={onUpdateDetails}
          isCompleted={completedModules.includes(5)}
          onCompleteModule={() => onToggleComplete(5)}
          onNextModule={() => onSelectModule(6)}
        />
      )}
      {activeModule === 6 && (
        <Module6SeoLab
          htmlCode={htmlCode}
          onChangeHtml={onChangeHtml}
          details={details}
          isCompleted={completedModules.includes(6)}
          onCompleteModule={() => onToggleComplete(6)}
          onGoToMiniProject={() => onNavigate('miniproject')}
        />
      )}
    </div>
  );
}
