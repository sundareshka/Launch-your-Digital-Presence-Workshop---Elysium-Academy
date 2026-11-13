import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { PROMPT_SHEET } from '../../data/workshopData';
import { PersonalDetails } from '../../types/workshop';

interface Module4AiStudioProps {
  htmlCode: string;
  cssCode: string;
  details: PersonalDetails;
  onChangeHtml: (html: string) => void;
  onChangeCss: (css: string) => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export function Module4AiStudio({
  htmlCode,
  cssCode,
  details,
  onChangeHtml,
  onChangeCss,
  onCompleteModule,
  isCompleted,
  onNextModule,
}: Module4AiStudioProps) {
  const [selectedPromptId, setSelectedPromptId] = useState<number>(1);
  const [fieldInterest, setFieldInterest] = useState('Web Design & AI Tools');
  const [simulatedOpen, setSimulatedOpen] = useState(false);
  const [reviewedCode, setReviewedCode] = useState(false);
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Interactive Privacy & Best-Practice Quiz inside Module 4
  const [privacyChoice, setPrivacyChoice] = useState<'safe' | 'unsafe' | null>(null);

  const activePrompt =
    PROMPT_SHEET.find((p) => p.id === selectedPromptId) ?? PROMPT_SHEET[0];

  const personalizedPromptText = activePrompt.prompt
    .replace('[your field]', details.role)
    .replace('[your course]', details.degree)
    .replace('[your city]', details.city)
    .replace('[your interest]', fieldInterest);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(personalizedPromptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1800);
    } catch {
      setCopiedPrompt(false);
    }
  };

  const handleApplySuggestion = () => {
    if (!reviewedCode) return;

    let updatedHtml = htmlCode;
    let updatedCss = cssCode;
    let summary = '';

    if (activePrompt.id === 1 && activePrompt.generatedHtml && activePrompt.generatedCss) {
      // Insert Projects section right above Contact section if not already present
      if (!/<h2>\s*Projects\s*<\/h2>/i.test(updatedHtml)) {
        const contactIdx = updatedHtml.search(/<section>\s*<h2>\s*Contact\s*<\/h2>/i);
        if (contactIdx !== -1) {
          updatedHtml =
            updatedHtml.slice(0, contactIdx) +
            activePrompt.generatedHtml +
            '\n\n' +
            updatedHtml.slice(contactIdx);
        } else if (/<\/main>/i.test(updatedHtml)) {
          updatedHtml = updatedHtml.replace(
            /<\/main>/i,
            `${activePrompt.generatedHtml}\n  </main>`
          );
        }
        onChangeHtml(updatedHtml);
      }

      if (!updatedCss.includes('.projects-grid')) {
        updatedCss = `${updatedCss.trim()}\n\n${activePrompt.generatedCss}`;
        onChangeCss(updatedCss);
      }
      summary = 'Added the new Projects section above Contact in index.html and appended .projects-grid styles to style.css.';
    } else if (activePrompt.id === 4 && activePrompt.generatedCss) {
      updatedCss = `${updatedCss.trim()}\n\n/* AI Suggested Palette */\n${activePrompt.generatedCss}`;
      onChangeCss(updatedCss);
      summary = 'Appended the accessible 3-hex colour scheme to style.css.';
    } else if (activePrompt.id === 5) {
      const bioText = `I am a ${details.degree} student from ${details.city} passionate about ${fieldInterest}, building clean, accessible digital projects that solve everyday local challenges.`;
      updatedHtml = updatedHtml.replace(
        /(<h2>\s*About Me\s*<\/h2>\s*<p>)[\s\S]*?(<\/p>)/i,
        `$1${bioText}$2`
      );
      onChangeHtml(updatedHtml);
      summary = 'Updated the About Me paragraph in index.html with the 25-word bio.';
    }

    setAppliedMessage(summary || 'Prompt simulation verified.');
  };

  return (
    <div className="space-y-8">
      {/* Prompt Formula Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            The 4-Part Prompt Formula
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            AI assistants work best when you give clear instructions instead of vague one-line
            requests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs font-mono font-semibold text-amber-700">01. Role</p>
            <p className="text-sm font-semibold text-slate-900">Who the AI acts as</p>
            <p className="text-xs text-slate-600">{activePrompt.role}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs font-mono font-semibold text-amber-700">02. Task</p>
            <p className="text-sm font-semibold text-slate-900">What you want built</p>
            <p className="text-xs text-slate-600">{activePrompt.task}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs font-mono font-semibold text-amber-700">03. Context</p>
            <p className="text-sm font-semibold text-slate-900">Your existing code &amp; goal</p>
            <p className="text-xs text-slate-600">{activePrompt.context}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs font-mono font-semibold text-amber-700">04. Format</p>
            <p className="text-sm font-semibold text-slate-900">Exact output shape</p>
            <p className="text-xs text-slate-600">{activePrompt.format}</p>
          </div>
        </div>
      </div>

      {/* Interactive Prompt Sheet & Verification Simulator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Hands-On Exercise 4: Workshop Prompt Sheet &amp; Verification Lab
            </h3>
            <p className="text-sm text-slate-600">
              Choose one of the 5 workshop prompts, inspect the generated output, verify it, and
              apply only the new section to your site.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Prompt Sheet Selector */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold text-slate-500">Select Prompt (1–5)</p>
            <div className="space-y-2">
              {PROMPT_SHEET.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedPromptId(item.id);
                    setSimulatedOpen(false);
                    setReviewedCode(false);
                    setAppliedMessage(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                    selectedPromptId === item.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-amber-400">
                      Prompt 0{item.id}
                    </span>
                    {item.id === 1 && (
                      <span
                        className={`text-[11px] font-medium ${
                          selectedPromptId === item.id ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        Live Demo Exercise
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold mt-1">{item.title}</p>
                </button>
              ))}
            </div>

            {selectedPromptId === 5 && (
              <label className="block pt-2 space-y-1">
                <span className="text-xs font-medium text-slate-600">Customize [your interest]</span>
                <input
                  type="text"
                  value={fieldInterest}
                  onChange={(e) => setFieldInterest(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
            )}
          </div>

          {/* Right: Prompt Preview + Simulated AI Inspection Gate */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-700">
                  Ready-to-Use Prompt #{activePrompt.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm font-mono text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                {personalizedPromptText}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSimulatedOpen(true);
                  setReviewedCode(false);
                  setAppliedMessage(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Simulate AI Output &amp; Inspect
              </button>
            </div>

            {simulatedOpen && (
              <div className="p-5 rounded-xl bg-white border border-slate-300 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-amber-700">
                    Step 1 — Read &amp; Understand the Explanation (Do not paste prose into code!)
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activePrompt.explanationText}
                  </p>
                </div>

                {activePrompt.generatedHtml && (
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-semibold text-slate-700">
                      HTML Code Block Only:
                    </p>
                    <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                      <code>{activePrompt.generatedHtml}</code>
                    </pre>
                  </div>
                )}

                {activePrompt.generatedCss && (
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-semibold text-slate-700">
                      CSS Code Block Only:
                    </p>
                    <pre className="p-3 rounded-lg bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                      <code>{activePrompt.generatedCss}</code>
                    </pre>
                  </div>
                )}

                {(activePrompt.id === 1 || activePrompt.id === 4 || activePrompt.id === 5) && (
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reviewedCode}
                        onChange={(e) => setReviewedCode(e.target.checked)}
                        className="mt-1 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-xs text-slate-700">
                        <strong>Verification Gate:</strong> I read the code block above, verified
                        it contains no private information, and understand where it goes in my page.
                      </span>
                    </label>

                    <button
                      type="button"
                      disabled={!reviewedCode}
                      onClick={handleApplySuggestion}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        reviewedCode
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Apply New Code to My Website
                    </button>

                    {appliedMessage && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{appliedMessage}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy & Mistake Check */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <h3 className="font-display text-lg font-bold text-slate-900">
            AI Safety &amp; Privacy Check
          </h3>
        </div>
        <p className="text-sm text-slate-600">
          Which of these actions is safe when using an AI chat assistant for web development?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPrivacyChoice('unsafe')}
            className={`text-left p-4 rounded-xl border text-sm transition-colors ${
              privacyChoice === 'unsafe'
                ? 'bg-red-50 border-red-300 text-red-950'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <p className="font-semibold">
              Option A: Paste my GitHub password and Aadhaar details so AI can personalize my footer
            </p>
            {privacyChoice === 'unsafe' && (
              <p className="text-xs text-red-800 mt-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Unsafe! Never paste passwords, Aadhaar numbers, or confidential office data into AI
                tools.
              </p>
            )}
          </button>

          <button
            type="button"
            onClick={() => setPrivacyChoice('safe')}
            className={`text-left p-4 rounded-xl border text-sm transition-colors ${
              privacyChoice === 'safe'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <p className="font-semibold">
              Option B: Ask for &quot;only the new section&quot;, copy only the code block, and test
              in the browser
            </p>
            {privacyChoice === 'safe' && (
              <p className="text-xs text-emerald-800 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Correct! Keep your existing content safe and always test before keeping AI code.
              </p>
            )}
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onCompleteModule}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
            isCompleted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Module 4 Completed' : 'Mark Module 4 Complete'}
        </button>

        <button
          type="button"
          onClick={onNextModule}
          className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Continue to Module 5: GitHub Pages →
        </button>
      </div>
    </div>
  );
}
