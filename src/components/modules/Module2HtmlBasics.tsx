import { useState } from 'react';
import { AlertTriangle, Bug, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import {
  MODULE_2_TAGS,
  STARTER_HTML,
  buildPersonalizedHtml,
} from '../../data/workshopData';
import { PersonalDetails } from '../../types/workshop';
import { buildLivePreviewDoc } from '../../utils/htmlHelpers';

interface Module2HtmlBasicsProps {
  htmlCode: string;
  onChangeHtml: (html: string) => void;
  details: PersonalDetails;
  onUpdateDetails: (updated: PersonalDetails) => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

type MistakeDemo = 'none' | 'unclosed-h2' | 'missing-link';

export function Module2HtmlBasics({
  htmlCode,
  onChangeHtml,
  details,
  onUpdateDetails,
  onCompleteModule,
  isCompleted,
  onNextModule,
}: Module2HtmlBasicsProps) {
  const [activeTagIdx, setActiveTagIdx] = useState(0);
  const [mistakeDemo, setMistakeDemo] = useState<MistakeDemo>('none');
  const [showRawPlain, setShowRawPlain] = useState(true);

  const handleApplyPersonalDetails = () => {
    onChangeHtml(buildPersonalizedHtml(details));
  };

  const handleResetStarter = () => {
    onChangeHtml(STARTER_HTML);
  };

  const mistakeCode =
    mistakeDemo === 'unclosed-h2'
      ? `<!DOCTYPE html>
<html>
<body style="font-family: Arial; padding: 20px;">
  <section>
    <h2>About Me
    <p>I am a student learning HTML. Wait — why is this paragraph huge and bold like a heading?!</p>
    <p>Because the closing &lt;/h2&gt; tag was forgotten!</p>
  </section>
</body>
</html>`
      : mistakeDemo === 'missing-link'
      ? `<!DOCTYPE html>
<html>
<body style="font-family: Arial; padding: 20px;">
  <p>Contact: <a href="mailto:${details.email}">${details.email}</p>
  <p style="color:#b91c1c;">Notice the closing &lt;/a&gt; tag is missing, so the browser extends the link too far.</p>
</body>
</html>`
      : '';

  const previewHtml =
    mistakeDemo !== 'none'
      ? mistakeCode
      : buildLivePreviewDoc(htmlCode, '', !showRawPlain);

  const titleMatch = htmlCode.match(/<title>([\s\S]*?)<\/title>/i);
  const browserTabTitle = titleMatch ? titleMatch[1].trim() : 'My Website';

  return (
    <div className="space-y-8">
      {/* Personalization Quick-Fill + Starter Template Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Hands-On Exercise 2: Build Your Page Structure
            </h3>
            <p className="text-sm text-slate-600">
              Fill in your details to replace the square-bracket placeholders, or edit the HTML tags
              directly in the code pane.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleApplyPersonalDetails}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fill My Details into HTML
            </button>
            <button
              type="button"
              onClick={handleResetStarter}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Load Bracket Starter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-600">Your Name</span>
            <input
              type="text"
              value={details.name}
              onChange={(e) => onUpdateDetails({ ...details, name: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-600">Course or Job Title</span>
            <input
              type="text"
              value={details.role}
              onChange={(e) => onUpdateDetails({ ...details, role: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-600">City</span>
            <input
              type="text"
              value={details.city}
              onChange={(e) => onUpdateDetails({ ...details, city: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-600">Email</span>
            <input
              type="email"
              value={details.email}
              onChange={(e) => onUpdateDetails({ ...details, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </label>
        </div>

        {/* Two-Pane Code Editor & Live Browser Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-200 rounded-t-xl border-b border-slate-800">
              <span className="font-mono text-xs font-medium flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                index.html
              </span>
              <span className="text-[11px] text-slate-400">
                Tip: In VS Code type ! + Tab for skeleton
              </span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => {
                setMistakeDemo('none');
                onChangeHtml(e.target.value);
              }}
              spellCheck={false}
              aria-label="index.html code editor"
              className="flex-1 min-h-[380px] w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-slate-100 rounded-b-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border border-b-0 border-slate-300 rounded-t-xl">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-t text-xs font-medium text-slate-800 truncate max-w-[200px]">
                  {browserTabTitle}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setShowRawPlain(true)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    showRawPlain ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Plain HTML
                </button>
                <button
                  type="button"
                  onClick={() => setShowRawPlain(false)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    !showRawPlain ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  With CSS
                </button>
              </div>
            </div>
            <iframe
              title="HTML Live Browser Preview"
              srcDoc={previewHtml}
              sandbox="allow-scripts"
              className="flex-1 min-h-[380px] w-full bg-white border border-slate-300 rounded-b-xl"
            />
          </div>
        </div>
      </div>

      {/* Interactive "Spot the Mistake" Debugger + Tag Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spot the Mistake */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-red-600" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              Spot the Mistake Simulator
            </h3>
          </div>
          <p className="text-sm text-slate-600">
            See what happens in the browser preview above when a closing tag is forgotten.
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setMistakeDemo('unclosed-h2')}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-colors ${
                mistakeDemo === 'unclosed-h2'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <p className="font-semibold">Bug 1: Missing &lt;/h2&gt; closing tag</p>
              <p className="text-xs text-slate-600 mt-0.5 font-mono">&lt;h2&gt;About Me &lt;p&gt;...</p>
            </button>

            <button
              type="button"
              onClick={() => setMistakeDemo('missing-link')}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-colors ${
                mistakeDemo === 'missing-link'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <p className="font-semibold">Bug 2: Missing &lt;/a&gt; closing tag</p>
              <p className="text-xs text-slate-600 mt-0.5 font-mono">
                &lt;a href="mailto:..."&gt;Email&lt;/p&gt;
              </p>
            </button>

            {mistakeDemo !== 'none' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Why the preview looks broken:</p>
                  <p className="mt-0.5">
                    Most HTML tags come in pairs: an opening tag and a closing tag with a slash.
                    Click below to return to your clean HTML preview.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMistakeDemo('none')}
                    className="mt-2 font-semibold underline text-amber-950"
                  >
                    Fix &amp; return to my index.html
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tag Reference Explorer */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Essential HTML Tags Explorer
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {MODULE_2_TAGS.map((tag, idx) => (
              <button
                key={tag.term}
                type="button"
                onClick={() => setActiveTagIdx(idx)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTagIdx === idx
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tag.term}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <p className="font-mono text-sm font-bold text-slate-900">
              {MODULE_2_TAGS[activeTagIdx].term}
            </p>
            <p className="text-sm text-slate-700">{MODULE_2_TAGS[activeTagIdx].meaning}</p>
            {MODULE_2_TAGS[activeTagIdx].example && (
              <pre className="p-3 rounded-lg bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                <code>{MODULE_2_TAGS[activeTagIdx].example}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Module Footer Actions */}
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
          {isCompleted ? 'Module 2 Completed' : 'Mark Module 2 Complete'}
        </button>

        <button
          type="button"
          onClick={onNextModule}
          className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Continue to Module 3: CSS Basics →
        </button>
      </div>
    </div>
  );
}
