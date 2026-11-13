import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Monitor,
  Palette,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { MODULE_3_TERMS, STARTER_CSS } from '../../data/workshopData';
import { buildLivePreviewDoc } from '../../utils/htmlHelpers';

interface Module3CssBasicsProps {
  htmlCode: string;
  cssCode: string;
  onChangeCss: (css: string) => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

const CSS_BLOCKS: { id: string; label: string; snippet: string }[] = [
  {
    id: 'body',
    label: '1. body (font & background)',
    snippet: `body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  color: #111111;\n  background-color: #E8ECEE;\n  line-height: 1.6;\n}`,
  },
  {
    id: 'header',
    label: '2. header (dark slate band)',
    snippet: `header {\n  background-color: #37474F;\n  color: #ffffff;\n  text-align: center;\n  padding: 40px 20px;\n}`,
  },
  {
    id: 'main',
    label: '3. main (centred container)',
    snippet: `main {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}`,
  },
  {
    id: 'section',
    label: '4. section (white cards)',
    snippet: `section {\n  background-color: #ffffff;\n  padding: 20px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n}`,
  },
  {
    id: 'h2',
    label: '5. h2 (amber underline)',
    snippet: `h2 {\n  color: #37474F;\n  border-bottom: 3px solid #F9A91E;\n  padding-bottom: 6px;\n}`,
  },
  {
    id: 'footer',
    label: '6. footer (centred text)',
    snippet: `footer {\n  text-align: center;\n  padding: 20px;\n}`,
  },
];

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export function Module3CssBasics({
  htmlCode,
  cssCode,
  onChangeCss,
  onCompleteModule,
  isCompleted,
  onNextModule,
}: Module3CssBasicsProps) {
  const [headerBg, setHeaderBg] = useState('#37474F');
  const [accentColor, setAccentColor] = useState('#F9A91E');
  const [sectionPadding, setSectionPadding] = useState(20);
  const [sectionMargin, setSectionMargin] = useState(20);
  const [borderRadius, setBorderRadius] = useState(8);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [enabledBlocks, setEnabledBlocks] = useState<string[]>([
    'body',
    'header',
    'main',
    'section',
    'h2',
    'footer',
  ]);

  const applyCustomStyleParameters = (
    nextHeader = headerBg,
    nextAccent = accentColor,
    nextPad = sectionPadding,
    nextMargin = sectionMargin,
    nextRadius = borderRadius,
    blocks = enabledBlocks
  ) => {
    const generated = CSS_BLOCKS.filter((b) => blocks.includes(b.id))
      .map((b) => {
        if (b.id === 'header') {
          return `header {\n  background-color: ${nextHeader};\n  color: #ffffff;\n  text-align: center;\n  padding: 40px 20px;\n}`;
        }
        if (b.id === 'section') {
          return `section {\n  background-color: #ffffff;\n  padding: ${nextPad}px;\n  margin-bottom: ${nextMargin}px;\n  border-radius: ${nextRadius}px;\n}`;
        }
        if (b.id === 'h2') {
          return `h2 {\n  color: ${nextHeader};\n  border-bottom: 3px solid ${nextAccent};\n  padding-bottom: 6px;\n}`;
        }
        return b.snippet;
      })
      .join('\n\n');

    onChangeCss(generated);
  };

  const toggleBlock = (id: string) => {
    const next = enabledBlocks.includes(id)
      ? enabledBlocks.filter((item) => item !== id)
      : [...enabledBlocks, id];
    setEnabledBlocks(next);
    applyCustomStyleParameters(headerBg, accentColor, sectionPadding, sectionMargin, borderRadius, next);
  };

  const cssDiagnostics = useMemo(() => {
    const issues: string[] = [];
    if (/\bcolour\b/i.test(cssCode)) {
      issues.push('Found British spelling "colour". CSS requires American spelling: "color".');
    }
    if (/\bcentre\b/i.test(cssCode)) {
      issues.push('Found British spelling "centre". CSS requires American spelling: "center".');
    }
    const openBraces = (cssCode.match(/\{/g) || []).length;
    const closeBraces = (cssCode.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push(
        `Unmatched curly braces: ${openBraces} opening { vs ${closeBraces} closing }. Rules after an unclosed brace stop working.`
      );
    }
    return issues;
  }, [cssCode]);

  const previewDoc = buildLivePreviewDoc(htmlCode, cssCode, true);

  return (
    <div className="space-y-8">
      {/* CSS Rule Dissector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Anatomy of a CSS Rule
            </h3>
            <p className="text-sm text-slate-600">
              Every CSS rule has three parts: a <strong>selector</strong>, a{' '}
              <strong>property</strong>, and a <strong>value</strong>.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600">
            Connected via &lt;link rel="stylesheet" href="style.css"&gt;
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
            <p className="text-xs text-amber-400 font-medium">1. Selector (Which element)</p>
            <p className="font-mono text-xl font-bold">h1</p>
            <p className="text-xs text-slate-300">Targets every &lt;h1&gt; tag in index.html</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
            <p className="text-xs text-amber-400 font-medium">2. Property (What to change)</p>
            <p className="font-mono text-xl font-bold">color</p>
            <p className="text-xs text-slate-300">Note: American spelling (color, center)</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
            <p className="text-xs text-amber-400 font-medium">3. Value (How to change it)</p>
            <p className="font-mono text-xl font-bold">#37474F</p>
            <p className="text-xs text-slate-300">Hex colour code ending with a semicolon ;</p>
          </div>
        </div>
      </div>

      {/* Interactive CSS Builder & Live Responsive Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Hands-On Exercise 3: Style Your Page Live
            </h3>
            <p className="text-sm text-slate-600">
              Toggle each CSS block or adjust colours, padding, and margin sliders to watch the
              layout update in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setHeaderBg('#37474F');
              setAccentColor('#F9A91E');
              setSectionPadding(20);
              setSectionMargin(20);
              setBorderRadius(8);
              setEnabledBlocks(['body', 'header', 'main', 'section', 'h2', 'footer']);
              onChangeCss(STARTER_CSS);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Reset to Starter CSS
          </button>
        </div>

        {/* Progressive CSS Rule Toggles */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700">
            Step-by-step Rule Blocks (toggle to see each rule&apos;s effect):
          </p>
          <div className="flex flex-wrap gap-2">
            {CSS_BLOCKS.map((block) => {
              const active = enabledBlocks.includes(block.id);
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => toggleBlock(block.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  {block.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Controls Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <label className="space-y-1.5 block">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-slate-500" />
              Header &amp; Heading Hex
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={headerBg}
                onChange={(e) => {
                  setHeaderBg(e.target.value);
                  applyCustomStyleParameters(e.target.value, accentColor, sectionPadding, sectionMargin, borderRadius);
                }}
                className="w-9 h-9 rounded cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-xs text-slate-800">{headerBg.toUpperCase()}</span>
            </div>
          </label>

          <label className="space-y-1.5 block">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              Accent Underline Hex
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => {
                  setAccentColor(e.target.value);
                  applyCustomStyleParameters(headerBg, e.target.value, sectionPadding, sectionMargin, borderRadius);
                }}
                className="w-9 h-9 rounded cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-xs text-slate-800">{accentColor.toUpperCase()}</span>
            </div>
          </label>

          <label className="space-y-1.5 block">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Card Padding (inside)</span>
              <span className="font-mono tabular-nums text-amber-700">{sectionPadding}px</span>
            </div>
            <input
              type="range"
              min={8}
              max={40}
              step={2}
              value={sectionPadding}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSectionPadding(val);
                applyCustomStyleParameters(headerBg, accentColor, val, sectionMargin, borderRadius);
              }}
              className="w-full accent-amber-600"
            />
          </label>

          <label className="space-y-1.5 block">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Card Margin (outside)</span>
              <span className="font-mono tabular-nums text-sky-700">{sectionMargin}px</span>
            </div>
            <input
              type="range"
              min={4}
              max={44}
              step={2}
              value={sectionMargin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSectionMargin(val);
                applyCustomStyleParameters(headerBg, accentColor, sectionPadding, val, borderRadius);
              }}
              className="w-full accent-sky-600"
            />
          </label>

          <label className="space-y-1.5 block">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Corner Radius</span>
              <span className="font-mono tabular-nums text-slate-900">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={2}
              value={borderRadius}
              onChange={(e) => {
                const val = Number(e.target.value);
                setBorderRadius(val);
                applyCustomStyleParameters(headerBg, accentColor, sectionPadding, sectionMargin, val);
              }}
              className="w-full accent-slate-800"
            />
          </label>
        </div>

        {/* Visual Margin vs Padding Box Model Indicator */}
        <div className="p-4 rounded-xl border border-slate-200 bg-sky-50/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">
              Box Model Visualizer: Margin vs Padding
            </p>
            <p className="text-xs text-slate-600">
              <strong>Margin ({sectionMargin}px)</strong> pushes cards apart outside the border.{' '}
              <strong>Padding ({sectionPadding}px)</strong> adds breathing room inside the card
              around your text.
            </p>
          </div>
          <div
            className="shrink-0 rounded-lg bg-sky-100 border border-dashed border-sky-400 transition-all"
            style={{ padding: `${Math.min(sectionMargin / 2, 16)}px` }}
          >
            <div
              className="rounded bg-white border border-slate-300 text-xs font-mono text-slate-800 transition-all"
              style={{ padding: `${Math.min(sectionPadding / 2, 18)}px` }}
            >
              Section Content
            </div>
          </div>
        </div>

        {/* Diagnostics if common mistakes detected */}
        {cssDiagnostics.length > 0 && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
            {cssDiagnostics.map((msg) => (
              <p key={msg} className="text-sm text-red-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span>{msg}</span>
              </p>
            ))}
          </div>
        )}

        {/* Code Editor + Responsive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-200 rounded-t-xl border-b border-slate-800">
              <span className="font-mono text-xs font-medium">style.css</span>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {cssCode.split('\n').length} lines
              </span>
            </div>
            <textarea
              value={cssCode}
              onChange={(e) => onChangeCss(e.target.value)}
              spellCheck={false}
              aria-label="style.css code editor"
              className="flex-1 min-h-[380px] w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-slate-100 rounded-b-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border border-b-0 border-slate-300 rounded-t-xl">
              <span className="text-xs font-semibold text-slate-700">
                Responsive Browser Preview
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewport === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Mobile
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('tablet')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewport === 'tablet' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  Tablet
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewport === 'desktop' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Desktop
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-[380px] bg-slate-200/70 border border-slate-300 rounded-b-xl p-3 flex justify-center overflow-x-auto">
              <iframe
                title="CSS Responsive Preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts"
                style={{
                  width:
                    viewport === 'mobile' ? '360px' : viewport === 'tablet' ? '640px' : '100%',
                }}
                className="h-full min-h-[355px] bg-white rounded-lg shadow-sm border border-slate-300 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Terms */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-slate-900">Module 3 Key Terms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE_3_TERMS.map((item) => (
            <div key={item.term} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-mono text-sm font-semibold text-slate-900">{item.term}</p>
              <p className="text-sm text-slate-600">{item.meaning}</p>
            </div>
          ))}
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
          {isCompleted ? 'Module 3 Completed' : 'Mark Module 3 Complete'}
        </button>

        <button
          type="button"
          onClick={onNextModule}
          className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Continue to Module 4: AI-Powered Web Dev →
        </button>
      </div>
    </div>
  );
}
