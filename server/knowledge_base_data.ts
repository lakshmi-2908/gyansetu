export interface RawNCERTSection {
  classLevel: number;
  chapterNumber: number;
  chapterTitle: string;
  subject: string;
  pageNumber: number;
  conceptTag: string;
  conceptName: string;
  text: string;
  keywords: string[];
}

export const NCERT_SECTIONS: RawNCERTSection[] = [
  // =========================================================================
  // CLASS 6
  // =========================================================================
  {
    classLevel: 6,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Components of Food",
    subject: "Science",
    pageNumber: 8,
    conceptTag: "components-of-food-nutrients",
    conceptName: "Nutrients, Balanced Diet and Deficiency Diseases",
    text: "Food contains nutrients essential for our body: Carbohydrates, Proteins, Fats, Vitamins, and Minerals. Carbohydrates and fats provide energy (fats give more energy than carbohydrates). Proteins are body-building foods needed for growth and repair. Dietary fibres (roughage) and water help get rid of undigested food. A balanced diet provides all nutrients in right quantities. Deficiency diseases: Lack of Vitamin A causes night blindness; lack of Vitamin B1 causes Beriberi; lack of Vitamin C causes Scurvy; lack of Vitamin D causes Rickets; lack of Iodine causes Goitre (swollen neck); lack of Iron causes Anaemia. भोजन के घटक: कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन और खनिज लवण। संतुलित आहार और अभावजन्य रोग (रतौंधी, बेरी-बेरी, स्कर्वी, रिकेट्स, घेंघा/गलगंड, अरक्तता)।",
    keywords: ["components of food", "nutrients", "carbohydrates", "proteins", "fats", "vitamins", "scurvy", "beriberi", "rickets", "goitre", "balanced diet", "भोजन के घटक", "संतुलित आहार"]
  },
  {
    classLevel: 6,
    chapterNumber: 3,
    chapterTitle: "Chapter 3: Playing with Numbers",
    subject: "Mathematics",
    pageNumber: 52,
    conceptTag: "prime-composite-hcf-lcm",
    conceptName: "Prime Numbers, Factors, HCF and LCM",
    text: "A factor of a number is an exact divisor of that number. A multiple of a number is obtained by multiplying it by an integer. Numbers having only two factors (1 and the number itself) are Prime Numbers (2, 3, 5, 7, 11...). 2 is the smallest and only even prime number. Numbers having more than two factors are Composite Numbers. 1 is neither prime nor composite. Highest Common Factor (HCF / महत्तम समापवर्तक) is the highest of their common factors. Lowest Common Multiple (LCM / लघुत्तम समापवर्त्य) is the smallest common multiple. Relation: HCF × LCM = Product of two numbers. अभाज्य संख्याएँ, भाज्य संख्याएँ, म.स. (HCF) और ल.स. (LCM)।",
    keywords: ["prime numbers", "composite numbers", "factors", "multiples", "hcf", "lcm", "divisibility rules", "अभाज्य संख्या", "भाज्य संख्या", "म.स.", "ल.स."]
  },

  // =========================================================================
  // CLASS 7
  // =========================================================================
  {
    classLevel: 7,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Nutrition in Plants",
    subject: "Science",
    pageNumber: 4,
    conceptTag: "nutrition-in-plants-photosynthesis",
    conceptName: "Autotrophic Nutrition & Stomata in Plants",
    text: "Green plants synthesize their food through photosynthesis using solar energy, carbon dioxide from air through tiny pores called Stomata (रंध्र) guarded by guard cells, and water absorbed by roots. Chlorophyll is the green pigment in leaves that captures sunlight. Equation: Carbon dioxide + Water -> (in sunlight & chlorophyll) -> Carbohydrate (Glucose) + Oxygen. Heterotrophic plants: Cuscuta (Amarbel) is a parasite; Pitcher plant (Nepenthes) is insectivorous; Fungi exhibit saprotrophic nutrition by absorbing nutrients from dead matter; Lichen represents a symbiotic relationship between an alga and a fungus. पादपों में पोषण: स्वपोषी पोषण, प्रकाश संश्लेषण, रंध्र (स्टोमेटा), परजीवी (अमरबेल), कीटभक्षी पौधे और सहजीवी संबंध (लाइकेन)।",
    keywords: ["nutrition in plants", "photosynthesis", "stomata", "chlorophyll", "guard cells", "cuscuta", "pitcher plant", "saprotrophic", "symbiosis", "lichen", "पादपों में पोषण", "रंध्र"]
  },
  {
    classLevel: 7,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Simple Equations",
    subject: "Mathematics",
    pageNumber: 80,
    conceptTag: "simple-linear-equations-solving",
    conceptName: "Solving Linear Equations in One Variable",
    text: "An equation is a condition on a variable such that two algebraic expressions are equal. A linear equation in one variable has highest exponent of the variable as 1 (e.g., 4x + 5 = 25). Transposition Method: Transposing a number from one side of the equation to the other changes its sign (+ becomes -, - becomes +, × becomes ÷, ÷ becomes ×). Example: In 3n + 7 = 25, transpose 7 to RHS: 3n = 25 - 7 = 18 => n = 18 / 3 = 6. सरल समीकरण: एक चर वाले रैखिक समीकरणों का पक्षांतरण विधि द्वारा हल।",
    keywords: ["simple equations", "linear equations", "variable", "transposition", "algebra", "सरल समीकरण", "पक्षांतरण"]
  },

  // =========================================================================
  // CLASS 8
  // =========================================================================
  {
    classLevel: 8,
    chapterNumber: 11,
    chapterTitle: "Chapter 11: Force and Pressure",
    subject: "Science",
    pageNumber: 134,
    conceptTag: "force-contact-noncontact-pressure",
    conceptName: "Force, Friction and Pressure",
    text: "A push or pull on an object is called a Force. SI unit of force is Newton (N). Forces can be Contact Forces (Muscular force, Frictional force) or Non-Contact Forces (Gravitational force, Electrostatic force, Magnetic force). Pressure is defined as force acting per unit area: Pressure (P) = Force (F) / Area (A). SI unit of pressure is Pascal (Pa) or N/m². A smaller area exerts greater pressure for the same force (which is why knives have sharp edges and school bag straps are wide). Liquids and gases exert pressure on the walls of their containers. Atmospheric pressure is the pressure exerted by the column of air above us. बल और दाब: संपर्क व असंपर्क बल, दाब P = F/A, पास्कल, वायुमंडलीय दाब।",
    keywords: ["force", "pressure", "newton", "pascal", "contact force", "gravitational force", "atmospheric pressure", "friction", "बल", "दाब", "पास्कल", "घर्षण"]
  },
  {
    classLevel: 8,
    chapterNumber: 8,
    chapterTitle: "Chapter 8: Cell – Structure and Functions",
    subject: "Science",
    pageNumber: 92,
    conceptTag: "cell-structure-organelles",
    conceptName: "Cell: Structural Unit, Plant vs Animal Cells",
    text: "Cell is the basic structural and functional unit of living organisms, discovered by Robert Hooke in 1665. Major components of a cell: 1. Cell Membrane (Plasma Membrane) - selectively permeable boundary. 2. Cytoplasm - jelly-like fluid containing cell organelles. 3. Nucleus - contains genetic material in chromosomes and nucleolus. Differences between Plant and Animal Cells: Plant cells have a rigid outer Cell Wall (made of cellulose), large central Vacuole, and Chloroplasts (plastids for photosynthesis). Animal cells lack cell walls and chloroplasts, and have small vacuoles. कोशिका: संरचना एवं प्रकार, कोशिका भित्ति, केंद्रक, कोशिकाद्रव्य, पादप एवं जंतु कोशिका में अंतर।",
    keywords: ["cell structure", "cell wall", "nucleus", "chloroplast", "vacuole", "plasma membrane", "plant vs animal cell", "robert hooke", "कोशिका", "पादप कोशिका", "जंतु कोशिका"]
  },

  // =========================================================================
  // CLASS 9
  // =========================================================================
  {
    classLevel: 9,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Number Systems",
    subject: "Mathematics",
    pageNumber: 14,
    conceptTag: "real-numbers-irrational-rational",
    conceptName: "Rational & Irrational Numbers, Decimal Expansions",
    text: "Real numbers (R) comprise Rational (Q) and Irrational numbers. A number is rational if it can be written as p/q, where p, q are integers and q ≠ 0. Decimal expansion of rational numbers is either terminating (e.g. 1/2 = 0.5) or non-terminating recurring (e.g. 1/3 = 0.333...). Decimal expansion of irrational numbers is non-terminating and non-recurring (e.g. √2, √3, π). Rationalising the denominator: To rationalise 1/(√a + √b), multiply numerator and denominator by (√a - √b). संख्या पद्धति: परिमेय व अपरिमेय संख्याएँ, दशमलव प्रसार (शांत, अनवसानी आवर्ती/अनावर्ती), हर का परिमेयकरण।",
    keywords: ["number systems", "rational numbers", "irrational numbers", "real numbers", "rationalisation", "decimal expansion", "terminating", "संख्या पद्धति", "परिमेय संख्या", "अपरिमेय संख्या"]
  },
  {
    classLevel: 9,
    chapterNumber: 8,
    chapterTitle: "Chapter 8: Motion",
    subject: "Science",
    pageNumber: 102,
    conceptTag: "motion-equations-kinematics",
    conceptName: "Equations of Uniformly Accelerated Motion",
    text: "Motion is change in position with time. Distance is total path length (scalar); Displacement is shortest straight line distance between initial and final points (vector). Speed = Distance/Time; Velocity = Displacement/Time. Acceleration (a) = (v - u) / t, where u is initial velocity, v is final velocity. Three Equations of Motion for uniform acceleration: 1. v = u + at (Velocity-time relation); 2. s = ut + ½at² (Position-time relation); 3. v² - u² = 2as (Position-velocity relation). गति: दूरी, विस्थापन, चाल, वेग, त्वरण, गति के तीन समीकरण (v = u + at, s = ut + ½at², v² - u² = 2as)।",
    keywords: ["motion", "distance", "displacement", "velocity", "acceleration", "equations of motion", "kinematics", "uniform motion", "गति", "चाल", "वेग", "त्वरण"]
  },
  {
    classLevel: 9,
    chapterNumber: 9,
    chapterTitle: "Chapter 9: Force and Laws of Motion",
    subject: "Science",
    pageNumber: 120,
    conceptTag: "newton-laws-of-motion-momentum",
    conceptName: "Newton's Three Laws of Motion & Momentum",
    text: "Newton's Laws of Motion: 1. First Law (Law of Inertia): An object remains in a state of rest or uniform motion in a straight line unless acted upon by an unbalanced external force. Inertia depends directly on mass. 2. Second Law: The rate of change of momentum of an object is directly proportional to the applied unbalanced force: F = dp/dt = ma (Force = mass × acceleration). Momentum p = mv (kg·m/s). 3. Third Law: To every action, there is always an equal and opposite reaction acting on different bodies simultaneously. Law of Conservation of Momentum: Total momentum of an isolated system remains constant: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. न्यूटन के गति के नियम: प्रथम नियम (जड़त्व), द्वितीय नियम (F = ma, संवेग), तृतीय नियम (क्रिया-प्रतिक्रिया) और संवेग संरक्षण का नियम।",
    keywords: ["newtons laws", "inertia", "momentum", "F=ma", "action reaction", "conservation of momentum", "force", "न्यूटन के नियम", "जड़त्व", "संवेग", "क्रिया प्रतिक्रिया"]
  },

  // =========================================================================
  // CLASS 10 (MATHEMATICS, SCIENCE, SOCIAL SCIENCE)
  // =========================================================================
  {
    classLevel: 10,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Real Numbers",
    subject: "Mathematics",
    pageNumber: 8,
    conceptTag: "fundamental-theorem-of-arithmetic",
    conceptName: "Fundamental Theorem of Arithmetic & Proof of Irrationality",
    text: "Fundamental Theorem of Arithmetic: Every composite number can be uniquely expressed (factorised) as a product of primes, apart from the order in which the prime factors occur. For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b. Proof of irrationality: To prove that √2 or √5 is irrational, we assume on the contrary that √p = a/b (where a and b are co-prime integers). Squaring gives pb² = a², meaning p divides a² hence p divides a. Substituting a = pc leads to p dividing b, contradicting that a and b are co-prime. Hence √p is irrational. वास्तविक संख्याएँ: अंकगणित की आधारभूत प्रमेय, HCF × LCM = a × b, तथा √2, √3, √5 की अपरिमेयता का प्रमाण।",
    keywords: ["real numbers", "fundamental theorem of arithmetic", "prime factorisation", "hcf", "lcm", "irrationality proof", "root 2 is irrational", "वास्तविक संख्याएँ", "अपरिमेयता"]
  },
  {
    classLevel: 10,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Quadratic Equations",
    subject: "Mathematics",
    pageNumber: 71,
    conceptTag: "quadratic-standard-form",
    conceptName: "Standard Form of Quadratic Equations",
    text: "A quadratic equation in the variable x is an equation of the form ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0. For example, 2x² + x - 300 = 0 is a quadratic equation. In general, any equation of the form p(x) = 0, where p(x) is a polynomial of degree 2, is a quadratic equation. When we write the terms of p(x) in descending order of their degrees, then we get the standard form: ax² + bx + c = 0, a ≠ 0. द्विघात समीकरण: वह समीकरण जिसे ax² + bx + c = 0 के रूप में लिखा जा सके, जहाँ a, b, c वास्तविक संख्याएँ हैं और a ≠ 0, द्विघात समीकरण कहलाता है।",
    keywords: ["quadratic", "standard form", "degree 2", "ax^2+bx+c=0", "auadratic", "द्विघात", "समीकरण", "polynomial", "variable"]
  },
  {
    classLevel: 10,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Quadratic Equations",
    subject: "Mathematics",
    pageNumber: 74,
    conceptTag: "factoring-method",
    conceptName: "Solution of Quadratic Equations by Factorisation",
    text: "A real number α is called a root of the quadratic equation ax² + bx + c = 0, a ≠ 0 if aα² + bα + c = 0. The zeroes of the quadratic polynomial ax² + bx + c and the roots of the quadratic equation ax² + bx + c = 0 are the same. To solve by factorisation (गुणनखंड विधि), we split the middle term bx into two terms whose product is ac and whose sum is b. For example, in 2x² - 5x + 3 = 0, we write 2x² - 2x - 3x + 3 = 0 => 2x(x - 1) - 3(x - 1) = 0 => (2x - 3)(x - 1) = 0, giving roots x = 3/2 and x = 1.",
    keywords: ["factorisation", "roots", "middle term splitting", "zeroes", "गुणनखंड", "मूल", "splitting", "solutions"]
  },
  {
    classLevel: 10,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Quadratic Equations",
    subject: "Mathematics",
    pageNumber: 82,
    conceptTag: "quadratic-formula",
    conceptName: "The Quadratic Formula (Sridharacharya's Rule)",
    text: "The roots of a quadratic equation ax² + bx + c = 0 are given by the Quadratic Formula (द्विघाती सूत्र): x = (-b ± √(b² - 4ac)) / (2a), provided b² - 4ac ≥ 0. This formula was historically given by the ancient Indian mathematician Sridharacharya (around 1025 AD). If b² - 4ac < 0, the equation has no real roots. For example, to solve 3x² - 5x + 2 = 0: here a=3, b=-5, c=2. Discriminant D = (-5)² - 4(3)(2) = 25 - 24 = 1. So x = (5 ± √1) / (2*3) = (5 ± 1)/6, which gives roots x = 1 and x = 2/3.",
    keywords: ["quadratic formula", "sridharacharya", "roots", "b^2-4ac", "द्विघाती सूत्र", "formula", "roots formula", "shridharacharya", "auadratic formula"]
  },
  {
    classLevel: 10,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Quadratic Equations",
    subject: "Mathematics",
    pageNumber: 88,
    conceptTag: "discriminant-nature-of-roots",
    conceptName: "Discriminant and Nature of Roots",
    text: "For the quadratic equation ax² + bx + c = 0 (a ≠ 0), the expression D = b² - 4ac is called the Discriminant (विविक्तकर). The nature of roots depends on the value of D: (i) If b² - 4ac > 0 (positive), two distinct real roots exist: x = (-b + √D)/(2a) and x = (-b - √D)/(2a). (ii) If b² - 4ac = 0 (zero), two equal real roots exist: x = -b/(2a) and x = -b/(2a). (iii) If b² - 4ac < 0 (negative), no real roots exist (the roots are imaginary / non-real). विविक्तकर D = b² - 4ac: यदि D > 0 तो दो भिन्न वास्तविक मूल, यदि D = 0 तो दो बराबर वास्तविक मूल, यदि D < 0 तो कोई वास्तविक मूल नहीं।",
    keywords: ["discriminant", "nature of roots", "b^2-4ac", "विविक्तकर", "मूलों की प्रकृति", "distinct roots", "equal roots", "no real roots", "D=0", "D>0", "D<0", "discriminent"]
  },
  {
    classLevel: 10,
    chapterNumber: 8,
    chapterTitle: "Chapter 8: Introduction to Trigonometry",
    subject: "Mathematics",
    pageNumber: 174,
    conceptTag: "trigonometric-ratios-identities",
    conceptName: "Trigonometric Ratios, Values & Pythagorean Identities",
    text: "In a right-angled triangle ABC right angled at B: sin A = Perpendicular/Hypotenuse = BC/AC, cos A = Base/Hypotenuse = AB/AC, tan A = Perpendicular/Base = BC/AB, cosec A = 1/sin A, sec A = 1/cos A, cot A = 1/tan A. Standard Angle Values: sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1; cos 30° = √3/2, cos 45° = 1/√2, cos 60° = 1/2, cos 90° = 0; tan 45° = 1. Three Fundamental Trigonometric Identities: 1. sin² θ + cos² θ = 1; 2. 1 + tan² θ = sec² θ; 3. 1 + cot² θ = cosec² θ. त्रिकोणमिति का परिचय: त्रिकोणमितीय अनुपात (sin, cos, tan, cosec, sec, cot) तथा सर्वसमिकाएँ (sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ)।",
    keywords: ["trigonometry", "sin", "cos", "tan", "trigonometric identities", "sin^2+cos^2=1", "trigonometric ratios", "त्रिकोणमिति", "त्रिकोणमितीय सर्वसमिकाएँ"]
  },
  {
    classLevel: 10,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Chemical Reactions and Equations",
    subject: "Science",
    pageNumber: 12,
    conceptTag: "chemical-reactions-types-balancing",
    conceptName: "Types of Chemical Reactions & Law of Conservation of Mass",
    text: "A chemical reaction involves breaking and making of bonds between atoms to produce new substances. Chemical equations must be balanced to satisfy the Law of Conservation of Mass (total mass of reactants equals total mass of products). Types of reactions: 1. Combination: Two or more reactants combine to form single product: CaO + H₂O -> Ca(OH)₂ (slaked lime). 2. Decomposition: Single reactant breaks down: 2FeSO₄ ->(heat) Fe₂O₃ + SO₂ + SO₃. 3. Displacement: More reactive element displaces less reactive: Fe + CuSO₄ -> FeSO₄ + Cu. 4. Double Displacement (Precipitation): Exchange of ions: Na₂SO₄ + BaCl₂ -> BaSO₄ (white ppt) + 2NaCl. 5. Redox: Oxidation is gain of oxygen or loss of hydrogen/electrons; Reduction is loss of oxygen or gain of hydrogen/electrons. रासायनिक अभिक्रियाएँ: संयोजन, वियोजन, विस्थापन, द्विविस्थापन (अवक्षेपण) और उपचयन-अपचयन (रेडॉक्स)।",
    keywords: ["chemical reactions", "balancing equations", "combination reaction", "decomposition", "displacement", "double displacement", "redox", "oxidation", "reduction", "रासायनिक अभिक्रियाएँ", "रेडॉक्स"]
  },
  {
    classLevel: 10,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Life Processes",
    subject: "Science",
    pageNumber: 95,
    conceptTag: "autotrophic-photosynthesis",
    conceptName: "Autotrophic Nutrition & Photosynthesis",
    text: "Autotrophic nutrition is a process where organisms convert inorganic CO₂ and H₂O into carbohydrates using chlorophyll and sunlight. Balanced equation: 6CO₂ + 12H₂O + Sunlight + Chlorophyll -> C₆H₁₂O₆ (Glucose) + 6O₂ + 6H₂O. Three key events: 1. Absorption of light energy by chlorophyll. 2. Conversion of light energy to chemical energy and photolysis of water into hydrogen and oxygen. 3. Reduction of CO₂ to carbohydrates. Guard cells regulate opening and closing of stomatal pores. प्रकाश संश्लेषण: क्लोरोफिल और सूर्य के प्रकाश में CO₂ तथा जल से कार्बोहाइड्रेट और ऑक्सीजन का निर्माण।",
    keywords: ["photosynthesis", "autotrophic", "chlorophyll", "glucose", "light energy", "stomata", "carbon dioxide", "प्रकाश संश्लेषण", "स्वपोषी पोषण", "chloroplast"]
  },
  {
    classLevel: 10,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Life Processes",
    subject: "Science",
    pageNumber: 99,
    conceptTag: "heterotrophic-digestion-human",
    conceptName: "Human Digestive System and Nutrition",
    text: "The human alimentary canal: 1. Mouth: Salivary amylase breaks starch into maltose. 2. Stomach: Gastric juice contains HCl (acidic medium for Pepsin to digest proteins) and Mucus (protects lining). 3. Small Intestine: Site of complete digestion. Liver secretes Bile juice (emulsifies fats and alkalinizes chyme); Pancreas secretes Pancreatic juice with Trypsin (proteins) and Lipase (emulsified fats). Villi (दीर्घरोम) increase surface area for nutrient absorption into bloodstream. मानव पाचन तंत्र: मुख (एमाइलेज), आमाशय (HCl, पेप्सिन, श्लेष्मा), क्षुद्रांत्र/छोटी आंत (पित्त रस, ट्रिप्सिन, लाइपेज, विली)।",
    keywords: ["digestion", "alimentary canal", "salivary amylase", "pepsin", "hcl", "bile", "trypsin", "lipase", "villi", "small intestine", "पाचन तंत्र", "पेप्सिन", "विली", "यकृत"]
  },
  {
    classLevel: 10,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Life Processes",
    subject: "Science",
    pageNumber: 104,
    conceptTag: "respiration-aerobic-anaerobic-atp",
    conceptName: "Respiration: Aerobic, Anaerobic & ATP",
    text: "Respiration breaks down glucose to release energy stored in ATP. Step 1 (in Cytoplasm): Glucose (6-C) breaks into Pyruvate (3-C). Pathways: (a) Aerobic Respiration (in Mitochondria, with O₂): Pyruvate -> 6CO₂ + 6H₂O + 38 ATP. (b) Anaerobic Respiration in Yeast (Fermentation): Pyruvate -> Ethanol + CO₂ + 2 ATP. (c) Anaerobic in Muscle Cells (Oxygen lack during exercise): Pyruvate -> Lactic Acid + 2 ATP (causes muscle cramps). श्वसन: वायवीय श्वसन (माइटोकॉन्ड्रिया, 38 ATP), अवायवीय श्वसन (यीस्ट किण्वन), मांसपेशियों में लैक्टिक अम्ल निर्माण से ऐंठन।",
    keywords: ["respiration", "aerobic", "anaerobic", "mitochondria", "pyruvate", "atp", "lactic acid", "fermentation", "cramps", "श्वसन", "वायवीय", "अवायवीय", "ऊर्जा"]
  },
  {
    classLevel: 10,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Life Processes",
    subject: "Science",
    pageNumber: 108,
    conceptTag: "human-circulatory-system-heart",
    conceptName: "Human Circulatory System & Double Circulation",
    text: "The human heart has 4 chambers: two atria and two ventricles. Double circulation: 1. Pulmonary circulation: Right ventricle pumps deoxygenated blood to lungs via Pulmonary Artery; oxygenated blood returns to Left Atrium via Pulmonary Vein. 2. Systemic circulation: Left ventricle pumps oxygenated blood to body via Aorta; deoxygenated blood returns to Right Atrium via Vena Cava. Valves prevent backflow. Normal blood pressure is 120/80 mm Hg measured with a Sphygmomanometer. मानव हृदय और दोहरा परिसंचरण: चार कोष्ठक (अलिंद व निलय), फुफ्फुसीय धमनी एवं शिरा, महाधमनी, वाल्व, रक्तचाप।",
    keywords: ["heart", "circulation", "double circulation", "atrium", "ventricle", "pulmonary artery", "aorta", "valves", "blood pressure", "हृदय", "परिसंचरण", "दोहरा परिसंचरण"]
  },
  {
    classLevel: 10,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Life Processes",
    subject: "Science",
    pageNumber: 112,
    conceptTag: "excretion-nephron-filtration",
    conceptName: "Human Excretory System and Nephron Structure",
    text: "Excretion removes toxic nitrogenous wastes (urea, uric acid). The functional filtration unit of kidney is Nephron (वृक्काणु). 1. Glomerulus: Capillary cluster in Bowman's Capsule where ultra-filtration of blood occurs under pressure. 2. Renal Tubule: Selective reabsorption of glucose, amino acids, salts and water. 3. Collecting Duct: Transports urine to ureter, bladder, and urethra. मानव उत्सर्जन तंत्र: वृक्क (किडनी), नेफ्रॉन (वृक्काणु), ग्लोमेरुलस, बोमन सम्पुट, वर्णात्मक पुनरावशोषण, मूत्र निर्माण।",
    keywords: ["excretion", "kidney", "nephron", "nefron", "bowman capsule", "glomerulus", "reabsorption", "urine formation", "urea", "उत्सर्जन", "वृक्काणु", "नेफ्रॉन", "बोमन सम्पुट"]
  },
  {
    classLevel: 10,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Light – Reflection and Refraction",
    subject: "Science",
    pageNumber: 162,
    conceptTag: "spherical-mirrors-concave-convex",
    conceptName: "Spherical Mirrors: Concave and Convex",
    text: "Concave Mirror (अवतल दर्पण): Curved inwards, converges light at Focus F. Forms real and inverted images (virtual and magnified only when object is between Pole P and Focus F). Used in torches, headlights, solar furnaces, dentist mirrors. Convex Mirror (उत्तल दर्पण): Curved outwards, diverges light, always forms virtual, erect, diminished images with wide field of view. Used as rear-view mirrors in vehicles. Focal length f = R/2. गोलीय दर्पण: अवतल दर्पण (अभिसारी) व उत्तल दर्पण (अपसारी)।",
    keywords: ["spherical mirrors", "concave mirror", "convex mirror", "focal length", "radius of curvature", "rear view mirror", "focus", "अवतल दर्पण", "उत्तल दर्पण", "गोलीय दर्पण"]
  },
  {
    classLevel: 10,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Light – Reflection and Refraction",
    subject: "Science",
    pageNumber: 168,
    conceptTag: "mirror-formula-magnification",
    conceptName: "Mirror Formula and Magnification (Sign Convention)",
    text: "Mirror Formula: 1/v + 1/u = 1/f, where u = object distance (always negative), v = image distance, f = focal length (-ve for concave, +ve for convex). Magnification: m = h'/h = -v/u. If m is negative, image is real and inverted; if positive, virtual and erect. New Cartesian Sign Convention: Distances along incident light are +ve, opposite are -ve. दर्पण सूत्र: 1/v + 1/u = 1/f तथा आवर्धन m = -v/u.",
    keywords: ["mirror formula", "magnification", "sign convention", "image distance", "focal length", "1/v+1/u=1/f", "दर्पण सूत्र", "आवर्धन", "चिह्न परिपाटी"]
  },
  {
    classLevel: 10,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Light – Reflection and Refraction",
    subject: "Science",
    pageNumber: 172,
    conceptTag: "refraction-snells-law-refractive-index",
    conceptName: "Refraction of Light, Snell's Law & Refractive Index",
    text: "Refraction is bending of light when passing obliquely between media of different optical densities due to change in speed. Snell's Law: (sin i) / (sin r) = constant = n₂₁ (Refractive index of medium 2 w.r.t 1). Refractive Index n = c / v (speed of light in vacuum c = 3 × 10⁸ m/s divided by speed in medium). Absolute refractive index of glass ~1.5, water ~1.33, diamond = 2.42 (highest). प्रकाश का अपवर्तन: स्नेल का नियम (sin i / sin r = n) और अपवर्तनांक n = c/v.",
    keywords: ["refraction", "snells law", "refractive index", "speed of light", "angle of incidence", "sin i / sin r", "optical density", "अपवर्तन", "स्नेल का नियम", "अपवर्तनांक"]
  },
  {
    classLevel: 10,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Light – Reflection and Refraction",
    subject: "Science",
    pageNumber: 178,
    conceptTag: "lens-formula-magnification",
    conceptName: "Spherical Lenses, Lens Formula and Magnification",
    text: "Convex Lens (अभिसारी/उत्तल लेंस): Converges rays, focal length is positive (+f). Concave Lens (अपसारी/अवतल लेंस): Diverges rays, focal length is negative (-f), always forms virtual, erect, diminished images. Lens Formula: 1/v - 1/u = 1/f. Magnification: m = h'/h = +v/u. लेंस सूत्र: 1/v - 1/u = 1/f एवं आवर्धन m = +v/u.",
    keywords: ["lens formula", "convex lens", "concave lens", "lens magnification", "1/v - 1/u = 1/f", "converging lens", "diverging lens", "लेंस सूत्र", "उत्तल लेंस", "अवतल लेंस"]
  },
  {
    classLevel: 10,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Light – Reflection and Refraction",
    subject: "Science",
    pageNumber: 182,
    conceptTag: "power-of-lens",
    conceptName: "Power of a Lens and Dioptre",
    text: "Power of a lens (P) is reciprocal of focal length in metres: P = 1 / f (in m). SI unit is Dioptre (D). 1 D = 1 m⁻¹. Power of Convex lens is positive (+ve), Concave lens is negative (-ve). Combination of lenses: P = P₁ + P₂ + P₃... लेंस की क्षमता: P = 1/f (मीटर में), मात्रक डायोप्टर (D)।",
    keywords: ["power of lens", "dioptre", "P=1/f", "focal length", "diopter", "corrective lens", "लेंस की क्षमता", "डायोप्टर"]
  },
  {
    classLevel: 10,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Power Sharing",
    subject: "Social Science",
    pageNumber: 6,
    conceptTag: "civics-power-sharing-belgium-sri-lanka",
    conceptName: "Forms of Power Sharing in Democracy (Belgium vs Sri Lanka)",
    text: "Power sharing is the essence of democracy. Belgium accommodated Dutch, French, and German speakers through equal cabinet representation, community government, and constitutional safeguards, preventing civil strife. Sri Lanka adopted Majoritarianism favoring the Sinhala majority, alienating Sri Lankan Tamils and leading to a civil war. Forms of Power Sharing: 1. Horizontal Division (Separation of Powers & Checks/Balances between Legislature, Executive, and Judiciary). 2. Vertical Division (Federalism between Central, State, and Local Governments). 3. Social Groups (Reservations for linguistic/religious minorities). 4. Political Parties and Pressure Groups. सत्ता की साझेदारी: बेल्जियम का मॉडल, श्रीलंका का बहुसंख्यकवाद, सत्ता का क्षैतिज व ऊर्ध्वाधर बँटवारा।",
    keywords: ["power sharing", "belgium", "sri lanka", "majoritarianism", "horizontal division", "vertical division", "federalism", "judiciary", "सत्ता की साझेदारी", "लोकतंत्र"]
  },

  // =========================================================================
  // CLASS 11 (PHYSICS, CHEMISTRY, BIOLOGY, MATHS)
  // =========================================================================
  {
    classLevel: 11,
    chapterNumber: 5,
    chapterTitle: "Chapter 5: Laws of Motion",
    subject: "Physics",
    pageNumber: 94,
    conceptTag: "laws-of-motion-friction-circular",
    conceptName: "Static, Kinetic Friction & Banking of Roads",
    text: "Frictional force opposes relative motion between surfaces in contact. Static friction f_s ≤ μ_s N (where μ_s is coefficient of static friction and N is normal reaction). Limiting friction is maximum static friction. Kinetic friction f_k = μ_k N (μ_k < μ_s). Circular Motion & Banking of Roads: When a vehicle moves on a circular road of radius r, centripetal force is required. Maximum safe speed on an unbanked rough road is v_max = √(μ_s r g). On a frictionless banked road with banking angle θ: tan θ = v² / (rg) => v = √(rg tan θ). Optimum speed without wear and tear on banked road: v = √(rg tan θ). घर्षण बल: स्थैतिक घर्षण, गतिक घर्षण, वृत्तीय गति और सड़कों का बंकन (tan θ = v²/rg)।",
    keywords: ["friction", "static friction", "kinetic friction", "banking of roads", "centripetal force", "normal reaction", "mu_s", "घर्षण", "सड़कों का बंकन"]
  },
  {
    classLevel: 11,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Some Basic Concepts of Chemistry",
    subject: "Chemistry",
    pageNumber: 18,
    conceptTag: "mole-concept-molarity-stoichiometry",
    conceptName: "Mole Concept, Avogadro Constant & Molarity",
    text: "One Mole (mol) is the amount of substance containing exactly 6.022 × 10²³ elementary entities (Avogadro Constant N_A). Number of moles n = Mass (m) / Molar Mass (M) = Number of particles / N_A. Concentration of solutions: 1. Molarity (M) = Moles of solute / Volume of solution in litres (mol/L). 2. Molality (m) = Moles of solute / Mass of solvent in kg (mol/kg, independent of temperature). 3. Mole Fraction (χ_A) = n_A / (n_A + n_B). Stoichiometry calculates amounts of reactants and products based on balanced equations; Limiting Reagent is the reactant completely consumed first. मोल संकल्पना: आवोगाद्रो संख्या (6.022 × 10²³), मोलरता (M = n/V), मोललता, मोल अंश, सीमांत अभिकर्मक।",
    keywords: ["mole concept", "avogadro number", "molarity", "molality", "limiting reagent", "stoichiometry", "molar mass", "मोल संकल्पना", "मोलरता", "आवोगाद्रो"]
  },
  {
    classLevel: 11,
    chapterNumber: 8,
    chapterTitle: "Chapter 8: Cell – The Unit of Life",
    subject: "Biology",
    pageNumber: 128,
    conceptTag: "cell-unit-of-life-organelles-membrane",
    conceptName: "Fluid Mosaic Model, Mitochondria & Endomembrane System",
    text: "Singer and Nicolson proposed the Fluid Mosaic Model (1972) of cell membrane: A quasi-fluid phospholipid bilayer with embedded integral and peripheral proteins. Endomembrane system includes Endoplasmic Reticulum (RER for protein synthesis with ribosomes, SER for lipid/steroid synthesis), Golgi Apparatus (packaging and secretion of glycoproteins/glycolipids), Lysosomes (suicidal bags containing hydrolytic enzymes active at acidic pH), and Vacuoles. Mitochondria (powerhouse of cell): double membrane, inner membrane folded into cristae to increase surface area for ATP synthase (Oxidative phosphorylation), contains 70S ribosomes and circular DNA. कोशिका: तरल मोजेक मॉडल (सिंगर एवं निकोलसन), माइटोकॉन्ड्रिया, अंतर्द्रव्यी जालिका (ER), गॉल्जी काय, लाइसोसोम।",
    keywords: ["fluid mosaic model", "cell membrane", "mitochondria", "cristae", "endoplasmic reticulum", "golgi apparatus", "lysosome", "तरल मोजेक मॉडल", "माइटोकॉन्ड्रिया"]
  },

  // =========================================================================
  // CLASS 12 (PHYSICS, CHEMISTRY, BIOLOGY, MATHS)
  // =========================================================================
  {
    classLevel: 12,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Electric Charges and Fields",
    subject: "Physics",
    pageNumber: 14,
    conceptTag: "coulomb-law-gauss-law-electric-field",
    conceptName: "Coulomb's Law, Electric Dipole and Gauss's Law",
    text: "Coulomb's Law: Electrostatic force between two point charges q₁ and q₂ separated by distance r in vacuum is F = (1 / 4πε₀) · (|q₁ q₂| / r²), where ε₀ = 8.854 × 10⁻¹² C²·N⁻¹·m⁻² and 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C². Electric Field E = F/q₀ = (1 / 4πε₀) · (q / r²). Electric Dipole moment p = q × 2a (directed from -q to +q). Electric Flux Φ_E = ∫ E · dA. Gauss's Law: Total electric flux through any closed surface is 1/ε₀ times the net charge enclosed: ∮ E · dA = q_enclosed / ε₀. Applications: Electric field due to infinitely long charged wire E = λ / (2πε₀ r); uniformly charged infinite plane sheet E = σ / (2ε₀). विद्युत आवेश एवं क्षेत्र: कूलॉम का नियम, विद्युत द्विध्रुव (p = q·2a), गाउस का नियम (Φ = q/ε₀)।",
    keywords: ["coulombs law", "gauss law", "electric field", "electric flux", "electric dipole", "epsilon_0", "permittivity", "कूलॉम का नियम", "गाउस का नियम", "विद्युत क्षेत्र"]
  },
  {
    classLevel: 12,
    chapterNumber: 2,
    chapterTitle: "Chapter 2: Solutions",
    subject: "Chemistry",
    pageNumber: 38,
    conceptTag: "solutions-raoults-law-colligative-properties",
    conceptName: "Raoult's Law & Colligative Properties",
    text: "Raoult's Law for volatile liquids: Partial vapour pressure of each component in solution is directly proportional to its mole fraction: p_A = p°_A · χ_A. Ideal solutions obey Raoult's law over entire concentration range (ΔH_mix = 0, ΔV_mix = 0). Colligative Properties (depend only on number of solute particles): 1. Relative lowering of vapour pressure: (p°_A - p_A) / p°_A = χ_B = n_B / (n_A + n_B). 2. Elevation of Boiling Point: ΔT_b = K_b · m (where K_b is ebullioscopic constant and m is molality). 3. Depression of Freezing Point: ΔT_f = K_f · m (K_f is cryoscopic constant). 4. Osmotic Pressure: Π = CRT = (n/V)RT. Van 't Hoff Factor (i) accounts for association/dissociation: i = (Observed colligative property) / (Calculated colligative property). विलयन: राउल्ट का नियम, अणुसंख्य गुणधर्म (वाष्प दाब अवनमन, क्वथनांक उन्नयन, हिमांक अवनमन, परासरण दाब Π = CRT), वांट हॉफ गुणांक (i)।",
    keywords: ["solutions", "raoults law", "colligative properties", "osmotic pressure", "elevation in boiling point", "freezing point depression", "van t hoff factor", "विलयन", "राउल्ट का नियम", "परासरण दाब"]
  },
  {
    classLevel: 12,
    chapterNumber: 5,
    chapterTitle: "Chapter 5: Principles of Inheritance and Variation",
    subject: "Biology",
    pageNumber: 72,
    conceptTag: "genetics-mendel-laws-monohybrid-dihybrid",
    conceptName: "Mendel's Laws of Inheritance, Punnett Square & Genetic Crosses",
    text: "Gregor Johann Mendel, the Father of Genetics, conducted hybridization experiments on garden pea (Pisum sativum). 1. Law of Dominance: In a monohybrid cross between homozygous tall (TT) and dwarf (tt) plants, F1 generation is all Tall (Tt, heterozygous). 2. Law of Segregation: Alleles separate during gamete formation so each gamete carries only one allele. F2 phenotypic ratio is 3:1 (Tall:Dwarf) and genotypic ratio is 1:2:1 (TT:Tt:tt). 3. Law of Independent Assortment: In a dihybrid cross (Round Yellow RRYY × Wrinkled Green rryy), factors for different pairs of traits assort independently during gametogenesis. F2 phenotypic ratio is 9:3:3:1. Incomplete Dominance (e.g. Mirabilis jalapa / Snapdragon pink flower 1:2:1) and Codominance (ABO blood grouping in humans with alleles I^A, I^B, i). आनुवंशिकी: मेंडल के नियम (प्रभाविता, विसंयोजन, स्वतंत्र अपव्यूहन), एकसंकर व द्विसंकर संकरण (3:1, 9:3:3:1), अपूर्ण प्रभाविता व सह-प्रभाविता (रक्त समूह)।",
    keywords: ["genetics", "mendel laws", "monohybrid cross", "dihybrid cross", "punnett square", "phenotype", "genotype", "incomplete dominance", "codominance", "आनुवंशिकी", "मेंडल के नियम", "द्विसंकर संकरण"]
  },
  {
    classLevel: 12,
    chapterNumber: 7,
    chapterTitle: "Chapter 7: Integrals",
    subject: "Mathematics",
    pageNumber: 288,
    conceptTag: "calculus-integrals-methods-properties",
    conceptName: "Indefinite & Definite Integrals, Integration by Parts",
    text: "Integration is the inverse process of differentiation (Anti-derivative). Standard formulas: ∫ x^n dx = (x^(n+1))/(n+1) + C (n ≠ -1); ∫ (1/x) dx = ln|x| + C; ∫ e^x dx = e^x + C; ∫ sin x dx = -cos x + C; ∫ cos x dx = sin x + C; ∫ sec² x dx = tan x + C. Methods of Integration: 1. Integration by Substitution: ∫ f(g(x)) g'(x) dx = ∫ f(t) dt. 2. Integration by Parts (ILATE Rule for first function u): ∫ u v dx = u ∫ v dx - ∫ [ (du/dx) ∫ v dx ] dx. Fundamental Theorem of Calculus: If F'(x) = f(x), then definite integral ∫[a to b] f(x) dx = F(b) - F(a). Properties: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx. समाकलन: अनिश्चित व निश्चित समाकलन, प्रतिस्थापन विधि, खंडशः समाकलन (ILATE नियम), समाकलन के गुणधर्म।",
    keywords: ["integrals", "integration", "calculus", "integration by parts", "ilate rule", "definite integrals", "antiderivative", "समाकलन", "खंडशः समाकलन"]
  },

  // =========================================================================
  // ADDITIONAL EXPANDED NCERT SECTIONS (CLASSES 6 - 12)
  // =========================================================================
  {
    classLevel: 10,
    chapterNumber: 12,
    chapterTitle: "Chapter 12: Electricity",
    subject: "Science",
    pageNumber: 200,
    conceptTag: "electricity-ohms-law-resistance-joule",
    conceptName: "Ohm's Law, Resistance in Series/Parallel & Joule's Heating",
    text: "Electric Current I = Q/t (Ampere, A). Potential difference V = W/Q (Volt, V). Ohm's Law: At constant temperature, potential difference V across a metallic conductor is directly proportional to current I: V = I·R (where R is Resistance in Ohms, Ω). Factors affecting resistance: R = ρ·(l/A) where ρ is resistivity (Ω·m). Resistors in Series: R_eq = R₁ + R₂ + R₃ (same current I throughout). Resistors in Parallel: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ (same potential difference V across each branch). Joule's Law of Heating: Heat produced H = I²·R·t = V·I·t = (V²/R)·t. Electric Power P = V·I = I²·R = V²/R (SI unit Watt, W; 1 kWh = 3.6 × 10⁶ J). विद्युत: ओम का नियम (V = IR), प्रतिरोधकता, श्रेणीक्रम व पार्श्वक्रम संयोजन, जूल का तापन नियम (H = I²Rt)।",
    keywords: ["electricity", "ohms law", "resistance", "resistivity", "series", "parallel", "joule heating", "electric power", "V=IR", "H=I2Rt", "विद्युत", "ओम का नियम", "प्रतिरोध"]
  },
  {
    classLevel: 10,
    chapterNumber: 2,
    chapterTitle: "Chapter 2: Acids, Bases and Salts",
    subject: "Science",
    pageNumber: 26,
    conceptTag: "acids-bases-salts-ph-scale",
    conceptName: "Acids, Bases, pH Scale & Important Salts",
    text: "Acids produce H⁺(aq) ions (taste sour, turn blue litmus red); Bases produce OH⁻(aq) ions (taste bitter, turn red litmus blue). Neutralization: Acid + Base -> Salt + Water (HCl + NaOH -> NaCl + H₂O). pH Scale (0-14): pH = -log[H⁺]. Acidic: pH < 7, Neutral: pH = 7 (pure water), Basic: pH > 7. Important Salts: 1. Bleaching Powder: CaOCl₂ (produced by action of chlorine on dry slaked lime). 2. Baking Soda: NaHCO₃ (Sodium hydrogen carbonate). 3. Washing Soda: Na₂CO₃·10H₂O. 4. Plaster of Paris (POP): CaSO₄·½H₂O (obtained by heating Gypsum CaSO₄·2H₂O at 373 K). अम्ल, क्षारक एवं लवण: pH पैमाना, उदासीनीकरण, विरंजक चूर्ण (CaOCl₂), बेकिंग सोडा, धावन सोडा, प्लास्टर ऑफ पेरिस।",
    keywords: ["acids bases salts", "ph scale", "litmus", "neutralization", "bleaching powder", "baking soda", "plaster of paris", "washing soda", "अम्ल", "क्षारक", "लवण", "pH पैमाना"]
  },
  {
    classLevel: 10,
    chapterNumber: 5,
    chapterTitle: "Chapter 5: Arithmetic Progressions",
    subject: "Mathematics",
    pageNumber: 95,
    conceptTag: "arithmetic-progression-nth-term-sum",
    conceptName: "Arithmetic Progression (AP): nth Term & Sum of n Terms",
    text: "An Arithmetic Progression (AP) is a sequence of numbers in which each term is obtained by adding a fixed number (common difference d) to the preceding term, except the first term a. General form: a, a+d, a+2d, a+3d... Formulas: 1. nth Term of an AP: a_n = a + (n - 1)·d. 2. Sum of First n Terms of an AP: S_n = (n/2)·[2a + (n - 1)·d] = (n/2)·[a + l] (where l is the last term a_n). If three terms are in AP (a, b, c), then 2b = a + c (b is the arithmetic mean). समांतर श्रेढ़ी (AP): प्रथम पद a, सार्व अंतर d, nवाँ पद a_n = a + (n - 1)d, प्रथम n पदों का योग S_n = n/2 [2a + (n-1)d]।",
    keywords: ["arithmetic progression", "AP", "common difference", "nth term", "sum of AP", "a+(n-1)d", "समांतर श्रेढ़ी", "सार्व अंतर", "पदों का योग"]
  },
  {
    classLevel: 11,
    chapterNumber: 12,
    chapterTitle: "Chapter 12: Thermodynamics",
    subject: "Physics",
    pageNumber: 304,
    conceptTag: "physics-thermodynamics-first-law-heat-engine",
    conceptName: "First Law of Thermodynamics, Isothermal & Adiabatic Processes",
    text: "Zeroth Law: Defines Temperature (if systems A and B are in thermal equilibrium with C, they are in equilibrium with each other). First Law of Thermodynamics (Law of Conservation of Energy): ΔQ = ΔU + ΔW, where ΔQ is heat supplied, ΔU is change in internal energy, ΔW = P·ΔV is work done by system. Thermodynamic Processes: 1. Isothermal (Constant T, ΔU = 0): PV = constant, Work W = nRT ln(V₂/V₁). 2. Adiabatic (No heat exchange, ΔQ = 0): PV^γ = constant, W = (nR / (γ - 1))·(T₁ - T₂). 3. Isochoric (Constant V, ΔW = 0): ΔQ = ΔU. 4. Isobaric (Constant P): W = P(V₂ - V₁). ऊष्मागतिकी: प्रथम नियम (ΔQ = ΔU + ΔW), समतापी प्रक्रम, रुद्धोष्म प्रक्रम (PV^γ = const), समआयतनिक व समदाबी प्रक्रम।",
    keywords: ["thermodynamics", "first law of thermodynamics", "isothermal", "adiabatic", "internal energy", "heat engine", "work done", "ऊष्मागतिकी", "प्रथम नियम", "समतापी", "रुद्धोष्म"]
  },
  {
    classLevel: 12,
    chapterNumber: 3,
    chapterTitle: "Chapter 3: Current Electricity",
    subject: "Physics",
    pageNumber: 115,
    conceptTag: "current-electricity-kirchhoff-wheatstone",
    conceptName: "Kirchhoff's Rules & Wheatstone Bridge Principle",
    text: "Kirchhoff's Circuit Laws: 1. Kirchhoff's First Law (Junction Rule / Current Law KCL): At any junction in an electrical circuit, the sum of currents entering the junction equals the sum of currents leaving: Σ I = 0 (Conservation of Electric Charge). 2. Kirchhoff's Second Law (Loop Rule / Voltage Law KVL): The algebraic sum of changes in potential around any closed loop in a circuit is zero: Σ ΔV = 0 or Σ E = Σ (I·R) (Conservation of Energy). Wheatstone Bridge: An arrangement of 4 resistors P, Q, R, S with galvanometer G. At balanced condition (null deflection in galvanometer, I_g = 0): P / Q = R / S. Used to measure unknown resistance accurately (e.g., Metre Bridge). धारा विद्युत: किरचॉफ के नियम (संधि नियम KCL, लूप नियम KVL) एवं व्हीटस्टोन सेतु (P/Q = R/S)।",
    keywords: ["current electricity", "kirchhoffs laws", "junction rule", "loop rule", "wheatstone bridge", "metre bridge", "KCL", "KVL", "किरचॉफ के नियम", "व्हीटस्टोन सेतु", "संधि नियम"]
  },
  {
    classLevel: 12,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Chemical Kinetics",
    subject: "Chemistry",
    pageNumber: 98,
    conceptTag: "chemical-kinetics-rate-order-half-life",
    conceptName: "Rate of Reaction, Order, Arrhenius Equation & Half-Life",
    text: "Rate of Reaction is change in concentration of reactant or product per unit time: Rate = -d[R]/dt = +d[P]/dt (mol·L⁻¹·s⁻¹). Rate Law: Rate = k·[A]^x·[B]^y, where overall Order of Reaction n = x + y. Zero Order: Rate = k, Integrated equation [R] = [R]₀ - kt, Half-life t_½ = [R]₀ / (2k). First Order: Rate = k·[A], Integrated equation k = (2.303 / t)·log([R]₀ / [R]), Half-life t_½ = 0.693 / k (independent of initial concentration). Arrhenius Equation for temperature dependence of rate constant: k = A·e^(-E_a / RT) or log(k₂ / k₁) = (E_a / 2.303R)·[(T₂ - T₁) / (T₁·T₂)], where E_a is Activation Energy. रासायनिक बलगतिकी: अभिक्रिया की दर, कोटि (शून्य व प्रथम कोटि), अर्ध-आयु काल (t½ = 0.693/k), आरेनियस समीकरण (k = Ae^(-Ea/RT))।",
    keywords: ["chemical kinetics", "rate of reaction", "first order reaction", "half life", "arrhenius equation", "activation energy", "t1/2=0.693/k", "रासायनिक बलगतिकी", "अर्ध-आयु", "आरेनियस"]
  },
  // --- ADDITIONAL CLASS 6-12 EXPANSIONS ---
  {
    classLevel: 6,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Motion and Measurement of Distances",
    subject: "Science",
    pageNumber: 102,
    conceptTag: "motion-measurement-distances-si-units",
    conceptName: "Measurement of Distance, SI Units & Types of Motion",
    text: "Measurement means comparison of an unknown quantity with a known fixed quantity called a unit. International System of Units (SI Units): Standard unit of length is Metre (m). 1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m. Types of Motion: 1. Rectilinear Motion: Motion along a straight line (e.g. falling stone, sprinters in 100m race). 2. Circular Motion: Motion where distance of object from a fixed point remains same (e.g. hands of clock, blades of fan). 3. Periodic Motion: Motion that repeats itself after regular intervals of time (e.g. pendulum of clock, branch of tree swinging). गति एवं दूरियों का मापन: मात्रक (मीटर SI मात्रक), सरल रेखीय गति, वर्तुल गति, और आवर्ती गति।",
    keywords: ["motion and measurement", "si units", "metre", "rectilinear motion", "circular motion", "periodic motion", "pendulum", "गति एवं दूरियों का मापन", "सरल रेखीय गति", "आवर्ती गति"]
  },
  {
    classLevel: 7,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Heat and Temperature",
    subject: "Science",
    pageNumber: 38,
    conceptTag: "heat-temperature-conduction-convection-radiation",
    conceptName: "Heat Transfer: Conduction, Convection & Radiation",
    text: "Temperature is a reliable measure of the degree of hotness of an object, measured using a thermometer (Celsius scale °C). Normal human body temperature is 37 °C (98.6 °F). Clinical thermometer range: 35 °C to 42 °C with a kink to prevent mercury backflow. Laboratory thermometer range: -10 °C to 110 °C. Modes of Heat Transfer: 1. Conduction: Process by which heat transfers from hotter to colder part in solids through particle vibration without actual movement (conductors like iron, copper; insulators like wood, plastic). 2. Convection: Heat transfer in liquids and gases where heated particles move upwards and cold fluid moves down (causes Sea Breeze during day, Land Breeze during night). 3. Radiation: Transfer of heat without any medium (e.g. solar heat reaching Earth). ऊष्मा: तापमान, चालन (ठोस में), संवहन (द्रव व गैस में, समुद्री व थल समीर), और विकिरण।",
    keywords: ["heat", "temperature", "conduction", "convection", "radiation", "clinical thermometer", "sea breeze", "land breeze", "insulators", "ऊष्मा", "चालन", "संवहन", "विकिरण", "तापमान"]
  },
  {
    classLevel: 8,
    chapterNumber: 13,
    chapterTitle: "Chapter 13: Sound",
    subject: "Science",
    pageNumber: 162,
    conceptTag: "sound-vibration-frequency-amplitude-pitch",
    conceptName: "Sound Production, Frequency, Amplitude, Pitch & Loudness",
    text: "Sound is produced by vibrating bodies and requires a material medium (solid, liquid, or gas) for propagation; it cannot travel in a vacuum. Human voice box (Larynx) contains vocal cords that vibrate. Ear drum (Tympanic membrane) senses sound vibrations. Key Sound Characteristics: 1. Amplitude: Determines Loudness of sound (Loudness ∝ Amplitude²; measured in decibels, dB; above 80 dB is noise pollution). 2. Frequency (Hz): Number of oscillations per second. Determines Pitch/Shrillness (higher frequency = higher pitch). 3. Audible Range for Human Ear: 20 Hz to 20,000 Hz (Infrasonic: < 20 Hz; Ultrasonic: > 20,000 Hz e.g. used by bats). ध्वनि: कंपन, आवृत्ति (Hz), आयाम (डेसीबल dB), तारत्व (Pitch), प्रबलता, और श्रव्य सीमा (20 Hz से 20,000 Hz)।",
    keywords: ["sound", "vibration", "frequency", "amplitude", "pitch", "loudness", "decibel", "hertz", "audible range", "ultrasonic", "larynx", "ध्वनि", "आवृत्ति", "आयाम", "तारत्व", "प्रबलता"]
  },
  {
    classLevel: 9,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Gravitation",
    subject: "Science",
    pageNumber: 132,
    conceptTag: "gravitation-universal-law-free-fall-buoyancy",
    conceptName: "Universal Law of Gravitation, Free Fall (g) & Archimedes' Principle",
    text: "Universal Law of Gravitation (Newton): Every object in the universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of distance between them: F = G·(m₁·m₂)/r², where Universal Gravitational Constant G = 6.673 × 10⁻¹¹ N·m²/kg². Acceleration due to gravity: g = G·M/R² (on Earth's surface, g = 9.8 m/s²). Free Fall equations of motion: v = u + gt, h = ut + ½gt², v² - u² = 2gh. Mass (m) is constant everywhere; Weight (W = m·g) varies with g (Weight on Moon is 1/6th of weight on Earth). Archimedes' Principle: When a body is immersed fully or partially in a fluid, it experiences an upward buoyant force equal to the weight of fluid displaced. Relative Density = Density of substance / Density of water. गुरुत्वाकर्षण: सार्वत्रिक नियम (F = G m1m2/r²), गुरुत्वीय त्वरण (g = 9.8 m/s²), भार व द्रव्यमान, आर्किमिडीज का सिद्धांत और उत्प्लावन बल।",
    keywords: ["gravitation", "universal law of gravitation", "G=6.67x10-11", "acceleration due to gravity", "g=9.8", "free fall", "weight", "mass", "archimedes principle", "buoyancy", "गुरुत्वाकर्षण", "भार", "द्रव्यमान", "आर्किमिडीज का सिद्धांत"]
  },
  {
    classLevel: 9,
    chapterNumber: 11,
    chapterTitle: "Chapter 11: Work and Energy",
    subject: "Science",
    pageNumber: 148,
    conceptTag: "work-energy-kinetic-potential-power",
    conceptName: "Work Done, Kinetic Energy, Potential Energy & Power",
    text: "Work Done: Work is said to be done when a force acting on an object causes displacement in the direction of force: W = F · s · cos(θ). SI unit of work is Joule (1 J = 1 N · 1 m). Kinetic Energy (E_k): Energy possessed by an object due to its motion: E_k = ½·m·v². Work-Energy Theorem: Work done by net force equals change in kinetic energy (W = ½mv² - ½mu²). Potential Energy (E_p): Energy possessed by an object due to its position or configuration: Gravitational Potential Energy E_p = m·g·h. Law of Conservation of Energy: Energy can neither be created nor destroyed, only transformed from one form to another: E_total = E_k + E_p = constant. Power (P): Rate of doing work: P = W/t (SI unit Watt, 1 W = 1 J/s; Commercial unit 1 kWh = 3.6 × 10⁶ J). कार्य तथा ऊर्जा: कार्य (W = Fs), गतिज ऊर्जा (Ek = ½mv²), स्थितिज ऊर्जा (Ep = mgh), ऊर्जा संरक्षण का नियम, शक्ति (P = W/t, वॉट)।",
    keywords: ["work and energy", "work done", "kinetic energy", "potential energy", "conservation of energy", "power", "watt", "joule", "W=Fs", "Ek=1/2mv2", "Ep=mgh", "कार्य तथा ऊर्जा", "गतिज ऊर्जा", "स्थितिज ऊर्जा", "शक्ति"]
  },
  {
    classLevel: 10,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Carbon and its Compounds",
    subject: "Science",
    pageNumber: 62,
    conceptTag: "carbon-covalent-bonding-homologous-series",
    conceptName: "Carbon: Covalent Bonding, Tetravalency, Catenation & Homologous Series",
    text: "Carbon (Atomic No. 6, configuration 2,4) achieves stable noble gas configuration by sharing 4 valence electrons forming Covalent Bonds (Tetravalency). Catenation: Unique ability of carbon to form long chains and rings with other carbon atoms due to small size and strong C-C bond energy. Hydrocarbons: 1. Saturated Hydrocarbons (Alkanes, single bond, C_n H_{2n+2}, e.g. Methane CH₄, Ethane C₂H₆). 2. Unsaturated Hydrocarbons: Alkenes (double bond C=C, C_n H_{2n}, e.g. Ethene C₂H₄) and Alkynes (triple bond C≡C, C_n H_{2n-2}, e.g. Ethyne C₂H₂). Homologous Series: Series of compounds with same functional group, where successive members differ by -CH₂- unit and 14 u molecular mass. Important Reactions: 1. Esterification: Ethanol + Ethanoic acid -> (acid catalyst) -> Ethyl ethanoate (Ester, sweet smell) + Water. 2. Saponification: Alkaline hydrolysis of esters gives soap (Sodium salts of long-chain fatty acids) and glycerol. कार्बन एवं उसके यौगिक: सहसंयोजी आबंध, चतुःसंयोजकता, श्रृंखलन, समजातीय श्रेणी (एल्केन, एल्कीन, एल्काइन), एस्टरीकरण और साबुनीकरण।",
    keywords: ["carbon and its compounds", "covalent bond", "catenation", "tetravalency", "alkane", "alkene", "alkyne", "homologous series", "esterification", "saponification", "ethanol", "ethanoic acid", "कार्बन एवं उसके यौगिक", "श्रृंखलन", "समजातीय श्रेणी", "साबुनीकरण"]
  },
  {
    classLevel: 10,
    chapterNumber: 7,
    chapterTitle: "Chapter 7: Control and Coordination",
    subject: "Science",
    pageNumber: 114,
    conceptTag: "control-coordination-neuron-reflex-hormones",
    conceptName: "Neuron Structure, Reflex Arc, Plant Hormones & Endocrine System",
    text: "Nervous System: Neuron (nerve cell) is the structural and functional unit of nervous system comprising Dendrites (detect signals), Cell Body (Cyton), Axon (conducts electrical impulse), and Nerve Ending. Synapse: Microscopic gap between two neurons where electrical impulse triggers release of neurotransmitters (chemical signal). Reflex Arc: Involuntary, instantaneous response to a stimulus; pathway: Receptor -> Sensory Neuron -> Spinal Cord (Relay Neuron) -> Motor Neuron -> Effector muscle. Plant Hormones (Phytohormones): 1. Auxin (promotes cell elongation, causes phototropism bending towards light). 2. Gibberellins (stem elongation). 3. Cytokinins (promotes rapid cell division in fruits/seeds). 4. Abscisic Acid (ABA, growth inhibitor, causes wilting of leaves). Human Endocrine Glands: Pituitary (Growth hormone), Thyroid (Thyroxine, requires Iodine), Pancreas (Insulin, regulates blood sugar), Adrenal (Adrenaline, fight-or-flight hormone). नियंत्रण एवं समन्वय: तंत्रिका कोशिका (न्यूरॉन), सिनैप्स, प्रतिवर्ती चाप, पादप हार्मोन (ऑक्सिन, जिबरेलिन, साइटोकाइनिन, एब्सिसिक अम्ल), और अंतःस्रावी ग्रंथियाँ (इंसुलिन, थायरॉक्सिन)।",
    keywords: ["control and coordination", "neuron", "synapse", "reflex arc", "auxin", "gibberellin", "cytokinin", "abscisic acid", "insulin", "thyroxine", "adrenaline", "pituitary", "नियंत्रण एवं समन्वय", "न्यूरॉन", "प्रतिवर्ती चाप", "पादप हार्मोन", "इंसुलिन"]
  },
  {
    classLevel: 10,
    chapterNumber: 13,
    chapterTitle: "Chapter 13: Magnetic Effects of Electric Current",
    subject: "Science",
    pageNumber: 228,
    conceptTag: "magnetic-effects-current-fleming-rules-motor",
    conceptName: "Magnetic Field, Right-Hand Thumb Rule & Fleming's Left-Hand Rule",
    text: "Oersted Experiment showed that an electric current produces a magnetic field around it. Magnetic Field Lines: Continuous closed loops that emerge from North pole and enter South pole outside magnet; tangent gives field direction; never intersect each other. Right-Hand Thumb Rule (Maxwell): If you hold a current-carrying straight conductor in your right hand with thumb in direction of current, curled fingers give direction of magnetic field lines. Solenoid: Long coil of many circular turns of insulated copper wire; produces uniform magnetic field inside like a bar magnet. Fleming's Left-Hand Rule (Electric Motor): Stretch thumb, forefinger, and middle finger mutually perpendicular: Forefinger = Magnetic Field (B), Middle finger = Current (I), Thumb = Direction of Force/Motion (F) on conductor (F = B·I·L). Electromagnetic Induction (Faraday): Moving a conductor in magnetic field or changing magnetic flux induces electric current (Fleming's Right-Hand Rule). विद्युत धारा के चुंबकीय प्रभाव: चुंबकीय क्षेत्र रेखाएँ, दक्षिण-हस्त अंगुष्ठ नियम, परिनालिका (Solenoid), फ्लेमिंग का वामहस्त नियम (विद्युत मोटर), और विद्युत चुंबकीय प्रेरण।",
    keywords: ["magnetic effects of current", "right hand thumb rule", "solenoid", "flemings left hand rule", "electric motor", "electromagnetic induction", "flemings right hand rule", "चुंबकीय प्रभाव", "दाएं हाथ का अंगूठा नियम", "फ्लेमिंग का वामहस्त नियम", "विद्युत मोटर"]
  },
  {
    classLevel: 11,
    chapterNumber: 4,
    chapterTitle: "Chapter 4: Chemical Bonding and Molecular Structure",
    subject: "Chemistry",
    pageNumber: 100,
    conceptTag: "chemical-bonding-vsepr-hybridization-mot",
    conceptName: "Chemical Bonding: VSEPR Theory, Hybridization & Molecular Orbital Theory (MOT)",
    text: "Octet Rule: Atoms combine by sharing or transferring valence electrons to achieve 8 electrons in outermost shell. VSEPR Theory (Valence Shell Electron Pair Repulsion): Shape of molecule depends on number of electron pairs around central atom; repulsion order: Lone Pair-Lone Pair (lp-lp) > Lone Pair-Bond Pair (lp-bp) > Bond Pair-Bond Pair (bp-bp). Shapes: Linear (BeCl₂, 180°), Trigonal planar (BF₃, 120°), Tetrahedral (CH₄, 109.5°), Trigonal pyramidal (NH₃, 107°), Bent (H₂O, 104.5°). Hybridization: Intermixing of atomic orbitals of slightly different energies to form equivalent hybrid orbitals: 1. sp (linear, e.g. BeCl₂, C₂H₂). 2. sp² (trigonal planar, e.g. BF₃, C₂H₄). 3. sp³ (tetrahedral, e.g. CH₄, NH₃, H₂O). Molecular Orbital Theory (MOT): Atomic orbitals combine linearly (LCAO) to form Bonding (σ, π) and Antibonding (σ*, π*) MOs. Bond Order = ½ (N_b - N_a). If Bond Order > 0, molecule is stable; Paramagnetic if unpaired electrons exist (e.g. O₂ with bond order 2 is paramagnetic). रासायनिक आबंधन: VSEPR सिद्धांत, संकरण (sp, sp², sp³), आण्विक कक्षक सिद्धांत (MOT), और बंध कोटि (Bond Order)।",
    keywords: ["chemical bonding", "vsepr theory", "hybridization", "sp3", "sp2", "sp", "molecular orbital theory", "mot", "bond order", "lone pair", "paramagnetic", "रासायनिक आबंधन", "संकरण", "आण्विक कक्षक सिद्धांत"]
  },
  {
    classLevel: 12,
    chapterNumber: 2,
    chapterTitle: "Chapter 2: Electrochemistry",
    subject: "Chemistry",
    pageNumber: 68,
    conceptTag: "electrochemistry-nernst-equation-kohlrausch",
    conceptName: "Galvanic Cells, Nernst Equation, Kohlrausch's Law & Faraday's Laws",
    text: "Galvanic / Voltaic Cell (e.g. Daniell Cell): Converts chemical energy into electrical energy: Zn(s) + Cu²⁺(aq) -> Zn²⁺(aq) + Cu(s); Standard EMF E°_cell = E°_cathode - E°_anode = +1.10 V. Nernst Equation: Calculates cell potential under non-standard conditions: E_cell = E°_cell - (2.303 RT / nF) log Q = E°_cell - (0.0591 / n) log [Anode]/[Cathode] at 298 K. Kohlrausch's Law of Independent Migration of Ions: Limiting molar conductivity of an electrolyte (Λ°_m) is sum of individual ionic conductivities: Λ°_m(AxBy) = x·λ°_+ + y·λ°_-. Faraday's Laws of Electrolysis: 1. Mass deposited m = Z · I · t (where Z is electrochemical equivalent). 2. For same charge Q passed through different electrolytes, masses deposited are proportional to chemical equivalent weights (m₁/E₁ = m₂/E₂). वैद्युतरसायन: गैल्वेनिक सेल (डेनियल सेल), नेर्नस्ट समीकरण (Ecell = E° - 0.0591/n log Q), कोलराउश का नियम, और फैराडे के विद्युत अपघटन नियम।",
    keywords: ["electrochemistry", "galvanic cell", "nernst equation", "kohlrausch law", "faraday laws", "emf", "standard electrode potential", "daniell cell", "Ecell=E0-0.0591/n logQ", "वैद्युतरसायन", "नेर्नस्ट समीकरण", "कोलराउश का नियम"]
  },
  {
    classLevel: 12,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Wave Optics",
    subject: "Physics",
    pageNumber: 350,
    conceptTag: "wave-optics-huygens-ydse-interference-diffraction",
    conceptName: "Huygens' Wave Principle, Young's Double Slit (YDSE) & Interference",
    text: "Huygens' Principle: Every point on a wavefront behaves as a secondary source of spherical wavelets spreading out in forward direction with speed of light; envelope of secondary wavelets gives new wavefront. Proves Laws of Reflection (∠i = ∠r) and Refraction (Snell's Law: n₂₁ = sin i / sin r = v₁ / v₂). Interference of Light: Superposition of two coherent light waves producing alternate bright and dark fringes. Young's Double Slit Experiment (YDSE): Slits separated by distance d, screen at distance D. 1. Path Difference Δx = d · sin θ ≈ d · (y / D). 2. Constructive Interference (Bright Fringes): Δx = n·λ (y_n = n·λ·D / d). 3. Destructive Interference (Dark Fringes): Δx = (2n - 1)·(λ/2) (y_n = (2n - 1)·λ·D / (2d)). Fringe Width: β = λ·D / d (all bright and dark fringes in YDSE have equal width). Diffraction: Bending of light around sharp corners of an obstacle/aperture into geometrical shadow. तरंग प्रकाशिकी: हाइगेंस का तरंग सिद्धांत, व्यतिकरण, यंग का द्वि-स्लिट प्रयोग (YDSE, फ्रिंज चौड़ाई β = λD/d), और विवर्तन।",
    keywords: ["wave optics", "huygens principle", "wavefront", "interference", "ydse", "youngs double slit", "fringe width", "diffraction", "coherent sources", "beta=lambda D/d", "तरंग प्रकाशिकी", "हाइगेंस का सिद्धांत", "व्यतिकरण", "यंग का प्रयोग"]
  },

  // =========================================================================
  // CLASS 6: MATHEMATICS & SOCIAL SCIENCE EXPANSIONS
  // =========================================================================
  {
    classLevel: 6,
    chapterNumber: 7,
    chapterTitle: "Chapter 7: Fractions and Decimals",
    subject: "Mathematics",
    pageNumber: 135,
    conceptTag: "fractions-decimals-representation",
    conceptName: "Fractions, Types (Proper, Improper, Mixed) & Decimals",
    text: "A fraction represents a part of a whole: Fraction = Numerator / Denominator. Proper Fraction: Numerator < Denominator (e.g. 3/4). Improper Fraction: Numerator >= Denominator (e.g. 7/4). Mixed Fraction: Combination of a whole and a proper fraction (e.g. 1¾ = (1×4 + 3)/4 = 7/4). Like Fractions have same denominator; Unlike Fractions have different denominators. Equivalent Fractions: Formed by multiplying or dividing numerator and denominator by same non-zero number. Decimals: Fractions with denominators 10, 100, 1000 written using a decimal point (e.g. 7/10 = 0.7, 25/100 = 0.25). भिन्न एवं दशमलव: उचित भिन्न, विषम भिन्न, मिश्रित भिन्न, तुल्य भिन्न और दशमलव निरूपण।",
    keywords: ["fractions", "decimals", "proper fraction", "improper fraction", "mixed fraction", "equivalent fractions", "numerator", "denominator", "भिन्न", "दशमलव", "उचित भिन्न", "विषम भिन्न"]
  },
  {
    classLevel: 6,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Understanding Diversity",
    subject: "Social Science",
    pageNumber: 3,
    conceptTag: "civics-understanding-diversity-unity",
    conceptName: "Diversity, Inequality, and 'Unity in Diversity' in India",
    text: "Diversity means difference in language, culture, religion, food, clothes, and regional background among people. India is a land of great diversity where people practice 8 major world religions and speak hundreds of languages. Pandit Jawaharlal Nehru in his book 'The Discovery of India' coined the phrase 'Unity in Diversity' (विविधता में एकता) to describe how Indians stood united against British rule despite religious and cultural differences. Inequality comes when a person does not have the resources and opportunities that are available to other persons (e.g. Caste system). विविधता की समझ: भारत में सांस्कृतिक व भाषाई विविधता, असमानता, और 'विविधता में एकता'।",
    keywords: ["diversity", "understanding diversity", "unity in diversity", "jawaharlal nehru", "inequality", "caste system", "discovery of india", "विविधता", "विविधता में एकता", "समानता"]
  },
  {
    classLevel: 6,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: The Earth in the Solar System",
    subject: "Social Science",
    pageNumber: 1,
    conceptTag: "geography-earth-in-solar-system",
    conceptName: "The Solar System, Planets, Sun & Earth as a Unique Planet",
    text: "The Solar System comprises the Sun, eight planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), satellites, asteroids, and meteoroids. The Sun is at the centre, made of extremely hot gases, providing the pulling force that binds the solar system. Earth is the 3rd nearest planet to the Sun and 5th largest planet; its shape is described as a Geoid (भू-आभ). Earth is a unique 'Blue Planet' because two-thirds of its surface is covered by water and it has life-supporting air containing Oxygen. Moon is Earth's only natural satellite (takes ~27 days to rotate and revolve). सौरमंडल में पृथ्वी: सूर्य, आठ ग्रह, भू-आभ (Geoid), नीला ग्रह, और चंद्रमा (प्राकृतिक उपग्रह)।",
    keywords: ["solar system", "earth in solar system", "planets", "geoid", "blue planet", "sun", "moon", "asteroids", "सौरमंडल", "पृथ्वी", "भू-आभ", "ग्रह"]
  },

  // =========================================================================
  // CLASS 7: MATHEMATICS & SOCIAL SCIENCE EXPANSIONS
  // =========================================================================
  {
    classLevel: 7,
    chapterNumber: 5,
    chapterTitle: "Chapter 5: Lines and Angles",
    subject: "Mathematics",
    pageNumber: 93,
    conceptTag: "lines-angles-complementary-supplementary",
    conceptName: "Complementary, Supplementary, Vertically Opposite & Parallel Line Angles",
    text: "Complementary Angles: Two angles whose sum is 90° (e.g. 30° and 60°). Supplementary Angles: Two angles whose sum is 180° (e.g. 110° and 70°). Adjacent Angles: Have a common vertex and common arm without overlapping interiors. Linear Pair: Adjacent angles whose non-common arms are opposite rays (sum = 180°). Vertically Opposite Angles: Formed when two lines intersect; are always equal (∠1 = ∠3, ∠2 = ∠4). Transversal intersecting two parallel lines creates: 1. Alternate Interior Angles (equal, e.g. ∠3 = ∠5). 2. Corresponding Angles (equal, e.g. ∠1 = ∠5). 3. Interior angles on same side of transversal are supplementary (sum = 180°). रेखा एवं कोण: पूरक कोण (90°), संपूरक कोण (180°), रैखिक युग्म, शीर्षाभिमुख कोण, और एकांतर अंतःकोण।",
    keywords: ["lines and angles", "complementary angles", "supplementary angles", "linear pair", "vertically opposite angles", "transversal", "alternate interior angles", "रेखा एवं कोण", "पूरक कोण", "संपूरक कोण", "शीर्षाभिमुख कोण"]
  },
  {
    classLevel: 7,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Environment",
    subject: "Social Science",
    pageNumber: 1,
    conceptTag: "geography-environment-ecosystem",
    conceptName: "Environment: Natural, Human-Made, Domains of Earth & Ecosystem",
    text: "Environment (from French 'Environer' meaning neighborhood) is our basic life support system providing air we breathe, water we drink, food we eat, and land where we live. Components: 1. Natural Environment: Biotic (living organisms e.g. plants, animals) and Abiotic (non-living elements e.g. land, water, air). Four Domains of Earth: Lithosphere (solid crust/land), Hydrosphere (water bodies), Atmosphere (thin layer of air held by gravity), and Biosphere (narrow contact zone supporting life). Ecosystem (पारितंत्र): System formed by interaction of all living organisms with each other and physical/chemical factors of environment in which they live. World Environment Day is celebrated on 5th June. पर्यावरण: प्राकृतिक व मानव निर्मित पर्यावरण, स्थलमंडल, जलमंडल, वायुमंडल, जीवमंडल, और पारितंत्र (Ecosystem)।",
    keywords: ["environment", "ecosystem", "lithosphere", "hydrosphere", "atmosphere", "biosphere", "biotic", "abiotic", "world environment day", "पर्यावरण", "पारितंत्र", "जीवमंडल"]
  },
  {
    classLevel: 7,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: On Equality",
    subject: "Social Science",
    pageNumber: 4,
    conceptTag: "civics-on-equality-constitution-midday-meal",
    conceptName: "Equality in Indian Democracy, Universal Adult Franchise & Midday Meal",
    text: "Universal Adult Franchise (सार्वभौमिक वयस्क मताधिकार) gives every citizen of India aged 18 years or older the right to vote, irrespective of caste, religion, education, or wealth (Principle of One Person, One Vote, One Value). Article 15 of Indian Constitution prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. Midday Meal Scheme (मध्याह्न भोजन योजना): Introduced first in Tamil Nadu in 2001, later mandated by Supreme Court across all government elementary schools to provide cooked hot lunch to children, improving school enrollment, attendance, nutrition, and breaking caste prejudices. समानता: भारतीय लोकतंत्र में समानता, सार्वभौमिक वयस्क मताधिकार, अनुच्छेद 15, और मध्याह्न भोजन योजना।",
    keywords: ["on equality", "universal adult franchise", "article 15", "constitution of india", "midday meal scheme", "equality in democracy", "समानता", "वयस्क मताधिकार", "मध्याह्न भोजन"]
  },

  // =========================================================================
  // CLASS 8: MATHEMATICS & SOCIAL SCIENCE EXPANSIONS
  // =========================================================================
  {
    classLevel: 8,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Rational Numbers",
    subject: "Mathematics",
    pageNumber: 12,
    conceptTag: "math-rational-numbers-properties",
    conceptName: "Rational Numbers: Closure, Commutative, Associative & Distributive Laws",
    text: "A number that can be written in the form p/q, where p and q are integers and q ≠ 0, is called a Rational Number. Properties of Rational Numbers: 1. Closure Property: Rational numbers are closed under addition (a+b), subtraction (a-b), and multiplication (a×b). Not closed under division (division by 0 is undefined). 2. Commutativity: a + b = b + a, and a × b = b × a (Holds for + and ×, NOT for - and ÷). 3. Associativity: (a + b) + c = a + (b + c), and (a × b) × c = a × (b × c). 4. Additive Identity is 0 (a + 0 = a); Multiplicative Identity is 1 (a × 1 = a). 5. Additive Inverse of a/b is -a/b; Multiplicative Inverse (Reciprocal) of a/b is b/a. 6. Distributive Law: a × (b + c) = (a × b) + (a × c). परिमेय संख्याएँ: संवृत, क्रमविनिमेय, साहचर्य, योज्य तत्समक (0), गुणात्मक तत्समक (1), और वितरक नियम।",
    keywords: ["rational numbers", "closure property", "commutativity", "associativity", "distributive law", "additive inverse", "multiplicative inverse", "reciprocal", "परिमेय संख्या", "क्रमविनिमेय", "साहचर्य"]
  },
  {
    classLevel: 8,
    chapterNumber: 11,
    chapterTitle: "Chapter 11: Mensuration",
    subject: "Mathematics",
    pageNumber: 168,
    conceptTag: "math-mensuration-area-perimeter-volume",
    conceptName: "Mensuration: Area of Trapezium, Rhombus, Surface Area & Volume of Cylinder",
    text: "Formulas for 2D and 3D Figures: 1. Area of Trapezium = ½ × (Sum of parallel sides) × height = ½ × (a + b) × h. 2. Area of Rhombus = ½ × d₁ × d₂ (where d₁, d₂ are diagonals). 3. Cuboid: Total Surface Area (TSA) = 2(lb + bh + hl); Lateral Surface Area (LSA) = 2h(l + b); Volume = l × b × h. 4. Cube: TSA = 6a²; LSA = 4a²; Volume = a³. 5. Right Circular Cylinder (Radius r, Height h): Curved Surface Area (CSA) = 2πrh; Total Surface Area (TSA) = 2πr(r + h); Volume = πr²h. क्षेत्रमिति: समलंब चतुर्भुज का क्षेत्रफल = ½(a+b)h, समचतुर्भुज = ½d1d2, बेलन का वक्र पृष्ठ = 2πrh, कुल पृष्ठ = 2πr(r+h), आयतन = πr²h।",
    keywords: ["mensuration", "area of trapezium", "rhombus", "cuboid", "cube", "cylinder", "surface area", "volume", "2pirh", "pir2h", "क्षेत्रमिति", "समलंब", "बेलन का आयतन"]
  },
  {
    classLevel: 8,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Resources",
    subject: "Social Science",
    pageNumber: 2,
    conceptTag: "geography-resources-sustainable-development",
    conceptName: "Resources: Natural, Human-Made, Renewable vs Non-Renewable & Sustainable Development",
    text: "Anything that can be used to satisfy a human need is a Resource (has Utility and Value). Types of Resources: 1. Natural Resources: Renewable (unlimited or replenished rapidly e.g. Solar energy, Wind energy, Water) and Non-Renewable (limited stock, take millions of years to form e.g. Coal, Petroleum, Natural Gas). 2. Human-Made Resources: Buildings, bridges, roads, machinery created using natural substances. 3. Human Resources: People with their knowledge, skill, and intelligence. Sustainable Development (सतत पोषणीय विकास): Balancing the need to use resources and conserving them for the future. Golden Rules: Reduce consumption, recycle, and reuse (3Rs); conserve biodiversity. संसाधन: प्राकृतिक संसाधन (नवीकरणीय व अनवीकरणीय), मानव संसाधन, और सतत पोषणीय विकास।",
    keywords: ["resources", "natural resources", "renewable resources", "non renewable resources", "sustainable development", "human resources", "conservation", "संसाधन", "नवीकरणीय", "सतत पोषणीय विकास"]
  },

  // =========================================================================
  // CLASS 9: MATHEMATICS & SOCIAL SCIENCE EXPANSIONS
  // =========================================================================
  {
    classLevel: 9,
    chapterNumber: 2,
    chapterTitle: "Chapter 2: Polynomials",
    subject: "Mathematics",
    pageNumber: 35,
    conceptTag: "math-polynomials-remainder-factor-theorem",
    conceptName: "Polynomials: Degree, Zeroes, Remainder Theorem & Factor Theorem",
    text: "A polynomial p(x) is an algebraic expression of the form a_n x^n + ... + a₁x + a₀ with non-negative integer exponents. Degree: Highest power of variable in p(x) (Linear: 1, Quadratic: 2, Cubic: 3). Zero of a Polynomial: Value 'k' such that p(k) = 0. Remainder Theorem: If polynomial p(x) is divided by (x - a), the remainder is p(a). Factor Theorem: (x - a) is a factor of p(x) if and only if p(a) = 0. Important Algebraic Identities: 1. (x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx. 2. (x + y)³ = x³ + y³ + 3xy(x + y). 3. (x - y)³ = x³ - y³ - 3xy(x - y). 4. x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx). If x + y + z = 0, then x³ + y³ + z³ = 3xyz. बहुपद: घात, शून्यक, शेषफल प्रमेय p(a), गुणनखंड प्रमेय, और सर्वसमिकाएँ।",
    keywords: ["polynomials", "degree of polynomial", "zeroes of polynomial", "remainder theorem", "factor theorem", "algebraic identities", "बहुपद", "शेषफल प्रमेय", "गुणनखंड प्रमेय", "सर्वसमिकाएं"]
  },
  {
    classLevel: 9,
    chapterNumber: 7,
    chapterTitle: "Chapter 7: Triangles",
    subject: "Mathematics",
    pageNumber: 118,
    conceptTag: "math-triangles-congruence-criteria",
    conceptName: "Congruence of Triangles: SAS, ASA, AAS, SSS, and RHS Criteria",
    text: "Two triangles are Congruent (≅) if their corresponding sides and corresponding angles are equal (CPCT: Corresponding Parts of Congruent Triangles are equal). Criteria for Congruence: 1. SAS (Side-Angle-Side): Two sides and the included angle of one triangle equal to two sides and included angle of another. 2. ASA (Angle-Side-Angle): Two angles and included side are equal. 3. AAS (Angle-Angle-Side): Two angles and any one side are equal. 4. SSS (Side-Side-Side): All three sides of one triangle equal to all three sides of another. 5. RHS (Right angle-Hypotenuse-Side): In right triangles, hypotenuse and one side are equal. Isosceles Triangle Theorem: Angles opposite to equal sides of an isosceles triangle are equal; sides opposite to equal angles are equal. त्रिभुज: सर्वांगसमता के नियम (SAS, ASA, AAS, SSS, RHS), CPCT, और समद्विबाहु त्रिभुज प्रमेय।",
    keywords: ["triangles", "congruence of triangles", "SAS", "ASA", "AAS", "SSS", "RHS", "CPCT", "isosceles triangle theorem", "त्रिभुज", "सर्वांगसमता", "समद्विबाहु त्रिभुज"]
  },
  {
    classLevel: 9,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: What is Democracy? Why Democracy?",
    subject: "Social Science",
    pageNumber: 5,
    conceptTag: "civics-what-is-democracy-features",
    conceptName: "Democracy: Definition, Key Features & Arguments For/Against",
    text: "Democracy is a form of government in which the rulers are elected by the people. Key Features of Democracy: 1. Major decisions by elected leaders: Final decision-making power rests with those elected by the people. 2. Free and fair electoral competition: Elections must offer a real choice and fair opportunity to change current rulers. 3. One Person, One Vote, One Value: Each adult citizen must have one vote and each vote must have equal value. 4. Rule of Law and respect for rights: Government rules within limits set by constitutional law and citizens' rights. Why Democracy: It is more accountable, improves quality of decision-making by consultation, provides a method to deal with differences and conflicts, and enhances the dignity of citizens. लोकतंत्र क्या? लोकतंत्र क्यों?: परिभाषा, प्रमुख विशेषताएँ (स्वतंत्र व निष्पक्ष चुनाव, एक व्यक्ति एक वोट, कानून का शासन) और लोकतंत्र के पक्ष में तर्क।",
    keywords: ["what is democracy", "features of democracy", "free and fair elections", "universal adult franchise", "rule of law", "accountable government", "लोकतंत्र", "स्वतंत्र व निष्पक्ष चुनाव", "कानून का शासन"]
  },

  // =========================================================================
  // CLASS 10: SOCIAL SCIENCE & MATHEMATICS EXPANSIONS
  // =========================================================================
  {
    classLevel: 10,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Development",
    subject: "Social Science",
    pageNumber: 6,
    conceptTag: "economics-development-per-capita-income-hdi",
    conceptName: "Development Goals, National Income, Per Capita Income & Human Development Index (HDI)",
    text: "Development involves aspirations and goals that differ from person to person (what may be development for one may be destructive for another). Common developmental goals include Income, Equal treatment, Freedom, Security, and Respect. Comparing Countries: 1. World Bank (World Development Report): Classifies countries based on Per Capita Income (Average Income = Total National Income / Total Population) in US Dollars. 2. UNDP (United Nations Development Programme): Uses Human Development Index (HDI) comparing countries based on Educational levels (Mean years & Expected years of schooling), Health status (Life Expectancy at birth), and Per Capita Income (PPP). Sustainable Development emphasizes meeting present needs without compromising future generations. विकास: विकास के लक्ष्य, प्रति व्यक्ति आय (औसत आय), विश्व बैंक वर्गीकरण, UNDP मानव विकास सूचकांक (HDI), और जीवन प्रत्याशा।",
    keywords: ["development", "per capita income", "average income", "world bank", "undp", "human development index", "hdi", "life expectancy", "sustainable development", "विकास", "प्रति व्यक्ति आय", "मानव विकास सूचकांक"]
  },
  {
    classLevel: 10,
    chapterNumber: 7,
    chapterTitle: "Chapter 7: Coordinate Geometry",
    subject: "Mathematics",
    pageNumber: 156,
    conceptTag: "math-coordinate-geometry-distance-section-formula",
    conceptName: "Coordinate Geometry: Distance Formula, Section Formula & Mid-Point Formula",
    text: "Coordinate Geometry locates points in a 2D Cartesian plane (x, y). 1. Distance Formula: Distance between two points P(x₁, y₁) and Q(x₂, y₂) is given by: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. Distance from origin O(0,0) to P(x, y) is √(x² + y²). 2. Section Formula: The coordinates of point P(x, y) which divides line segment joining A(x₁, y₁) and B(x₂, y₂) internally in ratio m₁:m₂ are: x = (m₁x₂ + m₂x₁) / (m₁ + m₂), y = (m₁y₂ + m₂y₁) / (m₁ + m₂). 3. Mid-Point Formula: When ratio is 1:1, mid-point M has coordinates: x = (x₁ + x₂) / 2, y = (y₁ + y₂) / 2. 4. Centroid of Triangle with vertices (x₁,y₁), (x₂,y₂), (x₃,y₃) is G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3). निर्देशांक ज्यामिति: दूरी सूत्र d = √[(x2-x1)² + (y2-y1)²], विभाजन सूत्र, मध्य-बिंदु सूत्र, और त्रिभुज का केंद्रक।",
    keywords: ["coordinate geometry", "distance formula", "section formula", "midpoint formula", "centroid", "cartesian plane", "निर्देशांक ज्यामिति", "दूरी सूत्र", "विभाजन सूत्र", "मध्य बिंदु सूत्र"]
  },
  {
    classLevel: 10,
    chapterNumber: 15,
    chapterTitle: "Chapter 15: Probability",
    subject: "Mathematics",
    pageNumber: 295,
    conceptTag: "math-probability-theoretical-events",
    conceptName: "Theoretical Probability, Complementary Events & Range of Probability",
    text: "Theoretical (Classical) Probability of an Event E, denoted by P(E), is defined as: P(E) = (Number of outcomes favourable to E) / (Total number of all possible outcomes). Properties: 1. The probability of an event lies between 0 and 1: 0 <= P(E) <= 1. 2. Probability of a Sure / Certain Event is 1 (P(Sure) = 1). 3. Probability of an Impossible Event is 0 (P(Impossible) = 0). 4. Sum of probabilities of all elementary events of an experiment is 1: Σ P(E_i) = 1. 5. Complementary Event: For any event E, P(E) + P(not E) = 1, so P(not E) = P(Ē) = 1 - P(E). Example: Playing cards (Total 52 cards: 26 Red [13 Hearts, 13 Diamonds] + 26 Black [13 Spades, 13 Clubs]; 12 Face cards [4 Kings, 4 Queens, 4 Jacks]). प्रायिकता: सैद्धांतिक प्रायिकता P(E) = अनुकूल परिणाम / कुल परिणाम, 0 <= P(E) <= 1, पूरक घटना P(E) + P(Ē) = 1, निश्चित व असंभव घटना।",
    keywords: ["probability", "theoretical probability", "favourable outcomes", "sure event", "impossible event", "complementary event", "cards probability", "0<=P(E)<=1", "प्रायिकता", "अनुकूल परिणाम", "पूरक घटना"]
  },

  // =========================================================================
  // CLASS 11: MATHEMATICS & BIOLOGY EXPANSIONS
  // =========================================================================
  {
    classLevel: 11,
    chapterNumber: 1,
    chapterTitle: "Chapter 1: Sets and Relations",
    subject: "Mathematics",
    pageNumber: 18,
    conceptTag: "math-sets-relations-operations-demorgan",
    conceptName: "Sets: Representations, Subset, Union, Intersection & De Morgan's Laws",
    text: "A Set is a well-defined collection of distinct objects. Represented in Roster Form (e.g. {1, 2, 3}) or Set-Builder Form (e.g. {x : x ∈ N, x < 4}). Types: Empty set (∅), Finite, Infinite, Equal sets. Subset (A ⊆ B): If every element of A is in B; Total subsets of a set with n elements = 2^n. Power Set P(A) is set of all subsets. Operations on Sets: 1. Union (A ∪ B): Elements in A or B or both. 2. Intersection (A ∩ B): Elements common to both A and B (Disjoint if A ∩ B = ∅). 3. Difference (A - B): Elements in A but not in B. 4. Complement (A'): Elements in Universal set U not in A. De Morgan's Laws: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'. Cardinal formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B). समुच्चय एवं संबंध: समुच्चय के प्रकार, उपसमुच्चय, सम्मिलन (A ∪ B), सर्वनिष्ठ (A ∩ B), डी मॉर्गन के नियम, और घात समुच्चय।",
    keywords: ["sets", "subsets", "power set", "union of sets", "intersection of sets", "de morgans laws", "cardinality", "roster form", "set builder", "समुच्चय", "उपसमुच्चय", "डी मॉर्गन के नियम"]
  },
  {
    classLevel: 11,
    chapterNumber: 13,
    chapterTitle: "Chapter 13: Limits and Derivatives",
    subject: "Mathematics",
    pageNumber: 298,
    conceptTag: "math-limits-derivatives-first-principle",
    conceptName: "Limits, Standard Limits (sin x / x = 1) & Derivative by First Principle",
    text: "Limit: lim_{x->a} f(x) = L means as x approaches a, f(x) approaches L (Left Hand Limit LHL = Right Hand Limit RHL for limit to exist). Standard Limits: 1. lim_{x->a} (x^n - a^n)/(x - a) = n·a^(n-1). 2. lim_{x->0} (sin x / x) = 1 (where x is in radians). 3. lim_{x->0} ((1 - cos x)/x) = 0. 4. lim_{x->0} (e^x - 1)/x = 1. Derivative: Measures instantaneous rate of change. First Principle of Derivative: f'(x) = lim_{h->0} [f(x + h) - f(x)] / h. Standard Derivatives: d/dx(x^n) = n·x^(n-1); d/dx(sin x) = cos x; d/dx(cos x) = -sin x; d/dx(tan x) = sec² x; d/dx(e^x) = e^x; d/dx(ln x) = 1/x. Product Rule: d/dx(u·v) = u'v + uv'. Quotient Rule: d/dx(u/v) = (u'v - uv') / v². सीमा और अवकलज: मानक सीमाएं (lim sinx/x = 1), प्रथम सिद्धांत से अवकलन f'(x) = lim [f(x+h)-f(x)]/h, गुणनफल व भागफल नियम।",
    keywords: ["limits and derivatives", "calculus", "first principle of derivative", "standard limits", "sinx/x=1", "product rule", "quotient rule", "d/dx", "सीमा और अवकलज", "प्रथम सिद्धांत", "अवकलन"]
  },
  {
    classLevel: 11,
    chapterNumber: 10,
    chapterTitle: "Chapter 10: Cell Cycle and Cell Division",
    subject: "Biology",
    pageNumber: 162,
    conceptTag: "bio-cell-cycle-mitosis-meiosis",
    conceptName: "Cell Cycle Phases (G1, S, G2, M), Mitosis (Equational) & Meiosis (Reductional)",
    text: "Cell Cycle consists of two main phases: 1. Interphase (Resting/Preparatory Phase ~95% duration): G₁ Phase (cell growth and protein synthesis), S Phase (DNA synthesis and replication, chromosome number 2n remains same but DNA amount doubles 2C -> 4C), G₂ Phase (protein synthesis for mitosis). 2. M Phase (Mitosis): Karyokinesis (nuclear division: Prophase, Metaphase [chromosomes align at equatorial plate / Metaphase plate], Anaphase [sister chromatids split and move to opposite poles], Telophase) followed by Cytokinesis (cytoplasmic division). Mitosis is Equational Division (produces 2 genetically identical diploid 2n daughter cells). Meiosis is Reductional Division occurring in germ cells: Meiosis I (Prophase I has 5 stages: Leptotene, Zygotene [synapsis / bivalent formation], Pachytene [Crossing over / genetic recombination mediated by Recombinase enzyme], Diplotene [Chiasmata visible], Diakinesis) and Meiosis II, producing 4 haploid (n) daughter cells. कोशिका चक्र एवं कोशिका विभाजन: अंतरावस्था (G1, S, G2), समसूत्री विभाजन (Mitosis), अर्धसूत्री विभाजन (Meiosis), क्रॉसिंग ओवर (जीन विनिमय), और क्याज्मेटा।",
    keywords: ["cell cycle", "cell division", "interphase", "S phase", "mitosis", "meiosis", "prophase", "metaphase", "anaphase", "telophase", "crossing over", "pachytene", "chiasmata", "कोशिका चक्र", "समसूत्री विभाजन", "अर्धसूत्री विभाजन", "जीन विनिमय"]
  },

  // =========================================================================
  // CLASS 12: MATHEMATICS & BIOLOGY EXPANSIONS
  // =========================================================================
  {
    classLevel: 12,
    chapterNumber: 3,
    chapterTitle: "Chapter 3: Matrices and Determinants",
    subject: "Mathematics",
    pageNumber: 62,
    conceptTag: "math-matrices-determinants-inverse",
    conceptName: "Matrices, Determinants Properties, Adjoint & Matrix Inversion (A⁻¹)",
    text: "Matrix is an ordered rectangular array of numbers (m × n). Types: Row, Column, Square, Diagonal, Scalar, Identity (I), Zero matrix. Matrix Multiplication (AB) is possible if columns of A = rows of B (AB ≠ BA generally; non-commutative). Transpose of Matrix (A^T or A'): Symmetric if A' = A; Skew-Symmetric if A' = -A. Determinant: Scalar value computed from a square matrix. Determinant of 2×2: |A| = ad - bc. Singular Matrix if |A| = 0; Non-Singular if |A| ≠ 0. Adjoint of a Matrix adj(A) is transpose of cofactor matrix. Invertible Matrix Formula: A⁻¹ = (1 / |A|) · adj(A) (exists iff |A| ≠ 0). Solving system of linear equations AX = B using Matrix Method: X = A⁻¹ B. आव्यूह एवं सारणिक: आव्यूह गुणन, सममित व विषम सममित आव्यूह, सहखंडज adj(A), व्युत्क्रम आव्यूह A⁻¹ = (1/|A|) adj(A), और आव्यूह विधि से समीकरण हल।",
    keywords: ["matrices", "determinants", "matrix multiplication", "transpose", "symmetric matrix", "adjoint of matrix", "inverse of matrix", "A-1=(1/|A|)adjA", "singular matrix", "आव्यूह", "सारणिक", "व्युत्क्रम आव्यूह", "सहखंडज"]
  },
  {
    classLevel: 12,
    chapterNumber: 13,
    chapterTitle: "Chapter 13: Probability and Bayes' Theorem",
    subject: "Mathematics",
    pageNumber: 540,
    conceptTag: "math-conditional-probability-bayes-theorem",
    conceptName: "Conditional Probability, Law of Total Probability & Bayes' Theorem",
    text: "1. Conditional Probability: Probability of event A given that B has already occurred: P(A|B) = P(A ∩ B) / P(B), provided P(B) > 0. Multiplication Theorem: P(A ∩ B) = P(B) · P(A|B). 2. Independent Events: Two events A and B are independent if P(A ∩ B) = P(A) · P(B) (and P(A|B) = P(A)). 3. Law of Total Probability: If E₁, E₂, ..., E_n are mutually exclusive and exhaustive events, then for any event A: P(A) = Σ [P(E_i) · P(A|E_i)]. 4. Bayes' Theorem: Computes posterior probability of cause E_k given that event A has occurred: P(E_k | A) = [P(E_k) · P(A|E_k)] / [Σ_{i=1}^n P(E_i) · P(A|E_i)]. प्रायिकता: सप्रतिबंध प्रायिकता P(A|B) = P(A ∩ B)/P(B), स्वतंत्र घटनाएँ (P(A ∩ B) = P(A)P(B)), संपूर्ण प्रायिकता प्रमेय, और बेज़ प्रमेय (Bayes Theorem)।",
    keywords: ["conditional probability", "bayes theorem", "independent events", "law of total probability", "P(A|B)", "prior probability", "posterior probability", "सप्रतिबंध प्रायिकता", "बेज प्रमेय", "स्वतंत्र घटनाएं"]
  },
  {
    classLevel: 12,
    chapterNumber: 6,
    chapterTitle: "Chapter 6: Molecular Basis of Inheritance",
    subject: "Biology",
    pageNumber: 96,
    conceptTag: "bio-molecular-basis-dna-replication-transcription-translation",
    conceptName: "DNA Double Helix, Semiconservative Replication, Transcription & Genetic Code",
    text: "DNA (Deoxyribonucleic Acid) is the genetic material in most organisms. Structure of DNA: Watson and Crick (1953) proposed Double Helix Model based on X-ray diffraction by Franklin & Wilkins and Chargaff's Rules (Amount of Adenine A = Thymine T, Guanine G = Cytosine C; [A+G]/[T+C] = 1). Two polynucleotide chains with antiparallel polarity (5'->3' and 3'->5') joined by hydrogen bonds (A=T with 2 H-bonds, G≡C with 3 H-bonds). Central Dogma of Molecular Biology (Crick): DNA -> (Transcription by RNA Polymerase) -> mRNA -> (Translation on Ribosomes) -> Protein. Semiconservative DNA Replication proved by Meselson and Stahl (1958) using ¹⁵N isotope. Genetic Code: Triplet codons (64 codons: 61 code for 20 amino acids, 3 Stop codons UAA, UAG, UGA; AUG is dual function start codon coding for Methionine). वंशागति का आण्विक आधार: डीएनए द्विकुंडली मॉडल (वाटसन व क्रिक), चारगाफ नियम, डीएनए प्रतिकृतियन (मेसेल्सन व स्टाल), अनुलेखन (Transcription), आनुवंशिक कूट (Genetic Code), और अनुवादन (Translation)।",
    keywords: ["molecular basis of inheritance", "dna structure", "watson and crick", "chargaff rule", "central dogma", "dna replication", "transcription", "translation", "genetic code", "semiconservative", "डीएनए", "द्विकुंडली", "अनुलेखन", "आनुवंशिक कूट"]
  },
  {
    classLevel: 12,
    chapterNumber: 11,
    chapterTitle: "Chapter 11: Biotechnology: Principles and Processes",
    subject: "Biology",
    pageNumber: 192,
    conceptTag: "bio-biotechnology-recombinant-dna-pcr",
    conceptName: "Recombinant DNA Technology, Restriction Enzymes, Plasmids & PCR",
    text: "Biotechnology deals with techniques of using live organisms or enzymes to produce products and processes useful to humans. Core Techniques of Recombinant DNA (rDNA) Technology: 1. Restriction Endonucleases ('Molecular Scissors'): Cut DNA at specific Palindromic recognition sequences (e.g. EcoRI recognizes 5'-GAATTC-3' and cuts to produce sticky ends). 2. DNA Ligase: Joins cut DNA fragments together. 3. Cloning Vectors: Plasmids (e.g. pBR322) and bacteriophages used to transfer alien DNA into host organism; must possess Origin of replication (ori), Selectable markers (ampR, tetR for identifying transformants), and Cloning sites. 4. PCR (Polymerase Chain Reaction - Kary Mullis): In vitro amplification of DNA in 3 steps: Denaturation (94 °C), Primer Annealing (~55 °C), and Extension (72 °C using thermostable Taq Polymerase from Thermus aquaticus). 5. Gel Electrophoresis: Separates DNA fragments based on size toward positive anode using agarose gel, visualized by staining with Ethidium Bromide (EtBr) under UV light as bright orange bands. जैव प्रौद्योगिकी: पुनर्योगज डीएनए (rDNA), प्रतिबंधन एंजाइम (Molecular Scissors, EcoRI), प्लास्मिड (pBR322), पीसीआर (PCR, Taq Polymerase), और जेल इलेक्ट्रोफोरेसिस।",
    keywords: ["biotechnology", "recombinant dna", "restriction endonuclease", "molecular scissors", "EcoRI", "plasmid", "pBR322", "pcr", "taq polymerase", "gel electrophoresis", "ethidium bromide", "जैव प्रौद्योगिकी", "पुनर्योगज डीएनए", "पीसीआर", "प्रतिबंधन एंजाइम"]
  }
];

