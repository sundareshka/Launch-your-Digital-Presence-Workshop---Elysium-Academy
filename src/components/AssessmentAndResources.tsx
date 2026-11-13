import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Printer,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  FEEDBACK_RATING_QUESTIONS,
  MCQ_QUESTIONS,
  NEXT_STEP_PATH,
  PARTICIPANT_REFERENCES,
  PRACTICAL_TASKS,
} from '../data/workshopData';
import { PersonalDetails } from '../types/workshop';

interface AssessmentAndResourcesProps {
  details: PersonalDetails;
  htmlCode: string;
  quizAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  quizSubmitted: boolean;
  onSelectQuizAnswer: (qId: number, choice: 'A' | 'B' | 'C' | 'D') => void;
  onSubmitQuiz: () => void;
  onResetQuiz: () => void;
}

export function AssessmentAndResources({
  details,
  htmlCode,
  quizAnswers,
  quizSubmitted,
  onSelectQuizAnswer,
  onSubmitQuiz,
  onResetQuiz,
}: AssessmentAndResourcesProps) {
  const [activeTab, setActiveTab] = useState<'quiz' | 'certificate' | 'resources'>('quiz');

  // Part B Practical Tasks state
  const [task2Prompt, setTask2Prompt] = useState(
    'Act as an SEO specialist. Suggest a 55-character title tag and 155-character meta description for my personal portfolio.'
  );
  const [task3LiveUrl, setTask3LiveUrl] = useState(
    `https://${details.githubUsername || 'your-username'}.github.io/my-website/`
  );
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Section 12 Feedback Form state
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [publishedDuringSession, setPublishedDuringSession] = useState<'Yes' | 'No' | ''>('');
  const [mostUseful, setMostUseful] = useState('');
  const [improveNote, setImproveNote] = useState('');
  const [futureTopics, setFutureTopics] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Section 13 Certificate details
  const [certName, setCertName] = useState(details.name);
  const [certOrg, setCertOrg] = useState(details.college);

  const answeredCount = Object.keys(quizAnswers).length;
  const score = MCQ_QUESTIONS.reduce(
    (acc, q) => (quizAnswers[q.id] === q.correct ? acc + 1 : acc),
    0
  );
  const passedMcq = quizSubmitted && score >= 6;

  const hasEducationInCode = /<h2>[\s\S]*?Education[\s\S]*?<\/h2>/i.test(htmlCode);

  const togglePracticalTask = (id: number) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Sub-navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Assessment, Certificate &amp; Next-Step Resources
          </h2>
          <p className="text-sm text-slate-600">
            Test your knowledge with the 10-question quiz, track practical tasks, and generate your
            participation certificate.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quiz &amp; Tasks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certificate')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certificate &amp; Feedback
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resources &amp; Roadmap
          </button>
        </div>
      </div>

      {/* TAB 1: PART A MCQ + PART B PRACTICAL TASKS */}
      {activeTab === 'quiz' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Part A: Multiple-Choice Assessment (10 Marks)
                </h3>
                <p className="text-sm text-slate-600">
                  Suggested pass mark: 6 out of 10. Each question carries 1 mark.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-slate-800 tabular-nums">
                  {quizSubmitted ? `Score: ${score} / 10` : `${answeredCount} / 10 answered`}
                </span>
                {quizSubmitted && (
                  <button
                    type="button"
                    onClick={onResetQuiz}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                )}
              </div>
            </div>

            {quizSubmitted && (
              <div
                className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                  passedMcq
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={`w-5 h-5 ${passedMcq ? 'text-emerald-600' : 'text-amber-600'}`}
                  />
                  <div>
                    <p className="text-sm font-bold">
                      {passedMcq
                        ? `Passed (${score}/10)! You met the 6/10 benchmark.`
                        : `Scored ${score}/10 — review the explanations below and aim for 6/10.`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('certificate')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Open Certificate Studio →
                </button>
              </div>
            )}

            <div className="space-y-6">
              {MCQ_QUESTIONS.map((q) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correct;
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-slate-900 text-sm sm:text-base">
                        {q.id}. {q.question}
                      </p>
                      <span className="text-xs font-mono text-slate-500">
                        {q.moduleRef} · {q.objective}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt) => {
                        const chosen = selected === opt.label;
                        const isAnswerKey = q.correct === opt.label;

                        let optionClasses =
                          'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                        if (quizSubmitted) {
                          if (isAnswerKey) {
                            optionClasses = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                          } else if (chosen && !isAnswerKey) {
                            optionClasses = 'bg-red-50 border-red-300 text-red-900';
                          }
                        } else if (chosen) {
                          optionClasses = 'bg-slate-900 border-slate-900 text-white font-semibold';
                        }

                        return (
                          <button
                            key={opt.label}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => onSelectQuizAnswer(q.id, opt.label)}
                            className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors flex items-center gap-2.5 ${optionClasses}`}
                          >
                            <span className="font-mono text-xs font-bold shrink-0">
                              {opt.label})
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {quizSubmitted && isAnswerKey && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {quizSubmitted && chosen && !isAnswerKey && (
                              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <p
                        className={`text-xs pt-1 ${
                          isCorrect ? 'text-emerald-800' : 'text-slate-700'
                        }`}
                      >
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  disabled={answeredCount < MCQ_QUESTIONS.length}
                  onClick={onSubmitQuiz}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 rounded-lg transition-colors"
                >
                  {answeredCount < MCQ_QUESTIONS.length
                    ? `Answer all 10 questions (${answeredCount}/10)`
                    : 'Submit & Check Answers'}
                </button>
              </div>
            )}
          </div>

          {/* Part B: Practical and Short-Answer Tasks */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Part B: Practical &amp; Short-Answer Tasks
              </h3>
              <p className="text-sm text-slate-600">
                Track completion of your three hands-on deliverables linked to your live Code Lab.
              </p>
            </div>

            <div className="space-y-4">
              {PRACTICAL_TASKS.map((task) => {
                const checked = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1 max-w-2xl">
                        <p className="text-xs font-mono font-semibold text-amber-700">
                          Task 0{task.id} · {task.objective}
                        </p>
                        <h4 className="font-display text-base font-bold text-slate-900">
                          {task.title}
                        </h4>
                        <p className="text-sm text-slate-700">{task.description}</p>
                        <p className="text-xs text-slate-500">
                          <strong>Evidence to submit:</strong> {task.evidence}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePracticalTask(task.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                          checked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {checked ? 'Marked Complete' : 'Mark Task Done'}
                      </button>
                    </div>

                    {task.id === 1 && (
                      <p className="text-xs font-medium text-slate-700 pt-1">
                        Code Lab Detector:{' '}
                        {hasEducationInCode ? (
                          <span className="text-emerald-700 font-semibold">
                            ✓ &lt;h2&gt;Education&lt;/h2&gt; detected in your index.html
                          </span>
                        ) : (
                          <span className="text-amber-700">
                            Not yet detected in index.html — add it in Mini Project or Code Lab.
                          </span>
                        )}
                      </p>
                    )}

                    {task.id === 2 && (
                      <label className="block space-y-1 pt-1">
                        <span className="text-xs font-medium text-slate-600">
                          Your AI SEO Prompt Draft:
                        </span>
                        <input
                          type="text"
                          value={task2Prompt}
                          onChange={(e) => setTask2Prompt(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                        />
                      </label>
                    )}

                    {task.id === 3 && (
                      <label className="block space-y-1 pt-1">
                        <span className="text-xs font-medium text-slate-600">
                          Your Live GitHub Pages URL:
                        </span>
                        <input
                          type="url"
                          value={task3LiveUrl}
                          onChange={(e) => setTask3LiveUrl(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CERTIFICATE & FEEDBACK */}
      {activeTab === 'certificate' && (
        <div className="space-y-8">
          {/* Certificate Generator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 no-print">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Participation Certificate Preview (Section 13)
                  </h3>
                  <p className="text-sm text-slate-600">
                    Enter your name and institution to preview or print the official certificate
                    layout.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print / Save Certificate PDF
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 no-print">
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-slate-700">Participant Full Name</span>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-slate-700">
                  College / Organisation Name
                </span>
                <input
                  type="text"
                  value={certOrg}
                  onChange={(e) => setCertOrg(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                />
              </label>
            </div>

            {/* Official Certificate Layout */}
            <div className="border-t-4 border-b-4 border-amber-500 bg-slate-50/40 px-6 sm:px-12 py-10 text-center space-y-5 rounded-xl">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                Elysium Academy · Milestone of Cognizance
              </p>
              <h4 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                CERTIFICATE OF PARTICIPATION
              </h4>
              <p className="text-sm text-slate-600">This is to certify that</p>
              <p className="font-display text-2xl font-bold text-slate-900">
                {certName || '[Participant Full Name]'}
              </p>
              <p className="text-sm text-slate-700">
                of <span className="font-semibold">{certOrg || '[College / Organisation Name]'}</span>
              </p>
              <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                has actively participated in the online workshop{' '}
                <strong className="text-slate-900">“Launch Your Digital Presence”</strong> covering
                HTML and CSS basics, AI-powered web development, GitHub, website publishing and
                basic on-page SEO, conducted by Elysium Academy on 14 November 2026 (1 hour 30
                minutes).
              </p>

              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 max-w-xl mx-auto">
                <div className="text-center sm:text-left space-y-1">
                  <p className="font-bold text-slate-900">Ms Malar</p>
                  <p>Trainer, Elysium Academy</p>
                  <p className="font-mono text-slate-500 pt-1">Certificate ID: EA-2026-LYDP-001</p>
                </div>
                <div className="text-center sm:text-right space-y-1">
                  <p className="font-bold text-slate-900">Authorised Signatory</p>
                  <p>Elysium Academy, Madurai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 12 Feedback Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 no-print">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Workshop Feedback Form (Section 12)
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Rating scale: 1 = Poor, 2 = Fair, 3 = Good, 4 = Very good, 5 = Excellent.
              </p>
            </div>

            {feedbackSubmitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                <p className="font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Thank you for submitting your workshop feedback!
                </p>
                <p className="text-xs text-emerald-800">
                  Your responses have been recorded locally for this session.
                </p>
                <button
                  type="button"
                  onClick={() => setFeedbackSubmitted(false)}
                  className="text-xs font-semibold underline pt-1"
                >
                  Edit feedback
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-3">
                  {FEEDBACK_RATING_QUESTIONS.map((q, idx) => (
                    <div
                      key={q}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <span className="text-sm text-slate-800">
                        {idx + 1}. {q}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRatings((prev) => ({ ...prev, [idx]: num }))}
                            className={`w-9 h-9 rounded-lg font-mono text-xs font-bold border transition-colors ${
                              ratings[idx] === num
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm text-slate-800">
                    7. Did you publish your website during the session?
                  </span>
                  <div className="flex items-center gap-2">
                    {(['Yes', 'No'] as const).map((ans) => (
                      <button
                        key={ans}
                        type="button"
                        onClick={() => setPublishedDuringSession(ans)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          publishedDuringSession === ans
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold text-slate-700">
                      8. Most useful part?
                    </span>
                    <input
                      type="text"
                      value={mostUseful}
                      onChange={(e) => setMostUseful(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold text-slate-700">
                      9. What should we improve or add?
                    </span>
                    <input
                      type="text"
                      value={improveNote}
                      onChange={(e) => setImproveNote(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-semibold text-slate-700">
                      10. Future workshop topics?
                    </span>
                    <input
                      type="text"
                      value={futureTopics}
                      onChange={(e) => setFutureTopics(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setFeedbackSubmitted(true)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Save Feedback Response
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PARTICIPANT RESOURCES & NEXT-STEP ROADMAP */}
      {activeTab === 'resources' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Reference List &amp; Free Tools (Section 11)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PARTICIPANT_REFERENCES.map((ref) => (
                <a
                  key={ref.resource}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-500 transition-colors flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display font-bold text-slate-900 group-hover:text-amber-700">
                        {ref.resource}
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ref.use}</p>
                  </div>
                  <p className="font-mono text-xs text-slate-500">{ref.address}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="font-display text-xl font-bold text-slate-900">
              5-Stage Next-Step Learning Path
            </h3>
            <div className="space-y-3">
              {NEXT_STEP_PATH.map((step) => (
                <div
                  key={step.stage}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      0{step.stage}
                    </span>
                    <p className="font-semibold text-sm text-slate-900">{step.learn}</p>
                  </div>
                  <p className="text-xs text-slate-600 sm:text-right">{step.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
