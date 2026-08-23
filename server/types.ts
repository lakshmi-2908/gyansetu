export interface KBChunk {
  chunkId: string;
  classLevel: number;
  pageNumber: number;
  pageRange?: string;
  chapterNumber: number;
  chapterTitle: string;
  subject: string;
  conceptTag: string;
  conceptName: string;
  text: string;
  vector: number[]; // dense or sparse vector weights
  keywords: string[];
}

export interface RetrievalResult {
  chunk: KBChunk;
  score: number;
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
  timestamp: string; // ISO string
  details?: string;
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
  struggleScore: number; // calculated weighted difficulty score
  totalInteractions: number;
}

export interface TeacherSummaryResponse {
  classCode: string;
  totalStudents: number;
  totalEvents: number;
  conceptStats: TeacherConceptStat[];
  recentEvents: EventLogEntry[];
  isSampleData: boolean;
}

export interface AskRequest {
  query: string;
  studentSessionId: string;
  classCode?: string;
  classLevel?: number;
  subjectFilter?: string;
  history?: Array<{ role: "user" | "assistant"; content: string; citations?: string[] }>;
  simplify?: boolean;
}

export interface AskResponse {
  answer: string;
  isGrounded: boolean;
  groundingBadge: string;
  groundingStatus: "grounded" | "ungrounded";
  citations: Array<{
    classLevel?: number;
    subject?: string;
    chapter: string;
    pageNumber: number;
    conceptTag: string;
    textSnippet: string;
  }>;
  conceptTag?: string;
  classLevel?: number;
  subject?: string;
  brainUsed: string;
  latencyMs: number;
  languageDetected?: string;
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

export interface PracticeRequest {
  studentSessionId: string;
  classCode?: string;
  classLevel?: number;
  subjectFilter?: string;
  preferredConcept?: string;
}

export interface PracticeResponse {
  questions: PracticeQuestion[];
  targetedConcepts: string[];
  brainUsed: string;
  latencyMs: number;
  isGrounded: boolean;
}

export interface SubmitPracticeRequest {
  studentSessionId: string;
  classCode?: string;
  conceptTag: string;
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface HealthResponse {
  status: "ok" | "degraded" | "error";
  brainPrimary: string;
  brainFallback: string;
  indexLoaded: boolean;
  indexedChunksCount: number;
  eventsCount: number;
  timestamp: string;
}
