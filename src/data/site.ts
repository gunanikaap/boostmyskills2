export const siteConfig = {
  name: "BoostMySkills",
  title: "Free EU Sustainability Courses | BoostMySkills",
  description:
    "Free micro-programmes and micro-credentials for renewable energy, sustainability and the green transition.",
  url: "https://boostmyskills.eu",
  social: {
    linkedin: "https://www.linkedin.com/company/res4city/posts/?feedView=all"
  }
};

export const auditFacts = {
  sourceSite: "https://boostmyskills.eu/",
  inspectedRoutes: ["/", "/programs/", "/courses", "/about", "/contact", "/privacy", "/cookie_policy", "/tos"],
  oldAuthBehaviour: "Public register and sign-in links use /register?next=... and /login?next=..., which redirect to apps.boostmyskills.eu.",
  oldEnrolBehaviour: "Programme cards link to https://boostmyskills.eu/dashboard/programs/<uuid>."
};
