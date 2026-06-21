export type ItemStatus = "published" | "draft";

export type CatalogueType = "micro-programme" | "micro-credential";

export type Programme = {
  id: string;
  code: string;
  project: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  duration: string;
  provider: string;
  credentialTitles: string[];
  externalEnrolmentUrl: string;
  status: ItemStatus;
  sortOrder: number;
};

export type MicroCredential = {
  id: string;
  title: string;
  slug: string;
  project: string;
  description: string;
  image: string;
  duration: string;
  provider: string;
  programmeSlugs: string[];
  programmeTitles: string[];
  status: ItemStatus;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const programmes: Programme[] = [
  {
    "id": "a29219f6-3563-4715-bd02-29cd5ea48bdf",
    "code": "MP1",
    "project": "RES4CITY",
    "title": "Sustainable Energy Technologies and Strategies in Urban Environments",
    "slug": "sustainable-energy-technologies-and-strategies-in-urban-environments",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp1.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Fundamentals of Energy Systems",
      "Introduction to Renewable Energies",
      "Introduction to Sustainable Finance",
      "Data Analytics for the Energy Sector",
      "Efficient Building Techniques",
      "Tools for City Decarbonisation",
      "Energy Utilisation and Storage",
      "Case Studies in Energy Management",
      "Energy Policy and Flexible Technologies",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/a29219f6-3563-4715-bd02-29cd5ea48bdf",
    "status": "published",
    "sortOrder": 1
  },
  {
    "id": "3a94b30f-327f-4bc9-ad4a-2211b8328056",
    "code": "MP2",
    "project": "RES4CITY",
    "title": "Decarbonization Strategies and Social Innovation for Cities and Communities",
    "slug": "decarbonization-strategies-and-social-innovation-for-cities-and-communities",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp2.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Fundamentals of Energy Systems",
      "Introduction to Renewable Energies",
      "Introduction to Sustainable Finance",
      "Sustainable Business Models",
      "Energy Strategy and Energy Transition",
      "Social Acceptance of Technologies",
      "Energy Communities",
      "Sustainable Development Goals for Cities",
      "Circular Economy for Sustainable Cities",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/3a94b30f-327f-4bc9-ad4a-2211b8328056",
    "status": "published",
    "sortOrder": 2
  },
  {
    "id": "da46bcc5-008f-49ab-84ba-102f66cbd7b0",
    "code": "MP3",
    "project": "RES4CITY",
    "title": "Advanced Design of Sustainable Cities",
    "slug": "advanced-design-of-sustainable-cities",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp3.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Introduction to Sustainable Finance",
      "Data Analytics for the Energy Sector",
      "Energy Management and Smart Communities",
      "Decarbonisation of Thermal Energy",
      "Analysis of Energy Consumption",
      "Advanced Modelling of Buildings and Energy Systems",
      "Economics and Physics of Energy Storage",
      "Biogas Systems for Climate Transition",
      "Small Scale Wind Power",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/da46bcc5-008f-49ab-84ba-102f66cbd7b0",
    "status": "published",
    "sortOrder": 3
  },
  {
    "id": "ca9c4d3f-1540-46b1-955f-b57163377987",
    "code": "MP4",
    "project": "RES4CITY",
    "title": "Business Strategies for a Sustainable Urban Transition",
    "slug": "business-strategies-for-a-sustainable-urban-transition",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp4.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Introduction to Renewable Energies",
      "Tools, Strategies and Trends in Sustainable Finance",
      "Circular Economy for Sustainable Cities",
      "Sustainable Business Models",
      "Energy Strategy and Energy Transition",
      "Urban Renewable Energy: Decision Making Methodologies",
      "Management of Innovation Projects",
      "Strategic Behaviour in Energy Markets: Options and Games",
      "Climate Risk and Climate Investing",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/ca9c4d3f-1540-46b1-955f-b57163377987",
    "status": "published",
    "sortOrder": 4
  },
  {
    "id": "bc929274-01b2-4687-a38c-a9d61bba607f",
    "code": "MP5",
    "project": "RES4CITY",
    "title": "Sustainability by Design: Developing a Resilient Built Environment",
    "slug": "sustainability-by-design-developing-a-resilient-built-environment",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp5.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Efficient Building Techniques",
      "Thermal Simulation of Buildings",
      "Understanding Critical Raw Materials",
      "Urban Metabolism Strategies",
      "Renewable Energy Investments",
      "Tools for City Decarbonisation",
      "Advanced Modelling of Buildings and Energy Systems",
      "Hydrogen Technologies for Urban Areas",
      "Positive Energy Districts",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/bc929274-01b2-4687-a38c-a9d61bba607f",
    "status": "published",
    "sortOrder": 5
  },
  {
    "id": "a4611b4e-caa4-4012-8962-b9f4d5629b0d",
    "code": "MP6",
    "project": "RES4CITY",
    "title": "Innovation in the Urban Energy Sector: Strategies and Management",
    "slug": "innovation-in-the-urban-energy-sector-strategies-and-management",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp6.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Introduction to Renewable Energies",
      "Decision-Making for Energy Projects under Uncertainty",
      "Management of Innovation Projects",
      "Social Acceptance of Technologies",
      "Renewable Energy Investments",
      "Sustainable Business Models",
      "Energy Justice and Poverty",
      "Gender Mainstreaming and Intersectionality",
      "Data Analytics for the Energy Sector",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/a4611b4e-caa4-4012-8962-b9f4d5629b0d",
    "status": "published",
    "sortOrder": 6
  },
  {
    "id": "1b7abbbe-ef14-45f4-9dce-92f92090c297",
    "code": "MP7",
    "project": "RES4CITY",
    "title": "Sustainable Energy Solutions for Cities: Policy and Implementation Strategies",
    "slug": "sustainable-energy-solutions-for-cities-policy-and-implementation-strategies",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp7.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Introduction to Renewable Energies",
      "Energy Policy",
      "Energy Strategy and Energy Transition",
      "How Sustainable is your City?",
      "Energy Justice and Poverty",
      "Social Acceptance of Technologies",
      "Digital Payments and Smart City Platforms",
      "Enacting a Circular Economy",
      "Sustainable Business Models",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/1b7abbbe-ef14-45f4-9dce-92f92090c297",
    "status": "published",
    "sortOrder": 7
  },
  {
    "id": "6aa09c6c-484c-43a0-97fa-1cc0ec58ca07",
    "code": "MP8",
    "project": "RES4CITY",
    "title": "Sustainable Finance and Energy Transition in Cities",
    "slug": "sustainable-finance-and-energy-transition-in-cities",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp8.jpg",
    "duration": "Self-paced",
    "provider": "RES4CITY project partners",
    "credentialTitles": [
      "Introduction to Renewable Energies",
      "Urban Renewable Energy: Decision Making Methodologies",
      "Tools, Strategies and Trends in Sustainable Finance",
      "Investing in Sustainability",
      "Introduction to Industrial Organization",
      "Energy Markets",
      "Digital Payments and Smart City Platforms",
      "How Sustainable is your City?",
      "Climate Risk and Climate Investing",
      "Serious Game"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/6aa09c6c-484c-43a0-97fa-1cc0ec58ca07",
    "status": "published",
    "sortOrder": 8
  },
  {
    "id": "c95ce00f-8204-4f6c-9281-b92097256464",
    "code": "MP01",
    "project": "SHERLOCK",
    "title": "Building Energy Renovation Financing",
    "slug": "building-energy-renovation-financing",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp01sher.jpg",
    "duration": "Self-paced",
    "provider": "SHERLOCK project partners",
    "credentialTitles": [
      "Basics of Energy Efficiency",
      "Decision-making towards a Sustainable City",
      "Environmental Social Governance Finance",
      "Advertising and Public Relations in the Energy Sector",
      "Systemic Design For Energy Retrofitting",
      "Green Infrastructure Finance",
      "Communication Strategies with Financial Institutions",
      "Business Model for Energy Efficiency in Buildings",
      "Energy Performance Contracting (EPC)",
      "Probabilistic Approach for Energy Efficiency Evaluation"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/c95ce00f-8204-4f6c-9281-b92097256464",
    "status": "published",
    "sortOrder": 9
  },
  {
    "id": "581037c4-ff3e-46f2-bb9e-d6305e8e168d",
    "code": "MP02",
    "project": "SHERLOCK",
    "title": "Energy Efficiency in the Building Sector",
    "slug": "energy-efficiency-in-the-building-sector",
    "description": "A BoostMySkills micro-programme preserving the live-site catalogue title, project label, image, enrolment URL and verified micro-credential list.",
    "image": "/images/programmes/mp02sher.jpg",
    "duration": "Self-paced",
    "provider": "SHERLOCK project partners",
    "credentialTitles": [
      "Basics of Energy Efficiency",
      "Decision-making towards a Sustainable City",
      "Environmental Social Governance Finance",
      "Advertising and Public Relations in the Energy Sector",
      "Systemic Design For Energy Retrofitting",
      "Energy Auditing of Buildings",
      "Incorporation of Natural Materials in Energy Renovation of Buildings",
      "Life Cycle Analysis in Construction",
      "Circular Economy in the Built Environment",
      "Energy Consumption in Buildings"
    ],
    "externalEnrolmentUrl": "https://boostmyskills.eu/dashboard/programs/581037c4-ff3e-46f2-bb9e-d6305e8e168d",
    "status": "published",
    "sortOrder": 10
  }
];

const credentialMap = new Map<string, MicroCredential>();

for (const programme of programmes) {
  for (const title of programme.credentialTitles) {
    const slug = slugify(title);
    const existing = credentialMap.get(slug);

    if (existing) {
      credentialMap.set(slug, {
        ...existing,
        project: existing.project === programme.project ? existing.project : "BoostMySkills",
        programmeSlugs: [...existing.programmeSlugs, programme.slug],
        programmeTitles: [...existing.programmeTitles, programme.title]
      });
      continue;
    }

    credentialMap.set(slug, {
      id: slug,
      title,
      slug,
      project: programme.project,
      description:
        "A verified micro-credential title from the live BoostMySkills programme catalogue. Detailed learning outcomes should be populated from the LMS or Supabase when available.",
      image: programme.image,
      duration: "Self-paced",
      provider: programme.provider,
      programmeSlugs: [programme.slug],
      programmeTitles: [programme.title],
      status: "published"
    });
  }
}

export const microCredentials: MicroCredential[] = Array.from(credentialMap.values()).sort((a, b) =>
  a.title.localeCompare(b.title)
);

export const publishedProgrammes = programmes.filter((programme) => programme.status === "published");

export const publishedMicroCredentials = microCredentials.filter(
  (credential) => credential.status === "published"
);

export const getProgrammeBySlug = (slug: string) =>
  programmes.find((programme) => programme.slug === slug);

export const getMicroCredentialBySlug = (slug: string) =>
  microCredentials.find((credential) => credential.slug === slug);

export const getCatalogueItem = (type: CatalogueType, slug: string) => {
  if (type === "micro-programme") {
    return getProgrammeBySlug(slug);
  }

  return getMicroCredentialBySlug(slug);
};
