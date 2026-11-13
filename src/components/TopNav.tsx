import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ActiveSection, ModuleId } from '../types/workshop';

interface TopNavProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  activeModule: ModuleId;
  completedCount: number;
  onStartModules: () => void;
}

const NAV_ITEMS: { id: ActiveSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'modules', label: 'Modules' },
  { id: 'codelab', label: 'Code Lab' },
  { id: 'miniproject', label: 'Mini Project' },
  { id: 'assessment', label: 'Assessment' },
];

export function TopNav({
  activeSection,
  onNavigate,
  activeModule,
  completedCount,
  onStartModules,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: ActiveSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const ctaLabel =
    completedCount === 0
      ? 'Start Module 1'
      : completedCount === 6
      ? 'Open Code Lab'
      : `Resume Module ${activeModule}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Elysium Academy brand logo linked to https://elysiumacademy.org */}
        <a
          href="https://elysiumacademy.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Elysium Academy official website"
          className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
        >
          <img
            src="/assets/aistudio/ElysiumAcadmemy_a81d78c3.png"
            alt="Elysium Academy — Milestone of Cognizance"
            referrerPolicy="no-referrer"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded ${
                  isActive
                    ? 'text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={completedCount === 6 ? () => handleSelect('codelab') : onStartModules}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (completedCount === 6) {
                  handleSelect('codelab');
                } else {
                  onStartModules();
                }
              }}
              className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
