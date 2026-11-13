import { useEffect, useState } from 'react';
import { AssessmentAndResources } from './components/AssessmentAndResources';
import { CodeLabAndMiniProject } from './components/CodeLabAndMiniProject';
import { ModulesWorkspace } from './components/ModulesWorkspace';
import { OverviewSection } from './components/OverviewSection';
import { TopNav } from './components/TopNav';
import {
  DEFAULT_PERSONAL_DETAILS,
  PRE_SESSION_CHECKLIST,
  STARTER_CSS,
  buildPersonalizedHtml,
} from './data/workshopData';
import { ActiveSection, ModuleId, PersonalDetails } from './types/workshop';

const STORAGE_KEY = 'lydp_workshop_state_v1';

interface SavedState {
  activeSection: ActiveSection;
  activeModule: ModuleId;
  completedModules: ModuleId[];
  checklistState: boolean[];
  htmlCode: string;
  cssCode: string;
  details: PersonalDetails;
  quizAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  quizSubmitted: boolean;
}

function loadInitialState(): SavedState {
  const defaultState: SavedState = {
    activeSection: 'overview',
    activeModule: 1,
    completedModules: [],
    checklistState: PRE_SESSION_CHECKLIST.map(() => false),
    htmlCode: buildPersonalizedHtml(DEFAULT_PERSONAL_DETAILS),
    cssCode: STARTER_CSS,
    details: DEFAULT_PERSONAL_DETAILS,
    quizAnswers: {},
    quizSubmitted: false,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      ...defaultState,
      ...parsed,
      details: { ...DEFAULT_PERSONAL_DETAILS, ...(parsed.details || {}) },
    };
  } catch {
    return defaultState;
  }
}

export default function App() {
  const [initial] = useState<SavedState>(() => loadInitialState());

  const [activeSection, setActiveSection] = useState<ActiveSection>(initial.activeSection);
  const [activeModule, setActiveModule] = useState<ModuleId>(initial.activeModule);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>(initial.completedModules);
  const [checklistState, setChecklistState] = useState<boolean[]>(initial.checklistState);
  const [htmlCode, setHtmlCode] = useState<string>(initial.htmlCode);
  const [cssCode, setCssCode] = useState<string>(initial.cssCode);
  const [details, setDetails] = useState<PersonalDetails>(initial.details);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>(
    initial.quizAnswers
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(initial.quizSubmitted);

  useEffect(() => {
    try {
      const payload: SavedState = {
        activeSection,
        activeModule,
        completedModules,
        checklistState,
        htmlCode,
        cssCode,
        details,
        quizAnswers,
        quizSubmitted,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [
    activeSection,
    activeModule,
    completedModules,
    checklistState,
    htmlCode,
    cssCode,
    details,
    quizAnswers,
    quizSubmitted,
  ]);

  const navigateTo = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModule = (id: ModuleId) => {
    setActiveModule(id);
    setActiveSection('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModuleComplete = (id: ModuleId) => {
    setCompletedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleChecklist = (index: number) => {
    setChecklistState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopNav
        activeSection={activeSection}
        onNavigate={navigateTo}
        activeModule={activeModule}
        completedCount={completedModules.length}
        onStartModules={() => openModule(activeModule)}
      />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeSection === 'overview' && (
          <OverviewSection
            completedModules={completedModules}
            checklistState={checklistState}
            onToggleChecklist={toggleChecklist}
            onOpenModule={openModule}
            onNavigate={navigateTo}
          />
        )}

        {activeSection === 'modules' && (
          <ModulesWorkspace
            activeModule={activeModule}
            onSelectModule={(id) => {
              setActiveModule(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedModules={completedModules}
            onToggleComplete={toggleModuleComplete}
            htmlCode={htmlCode}
            cssCode={cssCode}
            onChangeHtml={setHtmlCode}
            onChangeCss={setCssCode}
            details={details}
            onUpdateDetails={setDetails}
            onNavigate={navigateTo}
          />
        )}

        {(activeSection === 'codelab' || activeSection === 'miniproject') && (
          <CodeLabAndMiniProject
            mode={activeSection}
            htmlCode={htmlCode}
            cssCode={cssCode}
            onChangeHtml={setHtmlCode}
            onChangeCss={setCssCode}
            details={details}
            onUpdateDetails={setDetails}
          />
        )}

        {activeSection === 'assessment' && (
          <AssessmentAndResources
            details={details}
            htmlCode={htmlCode}
            quizAnswers={quizAnswers}
            quizSubmitted={quizSubmitted}
            onSelectQuizAnswer={(qId, choice) =>
              setQuizAnswers((prev) => ({ ...prev, [qId]: choice }))
            }
            onSubmitQuiz={() => setQuizSubmitted(true)}
            onResetQuiz={() => {
              setQuizAnswers({});
              setQuizSubmitted(false);
            }}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 no-print">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="https://elysiumacademy.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Elysium Academy official website"
              className="inline-block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              <img
                src="/assets/aistudio/ElysiumAcadmemy_a81d78c3.png"
                alt="Elysium Academy — Milestone of Cognizance"
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain"
              />
            </a>
            <div className="space-y-0.5">
              <p className="font-display font-bold text-sm text-slate-900">
                Launch Your Digital Presence
              </p>
              <p>
                230, Church Road, Anna Nagar, Madurai 625 020, Tamil Nadu, India · Est. 1999
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
            <span>Workshop Helpline: 96777 81155 | 96777 24437</span>
            <span aria-hidden="true">·</span>
            <span>info@elysiumacademy.org</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://elysiumacademy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:text-amber-700 hover:underline"
            >
              elysiumacademy.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
