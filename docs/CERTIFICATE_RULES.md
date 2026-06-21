# Certificate Rules

How certificate eligibility is calculated for each of the 77 micro-credentials, and the completion
formula. Eligibility is computed **server-side** in `src/lib/completion.ts` from stored
`unit_progress` (video/section completion) and `mcq_attempts` (one attempt per question), and
persisted to `course_completion`. Certificates are issued/downloaded at
`GET /api/certificates/<slug>` (PDF, pdf-lib) only when eligible.

## Eligibility rules

| Rule | Applies when | Certificate requires |
| --- | --- | --- |
| **mcq** | course has ≥ 1 MCQ | all videos complete **AND** every MCQ attempted (one attempt each) **AND** MCQ score ≥ **50%** |
| **video-only** | course has videos, no MCQs | all videos complete |
| **content** | course has neither (reading/outline only) | all content sections marked complete |

**MCQ score** = correct ÷ total questions × 100. **Completion %** = (completed videos + attempted
MCQs) ÷ (total videos + total MCQs) × 100 — for content courses it is completed ÷ total sections.
A wrong answer counts permanently (one attempt only); an unattempted question keeps the course
incomplete. **MCQ_PASS_PERCENT = 50**.

## Coverage

| Metric | Value |
| --- | --- |
| Micro-credentials | 77 |
| MCQ-rule courses | 60 |
| Video-only courses | 2 |
| Content-only courses (RESSKILL, blocks API 500) | 15 |
| Certificate available locally (all) | yes — `/api/certificates/<slug>` |

## All 77 courses

| # | Title | Slug | Code | Videos | MCQs | Eligibility rule | Certificate | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Serious Game | serious-game | MC10 | 1 | 0 | video-only (all videos complete) | yes | all videos complete |
| 2 | Advanced Modelling of Buildings and Energy Systems | advanced-modelling-of-buildings-and-energy-systems | MC13 | 20 | 26 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 3 | Positive Energy Districts | positive-energy-districts | MC20 | 36 | 74 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 4 | Efficient Building Techniques | efficient-building-techniques | MC18 | 51 | 60 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 5 | Hydrogen Technologies for Urban Areas | hydrogen-technologies-for-urban-areas | MC33 | 19 | 22 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 6 | Tools for City Decarbonisation | tools-for-city-decarbonisation | MC21 | 34 | 60 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 7 | Renewable Energy Investments | renewable-energy-investments | MC37 | 16 | 25 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 8 | Thermal Simulation of Buildings | thermal-simulation-of-buildings | MC12 | 37 | 33 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 9 | Tools, Strategies and Trends in Sustainable Finance | tools-strategies-and-trends-in-sustainable-finance | MC03 | 13 | 26 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 10 | Urban Renewable Energy: Decision Making Methodologies | urban-renewable-energy-decision-making-methodologies | MC30 | 11 | 27 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 11 | Introduction to Industrial Organization | introduction-to-industrial-organization | MC29 | 10 | 23 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 12 | How Sustainable is your City? | how-sustainable-is-your-city | MC27 | 14 | 38 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 13 | Investing in Sustainability | investing-in-sustainability | MC04 | 14 | 26 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 14 | Climate Risk and Climate Investing | climate-risk-and-climate-investing | MC05 | 14 | 26 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 15 | Energy Markets | energy-markets | MC09 | 24 | 22 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 16 | Data Analytics for the Energy Sector | data-analytics-for-the-energy-sector | MC06 | 9 | 40 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 17 | Energy Utilisation and Storage | energy-utilisation-and-storage | MC11 | 12 | 82 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 18 | Introduction to Sustainable Finance | introduction-to-sustainable-finance | MC02 | 17 | 121 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 19 | Energy Strategy and Energy Transition | energy-strategy-and-energy-transition | MC14 | 14 | 34 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 20 | Circular Economy for Sustainable Cities | circular-economy-for-sustainable-cities | MC40 | 15 | 38 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 21 | Sustainable Development Goals for Cities | sustainable-development-goals-for-cities | MC28 | 15 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 22 | Sustainable Business Models | sustainable-business-models | MC44 | 14 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 23 | Social Acceptance of Technologies | social-acceptance-of-technologies | MC32 | 10 | 24 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 24 | Strategic Behaviour in Energy Markets: Options and Games | strategic-behaviour-in-energy-markets-options-and-games | MC35 | 18 | 25 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 25 | Management of Innovation Projects | management-of-innovation-projects | MC41 | 16 | 64 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 26 | Gender Mainstreaming and Intersectionality | gender-mainstreaming-and-intersectionality | MC43 | 15 | 38 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 27 | Decision-Making for Energy Projects under Uncertainty | decision-making-for-energy-projects-under-uncertainty | MC34 | 17 | 25 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 28 | Energy Justice and Poverty | energy-justice-and-poverty | MC31 | 6 | 16 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 29 | Energy Policy | energy-policy | MC16 | 14 | 34 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 30 | Enacting a Circular Economy | enacting-a-circular-economy | MC01 | 22 | 32 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 31 | Analysis of Energy Consumption | analysis-of-energy-consumption | MC07 | 14 | 25 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 32 | Energy Management and Smart Communities | energy-management-and-smart-communities | MC15 | 12 | 32 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 33 | Decarbonisation of Thermal Energy | decarbonisation-of-thermal-energy | MC17 | 37 | 41 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 34 | Small Scale Wind Power | small-scale-wind-power | MC42 | 28 | 34 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 35 | Biogas Systems for Climate Transition | biogas-systems-for-climate-transition | MC39 | 13 | 38 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 36 | Energy Policy and Flexible Technologies | energy-policy-and-flexible-technologies | MC36 | 12 | 23 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 37 | Case Studies in Energy Management | case-studies-in-energy-management | MC08 | 21 | 11 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 38 | Basics of Energy Efficiency | basics-of-energy-efficiency | MC01 | 25 | 24 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 39 | Environmental Social Governance Finance | environmental-social-governance-finance | MC03 | 12 | 16 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 40 | Green Infrastructure Finance | green-infrastructure-finance | MC11 | 14 | 26 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 41 | Decision-making towards a Sustainable City | decision-making-towards-a-sustainable-city | MC02 | 11 | 33 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 42 | Life Cycle Analysis in Construction | life-cycle-analysis-in-construction | MC08 | 10 | 5 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 43 | Urban Metabolism Strategies | urban-metabolism-strategies | MC24 | 23 | 40 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 44 | Digital Payments and Smart City Platforms | digital-payments-and-smart-city-platforms | MC25 | 14 | 19 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 45 | Introduction to Renewable Energies | introduction-to-renewable-energies | MC23 | 18 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 46 | Fundamentals of Energy Systems | fundamentals-of-energy-systems | MC22 | 16 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 47 | Understanding Critical Raw Materials | understanding-critical-raw-materials | MC26 | 16 | 84 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 48 | Info Course on Energy Efficiency in Buildings | info-course-on-energy-efficiency-in-buildings | SC01 | 3 | 0 | video-only (all videos complete) | yes | all videos complete |
| 49 | Business Model for Energy Efficiency in Buildings | business-model-for-energy-efficiency-in-buildings | MC13 | 12 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 50 | Probabilistic Approach for Energy Efficiency Evaluation | probabilistic-approach-for-energy-efficiency-evaluation | MC15 | 22 | 10 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 51 | Communication Strategies with Financial Institutions | communication-strategies-with-financial-institutions | MC12 | 15 | 40 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 52 | Energy Auditing of Buildings | energy-auditing-of-buildings | MC06 | 10 | 33 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 53 | Incorporation of Natural Materials in Energy Renovation of Buildings | incorporation-of-natural-materials-in-energy-renovation-of-buildings | MC07 | 26 | 39 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 54 | Circular Economy in the Built Environment | circular-economy-in-the-built-environment | MC09 | 10 | 47 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 55 | Energy Consumption in Buildings | energy-consumption-in-buildings | MC10 | 15 | 35 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 56 | Energy Performance Contracting (EPC) | energy-performance-contracting-epc | MC14 | 8 | 44 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 57 | Energy Efficiency in Buildings for VET Up-Skilling | energy-efficiency-in-buildings-for-vet-up-skilling | VET01 | 19 | 63 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 58 | Systemic Design For Energy Retrofitting | systemic-design-for-energy-retrofitting | MC05 | 11 | 30 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 59 | Advertising and Public Relations in the Energy Sector | advertising-and-public-relations-in-the-energy-sector | MC04 | 13 | 62 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 60 | Sustainability, Circular Economy and ESG Investing | sustainability-circular-economy-and-esg-investing | MCSCE | 36 | 58 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 61 | PV integration in shading systems | pv-integration-in-shading-systems | MC09_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 62 | Carbon Neutrality and ESG | carbon-neutrality-and-esg | MC01 | 26 | 34 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 63 | Heat Pumps and District Heating in Urban Areas | heat-pumps-and-district-heating-in-urban-areas | MC01_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 64 | Solar Systems Integration | solar-systems-integration | MC03_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 65 | Energy Flexibility | energy-flexibility | MC2_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 66 | Test | test | T101 | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 67 | Energy Communities Implementation in the Urban Environment | energy-communities-implementation-in-the-urban-environment | MC19 | 30 | 60 | mcq (all videos complete + every MCQ attempted + MCQ score ≥ 50%) | yes | all videos complete + every MCQ attempted + MCQ score ≥ 50% |
| 68 | Environmental certification and assessment of communities and buildings | environmental-certification-and-assessment-of-communities-and-buildings | VET01_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 69 | Project management for sustainability | project-management-for-sustainability | MC08_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 70 | Professional English | professional-english | VET03_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 71 | Decarbonisation of Energy in the Residential Sector | decarbonisation-of-energy-in-the-residential-sector | MC11_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 72 | Renewable Energy Communities in Cities | renewable-energy-communities-in-cities | MC10_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 73 | Smart Energy Systems in Building Construction | smart-energy-systems-in-building-construction | VET02_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 74 | Introduction to Energy Management | introduction-to-energy-management | MC07_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 75 | DataSpaces for energy communities | dataspaces-for-energy-communities | MC06_RESSKILL | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 76 | Innovation Management for Energy Transition | innovation-management-for-energy-transition | MC05 | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
| 77 | Thermal Measurements | thermal-measurements | MC04 | 0 | 0 | content (all course sections complete) | yes | reading/outline only (blocks API 500) |
