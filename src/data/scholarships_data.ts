import { ScholarshipScheme } from "../types.ts";

export const SCHOLARSHIP_SCHEMES: ScholarshipScheme[] = [
  {
    id: "nmms-national-means-merit",
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    nameHindi: "राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना (NMMSS)",
    provider: "Department of School Education & Literacy, Ministry of Education, Govt of India",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [8, 9, 10, 11, 12],
    categories: ["All", "General", "OBC", "SC", "ST", "EWS"],
    gender: "All",
    maxFamilyIncome: 350000, // 3.5 Lakhs
    minPercentage: 55, // 55% for Gen/OBC (50% for SC/ST)
    financialBenefit: "₹12,000 per year (₹1,000/month via Direct Benefit Transfer - DBT)",
    benefitAmountNumber: 12000,
    applicationPeriod: "July to November annually on NSP",
    description: "Centrally sponsored flagship scheme awarded to meritorious students of economically weaker sections studying in Govt, Govt-aided, or Local body schools to prevent secondary stage dropouts.",
    descriptionHindi: "आर्थिक रूप से कमजोर वर्ग के प्रतिभाशाली विद्यार्थियों को कक्षा 9 से 12 तक की पढ़ाई जारी रखने हेतु प्रतिवर्ष ₹12,000 की वित्तीय सहायता।",
    eligibilityBullets: [
      "Student must be enrolled in a Government, Local Body, or Government-aided school.",
      "Annual parental income from all sources must not exceed ₹3,50,000.",
      "Must have scored at least 55% marks (50% for SC/ST) in Class 7 annual exam.",
      "Must qualify State-level NMMS selection exam (Mental Ability Test MAT & Scholastic Aptitude Test SAT).",
      "Students in Kendriya Vidyalayas, Navodaya Vidyalayas, and Sainik schools are not eligible."
    ],
    documentsRequired: [
      "Aadhaar Card of the Student / Parent",
      "Parental Income Certificate issued by competent Revenue Authority (Tehsildar/SDM)",
      "Class 7 & Class 8 Marksheets / Passing certificates",
      "Bank Account Passbook (Aadhaar-seeded bank account of student)",
      "Bonafide Student Certificate issued by School Headmaster",
      "Caste Certificate (if applying under SC/ST/OBC quota)"
    ],
    applicationSteps: [
      "Step 1: Register for the State-level NMMS examination in Class 8 through your school headmaster.",
      "Step 2: Appear for MAT and SAT examination and qualify in the merit list.",
      "Step 3: Register on National Scholarship Portal (scholarships.gov.in) with Aadhaar and bank details.",
      "Step 4: Select 'National Means-cum-Merit Scholarship Scheme' under Pre-Matric/Post-Matric section.",
      "Step 5: Submit application online and provide verification receipt to school nodal teacher for Level-1 & Level-2 approval."
    ],
    keyHighlights: [
      "1,00,000 fresh scholarships awarded every year across all States & UTs.",
      "Funds disbursed directly into student's Aadhaar-linked bank account (DBT).",
      "Renewable every year up to Class 12 upon securing at least 55% marks in annual exams."
    ]
  },
  {
    id: "pm-yasasvi-scheme",
    name: "PM Young Achievers Scholarship Award Scheme (PM YASASVI)",
    nameHindi: "पीएम यशस्वी छात्रवृत्ति योजना (PM YASASVI)",
    provider: "Ministry of Social Justice and Empowerment, Govt of India",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [9, 10, 11, 12],
    categories: ["OBC", "EWS", "All"],
    gender: "All",
    maxFamilyIncome: 250000, // 2.5 Lakhs
    minPercentage: 60,
    financialBenefit: "Class 9–10: ₹75,000/yr | Class 11–12: ₹1,25,000/yr (Top Class Schools)",
    benefitAmountNumber: 75000,
    applicationPeriod: "August to December annually on NSP",
    description: "Prestigious central scholarship for Other Backward Classes (OBC), Economically Backward Classes (EBC), and Nomadic/Semi-Nomadic tribes (DNT) studying in top identified schools.",
    descriptionHindi: "ओबीसी, ईबीसी और विमुक्त जातियों के छात्रों के लिए कक्षा 9 से 12 तक उच्च गुणवत्ता वाली शिक्षा हेतु भारी वित्तीय सहायता।",
    eligibilityBullets: [
      "Belonging to OBC, EBC, or DNT category.",
      "Annual household income must not exceed ₹2,50,000 per annum.",
      "Studying in Class 9, 10, 11, or 12 in designated top-class schools or qualifying merit list.",
      "Must have scored at least 60% in the previous qualifying grade."
    ],
    documentsRequired: [
      "OBC / EBC / DNT Category Certificate",
      "Valid Income Certificate (Annual income <= ₹2.5 Lakhs)",
      "Aadhaar Card and Student Bank Account (active DBT)",
      "Marksheet of previous class",
      "Fee receipt of current school admission"
    ],
    applicationSteps: [
      "Step 1: Check your school name on the NSP Top-Class Schools roster.",
      "Step 2: Create a student login using Aadhaar on scholarships.gov.in.",
      "Step 3: Choose 'PM YASASVI Central Sector Scheme' and enter academic scores.",
      "Step 4: Upload attested income, caste, and bonafide certificates.",
      "Step 5: Institute verification by School Principal followed by District Social Welfare Officer."
    ],
    keyHighlights: [
      "Covers comprehensive tuition fees, hostel expenses, and textbook allowances.",
      "Direct DBT transfer without intermediaries.",
      "Special merit reservation for girl students."
    ]
  },
  {
    id: "pre-matric-sc-st",
    name: "Pre-Matric Scholarship Scheme for SC & ST Students (Classes 9 & 10)",
    nameHindi: "अनुसूचित जाति एवं जनजाति हेतु प्री-मैट्रिक छात्रवृत्ति (कक्षा 9 व 10)",
    provider: "Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [9, 10],
    categories: ["SC", "ST"],
    gender: "All",
    maxFamilyIncome: 250000,
    minPercentage: 50,
    financialBenefit: "₹3,500/year (Day Scholar) | ₹7,000/year (Hosteller) + Books Grant",
    benefitAmountNumber: 4000,
    applicationPeriod: "July to November on NSP",
    description: "Centrally sponsored scheme to support parents of SC/ST students for education of their wards studying in Classes 9 and 10 to curtail pre-matric attrition.",
    descriptionHindi: "कक्षा 9वीं और 10वीं के एससी और एसटी छात्रों को स्कूल की पढ़ाई पूरी करने के लिए वार्षिक रखरखाव और पुस्तक अनुदान।",
    eligibilityBullets: [
      "Student must belong to Scheduled Caste (SC) or Scheduled Tribe (ST).",
      "Total parental/guardian income must not exceed ₹2,50,000 per annum.",
      "Must be studying regular full-time in Class 9 or 10 in a recognized school.",
      "Must have passed the previous grade without failing."
    ],
    documentsRequired: [
      "Caste Certificate issued by Revenue Authority",
      "Income Certificate from competent state authority",
      "Class 8 / Class 9 Passing Marksheet",
      "Aadhaar-linked Bank Account details",
      "School Bonafide Certificate"
    ],
    applicationSteps: [
      "Step 1: Obtain Bonafide verification from school with U-DISE code.",
      "Step 2: Login to NSP and fill State/Central Pre-Matric SC/ST application form.",
      "Step 3: Upload scanned caste certificate and bank passbook.",
      "Step 4: Submit application before deadline and track status via NSP Application ID."
    ],
    keyHighlights: [
      "100% cashless transfer directly to student's bank account.",
      "Additional disability allowance provided for differently-abled beneficiaries.",
      "Covers non-refundable school fees and book grants."
    ]
  },
  {
    id: "post-matric-sc-st-obc",
    name: "Post-Matric Scholarship for SC, ST & OBC Students (Classes 11 & 12)",
    nameHindi: "पोस्ट-मैट्रिक छात्रवृत्ति (कक्षा 11 व 12 - एससी/एसटी/ओबीसी)",
    provider: "Ministry of Social Justice & Empowerment, Govt of India",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [11, 12],
    categories: ["SC", "ST", "OBC"],
    gender: "All",
    maxFamilyIncome: 250000,
    minPercentage: 50,
    financialBenefit: "Full Non-Refundable Fee Waiver + Maintenance Allowance (₹4,000–₹13,500/yr)",
    benefitAmountNumber: 12000,
    applicationPeriod: "July to December annually on NSP",
    description: "Provides comprehensive financial assistance to SC/ST/OBC students studying at post-matriculation or secondary stage (Classes 11 and 12, Science/Commerce/Arts/Vocational).",
    descriptionHindi: "कक्षा 11वीं और 12वीं में नामांकित छात्रों के लिए संपूर्ण शिक्षण शुल्क प्रतिपूर्ति एवं मासिक अनुरक्षण भत्ता।",
    eligibilityBullets: [
      "Must have completed Class 10 (Matriculation) from a recognized Board (CBSE, ICSE, or State Board).",
      "Enrolled in Class 11 or 12 in any stream (Science, Commerce, Arts, Vocational).",
      "Belonging to SC, ST, or OBC category with family income <= ₹2.5 Lakhs/year.",
      "Not availing any other government post-matric financial award."
    ],
    documentsRequired: [
      "Class 10 Board Marksheet and Passing Certificate",
      "Valid Caste Certificate (Permanent / Digital Certificate)",
      "Income Certificate (Latest financial year)",
      "School / Junior College Admission Fee Receipt",
      "Student's Aadhaar and Bank Passbook (DBT Active)"
    ],
    applicationSteps: [
      "Step 1: Register on scholarships.gov.in with Class 10 Board Roll Number and passing year.",
      "Step 2: Select 'Post-Matric Scholarship Scheme for SC/ST/OBC'.",
      "Step 3: Enter Class 11/12 stream details and fee particulars.",
      "Step 4: Upload all certificates and submit to Institutional Nodal Officer (INO) for verification."
    ],
    keyHighlights: [
      "Reimburses full mandatory course fees plus annual study tour / book allowance.",
      "Ensures zero financial liability for higher secondary education.",
      "Includes Freeship Card system in participating states for zero-advance fee admission."
    ]
  },
  {
    id: "begum-hazrat-mahal-girls",
    name: "Begum Hazrat Mahal National Scholarship for Meritorious Minority Girls",
    nameHindi: "बेगम हज़रत महल राष्ट्रीय छात्रवृत्ति (अल्पसंख्यक मेधावी छात्राएं - कक्षा 9 से 12)",
    provider: "Maulana Azad Education Foundation, Ministry of Minority Affairs",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [9, 10, 11, 12],
    categories: ["Minority", "All"],
    gender: "Female Only",
    maxFamilyIncome: 200000, // 2 Lakhs
    minPercentage: 50,
    financialBenefit: "Class 9 & 10: ₹5,000/yr | Class 11 & 12: ₹6,000/yr",
    benefitAmountNumber: 6000,
    applicationPeriod: "August to November on NSP",
    description: "Exclusive scholarship for meritorious girl students belonging to 6 notified minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis) to support schooling expenses.",
    descriptionHindi: "अल्पसंख्यक समुदाय (मुस्लिम, सिख, ईसाई, बौद्ध, जैन, पारसी) की मेधावी छात्राओं के लिए कक्षा 9 से 12 तक विशेष छात्रवृत्ति।",
    eligibilityBullets: [
      "Only female students belonging to notified minority communities.",
      "Studying in Class 9, 10, 11, or 12 in a recognized school or college.",
      "Minimum 50% aggregate marks in the previous annual examination.",
      "Total annual parental income not exceeding ₹2,00,000."
    ],
    documentsRequired: [
      "Self-declaration / Community Certificate of Minority community",
      "Income Certificate from authorized Revenue Officer",
      "Previous year's Marksheet signed by School Principal",
      "School Verification Form (Bonafide Certificate)",
      "Bank Account details of the student (Aadhaar linked)"
    ],
    applicationSteps: [
      "Step 1: Open NSP portal and register under 'Pre-Matric / Post-Matric Minority' category.",
      "Step 2: Choose Begum Hazrat Mahal scheme and submit academic details.",
      "Step 3: Download School Verification certificate, get stamped by Principal, and re-upload.",
      "Step 4: Submit online and verify with State Minority Welfare Department."
    ],
    keyHighlights: [
      "Dedicated focus on empowering young women from minority communities.",
      "Easy online processing with zero application fee.",
      "Covers admission fees, books, and uniforms."
    ]
  },
  {
    id: "inspire-awards-manak",
    name: "INSPIRE Awards - MANAK (Science & Innovation Grant for Classes 6 to 10)",
    nameHindi: "इंस्पायर अवार्ड्स - मानक (कक्षा 6 से 10 के लिए विज्ञान एवं नवाचार अनुदान)",
    provider: "Department of Science & Technology (DST), Govt of India & National Innovation Foundation (NIF)",
    portal: "Direct / Departmental",
    directUrl: "https://www.inspireawards-dst.gov.in",
    targetGrades: [6, 7, 8, 9, 10],
    categories: ["All", "General", "OBC", "SC", "ST", "EWS"],
    gender: "All",
    maxFamilyIncome: 0, // No income cap
    minPercentage: 50,
    financialBenefit: "₹10,000 One-time Innovation Grant for Model Building + Mentorship",
    benefitAmountNumber: 10000,
    applicationPeriod: "May to October annually on E-MIAS portal",
    description: "Flagship innovation program executed by DST and NIF to attract young students (Ages 10-15, Classes 6-10) with original creative ideas and technological innovations to address societal challenges.",
    descriptionHindi: "कक्षा 6 से 10 के विद्यार्थियों में विज्ञान और नवाचार को बढ़ावा देने हेतु ₹10,000 का सीधा मॉडल निर्माण अनुदान।",
    eligibilityBullets: [
      "Students enrolled in Classes 6 to 10 in any recognized school (Govt, Aided, or Private).",
      "Age group must be between 10 and 15 years.",
      "Must propose an original science project, invention, or practical prototype idea.",
      "Each school can nominate 2 to 3 best student ideas via the School Headmaster."
    ],
    documentsRequired: [
      "Idea Brief & Concept Writeup (150 words with sketch/diagram)",
      "Student Aadhaar Card & Bank Account Passbook",
      "School Headmaster Recommendation & U-DISE Code",
      "Passport-size photo of the student"
    ],
    applicationSteps: [
      "Step 1: Discuss your science innovation idea with your school science teacher.",
      "Step 2: School Headmaster logs into E-MIAS portal (inspireawards-dst.gov.in) and submits nomination.",
      "Step 3: National Evaluation Committee screens and selects top 1,00,000 ideas.",
      "Step 4: Selected students receive ₹10,000 directly in bank account to build functional working prototype.",
      "Step 5: Participate in District (DLEPC), State (SLEPC), and National Science Exhibition at IIT / Rashtrapati Bhavan!"
    ],
    keyHighlights: [
      "No income limit: Open to every creative school child in India.",
      "Winners get mentorship from IIT professors and National Innovation Foundation scientists.",
      "Opportunity to patent inventions and showcase before the Hon'ble President of India."
    ]
  },
  {
    id: "disabilities-scholarship-pre-post",
    name: "Scholarship for Students with Disabilities (Divyangjan - Classes 9 to 12)",
    nameHindi: "दिव्यांग विद्यार्थियों हेतु प्री व पोस्ट-मैट्रिक छात्रवृत्ति (कक्षा 9 से 12)",
    provider: "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice",
    portal: "National Scholarship Portal (NSP)",
    directUrl: "https://scholarships.gov.in",
    targetGrades: [9, 10, 11, 12],
    categories: ["All", "General", "OBC", "SC", "ST", "EWS"],
    gender: "All",
    maxFamilyIncome: 250000,
    minPercentage: 40,
    financialBenefit: "₹4,000 to ₹12,000/yr + Assistive Device & Reader Allowance (₹2,000/yr)",
    benefitAmountNumber: 8000,
    applicationPeriod: "July to November on NSP",
    description: "Financial assistance and disability support allowances for students with 40% or more benchmark disability studying in secondary and senior secondary grades.",
    descriptionHindi: "40% या अधिक दिव्यांगता वाले छात्रों के लिए कक्षा 9 से 12 तक विशेष छात्रवृत्ति और सहायक उपकरण भत्ता।",
    eligibilityBullets: [
      "Student must have a valid UDID card or Disability Certificate (>= 40% disability).",
      "Enrolled in regular full-time classes from Grade 9 to 12.",
      "Annual family income not exceeding ₹2,50,000 per annum.",
      "Includes Visual, Hearing, Locomotor, Intellectual, and Autism spectrum conditions."
    ],
    documentsRequired: [
      "Unique Disability ID (UDID) Card or Disability Certificate by Medical Board",
      "Income Certificate from Revenue Authority",
      "Previous Class Marksheet",
      "Aadhaar Card and Student Bank Account",
      "School Enrollment / Bonafide Certificate"
    ],
    applicationSteps: [
      "Step 1: Register on NSP portal with UDID number.",
      "Step 2: Fill application under 'Scholarships for Students with Disabilities'.",
      "Step 3: Claim additional Reader Allowance / Escort Allowance if eligible.",
      "Step 4: School verifies and approves through district welfare department."
    ],
    keyHighlights: [
      "Provides special allowance for visually impaired readers and braille kits.",
      "Includes transport and helper allowance for locomotor disabilities.",
      "Guaranteed seat reservation and merit relaxation."
    ]
  },
  {
    id: "state-talent-merit-pragati",
    name: "State Merit & Vidyasaarathi Educational Support (Classes 10 to 12)",
    nameHindi: "राज्य प्रतिभा एवं विद्यासारथी उच्चतर माध्यमिक शिक्षा अनुदान (कक्षा 10 से 12)",
    provider: "State Education Boards & Corporate Social Responsibility (CSR) Education Trusts",
    portal: "State Portal",
    directUrl: "https://www.vidyasaarathi.co.in",
    targetGrades: [10, 11, 12],
    categories: ["All", "General", "OBC", "SC", "ST", "EWS"],
    gender: "All",
    maxFamilyIncome: 500000, // 5 Lakhs
    minPercentage: 60,
    financialBenefit: "₹15,000 to ₹30,000 per year (Tuition & Exam Coaching Support)",
    benefitAmountNumber: 20000,
    applicationPeriod: "Open throughout the academic year",
    description: "Merit-cum-need educational scholarships supporting high-achieving school students transitioning from Class 10 Board exams into senior secondary Class 11 and 12 STEM/Commerce streams.",
    descriptionHindi: "10वीं बोर्ड के बाद 11वीं और 12वीं में विज्ञान और वाणिज्य की पढ़ाई जारी रखने वाले मेधावी छात्रों हेतु वित्तीय अनुदान।",
    eligibilityBullets: [
      "Scored minimum 60% or above in Class 10 Board examinations.",
      "Family income less than ₹5,00,000 per annum.",
      "Continuing full-time Class 11 or 12 in Science, Commerce, or Arts stream.",
      "Preference given to students from rural areas, single-parent families, or government schools."
    ],
    documentsRequired: [
      "Class 10 Board Marksheet",
      "Current School/College ID & Fee Receipt",
      "Income Proof (Income Certificate / Salary Slip / Form 16 / Ration Card)",
      "Bank Account Statement / Passbook",
      "Address Proof & Aadhaar Card"
    ],
    applicationSteps: [
      "Step 1: Create profile on Vidyasaarathi / State Scholarship portal.",
      "Step 2: Complete profile with Class 10 marks and stream selection.",
      "Step 3: System automatically matches matching active donor schemes.",
      "Step 4: Upload marksheets and submit for interview/desk verification."
    ],
    keyHighlights: [
      "Higher income threshold (up to ₹5 Lakhs) covering lower-middle-class students.",
      "Flexible usage for school fees, laboratory charges, and competitive exam books.",
      "Direct disbursement into student bank account."
    ]
  }
];
