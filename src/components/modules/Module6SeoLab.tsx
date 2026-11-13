import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { SEO_BASICS } from '../../data/workshopData';
import { PersonalDetails } from '../../types/workshop';
import { auditHtmlDocument, updateHeadSeoTags } from '../../utils/htmlHelpers';

interface Module6SeoLabProps {
  htmlCode: string;
  onChangeHtml: (html: string) => void;
  details: PersonalDetails;
  onCompleteModule: () => void;
  isCompleted: boolean;
  onGoToMiniProject: () => void;
}

export function Module6SeoLab({
  htmlCode,
  onChangeHtml,
  details,
  onCompleteModule,
  isCompleted,
  onGoToMiniProject,
}: Module6SeoLabProps) {
  const audit = auditHtmlDocument(htmlCode);

  const [titleInput, setTitleInput] = useState(
    audit.titleText && audit.titleText !== 'My Website'
      ? audit.titleText
      : `${details.name} | ${details.role} in ${details.city}`
  );
  const [metaInput, setMetaInput] = useState(
    audit.metaDescription ||
      `${details.name} is a ${details.role} from ${details.city}, skilled in ${details.skill1} and ${details.skill2}. View projects and contact details.`
  );
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const fresh = auditHtmlDocument(htmlCode);
    if (fresh.titleText) setTitleInput(fresh.titleText);
    if (fresh.metaDescription) setMetaInput(fresh.metaDescription);
  }, [htmlCode]);

  const cleanUsername =
    details.githubUsername.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'your-username';

  const handleApplySeo = () => {
    const updated = updateHeadSeoTags(htmlCode, titleInput.trim(), metaInput.trim());
    onChangeHtml(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const titleLen = titleInput.trim().length;
  const metaLen = metaInput.trim().length;

  const titleHint =
    titleLen === 0 || titleInput === 'My Website'
      ? { label: 'Needs update', color: 'text-red-700' }
      : titleLen >= 40 && titleLen <= 65
      ? { label: 'Optimal (50–60 target)', color: 'text-emerald-700' }
      : titleLen < 40
      ? { label: 'Slightly short', color: 'text-amber-700' }
      : { label: 'Too long (may truncate)', color: 'text-amber-700' };

  const metaHint =
    metaLen === 0
      ? { label: 'Missing meta description', color: 'text-red-700' }
      : metaLen >= 120 && metaLen <= 165
      ? { label: 'Optimal (150–160 target)', color: 'text-emerald-700' }
      : metaLen < 120
      ? { label: 'Too brief', color: 'text-amber-700' }
      : { label: 'Over 160 chars (may clip)', color: 'text-amber-700' };

  return (
    <div className="space-y-8">
      {/* Live SERP Preview + Title/Meta Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Hands-On Exercise 6: Make Your Page Search-Friendly
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Edit your &lt;title&gt; and &lt;meta name=&quot;description&quot;&gt; tags and apply
              them directly to <span className="font-mono">index.html</span>.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">&lt;title&gt; tag</span>
                <span className={`font-mono font-semibold tabular-nums ${titleHint.color}`}>
                  {titleLen} chars · {titleHint.label}
                </span>
              </div>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  &lt;meta name=&quot;description&quot;&gt;
                </span>
                <span className={`font-mono font-semibold tabular-nums ${metaHint.color}`}>
                  {metaLen} chars · {metaHint.label}
                </span>
              </div>
              <textarea
                rows={3}
                value={metaInput}
                onChange={(e) => setMetaInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleApplySeo}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Save SEO Tags to index.html
              </button>

              {savedToast && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Updated &lt;head&gt; in index.html
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Live Google Search Result Simulator */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-700" />
              <h3 className="font-display text-lg font-bold text-slate-900">
                Live Search Result (SERP) Preview
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              How your page appears when a recruiter or client searches your name online:
            </p>

            {/* Simulated Google SERP Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p className="text-xs text-slate-600 font-mono truncate">
                https://{cleanUsername}.github.io/my-website/
              </p>
              <p className="text-lg font-medium text-[#1a0dab] hover:underline leading-snug">
                {titleInput || 'My Website'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {metaInput || 'No meta description set yet. Search engines will pick random snippets from your page body.'}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Note: SEO does not give instant results—a new site may take days or weeks to appear in
            search. Share your link on LinkedIn and your resume to help search engines discover it.
          </p>
        </div>
      </div>

      {/* Live 4-Element On-Page SEO Audit of index.html */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Live Audit of Your index.html ({audit.passedChecks} / {audit.totalChecks} Passed)
            </h3>
            <p className="text-sm text-slate-600">
              Automated check of the four essential on-page SEO elements from Module 6.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3">
            {audit.titleStatus !== 'default' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                1. Title Tag ({audit.titleLength} characters)
              </p>
              <p className="text-xs text-slate-600">
                {audit.titleStatus !== 'default'
                  ? `Pass: "${audit.titleText}"`
                  : 'Action needed: Replace default "My Website" with your name, role, and city.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3">
            {audit.metaStatus !== 'missing' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                2. Meta Description ({audit.metaLength} characters)
              </p>
              <p className="text-xs text-slate-600">
                {audit.metaStatus !== 'missing'
                  ? 'Pass: Clear meta description found inside <head>.'
                  : 'Action needed: Add <meta name="description" content="..."> below <title>.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3">
            {audit.headingValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                3. Heading Structure ({audit.h1Count} &lt;h1&gt;, {audit.h2Count} &lt;h2&gt;)
              </p>
              <p className="text-xs text-slate-600">
                {audit.headingValid
                  ? 'Pass: Exactly one <h1> main heading and structured <h2> sections.'
                  : 'Action needed: Keep exactly one <h1> per page and use <h2> for sections.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3">
            {audit.altValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                4. Image Alt Text ({audit.imagesCount} image{audit.imagesCount === 1 ? '' : 's'})
              </p>
              <p className="text-xs text-slate-600">
                {audit.imagesCount === 0
                  ? 'No images yet — when you add your photo in the Mini Project, include alt="Photo of [Your Name]".'
                  : audit.altValid
                  ? 'Pass: All images include descriptive alt text.'
                  : `Action needed: ${audit.imagesMissingAlt} image(s) missing descriptive alt text.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reference Table of the 4 Basics */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-slate-900">
          The Four On-Page SEO Basics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-2.5 pr-4">Element</th>
                <th className="py-2.5 pr-4">What it does</th>
                <th className="py-2.5">Good practice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SEO_BASICS.map((row) => (
                <tr key={row.element}>
                  <td className="py-3 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                    {row.element}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{row.whatItDoes}</td>
                  <td className="py-3 text-slate-600">{row.goodPractice}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          {isCompleted ? 'Module 6 Completed' : 'Mark Module 6 Complete'}
        </button>

        <button
          type="button"
          onClick={onGoToMiniProject}
          className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
        >
          Launch Section 8: Mini Project →
        </button>
      </div>
    </div>
  );
}
