export type ActiveSection = 'overview' | 'modules' | 'codelab' | 'miniproject' | 'assessment';

export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6;

export interface PersonalDetails {
  name: string;
  role: string;
  city: string;
  about: string;
  skill1: string;
  skill2: string;
  skill3: string;
  email: string;
  degree: string;
  college: string;
  gradYear: string;
  linkedinUrl: string;
  githubUsername: string;
  project1Title: string;
  project1Desc: string;
  project2Title: string;
  project2Desc: string;
}

export interface AgendaItem {
  time: string;
  session: string;
  topic: string;
  activityType: string;
  duration: string;
  moduleId?: ModuleId;
}

export interface KeyTerm {
  term: string;
  meaning: string;
  example?: string;
}

export interface McqQuestion {
  id: number;
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  objective: string;
  moduleRef: string;
  explanation: string;
}

export interface PracticalTask {
  id: number;
  title: string;
  description: string;
  evidence: string;
  objective: string;
}

export interface PromptTemplate {
  id: number;
  title: string;
  prompt: string;
  role: string;
  task: string;
  context: string;
  format: string;
  generatedHtml?: string;
  generatedCss?: string;
  explanationText: string;
}
