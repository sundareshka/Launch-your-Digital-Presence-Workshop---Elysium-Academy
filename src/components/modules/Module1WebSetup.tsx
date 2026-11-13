import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  FolderPlus,
  Globe,
  Layers,
  Play,
  RotateCcw,
  Server,
} from 'lucide-react';
import { MODULE_1_TERMS } from '../../data/workshopData';

interface Module1WebSetupProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

type HouseLayer = 'html' | 'css' | 'js';

const HOUSE_LAYERS: Record<
  HouseLayer,
  { title: string; metaphor: string; description: string; sample: string }
> = {
  html: {
    title: 'HTML — Structure & Content',
    metaphor: 'Walls, doors & rooms of a house',
    description:
      'HTML (HyperText Markup Language) defines every heading, paragraph, list, image, and link on the page.',
    sample: '<h1>Hi, I am Ananya</h1>\n<p>Aspiring Web Developer, Madurai</p>',
  },
  css: {
    title: 'CSS — Look & Styling',
    metaphor: 'Paint, lighting & interiors',
    description:
      'CSS (Cascading Style Sheets) controls colours, fonts, spacing, alignment, and how the page adapts to phone screens.',
    sample: 'header {\n  background-color: #37474F;\n  color: #ffffff;\n}',
  },
  js: {
    title: 'JavaScript — Behaviour',
    metaphor: 'Electrical switches & moving doors',
    description:
      'JavaScript adds interactive actions like menus, form validation, and sliders. (Covered in next-step learning after HTML & CSS.)',
    sample: 'button.addEventListener("click", () => {\n  alert("Welcome!");\n});',
  },
};

export function Module1WebSetup({
  onCompleteModule,
  isCompleted,
  onNextModule,
}: Module1WebSetupProps) {
  const [urlInput, setUrlInput] = useState('https://www.elysiumacademy.org');
  const [simStep, setSimStep] = useState<0 | 1 | 2 | 3>(0);
  const [activeLayer, setActiveLayer] = useState<HouseLayer>('html');

  // Exercise 1: Virtual Project Folder Builder
  const [folderCreated, setFolderCreated] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [fileInput, setFileInput] = useState('');
  const [fileFeedback, setFileFeedback] = useState<{
    status: 'ok' | 'error' | 'info';
    message: string;
  } | null>(null);

  const runRequestSimulation = () => {
    setSimStep(1);
    setTimeout(() => setSimStep(2), 450);
    setTimeout(() => setSimStep(3), 950);
  };

  const handleAddFile = (candidateName?: string) => {
    const raw = (candidateName ?? fileInput).trim();
    if (!folderCreated) {
      setFileFeedback({
        status: 'error',
        message: 'Create the "my-website" folder first before adding files inside it.',
      });
      return;
    }
    if (!raw) {
      setFileFeedback({
        status: 'error',
        message: 'Enter a file name such as index.html or style.css.',
      });
      return;
    }

    // Check common mistakes from Page 10 & 11
    if (raw.endsWith('.txt')) {
      setFileFeedback({
        status: 'error',
        message: `Mistake detected (${raw}): File saved as .txt! In Notepad, choose "Save as type: All Files" and end with .html or .css.`,
      });
      return;
    }
    if (/[A-Z]/.test(raw) || raw.includes(' ')) {
      setFileFeedback({
        status: 'error',
        message: `Mistake detected (${raw}): Avoid capital letters or spaces. Use lowercase only, such as index.html and style.css.`,
      });
      return;
    }
    if (raw !== 'index.html' && raw !== 'style.css') {
      setFileFeedback({
        status: 'error',
        message: `Expected "index.html" or "style.css" for this workshop. Servers look for index.html by default.`,
      });
      return;
    }
    if (files.includes(raw)) {
      setFileFeedback({
        status: 'info',
        message: `${raw} is already inside your my-website folder.`,
      });
      return;
    }

    const updated = [...files, raw];
    setFiles(updated);
    setFileInput('');
    if (updated.includes('index.html') && updated.includes('style.css')) {
      setFileFeedback({
        status: 'ok',
        message:
          'Setup complete! Both index.html and style.css sit together inside my-website. Ready for Module 2.',
      });
    } else {
      setFileFeedback({
        status: 'ok',
        message: `Created ${raw} inside my-website. Now create ${
          raw === 'index.html' ? 'style.css' : 'index.html'
        }.`,
      });
    }
  };

  const setupComplete = folderCreated && files.includes('index.html') && files.includes('style.css');

  return (
    <div className="space-y-8">
      {/* Two-zone Interactive Stage: Left/Top Browser-Server Simulator + Right/Bottom House Metaphor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Browser <-> Server Flow */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Simulation: How a Browser Loads a Website
              </h3>
              <p className="text-sm text-slate-600">
                Type or select a web address and trace how files travel from a server to your screen.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              aria-label="Website URL"
              className="flex-1 px-3.5 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={runRequestSimulation}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4" />
              Send Request
            </button>
            <button
              type="button"
              onClick={() => setSimStep(0)}
              aria-label="Reset simulation"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 py-1">Try presets:</span>
            {[
              'https://www.elysiumacademy.org',
              'https://ananya-dev.github.io/my-website/',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setUrlInput(preset);
                  setSimStep(0);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 font-mono text-slate-700 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Visual Request/Response Diagram */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-3 items-center gap-3 text-center">
              <div
                className={`p-4 rounded-xl border transition-colors ${
                  simStep === 1 || simStep === 3
                    ? 'bg-white border-sky-500 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}
              >
                <Globe className="w-7 h-7 mx-auto text-sky-700" />
                <p className="mt-2 text-sm font-semibold text-slate-900">Your Browser</p>
                <p className="text-xs text-slate-500">Chrome or Edge</p>
              </div>

              <div className="space-y-2">
                <div
                  className={`text-xs font-mono px-2 py-1 rounded border transition-opacity ${
                    simStep >= 1
                      ? 'bg-amber-50 border-amber-300 text-amber-900 opacity-100'
                      : 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  1. Request URL →
                </div>
                <div
                  className={`text-xs font-mono px-2 py-1 rounded border transition-opacity ${
                    simStep >= 2
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-100'
                      : 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  ← 2. index.html + style.css
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-colors ${
                  simStep === 2
                    ? 'bg-white border-amber-500 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}
              >
                <Server className="w-7 h-7 mx-auto text-slate-700" />
                <p className="mt-2 text-sm font-semibold text-slate-900">Web Server</p>
                <p className="text-xs text-slate-500">Always-on computer</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-sm text-slate-700">
              {simStep === 0 && (
                <p className="text-slate-500">
                  Press <strong>Send Request</strong> to see how your browser fetches files from the
                  server for <span className="font-mono text-slate-700">{urlInput}</span>.
                </p>
              )}
              {simStep === 1 && (
                <p className="text-sky-800 font-medium">
                  Step 1/3: Browser looks up the address <span className="font-mono">{urlInput}</span>{' '}
                  and asks the server for the home page.
                </p>
              )}
              {simStep === 2 && (
                <p className="text-amber-800 font-medium">
                  Step 2/3: Server opens <span className="font-mono">index.html</span> by default and
                  sends it along with <span className="font-mono">style.css</span>.
                </p>
              )}
              {simStep === 3 && (
                <p className="text-emerald-800 font-medium">
                  Step 3/3: Browser reads the HTML structure, paints the CSS styles, and displays
                  the finished personal website on your screen.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* House Metaphor Interactive Inspector */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <h3 className="font-display text-lg font-bold text-slate-900">
                The Three Web Languages (House Analogy)
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Select a layer to inspect how websites separate structure, look, and behaviour.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['html', 'css', 'js'] as HouseLayer[]).map((layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => setActiveLayer(layer)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeLayer === layer
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {layer === 'html' ? 'HTML' : layer === 'css' ? 'CSS' : 'JavaScript'}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex-1">
            <div>
              <p className="text-xs font-medium text-amber-700">
                Analogy: {HOUSE_LAYERS[activeLayer].metaphor}
              </p>
              <h4 className="font-display text-base font-bold text-slate-900 mt-0.5">
                {HOUSE_LAYERS[activeLayer].title}
              </h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {HOUSE_LAYERS[activeLayer].description}
            </p>
            <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <code>{HOUSE_LAYERS[activeLayer].sample}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Hands-on Exercise 1: Interactive Project Folder Builder */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Hands-On Exercise 1: Set Up Your Project Folder
            </h3>
            <p className="text-sm text-slate-600">
              Practice creating the <span className="font-mono">my-website</span> folder and adding{' '}
              <span className="font-mono">index.html</span> and{' '}
              <span className="font-mono">style.css</span> without common file-naming errors.
            </p>
          </div>
          {setupComplete && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Folder Ready
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFolderCreated(true);
                  setFileFeedback({
                    status: 'info',
                    message: 'Folder "my-website" created on Desktop. Now create index.html and style.css.',
                  });
                }}
                disabled={folderCreated}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  folderCreated
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                {folderCreated ? '1. Folder my-website created' : '1. Create folder: my-website'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFolderCreated(false);
                  setFiles([]);
                  setFileInput('');
                  setFileFeedback(null);
                }}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset Folder
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={fileInput}
                onChange={(e) => setFileInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddFile();
                }}
                placeholder="Type file name (e.g., index.html)"
                className="flex-1 px-3.5 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => handleAddFile()}
                className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                2. Create File
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500">Test valid or mistake names:</span>
              {['index.html', 'style.css', 'index.html.txt', 'Index.HTML'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleAddFile(sample)}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 font-mono text-slate-700 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>

            {fileFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-sm flex items-start gap-2.5 ${
                  fileFeedback.status === 'error'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : fileFeedback.status === 'ok'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                {fileFeedback.status === 'error' ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                )}
                <span>{fileFeedback.message}</span>
              </div>
            )}
          </div>

          {/* Simulated VS Code Explorer Panel */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-2">
            <p className="text-slate-400 uppercase tracking-wider text-[11px]">
              VS Code Explorer Preview
            </p>
            <div className="border-t border-slate-800 pt-2 space-y-1.5">
              {!folderCreated ? (
                <p className="text-slate-500 italic">No folder opened yet (Desktop is empty)</p>
              ) : (
                <>
                  <div className="font-semibold text-amber-300">▾ MY-WEBSITE</div>
                  {files.length === 0 ? (
                    <p className="pl-4 text-slate-500 italic">Folder is empty — add files</p>
                  ) : (
                    files.map((f) => (
                      <div key={f} className="pl-4 flex items-center gap-2 text-slate-100">
                        <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>{f}</span>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Terms */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-slate-900">
          Module 1 Key Terms &amp; Real-World Context
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE_1_TERMS.map((item) => (
            <div key={item.term} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-mono text-sm font-semibold text-slate-900">{item.term}</p>
              <p className="text-sm text-slate-600">{item.meaning}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600 pt-2">
          <strong>Real-world example:</strong> A fresher applying for a web developer or digital
          marketing role in Chennai, Coimbatore, or Bengaluru is often asked for a portfolio link.
          Small shops, tuition centres, and freelancers in Madurai use the exact same one-page layout
          to share their services and phone number.
        </p>
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
          {isCompleted ? 'Module 1 Completed' : 'Mark Module 1 Complete'}
        </button>

        <button
          type="button"
          onClick={onNextModule}
          className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Continue to Module 2: HTML Basics →
        </button>
      </div>
    </div>
  );
}
