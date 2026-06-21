// Auto-generated: maps each micro-programme slug to the micro-credential course slugs it
// contains (derived from the live programme credential lists). Used for programme auto-enrolment.
export const programmeCourses: Record<string, string[]> = {
  "sustainable-energy-technologies-and-strategies-in-urban-environments": [
    "fundamentals-of-energy-systems",
    "introduction-to-renewable-energies",
    "introduction-to-sustainable-finance",
    "data-analytics-for-the-energy-sector",
    "efficient-building-techniques",
    "tools-for-city-decarbonisation",
    "energy-utilisation-and-storage",
    "case-studies-in-energy-management",
    "energy-policy-and-flexible-technologies",
    "serious-game"
  ],
  "decarbonization-strategies-and-social-innovation-for-cities-and-communities": [
    "fundamentals-of-energy-systems",
    "introduction-to-renewable-energies",
    "introduction-to-sustainable-finance",
    "sustainable-business-models",
    "energy-strategy-and-energy-transition",
    "social-acceptance-of-technologies",
    "sustainable-development-goals-for-cities",
    "circular-economy-for-sustainable-cities",
    "serious-game"
  ],
  "advanced-design-of-sustainable-cities": [
    "introduction-to-sustainable-finance",
    "data-analytics-for-the-energy-sector",
    "energy-management-and-smart-communities",
    "decarbonisation-of-thermal-energy",
    "analysis-of-energy-consumption",
    "advanced-modelling-of-buildings-and-energy-systems",
    "biogas-systems-for-climate-transition",
    "small-scale-wind-power",
    "serious-game"
  ],
  "business-strategies-for-a-sustainable-urban-transition": [
    "introduction-to-renewable-energies",
    "tools-strategies-and-trends-in-sustainable-finance",
    "circular-economy-for-sustainable-cities",
    "sustainable-business-models",
    "energy-strategy-and-energy-transition",
    "urban-renewable-energy-decision-making-methodologies",
    "management-of-innovation-projects",
    "strategic-behaviour-in-energy-markets-options-and-games",
    "climate-risk-and-climate-investing",
    "serious-game"
  ],
  "sustainability-by-design-developing-a-resilient-built-environment": [
    "efficient-building-techniques",
    "thermal-simulation-of-buildings",
    "understanding-critical-raw-materials",
    "urban-metabolism-strategies",
    "renewable-energy-investments",
    "tools-for-city-decarbonisation",
    "advanced-modelling-of-buildings-and-energy-systems",
    "hydrogen-technologies-for-urban-areas",
    "positive-energy-districts",
    "serious-game"
  ],
  "innovation-in-the-urban-energy-sector-strategies-and-management": [
    "introduction-to-renewable-energies",
    "decision-making-for-energy-projects-under-uncertainty",
    "management-of-innovation-projects",
    "social-acceptance-of-technologies",
    "renewable-energy-investments",
    "sustainable-business-models",
    "energy-justice-and-poverty",
    "gender-mainstreaming-and-intersectionality",
    "data-analytics-for-the-energy-sector",
    "serious-game"
  ],
  "sustainable-energy-solutions-for-cities-policy-and-implementation-strategies": [
    "introduction-to-renewable-energies",
    "energy-policy",
    "energy-strategy-and-energy-transition",
    "how-sustainable-is-your-city",
    "energy-justice-and-poverty",
    "social-acceptance-of-technologies",
    "digital-payments-and-smart-city-platforms",
    "enacting-a-circular-economy",
    "sustainable-business-models",
    "serious-game"
  ],
  "sustainable-finance-and-energy-transition-in-cities": [
    "introduction-to-renewable-energies",
    "urban-renewable-energy-decision-making-methodologies",
    "tools-strategies-and-trends-in-sustainable-finance",
    "investing-in-sustainability",
    "introduction-to-industrial-organization",
    "energy-markets",
    "digital-payments-and-smart-city-platforms",
    "how-sustainable-is-your-city",
    "climate-risk-and-climate-investing",
    "serious-game"
  ],
  "building-energy-renovation-financing": [
    "basics-of-energy-efficiency",
    "decision-making-towards-a-sustainable-city",
    "environmental-social-governance-finance",
    "advertising-and-public-relations-in-the-energy-sector",
    "systemic-design-for-energy-retrofitting",
    "green-infrastructure-finance",
    "communication-strategies-with-financial-institutions",
    "business-model-for-energy-efficiency-in-buildings",
    "energy-performance-contracting-epc",
    "probabilistic-approach-for-energy-efficiency-evaluation"
  ],
  "energy-efficiency-in-the-building-sector": [
    "basics-of-energy-efficiency",
    "decision-making-towards-a-sustainable-city",
    "environmental-social-governance-finance",
    "advertising-and-public-relations-in-the-energy-sector",
    "systemic-design-for-energy-retrofitting",
    "energy-auditing-of-buildings",
    "incorporation-of-natural-materials-in-energy-renovation-of-buildings",
    "life-cycle-analysis-in-construction",
    "circular-economy-in-the-built-environment",
    "energy-consumption-in-buildings"
  ]
};

export const getProgrammeCourseSlugs = (programmeSlug: string): string[] =>
  programmeCourses[programmeSlug] ?? [];

export const programmeSlugs = Object.keys(programmeCourses);
