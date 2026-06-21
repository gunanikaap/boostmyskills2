# Course Detail / Enrol Fix Report

All **77** micro-credential courses have a self-contained local detail page at `/courses/[slug]`
that renders **every content section present on the live course page** (Context and overview,
Learning objectives, Background, and any others) in order, with paragraph/bullet-list formatting.
No course card uses an external URL for primary navigation.

## Flexible content model

`src/data/courses-content.ts` stores per course:

```ts
type ContentBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] };
type ContentSection = { title: string; blocks: ContentBlock[] };
type CourseContent = {
  contentSections: ContentSection[];   // ALL live sections, in order (overview, objectives, background, ...)
  modules: string[];                   // sidebar numbered "Sections" list
  workload: string | null;
  createdBy: string | null;            // name (+ institution), exactly as live
};
```

The renderer maps over `contentSections` dynamically — it is **not** hard-coded to two sections,
so any extra live section (Background, Requirements, About This Course, …) is shown automatically.

## Safety verification (programmatic)

| Check | Result |
| --- | --- |
| Course records | 77 |
| Every course has a slug | yes |
| All slugs unique | yes (77) |
| Every course has a content entry | yes (77/77) |
| Every course has a non-empty `contentSections` | yes (77/77) |
| Courses with a Background section | 65/77 (the other 12 have no Background on live) |
| Section-count distribution | 65 courses = 3 sections, 12 courses = 2 sections |
| Sidebar modules / workload / createdBy | 76/77 each |
| Listing/detail use external href | none |

Section titles seen across the 77 live pages: Context and overview / Context and Overview,
Learning objectives / Learning Objectives, Background, About This Course, Requirements.
**Only** `test` (a junk placeholder course on the live site) has minimal content; it renders from
verified basic data with no fabrication.

## Routes & behaviour

| URL | Behaviour |
| --- | --- |
| `/courses` | Listing (search/filter intact) |
| `/courses/[slug]` | Local detail page (77 SSG) |
| `/courses/[slug]/about` | Redirect → `/courses/[slug]` |
| `/courses/course-v1:…(/about)` | Legacy Open edX ids → redirected to clean slug by `src/middleware.ts` |
| `/enrol/course/[slug]` | Supabase-gated local enrol (logged out → `/auth/sign-in?next=…`) |

- **More info / image / title** → `/courses/[slug]` (was external). **Enrol** → `/enrol/course/[slug]` (was external).
- **Data source:** scraped from each live `/about` page; createdBy reflects the live page exactly
  (e.g. `thermal-measurements` lists UPV lecturers even though its org is UNICAMP — matches live).

## All 77 courses (section-by-section)

| # | Title | Slug | Legacy path | Provider | Code | Image | Overview | Objectives | Background | Other sections | Modules | CreatedBy | Local route |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Serious Game | serious-game | /courses/course-v1:Artemat+MC10_RES4CITY+2025_T01 | Artemat | MC10 | RES4CITY | yes | yes | yes | - | - | yes(4) | yes | yes |
| 2 | Advanced Modelling of Buildings and Energy Systems | advanced-modelling-of-buildings-and-energy-systems | /courses/course-v1:UCOI+MC13v1+2024_01 | University of Coimbra | MC13 | RES4CITY | yes | yes | yes | yes | - | yes(7) | yes | yes |
| 3 | Positive Energy Districts | positive-energy-districts | /courses/course-v1:UPV+MC20v1+2024_01 | Universitat Politècnica de València | MC20 | RES4CITY | yes | yes | yes | yes | - | yes(7) | yes | yes |
| 4 | Efficient Building Techniques | efficient-building-techniques | /courses/course-v1:UPV+MC18v1+2024_01 | Universitat Politècnica de València | MC18 | RES4CITY | yes | yes | yes | yes | - | yes(7) | yes | yes |
| 5 | Hydrogen Technologies for Urban Areas | hydrogen-technologies-for-urban-areas | /courses/course-v1:UGA+MC33v1+2024_01 | Université Grenoble Alpes | MC33 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 6 | Tools for City Decarbonisation | tools-for-city-decarbonisation | /courses/course-v1:UPV+MC21v1+2024_01 | Universitat Politècnica de València | MC21 | RES4CITY | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 7 | Renewable Energy Investments | renewable-energy-investments | /courses/course-v1:UGA+MC37v1+2024_01 | Université Grenoble Alpes | MC37 | RES4CITY | yes | yes | yes | yes | - | yes(2) | yes | yes |
| 8 | Thermal Simulation of Buildings | thermal-simulation-of-buildings | /courses/course-v1:UCOI+MC12v1+2024_01 | University of Coimbra | MC12 | RES4CITY | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 9 | Tools, Strategies and Trends in Sustainable Finance | tools-strategies-and-trends-in-sustainable-finance | /courses/course-v1:NUIM+MC03v1+2024_01 | National University of Ireland Maynooth | MC03 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 10 | Urban Renewable Energy: Decision Making Methodologies | urban-renewable-energy-decision-making-methodologies | /courses/course-v1:DTU+MC30v1+2024_01 | Technical University of Denmark | MC30 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 11 | Introduction to Industrial Organization | introduction-to-industrial-organization | /courses/course-v1:DTU+MC29v1+2024_01 | Technical University of Denmark | MC29 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 12 | How Sustainable is your City? | how-sustainable-is-your-city | /courses/course-v1:DTU+MC27v1+2024_01 | Technical University of Denmark | MC27 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 13 | Investing in Sustainability | investing-in-sustainability | /courses/course-v1:NUIM+MC04v1+2024_01 | National University of Ireland Maynooth | MC04 | RES4CITY | yes | yes | yes | - | - | yes(4) | yes | yes |
| 14 | Climate Risk and Climate Investing | climate-risk-and-climate-investing | /courses/course-v1:NUIM+MC05v1+2024_01 | National University of Ireland Maynooth | MC05 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 15 | Energy Markets | energy-markets | /courses/course-v1:UNIPAR+MC09v1+2024_01 | Università degli Studi di Napoli Parthenope | MC09 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 16 | Data Analytics for the Energy Sector | data-analytics-for-the-energy-sector | /courses/course-v1:NUIM+MC06v1+2024_01 | National University of Ireland Maynooth | MC06 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 17 | Energy Utilisation and Storage | energy-utilisation-and-storage | /courses/course-v1:UCOI+MC11v1+2024_01 | University of Coimbra | MC11 | RES4CITY | yes | yes | yes | yes | - | yes(7) | yes | yes |
| 18 | Introduction to Sustainable Finance | introduction-to-sustainable-finance | /courses/course-v1:NUIM+MC02v1+2024_01 | National University of Ireland Maynooth | MC02 | RES4CITY | yes | yes | yes | yes | - | yes(3) | yes | yes |
| 19 | Energy Strategy and Energy Transition | energy-strategy-and-energy-transition | /courses/course-v1:UCOI+MC14v1+2024_01 | University of Coimbra | MC14 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 20 | Circular Economy for Sustainable Cities | circular-economy-for-sustainable-cities | /courses/course-v1:HU+MC40v1+2024_01 | Halmstad University | MC40 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 21 | Sustainable Development Goals for Cities | sustainable-development-goals-for-cities | /courses/course-v1:DTU+MC28v1+2024_01 | Technical University of Denmark | MC28 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 22 | Sustainable Business Models | sustainable-business-models | /courses/course-v1:HU+MC44v1+2024_01 | Halmstad University | MC44 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 23 | Social Acceptance of Technologies | social-acceptance-of-technologies | /courses/course-v1:DTU+MC32v1+2024_01 | Technical University of Denmark | MC32 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 24 | Strategic Behaviour in Energy Markets: Options and Games | strategic-behaviour-in-energy-markets-options-and-games | /courses/course-v1:UGA+MC35v1+2024_01 | Université Grenoble Alpes | MC35 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 25 | Management of Innovation Projects | management-of-innovation-projects | /courses/course-v1:HU+MC41v1+2024_01 | Halmstad University | MC41 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 26 | Gender Mainstreaming and Intersectionality | gender-mainstreaming-and-intersectionality | /courses/course-v1:HU+MC43v1+2024_01 | Halmstad University | MC43 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 27 | Decision-Making for Energy Projects under Uncertainty | decision-making-for-energy-projects-under-uncertainty | /courses/course-v1:UGA+MC34v1+2024_01 | Université Grenoble Alpes | MC34 | RES4CITY | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 28 | Energy Justice and Poverty | energy-justice-and-poverty | /courses/course-v1:DTU+MC31v1+2024_01 | Technical University of Denmark | MC31 | RES4CITY | yes | yes | yes | yes | - | yes(3) | yes | yes |
| 29 | Energy Policy | energy-policy | /courses/course-v1:UCOI+MC16v1+2024_01 | University of Coimbra | MC16 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 30 | Enacting a Circular Economy | enacting-a-circular-economy | /courses/course-v1:NUIM+MC01v1+2024_01 | National University of Ireland Maynooth | MC01 | RES4CITY | yes | yes | yes | - | - | yes(4) | yes | yes |
| 31 | Analysis of Energy Consumption | analysis-of-energy-consumption | /courses/course-v1:UNIPAR+MC07v1+2024_01 | Università degli Studi di Napoli Parthenope | MC07 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 32 | Energy Management and Smart Communities | energy-management-and-smart-communities | /courses/course-v1:UCOI+MC15v1+2024_01 | University of Coimbra | MC15 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 33 | Decarbonisation of Thermal Energy | decarbonisation-of-thermal-energy | /courses/course-v1:UPV+MC17v1+2024_01 | Universitat Politècnica de València | MC17 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 34 | Small Scale Wind Power | small-scale-wind-power | /courses/course-v1:HU+MC42v1+2024_01 | Halmstad University | MC42 | RES4CITY | yes | yes | yes | - | - | yes(4) | yes | yes |
| 35 | Biogas Systems for Climate Transition | biogas-systems-for-climate-transition | /courses/course-v1:HU+MC39v1+2024_01 | Halmstad University | MC39 | RES4CITY | yes | yes | yes | - | - | yes(5) | yes | yes |
| 36 | Energy Policy and Flexible Technologies | energy-policy-and-flexible-technologies | /courses/course-v1:UGA+MC36v1+2024_01 | Université Grenoble Alpes | MC36 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 37 | Case Studies in Energy Management | case-studies-in-energy-management | /courses/course-v1:UNIPAR+MC08v1+2024_01 | Università degli Studi di Napoli Parthenope | MC08 | RES4CITY | yes | yes | yes | yes | - | yes(3) | yes | yes |
| 38 | Basics of Energy Efficiency | basics-of-energy-efficiency | /courses/course-v1:UNICAMP+MC01_SHERLOCK+2025_T02 | Università Degli Studi Della Campania Luigi Vanvitelli | MC01 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 39 | Environmental Social Governance Finance | environmental-social-governance-finance | /courses/course-v1:EPTA+MC03_SHERLOCK+2025_T02 | EPTA PRIME S.R.L | MC03 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 40 | Green Infrastructure Finance | green-infrastructure-finance | /courses/course-v1:NUIM+MC11_SHERLOCK+2025_T2 | National University of Ireland Maynooth | MC11 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 41 | Decision-making towards a Sustainable City | decision-making-towards-a-sustainable-city | /courses/course-v1:LEI+MC02_SHERLOCK+2025_T2 | Lietuvos Energetikos Institutas | MC02 | SHERLOCK | yes | yes | yes | yes | - | yes(3) | yes | yes |
| 42 | Life Cycle Analysis in Construction | life-cycle-analysis-in-construction | /courses/course-v1:CECOLAB+MC08_SHERLOCK+2025_T2 | Collaborative Laboratory towards Circular Economy | MC08 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 43 | Urban Metabolism Strategies | urban-metabolism-strategies | /courses/course-v1:UNISS+MC24v1+2024_01 | Università degli studi di Sassari | MC24 | RES4CITY | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 44 | Digital Payments and Smart City Platforms | digital-payments-and-smart-city-platforms | /courses/course-v1:UNISS+MC25v1+2024_01 | Università degli studi di Sassari | MC25 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 45 | Introduction to Renewable Energies | introduction-to-renewable-energies | /courses/course-v1:UNISS+MC23v1+2024_01 | Università degli studi di Sassari | MC23 | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 46 | Fundamentals of Energy Systems | fundamentals-of-energy-systems | /courses/course-v1:UNISS+MC22v1+2024_01 | Università degli studi di Sassari | MC22 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 47 | Understanding Critical Raw Materials | understanding-critical-raw-materials | /courses/course-v1:UNISS+MC26v2+2024_01 | Università degli studi di Sassari | MC26 | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 48 | Info Course on Energy Efficiency in Buildings | info-course-on-energy-efficiency-in-buildings | /courses/course-v1:INCOMA+SC01_SHERLOCK+2025_T2 | International Consulting and Mobility Agency S.R.L. | SC01 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 49 | Business Model for Energy Efficiency in Buildings | business-model-for-energy-efficiency-in-buildings | /courses/course-v1:CREARA+MC13_SHERLOCK+2025_T2 | CREARA Consultores SL | MC13 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 50 | Probabilistic Approach for Energy Efficiency Evaluation | probabilistic-approach-for-energy-efficiency-evaluation | /courses/course-v1:UNIPARTHENOPE+MC15_SHERLOCK+2025_T2 | Università degli Studi di Napoli Parthenope | MC15 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 51 | Communication Strategies with Financial Institutions | communication-strategies-with-financial-institutions | /courses/course-v1:EPTA+MC12_SHERLOCK+2025_T2 | EPTA PRIME S.R.L | MC12 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 52 | Energy Auditing of Buildings | energy-auditing-of-buildings | /courses/course-v1:STUBA+MC06_SHERLOCK+2025_T2 | Slovenska Technicka Univerzita V Bratislave | MC06 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 53 | Incorporation of Natural Materials in Energy Renovation of Buildings | incorporation-of-natural-materials-in-energy-renovation-of-buildings | /courses/course-v1:TUC+MC07_SHERLOCK+2025_T2 | Polytechneio Kritis | MC07 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 54 | Circular Economy in the Built Environment | circular-economy-in-the-built-environment | /courses/course-v1:CECOLAB+MC09_SHERLOCK+2025_T2 | Collaborative Laboratory towards Circular Economy | MC09 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 55 | Energy Consumption in Buildings | energy-consumption-in-buildings | /courses/course-v1:UNIGE+MC10_SHERLOCK+2025_T2 | Università di Genova | MC10 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 56 | Energy Performance Contracting (EPC) | energy-performance-contracting-epc | /courses/course-v1:STUBA+MC14_SHERLOCK+2025_T2 | Slovenska Technicka Univerzita V Bratislave | MC14 | SHERLOCK | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 57 | Energy Efficiency in Buildings for VET Up-Skilling | energy-efficiency-in-buildings-for-vet-up-skilling | /courses/course-v1:INCOMA_EELI+VET01+2025_T2 | Koundouraki - Rodopoulou O.E. | VET01 | SHERLOCK | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 58 | Systemic Design For Energy Retrofitting | systemic-design-for-energy-retrofitting | /courses/course-v1:3OC+MC05_SHERLOCK+2025_T02 | Three O'Clock | MC05 | SHERLOCK | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 59 | Advertising and Public Relations in the Energy Sector | advertising-and-public-relations-in-the-energy-sector | /courses/course-v1:VMU+MC04_SHERLOCK+2025_T02 | Vytauto Didziojo Universitetas | MC04 | SHERLOCK | yes | yes | yes | yes | - | yes(3) | yes | yes |
| 60 | Sustainability, Circular Economy and ESG Investing | sustainability-circular-economy-and-esg-investing | /courses/course-v1:NUIM+MCSCE+2025_T02 | National University of Ireland Maynooth | MCSCE | RES4CITY | yes | yes | yes | - | - | yes(8) | yes | yes |
| 61 | PV integration in shading systems | pv-integration-in-shading-systems | /courses/course-v1:TUC+MC09_RESSKILL+2026_T2 | TUC | MC09_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 62 | Carbon Neutrality and ESG | carbon-neutrality-and-esg | /courses/course-v1:COSS+MC01_COSS+2026_T1 | Convergence and Open Sharing System (COSS) | MC01 | COSS | yes | yes | yes | yes | - | yes(6) | yes | yes |
| 63 | Heat Pumps and District Heating in Urban Areas | heat-pumps-and-district-heating-in-urban-areas | /courses/course-v1:UNIGE+MC01_RESSKILL+2026_T2 | UNIGE | MC01_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 64 | Solar Systems Integration | solar-systems-integration | /courses/course-v1:UNICAMP+MC03_RESSKILL+2026_T2 | UNICAMP | MC03_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 65 | Energy Flexibility | energy-flexibility | /courses/course-v1:UNIGE+MC2_RESSKILL+2026_T2 | UNIGE | MC2_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 66 | Test | test | /courses/course-v1:Tesst+T101+1999_T1 | Tesst | T101 | RES4CITY | yes | - | - | - | About This Course; Requirements | - | - | yes |
| 67 | Energy Communities Implementation in the Urban Environment | energy-communities-implementation-in-the-urban-environment | /courses/course-v1:UPV+MC19v1+2024_01 | Universitat Politècnica de València | MC19 | RES4CITY | yes | yes | yes | yes | - | yes(7) | yes | yes |
| 68 | Environmental certification and assessment of communities and buildings | environmental-certification-and-assessment-of-communities-and-buildings | /courses/course-v1:TUC+VET01_RESSKILL+2026_T2 | TUC | VET01_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 69 | Project management for sustainability | project-management-for-sustainability | /courses/course-v1:FINNOVA+MC08_RESSKILL+2026_T2 | FINNOVA | MC08_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 70 | Professional English | professional-english | /courses/course-v1:EELI+VET03_RESSKILL+2026_T2 | EELI | VET03_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 71 | Decarbonisation of Energy in the Residential Sector | decarbonisation-of-energy-in-the-residential-sector | /courses/course-v1:UPV+MC11_RESSKILL+2026_T2 | UPV | MC11_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 72 | Renewable Energy Communities in Cities | renewable-energy-communities-in-cities | /courses/course-v1:UPV+MC10_RESSKILL+2026_T2 | UPV | MC10_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 73 | Smart Energy Systems in Building Construction | smart-energy-systems-in-building-construction | /courses/course-v1:EELI+VET02_RESSKILL+2026_T2 | EELI | VET02_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(4) | yes | yes |
| 74 | Introduction to Energy Management | introduction-to-energy-management | /courses/course-v1:NUIM+MC07_RESSKILL+2026_T2 | NUIM | MC07_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 75 | DataSpaces for energy communities | dataspaces-for-energy-communities | /courses/course-v1:NUIM+MC06_RESSKILL+2026_T2 | NUIM | MC06_RESSKILL | RES4CITY | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 76 | Innovation Management for Energy Transition | innovation-management-for-energy-transition | /courses/course-v1:3OC+MC05_RESSKILL+2026_T2 | 3OC | MC05 | RESSKILL | yes | yes | yes | yes | - | yes(5) | yes | yes |
| 77 | Thermal Measurements | thermal-measurements | /courses/course-v1:UNICAMP+MC04_RESSKILL+2026_T2 | UNICAMP | MC04 | RESSKILL | yes | yes | yes | yes | - | yes(7) | yes | yes |
