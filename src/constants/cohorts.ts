export interface CohortOption {
  code: string;
  name: string;
  classLevel: number | "ALL";
  section: string;
  description: string;
}

export const ALL_COHORTS: CohortOption[] = [
  // Cross-Grade Aggregate
  { code: "ALL-COHORTS", name: "All Cohorts (Classes 6–12)", classLevel: "ALL", section: "All", description: "School-wide cross-grade aggregate" },

  // Class 6
  { code: "CLASS-6A", name: "Class 6-A", classLevel: 6, section: "A", description: "Class 6 - Section A (Middle School)" },
  { code: "CLASS-6B", name: "Class 6-B", classLevel: 6, section: "B", description: "Class 6 - Section B (Middle School)" },

  // Class 7
  { code: "CLASS-7A", name: "Class 7-A", classLevel: 7, section: "A", description: "Class 7 - Section A (Middle School)" },
  { code: "CLASS-7B", name: "Class 7-B", classLevel: 7, section: "B", description: "Class 7 - Section B (Middle School)" },

  // Class 8
  { code: "CLASS-8A", name: "Class 8-A", classLevel: 8, section: "A", description: "Class 8 - Section A (Middle School)" },
  { code: "CLASS-8B", name: "Class 8-B", classLevel: 8, section: "B", description: "Class 8 - Section B (Middle School)" },

  // Class 9
  { code: "CLASS-9A", name: "Class 9-A", classLevel: 9, section: "A", description: "Class 9 - Section A (Secondary)" },
  { code: "CLASS-9B", name: "Class 9-B", classLevel: 9, section: "B", description: "Class 9 - Section B (Secondary)" },

  // Class 10
  { code: "CLASS-10A", name: "Class 10-A", classLevel: 10, section: "A", description: "Class 10 - Section A (Board Batch)" },
  { code: "CLASS-10B", name: "Class 10-B", classLevel: 10, section: "B", description: "Class 10 - Section B (Board Batch)" },
  { code: "CLASS-10C", name: "Class 10-C", classLevel: 10, section: "C", description: "Class 10 - Section C (Board Batch)" },

  // Class 11
  { code: "CLASS-11-SCI", name: "Class 11-Science", classLevel: 11, section: "Science", description: "Class 11 - Science (PCM / PCB)" },
  { code: "CLASS-11-COM", name: "Class 11-Commerce", classLevel: 11, section: "Commerce", description: "Class 11 - Commerce & Applied Math" },
  { code: "CLASS-11-ARTS", name: "Class 11-Humanities", classLevel: 11, section: "Arts", description: "Class 11 - Humanities & Social Science" },

  // Class 12
  { code: "CLASS-12-SCI", name: "Class 12-Science", classLevel: 12, section: "Science", description: "Class 12 - Science (Board Batch)" },
  { code: "CLASS-12-COM", name: "Class 12-Commerce", classLevel: 12, section: "Commerce", description: "Class 12 - Commerce (Board Batch)" },
  { code: "CLASS-12-ARTS", name: "Class 12-Humanities", classLevel: 12, section: "Arts", description: "Class 12 - Humanities (Board Batch)" }
];

export const COHORTS_BY_CLASS: Record<string, CohortOption[]> = {
  "ALL": ALL_COHORTS,
  "6": ALL_COHORTS.filter(c => c.classLevel === 6),
  "7": ALL_COHORTS.filter(c => c.classLevel === 7),
  "8": ALL_COHORTS.filter(c => c.classLevel === 8),
  "9": ALL_COHORTS.filter(c => c.classLevel === 9),
  "10": ALL_COHORTS.filter(c => c.classLevel === 10),
  "11": ALL_COHORTS.filter(c => c.classLevel === 11),
  "12": ALL_COHORTS.filter(c => c.classLevel === 12)
};

export function getDefaultCohortForClass(classLevel: number | "ALL"): string {
  if (classLevel === "ALL") return "ALL-COHORTS";
  const cohorts = ALL_COHORTS.filter(c => c.classLevel === classLevel);
  return cohorts.length > 0 ? cohorts[0].code : "CLASS-10A";
}
