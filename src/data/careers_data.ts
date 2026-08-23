export interface CareerPathway {
  id: string;
  title: string;
  hindiTitle: string;
  stream: "Science" | "Commerce" | "Humanities/Arts" | "Vocational/ITI" | "Govt Exams & Defense";
  eligibility: string;
  keyEntranceOrAdmission: string;
  freeGovtColleges: string[];
  scholarshipApplicable: string;
  expectedStartingSalary: string;
  description: string;
  recommendedNCERTSubjects: string[];
  zeroCoachingStrategy: string;
}

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: "iti-polytechnic",
    title: "Polytechnic Diploma & ITI (Engineering Trades)",
    hindiTitle: "पॉलीटेक्निक डिप्लोमा व आईटीआई (तकनीकी क्षेत्र)",
    stream: "Vocational/ITI",
    eligibility: "Class 10 Pass (Min 35-50% in Science & Maths)",
    keyEntranceOrAdmission: "State Polytechnic Entrance (JEECUP / CET / POLYCET)",
    freeGovtColleges: [
      "Government Polytechnic Colleges (Almost Zero Tuition in most states)",
      "National Skill Training Institutes (NSTI)",
      "Govt Industrial Training Institutes (ITI)"
    ],
    scholarshipApplicable: "Post-Matric Scholarship + State Technical Education Grant",
    expectedStartingSalary: "₹18,000 - ₹32,000 / month (Immediate employment after 3 yrs)",
    description: "Ideal for students seeking early financial independence and practical engineering technical jobs in Indian Railways, PSUs, State Electricity Boards, and automotive plants.",
    recommendedNCERTSubjects: ["Class 10 Science (Electricity, Light, Metals)", "Class 10 Maths (Trigonometry, Algebra)"],
    zeroCoachingStrategy: "Master NCERT Class 9-10 Maths & Science thoroughly. Solve previous 5 years state polytechnic question papers freely available on state technical boards."
  },
  {
    id: "nda-defense",
    title: "National Defence Academy (NDA & Naval Academy)",
    hindiTitle: "राष्ट्रीय रक्षा अकादमी (एनडीए / नौसेना)",
    stream: "Govt Exams & Defense",
    eligibility: "Class 12 Pass (PCM for Air Force/Navy, Any stream for Army), Age 16.5 - 19.5",
    keyEntranceOrAdmission: "UPSC NDA & NA Exam (Conducted twice a year)",
    freeGovtColleges: [
      "National Defence Academy, Khadakwasla (100% Free Education, Boarding & Stipend)",
      "Indian Naval Academy, Ezhimala"
    ],
    scholarshipApplicable: "100% Govt Funded Cadetship + ₹56,100/mo stipend during training",
    expectedStartingSalary: "₹75,000+ / month (Lieutenant rank officer in Armed Forces)",
    description: "Prestigious direct officer-level commission in Indian Army, Navy, and Air Force with full state-sponsored education and lifelong pride.",
    recommendedNCERTSubjects: ["Class 11-12 Maths (Calculus, Trigonometry, Vectors)", "Class 9-10 Social Science & Science (General Ability Test)"],
    zeroCoachingStrategy: "Focus on NCERT Maths (Class 11-12) and NCERT Science/History/Geography for the GAT section. Practice daily running/physical fitness."
  },
  {
    id: "bsc-nursing-paramedical",
    title: "B.Sc Nursing & Govt Paramedical Sciences",
    hindiTitle: "बी.एससी नर्सिंग व पैरामेडिकल साइंसेज",
    stream: "Science",
    eligibility: "Class 12 Pass with PCB (Physics, Chemistry, Biology) Min 45-50%",
    keyEntranceOrAdmission: "AIIMS B.Sc Nursing Entrance / State Nursing CET",
    freeGovtColleges: [
      "AIIMS New Delhi & Regional AIIMS (Tuition fee ~ ₹1,000/yr)",
      "Govt Medical Colleges (GMC) Nursing Institutes",
      "Safdarjung Hospital College of Nursing"
    ],
    scholarshipApplicable: "National Scholarship Portal + Begum Hazrat Mahal (for girls)",
    expectedStartingSalary: "₹35,000 - ₹65,000 / month in Govt Hospitals & Global healthcare",
    description: "Highly demanded, recession-proof medical healthcare career without the need to pay crores in private MBBS donations.",
    recommendedNCERTSubjects: ["Class 11-12 Biology (Human Physiology, Genetics)", "Class 11-12 Chemistry"],
    zeroCoachingStrategy: "AIIMS Nursing exam is 100% strictly line-by-line based on NCERT Biology Classes 11 and 12. No expensive coaching required if NCERT diagrams and summary tables are mastered."
  },
  {
    id: "cuet-central-univ",
    title: "Central Universities B.A / B.Com / B.Sc (Honours)",
    hindiTitle: "केंद्रीय विश्वविद्यालय स्नातक (डीयू, बीएचयू, जेएनयू)",
    stream: "Humanities/Arts",
    eligibility: "Class 12 Pass (Any stream with relevant subjects)",
    keyEntranceOrAdmission: "CUET-UG (National Testing Agency)",
    freeGovtColleges: [
      "University of Delhi (DU) Top Colleges (St. Stephens, SRCC, Hindu, Miranda)",
      "Banaras Hindu University (BHU)",
      "Jamia Millia Islamia / Aligarh Muslim University",
      "Jawaharlal Nehru University (Foreign Languages)"
    ],
    scholarshipApplicable: "NSP Central Sector Scheme (₹12,000 - ₹20,000/yr) + State Fee Waiver",
    expectedStartingSalary: "₹30,000 - ₹60,000 / month (Corporate placements, Civil Services prep)",
    description: "Affordable world-class higher education leading to Civil Services (UPSC), Economics, Journalism, Data Analytics, and Corporate Careers at near-zero government fees.",
    recommendedNCERTSubjects: ["Class 11-12 Domain Subjects (Economics, Political Science, History, Maths, Accountancy)"],
    zeroCoachingStrategy: "CUET-UG domain syllabus is strictly 100% syllabus from NCERT Class 12 textbooks. Thoroughly reading every NCERT chapter box guarantees top percentiles."
  },
  {
    id: "govt-banking-ssc",
    title: "SSC CHSL / MTS & State Govt Services",
    hindiTitle: "एसएससी सीएचएसएल, रेलवे व राज्य सरकारी सेवाएं",
    stream: "Govt Exams & Defense",
    eligibility: "Class 10 Pass (for MTS/GD) / Class 12 Pass (for CHSL/Postal Assistant)",
    keyEntranceOrAdmission: "SSC CHSL / SSC MTS / RRB NTPC / State Police Recruitment",
    freeGovtColleges: [
      "Direct Recruitment to Central & State Ministries",
      "Indian Railways (RRB Group C & D)",
      "State Police / Forest Guards"
    ],
    scholarshipApplicable: "Immediate Govt Salary with job security & pension benefits",
    expectedStartingSalary: "₹26,000 - ₹42,000 / month (Permanent Govt Job)",
    description: "Direct entry into government service immediately after Class 10 or 12 for students needing secure family income support.",
    recommendedNCERTSubjects: ["Class 6-10 NCERT Social Science (History, Polity)", "Class 6-10 NCERT Maths (Arithmetic)"],
    zeroCoachingStrategy: "Daily solve 1 previous year paper. Read NCERT Social Studies summaries and revise Basic Arithmetic from Classes 6 to 10."
  },
  {
    id: "commerce-ca-cma",
    title: "Chartered Accountancy (CA Foundation) & B.Com",
    hindiTitle: "चार्टर्ड एकाउंटेंसी (सीए) व कॉमर्स",
    stream: "Commerce",
    eligibility: "Class 12 Pass (Commerce or Science with Maths)",
    keyEntranceOrAdmission: "ICAI CA Foundation Exam (Self-Study friendly)",
    freeGovtColleges: [
      "Govt Commerce Colleges",
      "ICAI Self-Paced Regional Chapters (Affordable registration fees)"
    ],
    scholarshipApplicable: "ICAI Merit-cum-Means Concession + NSP Scholarships",
    expectedStartingSalary: "₹55,000 - ₹1,20,000 / month upon qualifying CA / Corporate Audit",
    description: "Prestigious finance career open to students from all economic backgrounds without reservation quotas, decided purely on hard work and merit.",
    recommendedNCERTSubjects: ["Class 11-12 Accountancy (Ledgers, Balance Sheet, Partnership)", "Class 11-12 Business Studies & Economics"],
    zeroCoachingStrategy: "ICAI study modules + NCERT Accountancy textbooks are self-sufficient. Free ICAI BoS online lectures are provided by the institute directly."
  }
];
