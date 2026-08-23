export interface Citation {
  classLevel?: number;
  subject?: string;
  chapter: string;
  pageNumber: number;
  conceptTag: string;
  textSnippet: string;
}

export interface DoubtMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isGrounded?: boolean;
  groundingBadge?: string;
  groundingStatus?: "grounded" | "ungrounded";
  citations?: Citation[];
  conceptTag?: string;
  brainUsed?: string;
  latencyMs?: number;
  isSimplified?: boolean;
  classLevel?: number;
  subject?: string;
}

export interface PracticeQuestion {
  id: string;
  classLevel?: number;
  subject?: string;
  conceptTag: string;
  conceptName: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  citation: {
    classLevel?: number;
    subject?: string;
    chapterTitle: string;
    pageNumber: number;
  };
}

export interface TeacherConceptStat {
  conceptTag: string;
  conceptName: string;
  chapterTitle: string;
  classLevel?: number;
  subject?: string;
  doubtCount: number;
  practiceAttempts: number;
  practiceWrong: number;
  struggleScore: number;
  totalInteractions: number;
}

export interface EventLogEntry {
  id?: string;
  studentSessionId: string;
  classCode: string;
  classLevel?: number;
  concept: string;
  conceptName?: string;
  type: "doubt" | "practice";
  correct: boolean | null;
  timestamp: string;
  details?: string;
}

export interface TeacherSummaryResponse {
  classCode: string;
  totalStudents: number;
  totalEvents: number;
  conceptStats: TeacherConceptStat[];
  recentEvents: EventLogEntry[];
  isSampleData: boolean;
}

export interface NCERTConceptMeta {
  conceptTag: string;
  conceptName: string;
  classLevel: number;
  chapterTitle: string;
  chapterNumber: number;
  subject: string;
  pageNumber: number;
}

export interface HealthData {
  status: "ok" | "degraded" | "error";
  brainPrimary: string;
  brainFallback: string;
  indexLoaded: boolean;
  indexedChunksCount: number;
  classesCovered?: string[];
  subjectsCovered?: string[];
  chaptersCount?: number;
  eventsCount: number;
  timestamp: string;
}

export interface ScholarshipScheme {
  id: string;
  name: string;
  nameHindi: string;
  provider: string;
  portal: "National Scholarship Portal (NSP)" | "State Portal" | "Direct / Departmental";
  directUrl: string;
  targetGrades: number[];
  categories: Array<"All" | "General" | "OBC" | "SC" | "ST" | "EWS" | "Minority">;
  gender: "All" | "Female Only" | "Male Only";
  maxFamilyIncome: number; // in INR (0 = no limit)
  minPercentage: number; // e.g. 50, 55, 60
  financialBenefit: string;
  benefitAmountNumber: number;
  applicationPeriod: string;
  description: string;
  descriptionHindi: string;
  eligibilityBullets: string[];
  documentsRequired: string[];
  applicationSteps: string[];
  keyHighlights: string[];
}

