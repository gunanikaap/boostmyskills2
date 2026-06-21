// Auto-generated per-course certificate eligibility metadata for all 77 micro-credentials.
// totalVideos / totalMcqs mirror src/lib/learn.ts (videos = video units, mcqs = quiz questions).
// rule: "mcq" → all videos complete + every MCQ attempted + MCQ score >= 50%;
//       "video-only" → all videos complete; "content" → all content/reading units complete.
// Regenerate with: node scripts/gen-certificate-rules.mjs
export type CertificateRule = "mcq" | "video-only" | "content";

export type CertificateRuleMeta = {
  code: string;
  title: string;
  project: string;
  org: string;
  totalVideos: number;
  totalMcqs: number;
  totalContentUnits: number;
  rule: CertificateRule;
};

export const MCQ_PASS_PERCENT = 50;

export const certificateRules: Record<string, CertificateRuleMeta> = {
  "serious-game": { code: "MC10", title: "Serious Game", project: "RES4CITY", org: "Artemat", totalVideos: 1, totalMcqs: 0, totalContentUnits: 2, rule: "video-only" },
  "advanced-modelling-of-buildings-and-energy-systems": { code: "MC13", title: "Advanced Modelling of Buildings and Energy Systems", project: "RES4CITY", org: "University of Coimbra", totalVideos: 20, totalMcqs: 26, totalContentUnits: 3, rule: "mcq" },
  "positive-energy-districts": { code: "MC20", title: "Positive Energy Districts", project: "RES4CITY", org: "Universitat Politècnica de València", totalVideos: 36, totalMcqs: 74, totalContentUnits: 3, rule: "mcq" },
  "efficient-building-techniques": { code: "MC18", title: "Efficient Building Techniques", project: "RES4CITY", org: "Universitat Politècnica de València", totalVideos: 51, totalMcqs: 60, totalContentUnits: 3, rule: "mcq" },
  "hydrogen-technologies-for-urban-areas": { code: "MC33", title: "Hydrogen Technologies for Urban Areas", project: "RES4CITY", org: "Université Grenoble Alpes", totalVideos: 19, totalMcqs: 22, totalContentUnits: 3, rule: "mcq" },
  "tools-for-city-decarbonisation": { code: "MC21", title: "Tools for City Decarbonisation", project: "RES4CITY", org: "Universitat Politècnica de València", totalVideos: 34, totalMcqs: 60, totalContentUnits: 3, rule: "mcq" },
  "renewable-energy-investments": { code: "MC37", title: "Renewable Energy Investments", project: "RES4CITY", org: "Université Grenoble Alpes", totalVideos: 16, totalMcqs: 25, totalContentUnits: 3, rule: "mcq" },
  "thermal-simulation-of-buildings": { code: "MC12", title: "Thermal Simulation of Buildings", project: "RES4CITY", org: "University of Coimbra", totalVideos: 37, totalMcqs: 33, totalContentUnits: 3, rule: "mcq" },
  "tools-strategies-and-trends-in-sustainable-finance": { code: "MC03", title: "Tools, Strategies and Trends in Sustainable Finance", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 13, totalMcqs: 26, totalContentUnits: 3, rule: "mcq" },
  "urban-renewable-energy-decision-making-methodologies": { code: "MC30", title: "Urban Renewable Energy: Decision Making Methodologies", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 11, totalMcqs: 27, totalContentUnits: 3, rule: "mcq" },
  "introduction-to-industrial-organization": { code: "MC29", title: "Introduction to Industrial Organization", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 10, totalMcqs: 23, totalContentUnits: 3, rule: "mcq" },
  "how-sustainable-is-your-city": { code: "MC27", title: "How Sustainable is your City?", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 14, totalMcqs: 38, totalContentUnits: 3, rule: "mcq" },
  "investing-in-sustainability": { code: "MC04", title: "Investing in Sustainability", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 14, totalMcqs: 26, totalContentUnits: 2, rule: "mcq" },
  "climate-risk-and-climate-investing": { code: "MC05", title: "Climate Risk and Climate Investing", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 14, totalMcqs: 26, totalContentUnits: 3, rule: "mcq" },
  "energy-markets": { code: "MC09", title: "Energy Markets", project: "RES4CITY", org: "Università degli Studi di Napoli Parthenope", totalVideos: 24, totalMcqs: 22, totalContentUnits: 3, rule: "mcq" },
  "data-analytics-for-the-energy-sector": { code: "MC06", title: "Data Analytics for the Energy Sector", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 9, totalMcqs: 40, totalContentUnits: 3, rule: "mcq" },
  "energy-utilisation-and-storage": { code: "MC11", title: "Energy Utilisation and Storage", project: "RES4CITY", org: "University of Coimbra", totalVideos: 12, totalMcqs: 82, totalContentUnits: 3, rule: "mcq" },
  "introduction-to-sustainable-finance": { code: "MC02", title: "Introduction to Sustainable Finance", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 17, totalMcqs: 121, totalContentUnits: 3, rule: "mcq" },
  "energy-strategy-and-energy-transition": { code: "MC14", title: "Energy Strategy and Energy Transition", project: "RES4CITY", org: "University of Coimbra", totalVideos: 14, totalMcqs: 34, totalContentUnits: 2, rule: "mcq" },
  "circular-economy-for-sustainable-cities": { code: "MC40", title: "Circular Economy for Sustainable Cities", project: "RES4CITY", org: "Halmstad University", totalVideos: 15, totalMcqs: 38, totalContentUnits: 2, rule: "mcq" },
  "sustainable-development-goals-for-cities": { code: "MC28", title: "Sustainable Development Goals for Cities", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 15, totalMcqs: 39, totalContentUnits: 3, rule: "mcq" },
  "sustainable-business-models": { code: "MC44", title: "Sustainable Business Models", project: "RES4CITY", org: "Halmstad University", totalVideos: 14, totalMcqs: 39, totalContentUnits: 2, rule: "mcq" },
  "social-acceptance-of-technologies": { code: "MC32", title: "Social Acceptance of Technologies", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 10, totalMcqs: 24, totalContentUnits: 3, rule: "mcq" },
  "strategic-behaviour-in-energy-markets-options-and-games": { code: "MC35", title: "Strategic Behaviour in Energy Markets: Options and Games", project: "RES4CITY", org: "Université Grenoble Alpes", totalVideos: 18, totalMcqs: 25, totalContentUnits: 3, rule: "mcq" },
  "management-of-innovation-projects": { code: "MC41", title: "Management of Innovation Projects", project: "RES4CITY", org: "Halmstad University", totalVideos: 16, totalMcqs: 64, totalContentUnits: 2, rule: "mcq" },
  "gender-mainstreaming-and-intersectionality": { code: "MC43", title: "Gender Mainstreaming and Intersectionality", project: "RES4CITY", org: "Halmstad University", totalVideos: 15, totalMcqs: 38, totalContentUnits: 2, rule: "mcq" },
  "decision-making-for-energy-projects-under-uncertainty": { code: "MC34", title: "Decision-Making for Energy Projects under Uncertainty", project: "RES4CITY", org: "Université Grenoble Alpes", totalVideos: 17, totalMcqs: 25, totalContentUnits: 3, rule: "mcq" },
  "energy-justice-and-poverty": { code: "MC31", title: "Energy Justice and Poverty", project: "RES4CITY", org: "Technical University of Denmark", totalVideos: 6, totalMcqs: 16, totalContentUnits: 3, rule: "mcq" },
  "energy-policy": { code: "MC16", title: "Energy Policy", project: "RES4CITY", org: "University of Coimbra", totalVideos: 14, totalMcqs: 34, totalContentUnits: 3, rule: "mcq" },
  "enacting-a-circular-economy": { code: "MC01", title: "Enacting a Circular Economy", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 22, totalMcqs: 32, totalContentUnits: 2, rule: "mcq" },
  "analysis-of-energy-consumption": { code: "MC07", title: "Analysis of Energy Consumption", project: "RES4CITY", org: "Università degli Studi di Napoli Parthenope", totalVideos: 14, totalMcqs: 25, totalContentUnits: 3, rule: "mcq" },
  "energy-management-and-smart-communities": { code: "MC15", title: "Energy Management and Smart Communities", project: "RES4CITY", org: "University of Coimbra", totalVideos: 12, totalMcqs: 32, totalContentUnits: 3, rule: "mcq" },
  "decarbonisation-of-thermal-energy": { code: "MC17", title: "Decarbonisation of Thermal Energy", project: "RES4CITY", org: "Universitat Politècnica de València", totalVideos: 37, totalMcqs: 41, totalContentUnits: 3, rule: "mcq" },
  "small-scale-wind-power": { code: "MC42", title: "Small Scale Wind Power", project: "RES4CITY", org: "Halmstad University", totalVideos: 28, totalMcqs: 34, totalContentUnits: 2, rule: "mcq" },
  "biogas-systems-for-climate-transition": { code: "MC39", title: "Biogas Systems for Climate Transition", project: "RES4CITY", org: "Halmstad University", totalVideos: 13, totalMcqs: 38, totalContentUnits: 2, rule: "mcq" },
  "energy-policy-and-flexible-technologies": { code: "MC36", title: "Energy Policy and Flexible Technologies", project: "RES4CITY", org: "Université Grenoble Alpes", totalVideos: 12, totalMcqs: 23, totalContentUnits: 3, rule: "mcq" },
  "case-studies-in-energy-management": { code: "MC08", title: "Case Studies in Energy Management", project: "RES4CITY", org: "Università degli Studi di Napoli Parthenope", totalVideos: 21, totalMcqs: 11, totalContentUnits: 3, rule: "mcq" },
  "basics-of-energy-efficiency": { code: "MC01", title: "Basics of Energy Efficiency", project: "SHERLOCK", org: "Università Degli Studi Della Campania Luigi Vanvitelli", totalVideos: 25, totalMcqs: 24, totalContentUnits: 3, rule: "mcq" },
  "environmental-social-governance-finance": { code: "MC03", title: "Environmental Social Governance Finance", project: "SHERLOCK", org: "EPTA PRIME S.R.L", totalVideos: 12, totalMcqs: 16, totalContentUnits: 3, rule: "mcq" },
  "green-infrastructure-finance": { code: "MC11", title: "Green Infrastructure Finance", project: "SHERLOCK", org: "National University of Ireland Maynooth", totalVideos: 14, totalMcqs: 26, totalContentUnits: 3, rule: "mcq" },
  "decision-making-towards-a-sustainable-city": { code: "MC02", title: "Decision-making towards a Sustainable City", project: "SHERLOCK", org: "Lietuvos Energetikos Institutas", totalVideos: 11, totalMcqs: 33, totalContentUnits: 3, rule: "mcq" },
  "life-cycle-analysis-in-construction": { code: "MC08", title: "Life Cycle Analysis in Construction", project: "SHERLOCK", org: "Collaborative Laboratory towards Circular Economy", totalVideos: 10, totalMcqs: 5, totalContentUnits: 3, rule: "mcq" },
  "urban-metabolism-strategies": { code: "MC24", title: "Urban Metabolism Strategies", project: "RES4CITY", org: "Università degli studi di Sassari", totalVideos: 23, totalMcqs: 40, totalContentUnits: 3, rule: "mcq" },
  "digital-payments-and-smart-city-platforms": { code: "MC25", title: "Digital Payments and Smart City Platforms", project: "RES4CITY", org: "Università degli studi di Sassari", totalVideos: 14, totalMcqs: 19, totalContentUnits: 3, rule: "mcq" },
  "introduction-to-renewable-energies": { code: "MC23", title: "Introduction to Renewable Energies", project: "RES4CITY", org: "Università degli studi di Sassari", totalVideos: 18, totalMcqs: 39, totalContentUnits: 3, rule: "mcq" },
  "fundamentals-of-energy-systems": { code: "MC22", title: "Fundamentals of Energy Systems", project: "RES4CITY", org: "Università degli studi di Sassari", totalVideos: 16, totalMcqs: 39, totalContentUnits: 3, rule: "mcq" },
  "understanding-critical-raw-materials": { code: "MC26", title: "Understanding Critical Raw Materials", project: "RES4CITY", org: "Università degli studi di Sassari", totalVideos: 16, totalMcqs: 84, totalContentUnits: 3, rule: "mcq" },
  "info-course-on-energy-efficiency-in-buildings": { code: "SC01", title: "Info Course on Energy Efficiency in Buildings", project: "SHERLOCK", org: "International Consulting and Mobility Agency S.R.L.", totalVideos: 3, totalMcqs: 0, totalContentUnits: 3, rule: "video-only" },
  "business-model-for-energy-efficiency-in-buildings": { code: "MC13", title: "Business Model for Energy Efficiency in Buildings", project: "SHERLOCK", org: "CREARA Consultores SL", totalVideos: 12, totalMcqs: 39, totalContentUnits: 3, rule: "mcq" },
  "probabilistic-approach-for-energy-efficiency-evaluation": { code: "MC15", title: "Probabilistic Approach for Energy Efficiency Evaluation", project: "SHERLOCK", org: "Università degli Studi di Napoli Parthenope", totalVideos: 22, totalMcqs: 10, totalContentUnits: 3, rule: "mcq" },
  "communication-strategies-with-financial-institutions": { code: "MC12", title: "Communication Strategies with Financial Institutions", project: "SHERLOCK", org: "EPTA PRIME S.R.L", totalVideos: 15, totalMcqs: 40, totalContentUnits: 3, rule: "mcq" },
  "energy-auditing-of-buildings": { code: "MC06", title: "Energy Auditing of Buildings", project: "SHERLOCK", org: "Slovenska Technicka Univerzita V Bratislave", totalVideos: 10, totalMcqs: 33, totalContentUnits: 3, rule: "mcq" },
  "incorporation-of-natural-materials-in-energy-renovation-of-buildings": { code: "MC07", title: "Incorporation of Natural Materials in Energy Renovation of Buildings", project: "SHERLOCK", org: "Polytechneio Kritis", totalVideos: 26, totalMcqs: 39, totalContentUnits: 3, rule: "mcq" },
  "circular-economy-in-the-built-environment": { code: "MC09", title: "Circular Economy in the Built Environment", project: "SHERLOCK", org: "Collaborative Laboratory towards Circular Economy", totalVideos: 10, totalMcqs: 47, totalContentUnits: 3, rule: "mcq" },
  "energy-consumption-in-buildings": { code: "MC10", title: "Energy Consumption in Buildings", project: "SHERLOCK", org: "Università di Genova", totalVideos: 15, totalMcqs: 35, totalContentUnits: 3, rule: "mcq" },
  "energy-performance-contracting-epc": { code: "MC14", title: "Energy Performance Contracting (EPC)", project: "SHERLOCK", org: "Slovenska Technicka Univerzita V Bratislave", totalVideos: 8, totalMcqs: 44, totalContentUnits: 3, rule: "mcq" },
  "energy-efficiency-in-buildings-for-vet-up-skilling": { code: "VET01", title: "Energy Efficiency in Buildings for VET Up-Skilling", project: "SHERLOCK", org: "Koundouraki - Rodopoulou O.E.", totalVideos: 19, totalMcqs: 63, totalContentUnits: 3, rule: "mcq" },
  "systemic-design-for-energy-retrofitting": { code: "MC05", title: "Systemic Design For Energy Retrofitting", project: "SHERLOCK", org: "Three O'Clock", totalVideos: 11, totalMcqs: 30, totalContentUnits: 3, rule: "mcq" },
  "advertising-and-public-relations-in-the-energy-sector": { code: "MC04", title: "Advertising and Public Relations in the Energy Sector", project: "SHERLOCK", org: "Vytauto Didziojo Universitetas", totalVideos: 13, totalMcqs: 62, totalContentUnits: 3, rule: "mcq" },
  "sustainability-circular-economy-and-esg-investing": { code: "MCSCE", title: "Sustainability, Circular Economy and ESG Investing", project: "RES4CITY", org: "National University of Ireland Maynooth", totalVideos: 36, totalMcqs: 58, totalContentUnits: 2, rule: "mcq" },
  "pv-integration-in-shading-systems": { code: "MC09_RESSKILL", title: "PV integration in shading systems", project: "RES4CITY", org: "TUC", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "carbon-neutrality-and-esg": { code: "MC01", title: "Carbon Neutrality and ESG", project: "COSS", org: "Convergence and Open Sharing System (COSS)", totalVideos: 26, totalMcqs: 34, totalContentUnits: 3, rule: "mcq" },
  "heat-pumps-and-district-heating-in-urban-areas": { code: "MC01_RESSKILL", title: "Heat Pumps and District Heating in Urban Areas", project: "RES4CITY", org: "UNIGE", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "solar-systems-integration": { code: "MC03_RESSKILL", title: "Solar Systems Integration", project: "RES4CITY", org: "UNICAMP", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "energy-flexibility": { code: "MC2_RESSKILL", title: "Energy Flexibility", project: "RES4CITY", org: "UNIGE", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "test": { code: "T101", title: "Test", project: "RES4CITY", org: "Tesst", totalVideos: 0, totalMcqs: 0, totalContentUnits: 2, rule: "content" },
  "energy-communities-implementation-in-the-urban-environment": { code: "MC19", title: "Energy Communities Implementation in the Urban Environment", project: "RES4CITY", org: "Universitat Politècnica de València", totalVideos: 30, totalMcqs: 60, totalContentUnits: 3, rule: "mcq" },
  "environmental-certification-and-assessment-of-communities-and-buildings": { code: "VET01_RESSKILL", title: "Environmental certification and assessment of communities and buildings", project: "RES4CITY", org: "TUC", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "project-management-for-sustainability": { code: "MC08_RESSKILL", title: "Project management for sustainability", project: "RES4CITY", org: "FINNOVA", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "professional-english": { code: "VET03_RESSKILL", title: "Professional English", project: "RES4CITY", org: "EELI", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "decarbonisation-of-energy-in-the-residential-sector": { code: "MC11_RESSKILL", title: "Decarbonisation of Energy in the Residential Sector", project: "RES4CITY", org: "UPV", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "renewable-energy-communities-in-cities": { code: "MC10_RESSKILL", title: "Renewable Energy Communities in Cities", project: "RES4CITY", org: "UPV", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "smart-energy-systems-in-building-construction": { code: "VET02_RESSKILL", title: "Smart Energy Systems in Building Construction", project: "RES4CITY", org: "EELI", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "introduction-to-energy-management": { code: "MC07_RESSKILL", title: "Introduction to Energy Management", project: "RES4CITY", org: "NUIM", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "dataspaces-for-energy-communities": { code: "MC06_RESSKILL", title: "DataSpaces for energy communities", project: "RES4CITY", org: "NUIM", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "innovation-management-for-energy-transition": { code: "MC05", title: "Innovation Management for Energy Transition", project: "RESSKILL", org: "3OC", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
  "thermal-measurements": { code: "MC04", title: "Thermal Measurements", project: "RESSKILL", org: "UNICAMP", totalVideos: 0, totalMcqs: 0, totalContentUnits: 3, rule: "content" },
};

export const getCertificateRule = (slug: string): CertificateRuleMeta | undefined => certificateRules[slug];
