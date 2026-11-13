import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  Download,
  Layers,
  Monitor,
  RotateCcw,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import {
  STARTER_CSS,
  buildPersonalizedHtml,
} from '../data/workshopData';
import { PersonalDetails } from '../types/workshop';
import { auditHtmlDocument, buildLivePreviewDoc, downloadTextFile } from '../utils/htmlHelpers';

interface CodeLabAndMiniProjectProps {
  mode: 'codelab' | 'miniproject';
  htmlCode: string;
  cssCode: string;
  onChangeHtml: (html: string) => void;
  onChangeCss: (css: string) => void;
  details: PersonalDetails;
  onUpdateDetails: (details: PersonalDetails) => void;
}

export function CodeLabAndMiniProject({
  mode,
  htmlCode,
  cssCode,
  onChangeHtml,
  onChangeCss,
  details,
  onUpdateDetails,
}: CodeLabAndMiniProjectProps) {
  const [activeFile, setActiveFile] = useState<'html' | 'css'>('html');
  const [mobilePreview, setMobilePreview] = useState(false);

  const audit = auditHtmlDocument(htmlCode);

  const hasPhoto = /<img\b[^>]*src=["']photo\.jpg["']/i.test(htmlCode);
  const hasEducation = /<h2>\s*Education\s*<\/h2>/i.test(htmlCode);
  const hasProjects = /<h2>\s*Projects\s*<\/h2>/i.test(htmlCode);
  const hasSocialLinks =
    /linkedin\.com/i.test(htmlCode) && /github\.com/i.test(htmlCode);
  const hasNavExtension = /<nav\b/i.test(htmlCode);
  const hasHoverExtension = /:hover/i.test(cssCode);

  const addProfilePhoto = () => {
    if (hasPhoto) return;
    const imgTag = `    <img src="photo.jpg" alt="Photo of ${details.name}" width="120" style="border-radius: 50%; margin-bottom: 12px;">\n`;
    let nextHtml = htmlCode;
    if (/<header>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<header>\s*/i, `<header>\n${imgTag}`);
      onChangeHtml(nextHtml);
    }
  };

  const addEducationSection = () => {
    if (hasEducation) return;
    const eduSection = `    <section id="education">\n      <h2 class="edu-heading">Education</h2>\n      <ul>\n        <li>${details.degree} — ${details.college} (${details.gradYear})</li>\n        <li>Workshop Certificate: Launch Your Digital Presence — Elysium Academy</li>\n      </ul>\n    </section>\n\n`;
    let nextHtml = htmlCode;
    if (/<main>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/(<\/section>\s*)(<section>\s*<h2>\s*My Skills)/i, `$1${eduSection}    $2`);
      if (nextHtml === htmlCode) {
        nextHtml = nextHtml.replace(/<\/main>/i, `${eduSection}  </main>`);
      }
      onChangeHtml(nextHtml);
    }
    if (!cssCode.includes('.edu-heading')) {
      onChangeCss(
        `${cssCode.trim()}\n\n.edu-heading {\n  color: #0284C7;\n  border-bottom-color: #0284C7;\n}`
      );
    }
  };

  const addProjectsSection = () => {
    if (hasProjects) return;
    const projSection = `    <section id="projects">\n      <h2>Projects</h2>\n      <div class="projects-grid">\n        <div class="project-card">\n          <h3>${details.project1Title}</h3>\n          <p>${details.project1Desc}</p>\n        </div>\n        <div class="project-card">\n          <h3>${details.project2Title}</h3>\n          <p>${details.project2Desc}</p>\n        </div>\n      </div>\n    </section>\n\n`;
    let nextHtml = htmlCode;
    const contactIdx = nextHtml.search(/<section[^>]*>\s*<h2>\s*Contact/i);
    if (contactIdx !== -1) {
      nextHtml = nextHtml.slice(0, contactIdx) + projSection + nextHtml.slice(contactIdx);
    } else if (/<\/main>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<\/main>/i, `${projSection}  </main>`);
    }
    onChangeHtml(nextHtml);

    if (!cssCode.includes('.projects-grid')) {
      onChangeCss(
        `${cssCode.trim()}\n\n.projects-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n  margin-top: 12px;\n}\n\n.project-card {\n  background-color: #F8FAFC;\n  border: 1px solid #CBD5E1;\n  border-radius: 6px;\n  padding: 16px;\n  transition: transform 0.15s ease, border-color 0.15s ease;\n}\n\n.project-card:hover {\n  transform: translateY(-2px);\n  border-color: #F9A91E;\n}`
      );
    }
  };

  const addSocialLinks = () => {
    if (hasSocialLinks) return;
    const cleanGithub =
      details.githubUsername.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'your-username';
    const linksHtml = `\n      <p>LinkedIn: <a href="${details.linkedinUrl}" target="_blank" rel="noopener">View LinkedIn Profile</a></p>\n      <p>GitHub: <a href="https://github.com/${cleanGithub}" target="_blank" rel="noopener">github.com/${cleanGithub}</a></p>`;
    const nextHtml = htmlCode.replace(
      /(<h2>\s*Contact\s*<\/h2>[\s\S]*?<\/p>)/i,
      `$1${linksHtml}`
    );
    if (nextHtml !== htmlCode) {
      onChangeHtml(nextHtml);
    }
  };

  const addJumpNavChallenge = () => {
    if (hasNavExtension) return;
    const navHtml = `  <nav class="site-nav">\n    <a href="#main">Overview</a>\n    <a href="#education">Education</a>\n    <a href="#projects">Projects</a>\n  </nav>\n`;
    let nextHtml = htmlCode;
    if (/<\/header>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<\/header>/i, `</header>\n${navHtml}`);
      onChangeHtml(nextHtml);
    }
    if (!cssCode.includes('.site-nav')) {
      onChangeCss(
        `${cssCode.trim()}\n\n.site-nav {\n  background-color: #263238;\n  text-align: center;\n  padding: 10px;\n}\n\n.site-nav a {\n  color: #ffffff;\n  text-decoration: none;\n  margin: 0 12px;\n  font-size: 14px;\n}\n\n.site-nav a:hover {\n  color: #F9A91E;\n}`
      );
    }
  };

  const buildCompleteMiniProject = () => {
    const cleanGithub =
      details.githubUsername.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'your-username';
    const completeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${details.name} | ${details.role} in ${details.city}</title>
  <meta name="description" content="${details.name} is a ${details.role} from ${details.city}, skilled in ${details.skill1} and ${details.skill2}. View education, projects, and contact details.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <img src="photo.jpg" alt="Photo of ${details.name}" width="120" style="border-radius: 50%; margin-bottom: 12px;">
    <h1>Hi, I am ${details.name}</h1>
    <p>${details.role}, ${details.city}</p>
  </header>

  <nav class="site-nav">
    <a href="#about">About Me</a>
    <a href="#education">Education</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>${details.about}</p>
    </section>

    <section id="education">
      <h2 class="edu-heading">Education</h2>
      <ul>
        <li>${details.degree} — ${details.college} (${details.gradYear})</li>
        <li>Workshop Certificate: Launch Your Digital Presence — Elysium Academy</li>
      </ul>
    </section>

    <section id="skills">
      <h2>My Skills</h2>
      <ul>
        <li>${details.skill1}</li>
        <li>${details.skill2}</li>
        <li>${details.skill3}</li>
      </ul>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <h3>${details.project1Title}</h3>
          <p>${details.project1Desc}</p>
        </div>
        <div class="project-card">
          <h3>${details.project2Title}</h3>
          <p>${details.project2Desc}</p>
        </div>
      </div>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${details.email}">${details.email}</a></p>
      <p>LinkedIn: <a href="${details.linkedinUrl}" target="_blank" rel="noopener">View LinkedIn Profile</a></p>
      <p>GitHub: <a href="https://github.com/${cleanGithub}" target="_blank" rel="noopener">github.com/${cleanGithub}</a></p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 ${details.name}</p>
  </footer>
</body>
</html>`;

    const completeCss = `${STARTER_CSS}

.site-nav {
  background-color: #263238;
  text-align: center;
  padding: 12px;
}

.site-nav a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 12px;
  font-size: 14px;
}

.site-nav a:hover {
  color: #F9A91E;
}

.edu-heading {
  color: #0284C7;
  border-bottom-color: #0284C7;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.project-card {
  background-color: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  padding: 16px;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: #F9A91E;
}

.project-card h3 {
  margin: 0 0 6px 0;
  color: #37474F;
}`;

    onChangeHtml(completeHtml);
    onChangeCss(completeCss);
  };

  const selfChecks = [
    {
      label: 'Header has profile photo with descriptive alt text',
      passed: hasPhoto && audit.altValid,
    },
    {
      label: 'Page reads cleanly on mobile & desktop screens',
      passed: htmlCode.includes('name="viewport"') && cssCode.includes('max-width'),
    },
    {
      label: 'No sample text or square brackets [ ... ] remain on the page',
      passed: audit.remainingPlaceholders.length === 0,
    },
    {
      label: 'Title tag and meta description are updated (Module 6 SEO)',
      passed: audit.titleStatus !== 'default' && audit.metaStatus !== 'missing',
    },
    {
      label: 'Education, Projects, and LinkedIn/GitHub links included',
      passed: hasEducation && hasProjects && hasSocialLinks,
    },
  ];

  const passedSelfChecks = selfChecks.filter((c) => c.passed).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-amber-700">
            {mode === 'miniproject'
              ? 'Section 8 · Hands-On Lab / Mini Project'
              : 'Live Workspace · HTML & CSS Sandbox'}
          </p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {mode === 'miniproject'
              ? 'My Personal Portfolio Page Builder'
              : 'Live index.html & style.css Code Lab'}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {mode === 'miniproject'
              ? 'Extend your workshop starter page into a complete one-page portfolio with photo, Education, Projects, LinkedIn/GitHub links, and custom CSS.'
              : 'Edit your index.html and style.css files side by side with instant mobile/desktop preview and export ready for GitHub Pages.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => downloadTextFile('index.html', htmlCode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            index.html
          </button>
          <button
            type="button"
            onClick={() => downloadTextFile('style.css', cssCode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            style.css
          </button>
          <button
            type="button"
            onClick={() => {
              onChangeHtml(buildPersonalizedHtml(details));
              onChangeCss(STARTER_CSS);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Starter
          </button>
        </div>
      </div>

      {/* Mini Project Guided Builder Controls */}
      {mode === 'miniproject' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Portfolio Details &amp; Step-by-Step Extensions
                </h3>
                <p className="text-xs text-slate-600">
                  Customize your education, projects, and profile links, then insert each section.
                </p>
              </div>
              <button
                type="button"
                onClick={buildCompleteMiniProject}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Assemble Complete Portfolio
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="block space-y-1">
                <span className="text-xs font-medium text-slate-600">Degree</span>
                <input
                  type="text"
                  value={details.degree}
                  onChange={(e) => onUpdateDetails({ ...details, degree: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-slate-600">College / University</span>
                <input
                  type="text"
                  value={details.college}
                  onChange={(e) => onUpdateDetails({ ...details, college: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-slate-600">Year</span>
                <input
                  type="text"
                  value={details.gradYear}
                  onChange={(e) => onUpdateDetails({ ...details, gradYear: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block space-y-1">
                <span className="text-xs font-medium text-slate-600">Project 1 Title</span>
                <input
                  type="text"
                  value={details.project1Title}
                  onChange={(e) => onUpdateDetails({ ...details, project1Title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-slate-600">Project 2 Title</span>
                <input
                  type="text"
                  value={details.project2Title}
                  onChange={(e) => onUpdateDetails({ ...details, project2Title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-slate-700">
                Insert Individual Portfolio Features:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addProfilePhoto}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    hasPhoto
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {hasPhoto ? '✓ 1. Profile Photo' : '+ 1. Add Profile Photo'}
                </button>
                <button
                  type="button"
                  onClick={addEducationSection}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    hasEducation
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {hasEducation ? '✓ 2. Education Section' : '+ 2. Add Education Section'}
                </button>
                <button
                  type="button"
                  onClick={addProjectsSection}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    hasProjects
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {hasProjects ? '✓ 3. Projects Cards' : '+ 3. Add Projects Cards'}
                </button>
                <button
                  type="button"
                  onClick={addSocialLinks}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    hasSocialLinks
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {hasSocialLinks ? '✓ 4. LinkedIn & GitHub' : '+ 4. Add LinkedIn & GitHub'}
                </button>
                <button
                  type="button"
                  onClick={addJumpNavChallenge}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    hasNavExtension && hasHoverExtension
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {hasNavExtension ? '✓ Extension: Jump Nav + :hover' : '+ Extension: Jump Nav'}
                </button>
              </div>
            </div>
          </div>

          {/* Automated Self-Check List */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Portfolio Self-Check List
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-slate-800 tabular-nums">
                {passedSelfChecks} / {selfChecks.length}
              </span>
            </div>

            <ul className="space-y-2.5">
              {selfChecks.map((check) => (
                <li
                  key={check.label}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    check.passed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{check.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Dual-Pane Code Editor & Live Browser Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: File Switcher + Code Editor */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 text-slate-200 rounded-t-xl border-b border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveFile('html')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    activeFile === 'html'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  index.html
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFile('css')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors ${
                    activeFile === 'css'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  style.css
                </button>
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {activeFile === 'html'
                  ? `${htmlCode.split('\n').length} lines`
                  : `${cssCode.split('\n').length} lines`}
              </span>
            </div>

            <textarea
              value={activeFile === 'html' ? htmlCode : cssCode}
              onChange={(e) =>
                activeFile === 'html' ? onChangeHtml(e.target.value) : onChangeCss(e.target.value)
              }
              spellCheck={false}
              aria-label={activeFile === 'html' ? 'index.html editor' : 'style.css editor'}
              className="flex-1 min-h-[480px] w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-slate-100 rounded-b-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
            />
          </div>

          {/* Right: Live Browser Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border border-b-0 border-slate-300 rounded-t-xl">
              <span className="text-xs font-semibold text-slate-700 truncate max-w-[240px]">
                {audit.titleText || 'My Website'}
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMobilePreview(false)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    !mobilePreview ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setMobilePreview(true)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    mobilePreview ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Mobile
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-[480px] bg-slate-200/70 border border-slate-300 rounded-b-xl p-3 flex justify-center overflow-x-auto">
              <iframe
                title="Live Portfolio Preview"
                srcDoc={buildLivePreviewDoc(htmlCode, cssCode, true)}
                sandbox="allow-scripts"
                style={{ width: mobilePreview ? '360px' : '100%' }}
                className="h-full min-h-[455px] bg-white rounded-lg border border-slate-300 shadow-sm transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
