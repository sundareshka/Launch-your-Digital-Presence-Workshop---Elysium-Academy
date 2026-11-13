import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Lock,
  Upload,
} from 'lucide-react';
import { PersonalDetails } from '../../types/workshop';
import { buildLivePreviewDoc, downloadTextFile } from '../../utils/htmlHelpers';

interface Module5GithubPagesProps {
  htmlCode: string;
  cssCode: string;
  details: PersonalDetails;
  onUpdateDetails: (details: PersonalDetails) => void;
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

const GITHUB_TERMS = [
  { term: 'Repository (repo)', meaning: 'A project folder stored on GitHub' },
  { term: 'Commit', meaning: 'A saved set of changes with a short message' },
  { term: 'Branch', meaning: 'A line of work in a repository. The default branch is named main.' },
  { term: 'Public repository', meaning: 'A repository that anyone on the internet can view' },
  { term: 'GitHub Pages', meaning: 'Free hosting from GitHub for simple websites' },
  { term: 'Deploy', meaning: 'To put a website on a server so that others can open it' },
];

export function Module5GithubPages({
  htmlCode,
  cssCode,
  details,
  onUpdateDetails,
  onCompleteModule,
  isCompleted,
  onNextModule,
}: Module5GithubPagesProps) {
  const [repoName, setRepoName] = useState('my-website');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [repoCreated, setRepoCreated] = useState(false);

  const [filesAttached, setFilesAttached] = useState(false);
  const [placedInSubfolder, setPlacedInSubfolder] = useState(false);
  const [commitMessage, setCommitMessage] = useState('First version of my website');
  const [committed, setCommitted] = useState(false);

  const [branchSelected, setBranchSelected] = useState<'none' | 'main'>('main');
  const [folderSelected, setFolderSelected] = useState<'/(root)' | '/docs'>('/(root)');
  const [deployed, setDeployed] = useState(false);

  const cleanUsername =
    details.githubUsername.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'your-username';
  const cleanRepo = repoName.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'my-website';
  const liveUrl = `https://${cleanUsername}.github.io/${cleanRepo}/`;

  const has404Issue = placedInSubfolder || visibility === 'private' || branchSelected === 'none';

  const handleDeploy = () => {
    if (!repoCreated || !committed) return;
    setDeployed(true);
  };

  return (
    <div className="space-y-8">
      {/* Real Starter Files Export Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-amber-400">Download Your Real Workshop Files</p>
          <h3 className="font-display text-lg font-bold">
            Export index.html &amp; style.css for GitHub Upload
          </h3>
          <p className="text-sm text-slate-300">
            Ready to publish for real? Download the exact files you edited in Modules 2–4 and drag
            them into your GitHub repository.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => downloadTextFile('index.html', htmlCode)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Download index.html
          </button>
          <button
            type="button"
            onClick={() => downloadTextFile('style.css', cssCode)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Download style.css
          </button>
        </div>
      </div>

      {/* Interactive 3-Stage GitHub Pages Simulator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Hands-On Exercise 5: GitHub &amp; GitHub Pages Simulator
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Walk through the exact 9-step publishing workflow and test what causes common 404 or
            visibility errors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Step 1: Create Repository */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-700">Step 1 · New Repo</span>
              {repoCreated && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <label className="block space-y-1">
              <span className="text-xs font-semibold text-slate-700">
                GitHub Username (professional)
              </span>
              <input
                type="text"
                value={details.githubUsername}
                onChange={(e) => {
                  onUpdateDetails({ ...details, githubUsername: e.target.value });
                  setDeployed(false);
                }}
                placeholder="e.g., ananya-dev"
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold text-slate-700">Repository Name</span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => {
                  setRepoName(e.target.value);
                  setDeployed(false);
                }}
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-700 block">Visibility</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisibility('public')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    visibility === 'public'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility('private')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    visibility === 'private'
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  Private
                </button>
              </div>
              {visibility === 'private' && (
                <p className="text-xs text-red-700 mt-1">
                  Free GitHub Pages requires a Public repository! Switch to Public to deploy.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setRepoCreated(true)}
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {repoCreated ? 'Repository Created ✓' : 'Create Repository'}
            </button>
          </div>

          {/* Step 2: Upload Files & Commit */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              repoCreated
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-50/50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-700">
                Step 2 · Upload &amp; Commit
              </span>
              {committed && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <button
              type="button"
              disabled={!repoCreated}
              onClick={() => setFilesAttached(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 bg-white text-center space-y-1 transition-colors"
            >
              <Upload className="w-5 h-5 mx-auto text-slate-600" />
              <p className="text-xs font-semibold text-slate-800">
                {filesAttached
                  ? 'Attached: index.html & style.css'
                  : 'Click to attach index.html & style.css'}
              </p>
              <p className="text-[11px] text-slate-500">
                Simulates dragging files from my-website
              </p>
            </button>

            <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={placedInSubfolder}
                onChange={(e) => {
                  setPlacedInSubfolder(e.target.checked);
                  setDeployed(false);
                }}
                className="mt-0.5 rounded border-slate-300 text-red-600"
              />
              <span>
                Simulate mistake: put files inside a sub-folder (<span className="font-mono">/site/index.html</span>)
              </span>
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold text-slate-700">Commit message</span>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <button
              type="button"
              disabled={!repoCreated || !filesAttached || !commitMessage.trim()}
              onClick={() => setCommitted(true)}
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 rounded-lg transition-colors"
            >
              {committed ? 'Changes Committed ✓' : 'Commit Changes'}
            </button>
          </div>

          {/* Step 3: Settings -> Pages */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              committed
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-50/50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-700">
                Step 3 · Settings → Pages
              </span>
              {deployed && !has404Issue && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-slate-700 mb-1">Source</p>
                <div className="px-3 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-800">
                  Deploy from a branch
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="block space-y-1">
                  <span className="font-semibold text-slate-700">Branch</span>
                  <select
                    value={branchSelected}
                    onChange={(e) => setBranchSelected(e.target.value as 'none' | 'main')}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                  >
                    <option value="main">main</option>
                    <option value="none">None</option>
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="font-semibold text-slate-700">Folder</span>
                  <select
                    value={folderSelected}
                    onChange={(e) => setFolderSelected(e.target.value as '/(root)' | '/docs')}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-mono"
                  >
                    <option value="/(root)">/ (root)</option>
                    <option value="/docs">/docs</option>
                  </select>
                </label>
              </div>
            </div>

            <button
              type="button"
              disabled={!committed}
              onClick={handleDeploy}
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5" />
              Save &amp; Deploy Live
            </button>

            {deployed && (
              <div
                className={`p-3 rounded-lg border text-xs space-y-1 ${
                  has404Issue || folderSelected !== '/(root)'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                {has404Issue || folderSelected !== '/(root)' ? (
                  <>
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      404 Error / Site Not Published
                    </p>
                    <p>
                      {visibility === 'private'
                        ? 'Your repository is Private. Set Visibility to Public.'
                        : placedInSubfolder
                        ? 'index.html was placed in a sub-folder. Move index.html directly to the root folder.'
                        : 'Select branch "main" and folder "/ (root)".'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">Your site is live at:</p>
                    <p className="font-mono break-all text-emerald-950 font-medium flex items-center gap-1">
                      {liveUrl}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Simulated Live Deployment Browser Frame */}
        {deployed && !has404Issue && folderSelected === '/(root)' && (
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-slate-700 truncate">{liveUrl}</span>
              <span className="text-xs font-medium text-emerald-700 shrink-0">
                Live Preview · Ready for Resume &amp; LinkedIn
              </span>
            </div>
            <iframe
              title="Simulated GitHub Pages Live Site"
              srcDoc={buildLivePreviewDoc(htmlCode, cssCode, true)}
              sandbox="allow-scripts"
              className="w-full h-[320px] bg-white"
            />
          </div>
        )}
      </div>

      {/* Key Terms & Troubleshooting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900">GitHub Key Terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GITHUB_TERMS.map((item) => (
              <div key={item.term} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-mono text-xs font-bold text-slate-900">{item.term}</p>
                <p className="text-xs text-slate-600 mt-1">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Quick Troubleshooting Checklist
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-700">
            <li>
              <strong>404 error on live link:</strong> Confirm home page is named lowercase{' '}
              <span className="font-mono">index.html</span> in the root folder.
            </li>
            <li>
              <strong>Site not visible yet:</strong> First deployment takes 1–2 minutes; wait and
              refresh Settings → Pages.
            </li>
            <li>
              <strong>Old version still showing:</strong> Press{' '}
              <span className="font-mono">Ctrl + Shift + R</span> for a hard refresh.
            </li>
            <li>
              <strong>Updating later:</strong> Click the pencil (Edit) icon on GitHub, make your
              change, and commit.
            </li>
          </ul>
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
          {isCompleted ? 'Module 5 Completed' : 'Mark Module 5 Complete'}
        </button>

        <button
          type="button"
          onClick={onNextModule}
          className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Continue to Module 6: On-Page SEO →
        </button>
      </div>
    </div>
  );
}
