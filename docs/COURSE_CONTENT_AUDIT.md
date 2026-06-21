# Course Content Audit

All **77** micro-credentials, content pulled from the live course player via Open edX REST APIs
(course **blocks** API for structure + YouTube videos; **problem_get** handler for quiz
questions). Login used only via gitignored `.env.local` — never committed.

| Metric | Value |
| --- | --- |
| Micro-credentials | 77 |
| Courses with scraped content | 62 / 77 |
| **Grouped quiz sets** (was 1 page per question) | 568 |
| **Quiz questions** mapped (prompt + options) | 2262 |
| Generic "Question" sidebar items remaining | **0** (target 0) |
| Interactive units added (Serious Game) | 1 |
| Verified answer keys seeded | 1580 |
| Local learn route | `/learn/[slug]` (all 77) |

**Grouping fix:** consecutive quiz questions are now collapsed into a single quiz **set** (one
sidebar entry, all questions on one page) instead of one "Question" page each — matching the live
BoostMySkills player. **Interactive units** (e.g. the Serious Game LTI) are rendered as activity
cards. **Answer keys:** Open edX hides correct answers behind server-side grading, so only
individually **verified** keys are stored (see `src/data/quiz-answers.ts`); other quizzes show the
real prompt + options as a self-check. **15 courses** (newer RESSKILL runs) return a server 500
from the blocks API and fall back to scraped reading + outline.

## All 77 courses

| # | Title | Slug | Grouped quiz fixed? | Interactive unit? | Answer key available? | Local validation enabled? | Fallback message used? | Sidebar titles verified? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Serious Game | serious-game | n/a | yes | n/a | n/a | no | yes | interactive Serious Game unit (deep-link launch) |
| 2 | Advanced Modelling of Buildings and Energy Systems | advanced-modelling-of-buildings-and-energy-systems | yes | n/a | partial (19/26) | partial | yes | yes | 9 quiz set(s), 26 questions |
| 3 | Positive Energy Districts | positive-energy-districts | yes | n/a | partial (72/74) | partial | yes | yes | 19 quiz set(s), 74 questions |
| 4 | Efficient Building Techniques | efficient-building-techniques | yes | n/a | partial (45/60) | partial | yes | yes | 15 quiz set(s), 60 questions |
| 5 | Hydrogen Technologies for Urban Areas | hydrogen-technologies-for-urban-areas | yes | n/a | partial (22/22) | partial | no | yes | 22 quiz set(s), 22 questions |
| 6 | Tools for City Decarbonisation | tools-for-city-decarbonisation | yes | n/a | partial (50/60) | partial | yes | yes | 15 quiz set(s), 60 questions |
| 7 | Renewable Energy Investments | renewable-energy-investments | yes | n/a | partial (23/25) | partial | yes | yes | 5 quiz set(s), 25 questions |
| 8 | Thermal Simulation of Buildings | thermal-simulation-of-buildings | yes | n/a | partial (28/33) | partial | yes | yes | 18 quiz set(s), 33 questions |
| 9 | Tools, Strategies and Trends in Sustainable Finance | tools-strategies-and-trends-in-sustainable-finance | yes | n/a | partial (26/26) | partial | no | yes | 6 quiz set(s), 26 questions |
| 10 | Urban Renewable Energy: Decision Making Methodologies | urban-renewable-energy-decision-making-methodologies | yes | n/a | partial (26/27) | partial | yes | yes | 6 quiz set(s), 27 questions |
| 11 | Introduction to Industrial Organization | introduction-to-industrial-organization | yes | n/a | partial (21/23) | partial | yes | yes | 10 quiz set(s), 23 questions |
| 12 | How Sustainable is your City? | how-sustainable-is-your-city | yes | n/a | partial (31/38) | partial | yes | yes | 7 quiz set(s), 38 questions |
| 13 | Investing in Sustainability | investing-in-sustainability | yes | n/a | partial (26/26) | partial | no | yes | 6 quiz set(s), 26 questions |
| 14 | Climate Risk and Climate Investing | climate-risk-and-climate-investing | yes | n/a | partial (26/26) | partial | no | yes | 6 quiz set(s), 26 questions |
| 15 | Energy Markets | energy-markets | yes | n/a | partial (22/22) | partial | no | yes | 9 quiz set(s), 22 questions |
| 16 | Data Analytics for the Energy Sector | data-analytics-for-the-energy-sector | yes | n/a | partial (39/40) | partial | yes | yes | 5 quiz set(s), 40 questions |
| 17 | Energy Utilisation and Storage | energy-utilisation-and-storage | yes | n/a | partial (81/82) | partial | yes | yes | 11 quiz set(s), 82 questions |
| 18 | Introduction to Sustainable Finance | introduction-to-sustainable-finance | yes | n/a | partial (94/121) | partial | yes | yes | 10 quiz set(s), 121 questions |
| 19 | Energy Strategy and Energy Transition | energy-strategy-and-energy-transition | yes | n/a | partial (32/34) | partial | yes | yes | 13 quiz set(s), 34 questions |
| 20 | Circular Economy for Sustainable Cities | circular-economy-for-sustainable-cities | yes | n/a | partial (37/38) | partial | yes | yes | 13 quiz set(s), 38 questions |
| 21 | Sustainable Development Goals for Cities | sustainable-development-goals-for-cities | yes | n/a | partial (33/39) | partial | yes | yes | 7 quiz set(s), 39 questions |
| 22 | Sustainable Business Models | sustainable-business-models | yes | n/a | partial (39/39) | partial | no | yes | 14 quiz set(s), 39 questions |
| 23 | Social Acceptance of Technologies | social-acceptance-of-technologies | yes | n/a | partial (14/24) | partial | yes | yes | 11 quiz set(s), 24 questions |
| 24 | Strategic Behaviour in Energy Markets: Options and Games | strategic-behaviour-in-energy-markets-options-and-games | yes | n/a | partial (24/25) | partial | yes | yes | 4 quiz set(s), 25 questions |
| 25 | Management of Innovation Projects | management-of-innovation-projects | yes | n/a | partial (60/64) | partial | yes | yes | 14 quiz set(s), 64 questions |
| 26 | Gender Mainstreaming and Intersectionality | gender-mainstreaming-and-intersectionality | yes | n/a | partial (36/38) | partial | yes | yes | 13 quiz set(s), 38 questions |
| 27 | Decision-Making for Energy Projects under Uncertainty | decision-making-for-energy-projects-under-uncertainty | yes | n/a | partial (24/25) | partial | yes | yes | 4 quiz set(s), 25 questions |
| 28 | Energy Justice and Poverty | energy-justice-and-poverty | yes | n/a | partial (12/16) | partial | yes | yes | 7 quiz set(s), 16 questions |
| 29 | Energy Policy | energy-policy | yes | n/a | partial (34/34) | partial | no | yes | 9 quiz set(s), 34 questions |
| 30 | Enacting a Circular Economy | enacting-a-circular-economy | yes | n/a | partial (32/32) | partial | no | yes | 9 quiz set(s), 32 questions |
| 31 | Analysis of Energy Consumption | analysis-of-energy-consumption | yes | n/a | partial (24/25) | partial | yes | yes | 6 quiz set(s), 25 questions |
| 32 | Energy Management and Smart Communities | energy-management-and-smart-communities | yes | n/a | partial (31/32) | partial | yes | yes | 10 quiz set(s), 32 questions |
| 33 | Decarbonisation of Thermal Energy | decarbonisation-of-thermal-energy | yes | n/a | partial (25/41) | partial | yes | yes | 10 quiz set(s), 41 questions |
| 34 | Small Scale Wind Power | small-scale-wind-power | yes | n/a | partial (31/34) | partial | yes | yes | 19 quiz set(s), 34 questions |
| 35 | Biogas Systems for Climate Transition | biogas-systems-for-climate-transition | yes | n/a | partial (37/38) | partial | yes | yes | 13 quiz set(s), 38 questions |
| 36 | Energy Policy and Flexible Technologies | energy-policy-and-flexible-technologies | yes | n/a | partial (22/23) | partial | yes | yes | 4 quiz set(s), 23 questions |
| 37 | Case Studies in Energy Management | case-studies-in-energy-management | yes | n/a | partial (10/11) | partial | yes | yes | 2 quiz set(s), 11 questions |
| 38 | Basics of Energy Efficiency | basics-of-energy-efficiency | yes | n/a | partial (7/24) | partial | yes | yes | 5 quiz set(s), 24 questions |
| 39 | Environmental Social Governance Finance | environmental-social-governance-finance | yes | n/a | partial (2/16) | partial | yes | yes | 7 quiz set(s), 16 questions |
| 40 | Green Infrastructure Finance | green-infrastructure-finance | yes | n/a | partial (5/26) | partial | yes | yes | 6 quiz set(s), 26 questions |
| 41 | Decision-making towards a Sustainable City | decision-making-towards-a-sustainable-city | yes | n/a | partial (4/33) | partial | yes | yes | 5 quiz set(s), 33 questions |
| 42 | Life Cycle Analysis in Construction | life-cycle-analysis-in-construction | yes | n/a | no | no | yes | yes | 5 quiz set(s), 5 questions |
| 43 | Urban Metabolism Strategies | urban-metabolism-strategies | yes | n/a | partial (40/40) | partial | no | yes | 16 quiz set(s), 40 questions |
| 44 | Digital Payments and Smart City Platforms | digital-payments-and-smart-city-platforms | yes | n/a | partial (18/19) | partial | yes | yes | 4 quiz set(s), 19 questions |
| 45 | Introduction to Renewable Energies | introduction-to-renewable-energies | yes | n/a | partial (32/39) | partial | yes | yes | 13 quiz set(s), 39 questions |
| 46 | Fundamentals of Energy Systems | fundamentals-of-energy-systems | yes | n/a | partial (36/39) | partial | yes | yes | 13 quiz set(s), 39 questions |
| 47 | Understanding Critical Raw Materials | understanding-critical-raw-materials | yes | n/a | partial (12/84) | partial | yes | yes | 12 quiz set(s), 84 questions |
| 48 | Info Course on Energy Efficiency in Buildings | info-course-on-energy-efficiency-in-buildings | n/a | n/a | n/a | n/a | no | yes | 0 quiz set(s), 0 questions |
| 49 | Business Model for Energy Efficiency in Buildings | business-model-for-energy-efficiency-in-buildings | yes | n/a | partial (11/39) | partial | yes | yes | 5 quiz set(s), 39 questions |
| 50 | Probabilistic Approach for Energy Efficiency Evaluation | probabilistic-approach-for-energy-efficiency-evaluation | yes | n/a | partial (3/10) | partial | yes | yes | 1 quiz set(s), 10 questions |
| 51 | Communication Strategies with Financial Institutions | communication-strategies-with-financial-institutions | yes | n/a | partial (16/40) | partial | yes | yes | 9 quiz set(s), 40 questions |
| 52 | Energy Auditing of Buildings | energy-auditing-of-buildings | yes | n/a | partial (9/33) | partial | yes | yes | 5 quiz set(s), 33 questions |
| 53 | Incorporation of Natural Materials in Energy Renovation of Buildings | incorporation-of-natural-materials-in-energy-renovation-of-buildings | yes | n/a | partial (7/39) | partial | yes | yes | 7 quiz set(s), 39 questions |
| 54 | Circular Economy in the Built Environment | circular-economy-in-the-built-environment | yes | n/a | partial (12/47) | partial | yes | yes | 8 quiz set(s), 47 questions |
| 55 | Energy Consumption in Buildings | energy-consumption-in-buildings | yes | n/a | partial (9/35) | partial | yes | yes | 7 quiz set(s), 35 questions |
| 56 | Energy Performance Contracting (EPC) | energy-performance-contracting-epc | yes | n/a | partial (12/44) | partial | yes | yes | 5 quiz set(s), 44 questions |
| 57 | Energy Efficiency in Buildings for VET Up-Skilling | energy-efficiency-in-buildings-for-vet-up-skilling | yes | n/a | partial (15/63) | partial | yes | yes | 8 quiz set(s), 63 questions |
| 58 | Systemic Design For Energy Retrofitting | systemic-design-for-energy-retrofitting | yes | n/a | partial (4/30) | partial | yes | yes | 6 quiz set(s), 30 questions |
| 59 | Advertising and Public Relations in the Energy Sector | advertising-and-public-relations-in-the-energy-sector | yes | n/a | partial (6/62) | partial | yes | yes | 6 quiz set(s), 62 questions |
| 60 | Sustainability, Circular Economy and ESG Investing | sustainability-circular-economy-and-esg-investing | yes | n/a | partial (58/58) | partial | no | yes | 16 quiz set(s), 58 questions |
| 61 | PV integration in shading systems | pv-integration-in-shading-systems | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 62 | Carbon Neutrality and ESG | carbon-neutrality-and-esg | yes | n/a | partial (4/34) | partial | yes | yes | 22 quiz set(s), 34 questions |
| 63 | Heat Pumps and District Heating in Urban Areas | heat-pumps-and-district-heating-in-urban-areas | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 64 | Solar Systems Integration | solar-systems-integration | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 65 | Energy Flexibility | energy-flexibility | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 66 | Test | test | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 67 | Energy Communities Implementation in the Urban Environment | energy-communities-implementation-in-the-urban-environment | yes | n/a | partial (50/60) | partial | yes | yes | 16 quiz set(s), 60 questions |
| 68 | Environmental certification and assessment of communities and buildings | environmental-certification-and-assessment-of-communities-and-buildings | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 69 | Project management for sustainability | project-management-for-sustainability | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 70 | Professional English | professional-english | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 71 | Decarbonisation of Energy in the Residential Sector | decarbonisation-of-energy-in-the-residential-sector | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 72 | Renewable Energy Communities in Cities | renewable-energy-communities-in-cities | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 73 | Smart Energy Systems in Building Construction | smart-energy-systems-in-building-construction | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 74 | Introduction to Energy Management | introduction-to-energy-management | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 75 | DataSpaces for energy communities | dataspaces-for-energy-communities | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 76 | Innovation Management for Energy Transition | innovation-management-for-energy-transition | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
| 77 | Thermal Measurements | thermal-measurements | n/a | n/a | n/a | n/a | no | yes | blocks API 500 — reading + outline fallback |
