import { AgendaItem, KeyTerm, McqQuestion, PersonalDetails, PracticalTask, PromptTemplate } from '../types/workshop';

export const DEFAULT_PERSONAL_DETAILS: PersonalDetails = {
  name: 'Ananya Krishnan',
  role: 'Aspiring Web Developer',
  city: 'Madurai',
  about:
    'I am a final-year computer science student passionate about building clean, accessible websites and learning modern web technologies.',
  skill1: 'HTML and CSS',
  skill2: 'AI-Assisted Prototyping',
  skill3: 'GitHub Pages Publishing',
  email: 'ananya.krishnan@example.com',
  degree: 'B.Sc. Computer Science',
  college: 'Madurai Kamaraj University',
  gradYear: '2026',
  linkedinUrl: 'https://linkedin.com/in/ananya-krishnan',
  githubUsername: 'ananya-dev',
  project1Title: 'Local Bakery Showcase',
  project1Desc: 'A responsive one-page storefront with daily menu, timings, and click-to-call contact.',
  project2Title: 'Study Timetable Portal',
  project2Desc: 'A structured weekly schedule built using semantic HTML tables and clean CSS cards.',
};

export const STARTER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Hi, I am [Your Name]</h1>
    <p>[Your course or job title], [Your city]</p>
  </header>

  <main>
    <section>
      <h2>About Me</h2>
      <p>[Write two or three lines about yourself.]</p>
    </section>

    <section>
      <h2>My Skills</h2>
      <ul>
        <li>HTML and CSS</li>
        <li>[Skill 2]</li>
        <li>[Skill 3]</li>
      </ul>
    </section>

    <section>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:[your email]">[your email]</a></p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 [Your Name]</p>
  </footer>
</body>
</html>`;

export const STARTER_CSS = `body {
  font-family: Arial, sans-serif;
  margin: 0;
  color: #111111;
  background-color: #E8ECEE;
  line-height: 1.6;
}

header {
  background-color: #37474F;
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

section {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

h2 {
  color: #37474F;
  border-bottom: 3px solid #F9A91E;
  padding-bottom: 6px;
}

footer {
  text-align: center;
  padding: 20px;
}`;

export function buildPersonalizedHtml(details: PersonalDetails): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${details.name} | ${details.role} in ${details.city}</title>
  <meta name="description" content="${details.name} is a ${details.role} from ${details.city}, skilled in ${details.skill1} and ${details.skill2}. View projects and contact details.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Hi, I am ${details.name}</h1>
    <p>${details.role}, ${details.city}</p>
  </header>

  <main>
    <section>
      <h2>About Me</h2>
      <p>${details.about}</p>
    </section>

    <section>
      <h2>My Skills</h2>
      <ul>
        <li>${details.skill1}</li>
        <li>${details.skill2}</li>
        <li>${details.skill3}</li>
      </ul>
    </section>

    <section>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${details.email}">${details.email}</a></p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 ${details.name}</p>
  </footer>
</body>
</html>`;
}

export const WORKSHOP_DETAILS = [
  { label: 'Title', value: 'Launch Your Digital Presence' },
  { label: 'Mode & Platform', value: 'Online · Microsoft Teams' },
  { label: 'Date & Time', value: 'Saturday, 14 November 2026 · 11:00 AM – 12:30 PM IST' },
  { label: 'Duration', value: '1 hour 30 minutes (90 minutes)' },
  { label: 'Audience & Level', value: 'Students, faculty, professionals & entrepreneurs · Beginner' },
  { label: 'Trainer', value: 'Ms Malar · Elysium Academy' },
  { label: 'Ratio', value: '30% Concept Explanation · 70% Hands-on Practice' },
  { label: 'Workshop Helpline', value: '96777 81155 | 96777 24437' },
];

export const SESSION_AGENDA: AgendaItem[] = [
  {
    time: '11:00 – 11:05',
    session: 'Welcome',
    topic: 'Introduction, workshop goals, ice-breaker poll',
    activityType: 'Poll, chat',
    duration: '5 min',
  },
  {
    time: '11:05 – 11:15',
    session: 'Module 1',
    topic: 'How websites work and setting up the project folder',
    activityType: 'Concept, screen-share demo',
    duration: '10 min',
    moduleId: 1,
  },
  {
    time: '11:15 – 11:35',
    session: 'Module 2',
    topic: 'HTML basics: build the page structure',
    activityType: 'Code-along',
    duration: '20 min',
    moduleId: 2,
  },
  {
    time: '11:35 – 11:50',
    session: 'Module 3',
    topic: 'CSS basics: style the page',
    activityType: 'Code-along',
    duration: '15 min',
    moduleId: 3,
  },
  {
    time: '11:50 – 11:55',
    session: 'Break',
    topic: 'Short break; support team clears pending doubts in chat',
    activityType: 'Break',
    duration: '5 min',
  },
  {
    time: '11:55 – 12:05',
    session: 'Module 4',
    topic: 'AI-powered web development',
    activityType: 'Demo, prompt exercise',
    duration: '10 min',
    moduleId: 4,
  },
  {
    time: '12:05 – 12:20',
    session: 'Module 5',
    topic: 'GitHub and publishing the live website',
    activityType: 'Code-along, link sharing',
    duration: '15 min',
    moduleId: 5,
  },
  {
    time: '12:20 – 12:25',
    session: 'Module 6',
    topic: 'Basic on-page SEO',
    activityType: 'Concept, quick edit',
    duration: '5 min',
    moduleId: 6,
  },
  {
    time: '12:25 – 12:30',
    session: 'Closing',
    topic: 'Q&A, quiz and feedback links, certificate note, next steps',
    activityType: 'Q&A, poll',
    duration: '5 min',
  },
];

export const PRE_SESSION_CHECKLIST = [
  'Stable internet connection (broadband or 4G/5G hotspot; about 2 Mbps or more is recommended)',
  'Laptop charged or connected to power (mobile phone alone is not enough for hands-on work)',
  'Visual Studio Code installed and opens without error (Notepad or TextEdit as backup)',
  'GitHub account created at github.com, email verified, and login tested',
  'Free AI chat assistant account created and login tested (ChatGPT, Gemini, Claude, or Copilot)',
  'Microsoft Teams link opens; microphone and speaker tested (Meeting ID: 469 409 911 286 970)',
  'A folder named my-website created on the Desktop',
  'Two windows arranged side by side: Teams on one side, VS Code and browser on the other',
];

export const OBJECTIVE_COVERAGE = [
  {
    id: 1,
    objective: 'Build a single-page personal website from scratch using basic HTML tags.',
    modules: 'Module 1, Module 2',
    assessedBy: 'MCQ 1, 2, 3; Task 1',
  },
  {
    id: 2,
    objective: 'Style the page with CSS by changing colours, fonts, spacing and alignment.',
    modules: 'Module 3',
    assessedBy: 'MCQ 4, 5; Task 1',
  },
  {
    id: 3,
    objective: 'Use an AI assistant to generate, explain and improve HTML and CSS code, and check the result.',
    modules: 'Module 4',
    assessedBy: 'MCQ 6; Task 2',
  },
  {
    id: 4,
    objective: 'Create a GitHub account and repository, and upload website files to it.',
    modules: 'Module 5',
    assessedBy: 'MCQ 7; Task 3',
  },
  {
    id: 5,
    objective: 'Publish the website live with GitHub Pages and share the public link.',
    modules: 'Module 5',
    assessedBy: 'MCQ 8; Task 3',
  },
  {
    id: 6,
    objective: 'Apply four basic on-page SEO elements: title tag, meta description, heading structure and image alt text.',
    modules: 'Module 6',
    assessedBy: 'MCQ 9, 10; Task 2',
  },
];

export const MODULE_SUMMARIES = [
  {
    id: 1 as const,
    title: 'How Websites Work & Project Setup',
    duration: '10 min',
    type: 'Concept & Setup',
    summary: 'Understand browsers, servers, URLs, and create the my-website folder with index.html and style.css.',
    trainerNote: 'Limit theory to 5 minutes. Use the house comparison. Do not move on until folder setup is done.',
  },
  {
    id: 2 as const,
    title: 'HTML Basics — Build the Page Structure',
    duration: '20 min',
    type: 'Code-Along',
    summary: 'Write semantic HTML tags (<header>, <main>, <section>, <footer>) and structure personal content.',
    trainerNote: 'Type the code live in three parts: head, header, sections. Pause after each part.',
  },
  {
    id: 3 as const,
    title: 'CSS Basics — Style the Page',
    duration: '15 min',
    type: 'Code-Along',
    summary: 'Apply selectors, properties, hex colours, padding, margin, and responsive widths via style.css.',
    trainerNote: 'Add rules one block at a time and refresh after each so participants see the change immediately.',
  },
  {
    id: 4 as const,
    title: 'AI-Powered Web Development',
    duration: '10 min',
    type: 'Demo & Prompt Lab',
    summary: 'Use the Role + Task + Context + Format prompt formula to generate and verify a Projects section.',
    trainerNote: 'Demonstrate Prompt 1 live. Stress testing AI code in the browser and never pasting private data.',
  },
  {
    id: 5 as const,
    title: 'GitHub & Publishing Your Live Website',
    duration: '15 min',
    type: 'Deploy Lab',
    summary: 'Create a public my-website repository, upload files, and publish live on GitHub Pages.',
    trainerNote: 'Key module. Walk slowly through Settings → Pages → Deploy from main branch / (root).',
  },
  {
    id: 6 as const,
    title: 'Basic On-Page SEO',
    duration: '5 min',
    type: 'Audit & Edit',
    summary: 'Optimize title tag, meta description, heading hierarchy, and image alt text for search engines.',
    trainerNote: 'Show a real search result first, then edit the title and meta description live.',
  },
];

export const MODULE_1_TERMS: KeyTerm[] = [
  { term: 'Browser', meaning: 'The app that opens websites, such as Chrome or Edge' },
  { term: 'Server / hosting', meaning: 'The always-on computer where website files are kept' },
  { term: 'URL', meaning: 'The address of a web page, for example https://www.elysiumacademy.org' },
  { term: 'HTML', meaning: 'HyperText Markup Language: the structure and content of a page' },
  { term: 'CSS', meaning: 'Cascading Style Sheets: the colours, fonts and layout of a page' },
  { term: 'index.html', meaning: 'The home page file. Servers open this file first by default.' },
];

export const MODULE_2_TAGS: KeyTerm[] = [
  { term: '<!DOCTYPE html>', meaning: 'Tells the browser this is a modern HTML page', example: '<!DOCTYPE html>' },
  { term: '<h1> to <h6>', meaning: 'Headings. <h1> is the main heading; use it once per page.', example: '<h1>Hi, I am Ananya</h1>' },
  { term: '<p>', meaning: 'Paragraph of text', example: '<p>Aspiring Web Developer, Madurai</p>' },
  { term: '<a href="...">', meaning: 'Link to another page, email address or phone number', example: '<a href="mailto:hi@example.com">Email me</a>' },
  { term: '<img src="..." alt="...">', meaning: 'Image. alt describes the image in words.', example: '<img src="photo.jpg" alt="Photo of Ananya">' },
  { term: '<ul> and <li>', meaning: 'Bulleted list and its items', example: '<ul><li>HTML and CSS</li></ul>' },
  { term: '<header>, <main>, <section>, <footer>', meaning: 'Meaningful containers that group parts of the page', example: '<section><h2>About Me</h2>...</section>' },
];

export const MODULE_3_TERMS: KeyTerm[] = [
  { term: 'Selector', meaning: 'The element you want to style, such as body, h1 or section' },
  { term: 'Property and value', meaning: 'The setting and its choice, such as font-size: 18px' },
  { term: 'Hex colour', meaning: 'A colour code starting with #, such as #F9A91E for amber' },
  { term: 'Margin', meaning: 'Space outside an element' },
  { term: 'Padding', meaning: 'Space inside an element, between its border and its content' },
  { term: 'Responsive', meaning: 'A page that adjusts to mobile, tablet and laptop screens' },
];

export const PROMPT_SHEET: PromptTemplate[] = [
  {
    id: 1,
    title: 'Add a Projects Section with Cards',
    prompt:
      'Here is my HTML page. Add a "Projects" section with two project cards, each with a title and a one-line description. Use simple HTML and give matching CSS. (paste your code)',
    role: 'Act as a beginner-friendly web developer',
    task: 'Add a "Projects" section with two project cards, each with a title and a one-line description',
    context: 'Using my existing index.html and style.css structure with slate #37474F and amber #F9A91E',
    format: 'Give only the new HTML section to place above Contact and the matching CSS to append',
    generatedHtml: `    <section>
      <h2>Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <h3>Local Bakery Showcase</h3>
          <p>A responsive one-page storefront with daily menu, timings, and contact details.</p>
        </div>
        <div class="project-card">
          <h3>Study Timetable Portal</h3>
          <p>A structured weekly schedule built using semantic HTML tables and clean CSS cards.</p>
        </div>
      </div>
    </section>`,
    generatedCss: `.projects-grid {
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
}`,
    explanationText:
      'Notice how this generates only the new <section> to paste above Contact, plus clean CSS classes (.projects-grid and .project-card) that match your existing card styling and even support a subtle :hover lift.',
  },
  {
    id: 2,
    title: 'Explain a CSS Rule Line by Line',
    prompt: 'Explain this CSS rule line by line in simple English for a beginner: (paste the rule)',
    role: 'Act as a patient coding tutor',
    task: 'Explain each line of a CSS rule in simple plain English',
    context: 'I am a first-time learner styling my header band in style.css',
    format: 'A numbered line-by-line breakdown with no jargon',
    explanationText:
      'Line 1: "header {" selects the <header> tag in HTML. Line 2: "background-color: #37474F;" paints the header slate-blue. Line 3: "color: #ffffff;" makes the text white for contrast. Line 4: "text-align: center;" centres the heading. Line 5: "padding: 40px 20px;" adds 40px space top/bottom and 20px left/right inside the header.',
  },
  {
    id: 3,
    title: 'Debug a Broken HTML/CSS Snippet',
    prompt: 'My page looks wrong after I added this code. Find the mistake and show the corrected code: (paste your code)',
    role: 'Act as a web debugging assistant',
    task: 'Identify syntax errors such as missing closing tags, missing semicolons, or British spelling',
    context: 'After editing my About Me section, the entire rest of the page turned huge like a heading',
    format: 'Point out the exact bug in one sentence and provide the fixed HTML snippet',
    generatedHtml: `    <section>
      <h2>About Me</h2>
      <p>I am a computer science student building my first personal portfolio.</p>
    </section>`,
    explanationText:
      'Mistake found: You wrote <h2>About Me without the closing </h2> tag. Because the heading never closed, the browser treated all following paragraphs as part of the <h2> heading. Adding </h2> fixes the layout immediately.',
  },
  {
    id: 4,
    title: 'Suggest a 3-Hex Colour Scheme',
    prompt:
      'Suggest a colour scheme with three hex colour codes for a personal website of a [your field] student. Keep the text easy to read.',
    role: 'Act as a UI designer',
    task: 'Suggest 3 accessible hex colour codes (header, page background, accent)',
    context: 'Personal portfolio website targeting recruiters; must have high text readability',
    format: 'Three hex codes with labels and contrast notes',
    generatedCss: `body {
  background-color: #F1F5F9;
  color: #0F172A;
}

header {
  background-color: #1E3A5F;
  color: #FFFFFF;
}

h2 {
  color: #1E3A5F;
  border-bottom: 3px solid #D97706;
}`,
    explanationText:
      'Recommended Palette: Deep Ocean Navy (#1E3A5F) for the header & headings, Crisp Cool Mist (#F1F5F9) for the background, and Warm Amber (#D97706) for section accent underlines. Text (#0F172A) maintains >12:1 contrast on white cards.',
  },
  {
    id: 5,
    title: 'Write a 25-Word About Me Bio',
    prompt:
      'Write a 25-word "About Me" for a [your course] student from [your city] who is interested in [your interest].',
    role: 'Act as a career coach',
    task: 'Write a concise, recruiter-ready 25-word About Me paragraph',
    context: 'Placed inside the About Me <section> of a beginner personal portfolio',
    format: 'Single plain-text paragraph ready to paste into <p>...</p>',
    generatedHtml: `    <section>
      <h2>About Me</h2>
      <p>I am a Computer Science student from Madurai passionate about web design and AI tools, building clean, accessible digital projects that solve everyday local challenges.</p>
    </section>`,
    explanationText:
      'Exactly 25 words, clear first-person voice, highlights your location, academic background, and core interest without buzzword fluff.',
  },
];

export const SEO_BASICS = [
  {
    element: 'Title tag',
    whatItDoes: 'Shown on the browser tab and as the blue headline in search results',
    goodPractice: 'Unique, clear, about 50 to 60 characters, with your name and role',
  },
  {
    element: 'Meta description',
    whatItDoes: 'Short summary that may be shown under the headline in search results',
    goodPractice: 'One or two sentences, about 150 to 160 characters',
  },
  {
    element: 'Heading structure',
    whatItDoes: 'Shows search engines the main topic and sub-topics',
    goodPractice: 'One <h1> per page; use <h2> for sections in order',
  },
  {
    element: 'Image alt text',
    whatItDoes: 'Describes an image for search engines and screen readers',
    goodPractice: 'Short and specific: "Photo of [Your Name]"',
  },
];

export const MCQ_QUESTIONS: McqQuestion[] = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      { label: 'A', text: 'HyperText Markup Language' },
      { label: 'B', text: 'High Transfer Machine Language' },
      { label: 'C', text: 'HyperText Making Links' },
      { label: 'D', text: 'Home Tool Markup Language' },
    ],
    correct: 'A',
    objective: 'Build with HTML',
    moduleRef: 'Module 1 & 2',
    explanation: 'HTML stands for HyperText Markup Language—it defines the structure and content of web pages.',
  },
  {
    id: 2,
    question: 'Which file name do web servers open by default as the home page?',
    options: [
      { label: 'A', text: 'home.css' },
      { label: 'B', text: 'index.html' },
      { label: 'C', text: 'main.txt' },
      { label: 'D', text: 'website.doc' },
    ],
    correct: 'B',
    objective: 'Build with HTML',
    moduleRef: 'Module 1',
    explanation: 'Web servers including GitHub Pages automatically look for lowercase index.html in the root folder.',
  },
  {
    id: 3,
    question: 'Which tag is used for the main heading of a page?',
    options: [
      { label: 'A', text: '<head>' },
      { label: 'B', text: '<p>' },
      { label: 'C', text: '<h1>' },
      { label: 'D', text: '<title>' },
    ],
    correct: 'C',
    objective: 'Build with HTML',
    moduleRef: 'Module 2',
    explanation: '<h1> represents the primary visible heading of the page (used once per page), while <title> sets the browser tab.',
  },
  {
    id: 4,
    question: 'In the rule h1 { color: #37474F; } what is "color"?',
    options: [
      { label: 'A', text: 'Selector' },
      { label: 'B', text: 'Value' },
      { label: 'C', text: 'Tag' },
      { label: 'D', text: 'Property' },
    ],
    correct: 'D',
    objective: 'Style with CSS',
    moduleRef: 'Module 3',
    explanation: 'h1 is the selector, color is the property (what to change), and #37474F is the value.',
  },
  {
    id: 5,
    question: 'Which line connects a CSS file to an HTML page?',
    options: [
      { label: 'A', text: '<link rel="stylesheet" href="style.css">' },
      { label: 'B', text: '<a href="style.css">' },
      { label: 'C', text: '<css src="style.css">' },
      { label: 'D', text: '<style href="style.css">' },
    ],
    correct: 'A',
    objective: 'Style with CSS',
    moduleRef: 'Module 3',
    explanation: 'Placed inside <head>, <link rel="stylesheet" href="style.css"> loads your external CSS file.',
  },
  {
    id: 6,
    question: 'What is the best practice when an AI assistant gives you code?',
    options: [
      { label: 'A', text: 'Use it without reading' },
      { label: 'B', text: 'Test it in the browser and understand it before keeping it' },
      { label: 'C', text: 'Share your password so that it can fix errors' },
      { label: 'D', text: 'Delete your own code first' },
    ],
    correct: 'B',
    objective: 'Use AI for web development',
    moduleRef: 'Module 4',
    explanation: 'AI can produce outdated or broken code—always inspect, test in the browser, and protect private credentials.',
  },
  {
    id: 7,
    question: 'On GitHub, a repository is:',
    options: [
      { label: 'A', text: 'A paid web server' },
      { label: 'B', text: 'A project folder that stores files and their change history' },
      { label: 'C', text: 'A type of browser' },
      { label: 'D', text: 'A CSS property' },
    ],
    correct: 'B',
    objective: 'Work with GitHub',
    moduleRef: 'Module 5',
    explanation: 'A repository (repo) stores your website files online along with every commit history message.',
  },
  {
    id: 8,
    question: 'Which GitHub feature publishes HTML and CSS files as a live website free of cost?',
    options: [
      { label: 'A', text: 'GitHub Issues' },
      { label: 'B', text: 'GitHub Gist' },
      { label: 'C', text: 'GitHub Pages' },
      { label: 'D', text: 'GitHub Stars' },
    ],
    correct: 'C',
    objective: 'Publish with GitHub Pages',
    moduleRef: 'Module 5',
    explanation: 'GitHub Pages deploys static HTML/CSS sites from a public repository to https://<username>.github.io/<repo>/.',
  },
  {
    id: 9,
    question: 'Which element is shown as the clickable headline of a page in search results?',
    options: [
      { label: 'A', text: 'Meta description' },
      { label: 'B', text: 'Title tag' },
      { label: 'C', text: 'Footer' },
      { label: 'D', text: 'Alt text' },
    ],
    correct: 'B',
    objective: 'Apply on-page SEO',
    moduleRef: 'Module 6',
    explanation: 'The <title> tag appears both on the browser tab and as the blue clickable headline in Google Search results.',
  },
  {
    id: 10,
    question: 'What is the purpose of the alt attribute on an image?',
    options: [
      { label: 'A', text: 'It makes the image load faster' },
      { label: 'B', text: 'It changes the image size' },
      { label: 'C', text: 'It adds a border to the image' },
      { label: 'D', text: 'It describes the image for search engines and screen readers' },
    ],
    correct: 'D',
    objective: 'Apply on-page SEO',
    moduleRef: 'Module 6',
    explanation: 'Descriptive alt text helps visually impaired visitors using screen readers and lets search engines index the image.',
  },
];

export const PRACTICAL_TASKS: PracticalTask[] = [
  {
    id: 1,
    title: 'Education Section & Custom Heading Colour',
    description:
      'Add a new section titled "Education" to your page with a heading and a list of two items. Style its heading in a colour different from the other headings.',
    evidence: 'Screenshot of the section and the HTML and CSS lines used',
    objective: 'Build with HTML & Style with CSS',
  },
  {
    id: 2,
    title: 'AI-Assisted Title Tag & Meta Description',
    description:
      'Write a prompt asking an AI assistant to suggest a title tag and a meta description for your page. Update your page with the result after correcting it in your own words.',
    evidence: 'The prompt used and the final title and description',
    objective: 'Use AI & Apply On-Page SEO',
  },
  {
    id: 3,
    title: 'Commit & Verify Live Site on GitHub Pages',
    description:
      'Commit the changes from Tasks 1 and 2 to your GitHub repository and confirm that the live site shows them.',
    evidence: 'Live website link and repository link',
    objective: 'Work with GitHub & Publish with GitHub Pages',
  },
];

export const PARTICIPANT_REFERENCES = [
  {
    resource: 'MDN Web Docs',
    use: 'Trusted reference for HTML and CSS with beginner guides',
    address: 'developer.mozilla.org',
    url: 'https://developer.mozilla.org',
  },
  {
    resource: 'W3Schools',
    use: 'Short lessons with a try-it-yourself editor',
    address: 'w3schools.com',
    url: 'https://www.w3schools.com',
  },
  {
    resource: 'freeCodeCamp',
    use: 'Free structured course on responsive web design',
    address: 'freecodecamp.org',
    url: 'https://www.freecodecamp.org',
  },
  {
    resource: 'GitHub Docs',
    use: 'Official guides for repositories and GitHub Pages',
    address: 'docs.github.com',
    url: 'https://docs.github.com',
  },
  {
    resource: 'Google Search Central',
    use: "Google's SEO Starter Guide for beginners",
    address: 'developers.google.com/search',
    url: 'https://developers.google.com/search',
  },
];

export const NEXT_STEP_PATH = [
  {
    stage: 1,
    learn: 'More HTML and CSS: forms, Flexbox, Grid, responsive design',
    why: 'Build multi-section, mobile-friendly layouts',
  },
  {
    stage: 2,
    learn: 'JavaScript basics',
    why: 'Add interaction such as menus, sliders and form checks',
  },
  {
    stage: 3,
    learn: 'Git commands and GitHub workflow',
    why: 'Work the way software teams work',
  },
  {
    stage: 4,
    learn: 'A front-end framework and a back-end language',
    why: 'Move towards full stack development',
  },
  {
    stage: 5,
    learn: 'SEO and digital marketing',
    why: 'Bring visitors to the websites you build',
  },
];

export const FEEDBACK_RATING_QUESTIONS = [
  'Overall, how would you rate the workshop?',
  "How clear were the trainer's explanations?",
  'How useful were the hands-on exercises?',
  'How suitable was the pace of the session?',
  'How was the online experience (audio, screen share, support in chat)?',
  'How confident are you now to build and publish a simple website on your own?',
];
