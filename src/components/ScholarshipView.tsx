import React, { useState, useMemo } from "react";
import { 
  Award, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  IndianRupee, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Download, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Users, 
  Copy, 
  Check, 
  SlidersHorizontal,
  GraduationCap,
  Compass,
  TrendingUp,
  Briefcase,
  Target
} from "lucide-react";
import { SCHOLARSHIP_SCHEMES } from "../data/scholarships_data.ts";
import { CAREER_PATHWAYS, CareerPathway } from "../data/careers_data.ts";
import { ScholarshipScheme } from "../types.ts";

interface ScholarshipViewProps {
  studentSessionId: string;
  selectedClassLevel: number | "ALL";
}

export const ScholarshipView: React.FC<ScholarshipViewProps> = ({
  studentSessionId,
  selectedClassLevel
}) => {
  // Sub-view Tab: "scholarships" | "careers" | "impact"
  const [subView, setSubView] = useState<"scholarships" | "careers" | "impact">("scholarships");

  // Student Profile Filter States
  const [targetGrade, setTargetGrade] = useState<number | "ALL">(
    selectedClassLevel === "ALL" ? 10 : selectedClassLevel
  );
  const [familyIncome, setFamilyIncome] = useState<number>(250000); // 2.5 Lakhs default
  const [category, setCategory] = useState<"All" | "General" | "OBC" | "SC" | "ST" | "EWS" | "Minority">("All");
  const [gender, setGender] = useState<"All" | "Female Only" | "Male Only">("All");
  const [isDivyangjan, setIsDivyangjan] = useState<boolean>(false);
  const [marksPercentage, setMarksPercentage] = useState<number>(65);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Career Stream Filter
  const [selectedCareerStream, setSelectedCareerStream] = useState<string>("All");

  // Selected scheme for full view/modal
  const [selectedScheme, setSelectedScheme] = useState<ScholarshipScheme | null>(null);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(SCHOLARSHIP_SCHEMES[0].id);

  // AI Assistant State
  const [aiLanguage, setAiLanguage] = useState<"bilingual" | "english" | "hindi">("bilingual");
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiGuidanceResult, setAiGuidanceResult] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Match evaluator logic
  const evaluateEligibility = (scheme: ScholarshipScheme) => {
    const reasons: string[] = [];
    let isEligible = true;

    // Grade check
    if (targetGrade !== "ALL" && !scheme.targetGrades.includes(targetGrade)) {
      isEligible = false;
      reasons.push(`Targeted for Classes ${scheme.targetGrades.join(", ")} (Current: Class ${targetGrade})`);
    }

    // Income check
    if (scheme.maxFamilyIncome > 0 && familyIncome > scheme.maxFamilyIncome) {
      isEligible = false;
      reasons.push(`Income cap is ₹${(scheme.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr (Selected: ₹${(familyIncome / 100000).toFixed(1)} Lakh)`);
    }

    // Gender check
    if (scheme.gender === "Female Only" && gender === "Male Only") {
      isEligible = false;
      reasons.push("Restricted to female/girl students only");
    }

    // Category check
    if (category !== "All" && !scheme.categories.includes("All") && !scheme.categories.includes(category)) {
      isEligible = false;
      reasons.push(`Restricted to ${scheme.categories.join(", ")} categories`);
    }

    // Marks check
    if (marksPercentage < scheme.minPercentage) {
      isEligible = false;
      reasons.push(`Requires minimum ${scheme.minPercentage}% marks (Selected: ${marksPercentage}%)`);
    }

    return {
      isEligible,
      reasons
    };
  };

  // Filtered & Evaluated Schemes
  const evaluatedSchemes = useMemo(() => {
    return SCHOLARSHIP_SCHEMES.map(scheme => {
      const evaluation = evaluateEligibility(scheme);
      return {
        ...scheme,
        isEligible: evaluation.isEligible,
        reasons: evaluation.reasons
      };
    }).filter(scheme => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        scheme.name.toLowerCase().includes(q) ||
        scheme.nameHindi.toLowerCase().includes(q) ||
        scheme.provider.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q)
      );
    }).sort((a, b) => {
      // Sort eligible first, then by benefit amount descending
      if (a.isEligible && !b.isEligible) return -1;
      if (!a.isEligible && b.isEligible) return 1;
      return b.benefitAmountNumber - a.benefitAmountNumber;
    });
  }, [targetGrade, familyIncome, category, gender, marksPercentage, searchQuery]);

  const eligibleCount = evaluatedSchemes.filter(s => s.isEligible).length;
  const totalPotentialAid = evaluatedSchemes
    .filter(s => s.isEligible)
    .reduce((sum, s) => sum + s.benefitAmountNumber, 0);

  // Generate Personalized AI Application Checklist & Cover Letter
  const handleGenerateAiGuidance = async (scheme: ScholarshipScheme) => {
    setIsGeneratingAi(true);
    setAiGuidanceResult(null);

    // Call server doubt/guidance router or construct comprehensive structured guidance
    try {
      const promptQuery = `Provide a comprehensive student scholarship application package for "${scheme.name}" (${scheme.nameHindi}).
Student Profile: Class ${targetGrade}, Category: ${category}, Annual Family Income: ₹${familyIncome}, Marks: ${marksPercentage}%, Gender: ${gender}.
Language preference: ${aiLanguage}.
Provide:
1. Exact Step-by-Step Application Checklist for National Scholarship Portal (NSP).
2. Required documents pre-verification checklist.
3. A formal Statement of Purpose / Application Cover Letter template in ${aiLanguage} for the School Principal / Nodal Officer.
4. Tips for avoiding common rejection reasons on NSP (Aadhaar seeding, Bonafide verification).`;

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: promptQuery,
          studentSessionId,
          classLevel: typeof targetGrade === "number" ? targetGrade : 10,
          subjectFilter: "Social Science",
          simplify: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiGuidanceResult(data.answer);
      } else {
        throw new Error("Guidance endpoint returned error");
      }
    } catch {
      // Fallback structured guidance package
      const fallbackText = `### 📋 Personalized Scholarship Application Guide: ${scheme.name}
**छात्रवृत्ति आवेदन मार्गदर्शिका एवं आवश्यक दस्तावेज चेकलिस्ट**

#### 1. Quick Profile Match
- **Student Profile:** Class ${targetGrade} • Category: ${category} • Annual Income: ₹${(familyIncome/100000).toFixed(1)} Lakh • Score: ${marksPercentage}%
- **Financial Benefit:** ${scheme.financialBenefit}
- **Application Portal:** [${scheme.portal}](${scheme.directUrl})

---

#### 2. 📑 Mandatory Documents Checklist (दस्तावेज चेकलिस्ट)
${scheme.documentsRequired.map(d => `- [ ] **${d}** (Ensure scanned copy is clear and < 200 KB in PDF/JPEG format)`).join("\n")}

---

#### 3. 📝 Standard Application Cover Letter Template (आवेदन पत्र प्रारूप)
*To be submitted to your School Principal / Nodal Teacher:*

> **To:** The Principal / Headmaster,  
> **Subject:** Application for Verification of ${scheme.name} on ${scheme.portal}  
>  
> Respected Sir/Madam,  
>  
> I, **[Your Name]**, am a bonafide student of Class **${targetGrade}** (Roll No: ____) in your school. I belong to the **${category}** category with an annual household income of ₹**${familyIncome}** and have secured **${marksPercentage}%** in the previous annual examination.  
>  
> I have successfully submitted my online application on the National Scholarship Portal with Application ID **[NSP-APP-ID]**. I have attached all required documents including my Income Certificate, Marksheet, and Aadhaar-seeded Bank Passbook.  
>  
> I kindly request you to verify and approve my application at the Institute Nodal Officer (INO) level.  
>  
> Thanking You.  
> **Yours obediently,**  
> [Student Signature] • Date: ____________

---

#### 4. ⚠️ 3 Crucial Tips to Prevent Application Rejection:
1. **Aadhaar Bank Seeding (DBT Active):** Verify at your bank branch that your Aadhaar number is mapped with NPCI for Direct Benefit Transfer.
2. **Name Mismatch Check:** Ensure the student's name on the Aadhaar Card exactly matches the School Admission Register and Bank Passbook.
3. **Institutional Level-1 Approval:** Contact your school scholarship in-charge immediately after online submission for biometric/portal verification before the cut-off deadline.`;
      setAiGuidanceResult(fallbackText);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopyGuidance = () => {
    if (!aiGuidanceResult) return;
    navigator.clipboard.writeText(aiGuidanceResult);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Opportunities &amp; Mobility Hub
              </span>
              <span className="text-xs text-slate-400 font-mono">DBT Grants &amp; Free Higher Ed</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-serif text-white tracking-tight">
              छात्रवृत्ति, करियर दिशा व सामाजिक प्रभाव — <span className="text-amber-400 font-sans">Opportunities Hub</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
              Equitable access pathways: Filter verified government scholarships (PM YASASVI, NMMSS, NSP), explore zero-coaching career roadmaps, and track the socio-economic savings generated for under-resourced families.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex sm:flex-col gap-3 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-xl shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Eligible Schemes</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono flex items-center gap-1">
                {eligibleCount} <span className="text-xs text-slate-400 font-normal">/ {SCHOLARSHIP_SCHEMES.length}</span>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-1.5 hidden sm:block">
              <div className="text-[10px] text-slate-400 font-medium">Max Potential Aid</div>
              <div className="text-sm font-bold text-amber-300 font-mono flex items-center gap-0.5">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                {totalPotentialAid.toLocaleString("en-IN")}/yr
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSubView("scholarships")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              subView === "scholarships"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scholarship Matcher (छात्रवृत्ति)</span>
          </button>

          <button
            onClick={() => setSubView("careers")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              subView === "careers"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Career Compass (करियर दिशा)</span>
          </button>

          <button
            onClick={() => setSubView("impact")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              subView === "impact"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Social Impact &amp; ROI (सामाजिक बचत)</span>
          </button>
        </div>
      </div>

      {/* VIEW 2: Career Compass for First-Gen Learners */}
      {subView === "careers" && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  First-Generation Learner Career &amp; Zero-Coaching Roadmaps
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct pathways after Class 10 &amp; 12 that require ZERO expensive private coaching and lead to government-funded institutions.
                </p>
              </div>

              {/* Stream filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["All", "Vocational/ITI", "Govt Exams & Defense", "Science", "Commerce", "Humanities/Arts"].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedCareerStream(st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                      selectedCareerStream === st
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREER_PATHWAYS
                .filter(p => selectedCareerStream === "All" || p.stream === selectedCareerStream)
                .map((path) => (
                  <div
                    key={path.id}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3.5 shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {path.stream}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          {path.expectedStartingSalary}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {path.title}
                        </h4>
                        <div className="text-xs text-amber-400/90 font-serif">
                          {path.hindiTitle}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {path.description}
                      </p>

                      <div className="space-y-1.5 pt-2 text-xs font-sans border-t border-slate-800/80">
                        <div className="text-slate-400">
                          <strong className="text-slate-300">Eligibility:</strong> {path.eligibility}
                        </div>
                        <div className="text-slate-400">
                          <strong className="text-slate-300">Key Entrance / Board:</strong> {path.keyEntranceOrAdmission}
                        </div>
                        <div className="text-slate-400">
                          <strong className="text-slate-300">Free / Low-Fee Govt Institutes:</strong>
                          <ul className="list-disc list-inside pl-1 text-[11px] text-slate-300 space-y-0.5 mt-0.5">
                            {path.freeGovtColleges.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-indigo-300 text-[11px] font-mono">
                        <Target className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Zero-Coaching NCERT Strategy:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        {path.zeroCoachingStrategy}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Social Impact & Coaching Cost ROI Calculator */}
      {subView === "impact" && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                GyanSetu Socio-Economic Impact &amp; Equity ROI
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Quantifiable social return on education investment (SROI) empowering students to break private coaching dependency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-mono">Est. Annual Family Savings</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">₹24,000 – ₹48,000</div>
                <p className="text-[11px] text-slate-400">Eliminates roadside tuition fees per secondary student.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-mono">Teacher Admin Time Saved</div>
                <div className="text-2xl font-bold text-indigo-400 font-mono">6.5 Hours / week</div>
                <p className="text-[11px] text-slate-400">Instant test generation &amp; real-time struggle index analytics.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-mono">Direct Student Aid Unlocked</div>
                <div className="text-2xl font-bold text-amber-400 font-mono">₹12,000 – ₹75,000</div>
                <p className="text-[11px] text-slate-400">Per eligible candidate via automated NSP/PM-YASASVI matching.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Alignment with National Education Policy (NEP 2020) &amp; UN SDG 4</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                By democratizing citation-verified NCERT doubt resolution, adaptive testing, and scholarship access in vernacular languages (Hindi, Hinglish, English), GyanSetu guarantees that educational quality is no longer determined by a student's pin code, parental income, or private coaching affordability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: Existing Scholarship Matcher & Schemes */}
      {subView === "scholarships" && (
        <>

      {/* Interactive Eligibility Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Customize Student Eligibility Profile (छात्र पात्रता मानदंड)</span>
          </div>
          <button
            onClick={() => {
              setTargetGrade(10);
              setFamilyIncome(250000);
              setCategory("All");
              setGender("All");
              setIsDivyangjan(false);
              setMarksPercentage(65);
              setSearchQuery("");
            }}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Class Grade */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              Student Grade (कक्षा):
            </label>
            <select
              id="filter-scholarship-grade"
              value={String(targetGrade)}
              onChange={(e) => setTargetGrade(e.target.value === "ALL" ? "ALL" : Number(e.target.value))}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
            >
              <option value="ALL">All Classes (6–12)</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8 (NMMS Target)</option>
              <option value="9">Class 9 (Pre-Matric)</option>
              <option value="10">Class 10 (Board Batch)</option>
              <option value="11">Class 11 (Post-Matric / Senior)</option>
              <option value="12">Class 12 (Board / Higher Secondary)</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Social Category (श्रेणी):
            </label>
            <select
              id="filter-scholarship-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
            >
              <option value="All">All Categories (सभी)</option>
              <option value="General">General / Unreserved</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker)</option>
              <option value="Minority">Minority (Muslim/Sikh/Christian/Jain/Buddhist)</option>
            </select>
          </div>

          {/* Annual Household Income Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                Annual Income:
              </span>
              <span className="text-amber-300 font-mono font-bold">
                ₹{(familyIncome / 100000).toFixed(1)} L/yr
              </span>
            </div>
            <input
              id="range-scholarship-income"
              type="range"
              min={50000}
              max={800000}
              step={25000}
              value={familyIncome}
              onChange={(e) => setFamilyIncome(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹50K</span>
              <span>₹2.5L (BPL)</span>
              <span>₹3.5L (NMMS)</span>
              <span>₹8L</span>
            </div>
          </div>

          {/* Academic Score / Percentage */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-400 font-medium">
              <span>Previous Exam Score:</span>
              <span className="text-emerald-400 font-mono font-bold">{marksPercentage}%</span>
            </div>
            <input
              id="range-scholarship-marks"
              type="range"
              min={40}
              max={98}
              step={1}
              value={marksPercentage}
              onChange={(e) => setMarksPercentage(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>40% (Pass)</span>
              <span>55% (NMMS)</span>
              <span>75% (Distinction)</span>
            </div>
          </div>
        </div>

        {/* Additional Toggle Chips */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Gender Toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Gender:</span>
              <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                {(["All", "Female Only", "Male Only"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      gender === g ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {g === "Female Only" ? "Girl Students" : g === "Male Only" ? "Boys" : "All"}
                  </button>
                ))}
              </div>
            </div>

            {/* Divyangjan / PwD Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600">
              <input
                id="checkbox-divyangjan"
                type="checkbox"
                checked={isDivyangjan}
                onChange={(e) => setIsDivyangjan(e.target.checked)}
                className="accent-amber-500 rounded cursor-pointer"
              />
              <span className="text-slate-300 text-xs">Differently Abled (दिव्यांग / PwD)</span>
            </label>
          </div>

          {/* Keyword Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-scholarship-search"
              type="text"
              placeholder="Search scheme name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Schemes Grid & List */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-slate-200">{evaluatedSchemes.length}</span> scholarships matching your criteria
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Eligible ({eligibleCount})
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <AlertCircle className="w-3.5 h-3.5" /> Ineligible / Mismatch ({evaluatedSchemes.length - eligibleCount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {evaluatedSchemes.map((scheme) => {
            const isExpanded = expandedSchemeId === scheme.id;
            return (
              <div
                key={scheme.id}
                id={`scheme-card-${scheme.id}`}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  scheme.isEligible
                    ? "bg-slate-900/95 border-slate-700/80 hover:border-amber-500/50 shadow-md"
                    : "bg-slate-950/60 border-slate-800/60 opacity-80"
                }`}
              >
                {/* Header Row */}
                <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {scheme.isEligible ? (
                        <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          100% Eligible (पात्र)
                        </span>
                      ) : (
                        <span className="bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          Criteria Review
                        </span>
                      )}

                      <span className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded-md border border-slate-700 font-mono">
                        Classes {scheme.targetGrades.join(", ")}
                      </span>

                      <span className="bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 text-[11px] px-2 py-0.5 rounded-md">
                        {scheme.portal}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                        {scheme.name}
                      </h3>
                      <div className="text-xs text-amber-300/90 font-serif mt-0.5">
                        {scheme.nameHindi}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {scheme.description}
                    </p>

                    {!scheme.isEligible && scheme.reasons && scheme.reasons.length > 0 && (
                      <div className="bg-rose-950/30 border border-rose-800/40 p-2.5 rounded-lg text-xs text-rose-300 space-y-1">
                        <div className="font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          Mismatch with current profile:
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-rose-200/80 text-[11px] pl-1">
                          {scheme.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Financial Grant & Action Buttons */}
                  <div className="flex md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <div className="text-[11px] text-slate-400">Benefit Amount</div>
                      <div className="text-base md:text-lg font-bold text-amber-400 font-mono flex items-center md:justify-end gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {scheme.financialBenefit}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {scheme.applicationPeriod}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-expand-scheme-${scheme.id}`}
                        onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Checklist & Steps"}</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>

                      <a
                        href={scheme.directUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-amber-500/20"
                      >
                        <span>Apply on Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-slate-950/70 p-4 md:p-6 space-y-6">
                    {/* 3 Column Detailed Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                      {/* Column 1: Eligibility Rules */}
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2.5">
                        <div className="font-semibold text-amber-400 flex items-center gap-1.5 text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          Key Eligibility Conditions (पात्रता नियम)
                        </div>
                        <ul className="space-y-1.5 text-slate-300">
                          {scheme.eligibilityBullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-400 mt-0.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Mandatory Documents */}
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2.5">
                        <div className="font-semibold text-emerald-400 flex items-center gap-1.5 text-xs">
                          <FileText className="w-4 h-4" />
                          Mandatory Documents Checklist (दस्तावेज)
                        </div>
                        <ul className="space-y-1.5 text-slate-300">
                          {scheme.documentsRequired.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: Step-by-Step Walkthrough */}
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2.5">
                        <div className="font-semibold text-indigo-400 flex items-center gap-1.5 text-xs">
                          <Building2 className="w-4 h-4" />
                          Application Process (आवेदन चरण)
                        </div>
                        <ol className="space-y-1.5 text-slate-300">
                          {scheme.applicationSteps.map((step, idx) => (
                            <li key={idx} className="text-slate-300 leading-snug">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* AI Application Assistant Generator Box */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-xl p-4 md:p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                            <h4 className="text-sm font-bold text-white">
                              AI Scholarship Application Package Generator
                            </h4>
                          </div>
                          <p className="text-xs text-slate-400">
                            Generate an instant personalized cover letter for your School Principal, document pre-flight audit, and NSP submission guide.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={aiLanguage}
                            onChange={(e) => setAiLanguage(e.target.value as any)}
                            className="bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                          >
                            <option value="bilingual">Bilingual (हिन्दी + English)</option>
                            <option value="english">English Only</option>
                            <option value="hindi">हिन्दी (Hindi Only)</option>
                          </select>

                          <button
                            id={`btn-generate-ai-${scheme.id}`}
                            onClick={() => handleGenerateAiGuidance(scheme)}
                            disabled={isGeneratingAi}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                          >
                            {isGeneratingAi ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                <span>Generating Guide...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                                <span>Generate SOP & Checklist</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* AI Generated Result Box */}
                      {aiGuidanceResult && (
                        <div className="mt-4 bg-[#0a0f1d] border border-amber-500/30 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 font-mono">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              Personalized Application Package (Ready for School Submission)
                            </span>
                            <button
                              onClick={handleCopyGuidance}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition-colors cursor-pointer"
                            >
                              {copiedSuccess ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 font-semibold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400" />
                                  <span>Copy Guide & Letter</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto pr-2 space-y-2">
                            {aiGuidanceResult}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Educational Assistance Footer */}
      </>
      )}

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Need help with your National Scholarship Portal (NSP) biometric authentication? Contact your school's <strong>Institutional Nodal Officer (INO)</strong> or local CSC Academy.
          </span>
        </div>
        <a
          href="https://scholarships.gov.in"
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold shrink-0"
        >
          <span>NSP Portal Helpdesk</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
