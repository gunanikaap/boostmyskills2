// Auto-generated from the live BoostMySkills course "/about" pages.
// Flexible content model: every main content section (Context and overview, Learning
// objectives, Background, and any others present on a course) is captured in order, each
// with ordered paragraph/bullet-list blocks. `modules` is the sidebar numbered Sections list.
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type ContentSection = { title: string; blocks: ContentBlock[] };

export type CourseContent = {
  contentSections: ContentSection[];
  modules: string[];
  workload: string | null;
  createdBy: string | null;
};

export const coursesContent: Record<string, CourseContent> = {
  "serious-game": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Fabian Energy Community Game is a role-playing game that simulates a specific business scenario associated with renewable energies and fuel technologies. Playing the role of the main character, the user will be asked to face and solve problems related to sustainability, the circular economy and renewable energy. In particular, the user plays the role of energy manager of a fictional sustainable energy community. The task is to reduce energy consumption and adopt renewable energy sources, developing and implementing a comprehensive energy plan."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The game is aimed at equipping players with critical skills for managing energy resources efficiently in complex situations. Through the simulation, users test and develop abilities in energy analysis, decision-making, priority-setting, delegation, problem-solving, results orientation, communication, cooperation and synergies."
          }
        ]
      }
    ],
    "modules": [
      "Gamification Overview",
      "Role Paly Game",
      "Fabian Energy Community Game: Scenario",
      "Fabian Energy Community Game: How to play"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Artémat"
  },
  "advanced-modelling-of-buildings-and-energy-systems": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "According to the revised Energy Performance of Buildings Directive, starting in 2050, all buildings must meet the standard of zero-emission buildings (ZEB). This ambitions target will require buildings to exhibit very high performances having all the energy consumed being produced from renewable sources and avoiding on-site carbon emissions from fossil fuels. To enhance the overall energy performance of the building stock, building energy systems simulation emerges as a primary tool to achieve these objectives. Consequently, it is essential to train and empower professionals with skills in building and energy systems modelling to assess buildings’ energy performance, including Heating, Ventilation, and Air Conditioning (HVAC) systems, and renewable energy systems. The purpose of this MC is to acquaint students with building energy simulation tools and illustrate their capabilities in designing, modelling, and sizing Heating, Cooling, and Air Conditioning (HVAC) systems, and renewable energy systems. This MC will provide guidance in defining multi-zone models, estimating thermal loads, and sizing HVAC and renewable energy systems. To reinforce these concepts, a building case study will be developed to practice and compare the energy performance of different HVAC solutions and of photovoltaic systems. At the end, students will be prepared to employ building simulation tools in the design of highly efficient buildings utilizing renewable energy systems."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should:"
          },
          {
            "type": "list",
            "items": [
              "Acquire the procedures and good practices for the adequate and effective use of building energy simulation tools.",
              "Be prepared to configure different HVAC and energy system solutions within building models to facilitate the design highly efficient buildings while integrating of renewable energy systems.",
              "Develop and consolidate skills to apply the general criteria for the definition and parameterization of building models and perform critical analysis of the results."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Fundamentals of Thermodynamics, Fluid Mechanics and Heat Transfer; Introduction to thermal characterization and energy modelling of buildings."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to the adopted simulation program, the EnergyPlus",
      "Geometry definition of a building model: multi-zone models and boundary conditions",
      "Estimation of thermal loads",
      "Sizing HVAC systems",
      "Sizing of integrated renewable energy systems (photovoltaic systems)",
      "Performance evaluation and improvement studies",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Adélio Rodrigues Gaspar — University of Coimbra"
  },
  "positive-energy-districts": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Positive Energy Districts (PEDs) are a new paradigm for the energy transition, with an ambitious timetable for rapid upscaling to match the urgency of tackling climate change and adapting to it. PEDs can cut the urban energy transition into pieces according to the different realities that each area of the city experiences. This approach allows decarbonisation to take a bottom-up approach to ensure it is fair and that no one is left behind. The MC will explain the role of PEDs in a fair energy transition. Learners will get in contact with different indicators that can help measure the performance of the solutions put in place. Following this, they will explore how to implement solutions for decarbonising mobility, efficiency and energy demand in urban districts to achieve a fair transition. The Positive Energy Districts (PEDs) approach can cut the urban energy transition into pieces to take a bottom-up approach, ensuring it is fair and no one is left behind. The MC will start with an overview of current urban energy transition trends. Next, the MC will explore the design of fair urban energy transitions employing PEDs. Following this, learners will explore the role of PEDs in a fair energy transition. To measure success, we need to use appropriate key performance indicators, and the MC will introduce students to the main proposals found in the literature. Urban energy transition must confront the sectors with a greater carbon footprint to achieve a carbon-neutral city. This MC will delve deeper into the mobility problems in cities, building stock lack of efficiency, and the thermal and electrical energy demands decarbonisation."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the convenience of PEDs for urban energy transitions",
              "Knowledge of the key performance indicators used to characterise PEDs",
              "Design actions to tackle the primary sources of GHG emissions in an urban area"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level.",
              "Principles of energy systems."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Urban energy transitions: an overview",
      "Positive energy district (PED) as a fair approach",
      "Key performance indicators to characterise a PED",
      "Tackling mobility",
      "Enhancing efficiency in the building stock",
      "Decarbonising energy demand",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Álvaro Manso Burgos, Lecturer Isabel Aparisi Cerdá — Universitat Politècnica de València"
  },
  "efficient-building-techniques": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Buildings contribution to overall energy consumption is quantified at 30-40%, depending on their use and location. Due to its specific characteristics, it is one of the sectors in which the European Community recognises as having the potential to make the most significant energy savings. This MC addresses this issue by presenting the most representative and currently recognised technologies in achieving buildings with minimum energy consumption. It will start by assessing the current thermal performance of buildings and the principles of construction standards. Following this, the MC will present the most commonly used methods to evaluate the thermal performance of a building. Finally, we will work on innovative technologies and materials to improve buildings' efficiency. The MC presents the most recognised technologies to assist buildings with minimum energy consumption goals. First, we will study the thermal performance of a building and discuss the basic principles of sustainable buildings from a thermal perspective. Following this, we will present students with minimum energy consumption standards like Passivhaus. The next phase of the MC will involve ways to measure buildings' thermal performance. Infrared thermography is a powerful method to evaluate thermal isolation. The blower door test evaluates construction infiltrations. Finally, building modelling and simulations improve technicians' understanding of building energy performance. To conclude the MC, learners will study innovative solutions in building construction. Geothermal energy is a heat pump-based system to heat and cool spaces with high efficiency, and bioclimatic design considers the environmental context to shape the construction."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the basic principles of sustainable buildings from a thermal point of view",
              "Diagnose the thermal performance of a building",
              "Design buildings with minimum energy consumption"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Study of the thermal performance of the buildings",
      "Basic principles of sustainable building from a thermal point of view",
      "Minimum energy consumption standards. Passivhaus",
      "Infrared thermography applied to building construction",
      "Infiltrations and Blower Door testing",
      "Building modelling and simulation",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Mar Cañada — Universitat Politècnica de València"
  },
  "hydrogen-technologies-for-urban-areas": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC aims to address the economy of flexible technology integration. Flexible technologies such as electric vehicles, storage and decentralised renewable energy need a specific distribution network to be deployed by new investments or by modernising existing networks. The MC proposes to assess the theoretical business model for coordinating investments in network and flexible technologies. More particularly, it will include elements related to:"
          },
          {
            "type": "list",
            "items": [
              "Distribution network investments",
              "Economy of flexible technologies",
              "Business models of flexible technology",
              "Network and flexible technology"
            ]
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Learning outcomes include:"
          },
          {
            "type": "list",
            "items": [
              "Increased skills on flexible technology",
              "Understand the business model of efficient coordination of the investments linked to flexible technologies"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Interest in energy economics, flexible technology, electricity actors’ business models"
          }
        ]
      }
    ],
    "modules": [
      "What is hydrogen and how could it help to tackle climate change?",
      "How could hydrogen help different sectors reach net-zero?",
      "Is the use of hydrogen simple or disruptive for users?",
      "Long term vision of hydrogen uses for heating and mobility in cities",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Silvana Mima — Université Grenoble Alpes"
  },
  "tools-for-city-decarbonisation": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Decarbonising cities is a complex process that needs broad perspectives and methods. This MC aims to give learners valuable tools to decarbonise any city from a more general scope to a specific result. The MC will teach students how to use a multilevel perspective to assess an energy system. More on-the-ground approaches follow this assessment, such as solution concept mapping, stakeholders’ analysis, results reporting, and mapping the results in GIS (such as ArcGIS or QGIS). Thus, we move on to prioritising the solutions using multicriteria decision methods. The solution will probably respond to multiple objectives, and multi-objective optimisation methods will help achieve carbon-neutral cities. Finally, the MC combines all these tools in developing decarbonisation roadmaps. This MC aims to provide students with useful tools to decarbonise any city from a broader perspective to a more focused outcome. We will consider a multilevel perspective to assess sustainable development. For that, we will use concept mapping and stakeholder analysis to evaluate the context of the city. In decarbonisation, it is essential to use appropriate performance indicators and reporting to measure success. The MC will introduce students to city mapping software using ArcGIS. This software is helpful to visualise the evolution of indicators across the city. Once students get used to these tools, they will start to make decisions about the decarbonisation process. They will make multicriteria decisions based on AHP and ANP methodologies and optimise actions using multi-objective methodologies. Finally, all the tools converge into the development of decarbonisation roadmaps."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Diagnose the urban energy systems to evaluate their sustainability",
              "Employ tools such as concept mapping, stakeholder analysis or city mapping to evaluate sustainable solutions",
              "Select the best way of action through multicriteria decision-making and multi-objective optimisation methods",
              "Design a roadmap to decarbonise a city"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level",
              "Principles of energy systems"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction",
      "Tools to clarify the decarbonisation of cities",
      "Tools to manage the decarbonisation of cities",
      "Methodology for the decarbonisation of cities",
      "Case study",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Tomás Gómez — Universitat Politècnica de València"
  },
  "renewable-energy-investments": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC aims to give an overview on the main challenges and barriers to investments in renewable generation. It describes the theory and the practices regarding EU electricity markets design and how they deal with renewable market integration in line with network access and use practices specific to renewable. The MC ends with a comparison of EU best practices in term of best signals to encourage renewable investments. More particularly, it will include elements related to:"
          },
          {
            "type": "list",
            "items": [
              "Electricity market design",
              "Renewable energy tariffs and prices",
              "Renewable network access and use",
              "Renewable investments barriers"
            ]
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Among learning outcomes, we can cite:"
          },
          {
            "type": "list",
            "items": [
              "Increased skills on electricity market design",
              "Understand the specific incentive tools to renewable",
              "Learn the economic basis of renewable investment"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Interest in energy economics, renewable energy, electricity market design"
          }
        ]
      }
    ],
    "modules": [
      "Electricity Market Liberalisation",
      "Long Term RES Investments Incentives"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Haikel Khalfallah — Université Grenoble Alpes"
  },
  "thermal-simulation-of-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To achieve the established long-term climate neutrality targets, the Energy Performance of Buildings Directive was revised to set a more ambitious goal that from 2027 all new public buildings, from 2030 all new buildings and from 2050 all buildings should be zero-emission buildings (ZEB). This goal of ZEB calls for buildings to have very high performance, with a very low amount of energy required being covered by energy from renewable sources and no on-site carbon emissions from fossil fuels. Given the need to improve the energy performance of the building stock, building energy simulation becomes an essential tool to help achieve these goals. Therefore, it is fundamental to train and empower professionals with skills in building energy simulation programs to be able to face the challenges currently posed. The aim of this MC is to introduce the students to the building energy simulation tools, showing their capabilities for the design of new and renovated buildings. This MC will provide the procedures to define the geometry of a building model, the parameterisation of the thermal properties of the envelope and building utilisation. The development of the exercises will permit students to understand the capabilities required to obtain detailed and integrated results about the different heat exchanges and thermal loads of a building system. The development of a case study will be used to practice and compare the influence of different solutions on the thermal performance of buildings. At the end, students will be prepared to use building simulation tools to contribute to the design of highly efficient buildings."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Consolidate the main theoretical foundations about building thermal physics and the calculation methodology of building energy simulation",
              "Acquire the procedures and good practices for the adequate and effective use of building energy simulation tools",
              "Develop and consolidate skills to apply the general criteria for the definition and parameterisation of building models and perform critical analyses of the results",
              "Evaluate the impact of building renovation measures"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge about thermodynamics and heat transfer"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to thermal simulation of buildings",
      "Weather data, simulation parameters and outputs",
      "Building geometry",
      "Materials and constructions",
      "Building operation",
      "Demonstration and final assignment"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Adélio Rodrigues Gaspar — University of Coimbra"
  },
  "tools-strategies-and-trends-in-sustainable-finance": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sustainable finance is revolutionizing the financial landscape by incorporating environmental, social, and governance (ESG) considerations into decision-making. Investors leverage tools like impact investing, green bonds, and sustainable equity funds to align their portfolios with responsible principles. ESG integration assesses the sustainability performance of investments, while engagement empowers investors to drive positive change within companies. Continuously evolving trends, such as increased demand for sustainable products and climate-related disclosures, are reshaping financial markets. Sustainable finance's transformative power lies in its ability to foster a more resilient and responsible future, paving the way for a sustainable and equitable world. The MC “Tools and Strategies in Sustainable Finance” builds on the knowledge gained in the Introduction to Sustainable Finance (P03) and offers tools and insights needed to implement sustainable finance solutions in the student’s own context, and better understand how these strategies can positively impact their organisation’s long-term value gain. This module will also give them new perspectives on how businesses, banks, and insurers are shifting to more sustainable business models that offer positive returns for both their clients and society."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Implement sustainable finance solutions in the student's own context, applying tools and insights gained from the course",
              "Understand the positive impact of sustainable finance strategies on their organization's long-term value",
              "Gain new perspectives on how businesses, banks, and insurers are adopting more sustainable business models for positive returns",
              "Identify opportunities for creating positive societal impacts through sustainable finance practices"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Tools, Strategies and Trends in Sustainable Finance",
      "Technology, Innovation and Financing",
      "Trends in Sustainable Finance",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Shivam Agarwal — National University of Ireland Maynooth"
  },
  "urban-renewable-energy-decision-making-methodologies": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "As cities around the world continue to grow and become more populous, the need for sustainable and clean sources of energy is becoming increasingly important. One way that cities are addressing this need is by incorporating renewable energy technologies into their infrastructure. However, the adoption of renewable energy technologies in urban environments is not without challenges and requires effective decision-making processes to ensure that these technologies are integrated into urban infrastructure in a way that maximises their benefits and minimises their drawbacks. This MC builds upon the previous module on renewable energy technologies in urban contexts by providing an in-depth analysis of decision-making methodologies for the adoption of these technologies. Through a combination of lectures, discussions, case studies, and hands-on exercises, students will develop the skills and knowledge needed to make informed decisions about renewable energy technologies in urban environments. This MC aims to provide students with a comprehensive understanding of decision-making methodologies for the adoption of renewable energy technologies in urban contexts. The MC will cover a range of topics, including an overview of different decision-making technologies and methodologies, the identification of key decision variables and quantifiable factors, and an exploration of strategies for effectively integrating renewable energy technologies into urban infrastructure. Through a combination of lectures, discussions, case studies, and hands-on exercises, students will develop the skills and knowledge needed to make informed decisions about renewable energy technologies in urban environments. By the end of the MC, students will be able to analyse and evaluate the technical, social, environmental, and financial implications of using renewable energy technologies in cities, and to develop effective strategies for their implementation."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the principles and key concepts of decision-making methodologies for the adoption of renewable energy technologies in urban contexts",
              "Identify the key decision variables and quantifiable factors involved in the adoption of renewable energy technologies in urban environments",
              "Develop the skills and knowledge needed to analyse and evaluate the technical, social, environmental, and financial implications of using renewable energy technologies in cities",
              "Understand strategies for effectively integrating renewable energy technologies into the infrastructure of urban areas, and for involving key stakeholders and decision makers in the process"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "A basic understanding of the principles of energy production and consumption",
              "A familiarity with the different types of renewable energy technologies, such as solar, wind, and hydroelectric power",
              "Basic knowledge of urban planning and development"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Urban renewable energy",
      "Introduction to Multicriteria decision model (MCDM)",
      "Decision making methodologies for urban renewable energy",
      "Example application of MCDM used for urban renewable energy system decision"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Xiufeng Liu — Technical University of Denmark"
  },
  "introduction-to-industrial-organization": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The interactions between energy technology, industry structure, and government regulations are reshaping the energy industry and significantly affecting the emission reduction effort. Understanding the changes in energy industries needs the tools from industrial organization, which provides the theoretical foundations for producers and consumers’ behavior under different market structures, e.g., wholesale electricity markets as high-frequency auctions, vehicle markets as price competition in oligopoly markets, and energy distribution firms as regulated natural monopolies. Therefore, it is important to illustrate how ideas and tools from industrial organization can be used to create insights into the understanding of energy industries and regulatory policies. This MC presents the theoretical foundations of industrial organization, together with applications in energy industry. It focuses on how markets work, how firms compete, and how government regulates. Importantly, this MC helps students to analyze and interpret firms’ strategies and government’s regulations from a strategic point of view,based on game theory. It covers the topics such as market structure, market power, market conduct, price discrimination, price competition, and government regulations."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the concepts in measuring market structure and market power",
              "Understand the fundamental concepts related to monopoly",
              "Explain firms’ behaviours and strategies in oligopoly markets",
              "Analyse how government regulations could affect the market outcomes"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic knowledge on microeconomics"
          },
          {
            "type": "paragraph",
            "text": "Basic knowledge on energy markets"
          }
        ]
      }
    ],
    "modules": [
      "The concept of energy networks for industrial organisation",
      "Market structure and market power",
      "Price discrimination and monopoly",
      "Oligopoly market",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Xiaobing Zhang — Technical University of Denmark"
  },
  "how-sustainable-is-your-city": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Many cities have set decarbonisation targets i.e. carbon naturality by 2040. The decision making on a decarbonisation target is a political agenda, whereas the actual implementation and monitoring of progress is technical and needs actual analytic tools. This module aims to teach how cities can assess their decarbonisation target using sustainability indicators. The students will be taught the background for using indicators and be given an indicators framework with which they can compare how energy sustainable “their” city is compared to a perfect city. With this MC, learners will first learn the definition of sustainability, SDGs and use of indicators. The students will get an introduction to different indicator frameworks and be given a pre-selected framework to compare progress of sustainability in their city compared with a perfect city. They will learn tools and methods to understand how indicators become measurable. The students may work on assessing a city of their choice – and compare this with a perfect city."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the sustainable development goals",
              "Understand how to assess cities",
              "Understand how to apply an indicator framework on a specific city case"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic understanding of the concept of sustainable development"
          }
        ]
      }
    ],
    "modules": [
      "Sustainability in cities",
      "Using indicators to evaluate cities",
      "How sustainable is Copenhagen",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Per Sieverts Nielsen — Technical University of Denmark"
  },
  "investing-in-sustainability": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The fashion industry is one of the most wasteful consumer industries in the world. The global presence of a few industry giants is greatly impacting the competitive paradigm and has resulted in the creation of ‘fast fashion’ – a race to the bottom from an economic and environmental perspective. There is a growing need to address the industry’s unsustainable practices and remediate the damage it is causing to ensure its viability in Europe’s green future. Given the immediacy of climate action responses necessary to meet carbon reduction goals, the fashion industry must change quickly to maintain relevance in the new green paradigm. Digitalisation, renewable energies, and advanced manufacturing innovations hold the key to regaining balance in the fashion industry. The factors and elements that shape the fashion industry are examined in addition to the tools and mechanisms that can enable it to change. This module explores the factors that impact sustainability in the fashion industry. The fashion ecosystem and stakeholder competitive dynamics are examined to understand the various drivers within the industry. Through developing an understanding of existing fashion industry business models, we explore the factors that are driving sustainability-oriented change within the industry (e.g., circular economy principles; consumer awareness and demand; United Nation’s Sustainable Development Goals; carbon credits; etc.). Emergent technological advances, with the potential to radically alter fashion production, will also be explored; in addition to the ways such technologies can support carbon reduction within the fashion industry. Students will learn how to examine an industry through the lens of sustainability and gain an appreciation for the push and pull factors that lead to sustainable environmental change within a highly consumerised market."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "To learn about new product development projects, how to lead them and their typical life cycle",
              "An in-depth understanding of change projects in internal processes",
              "Management of multi-project environments as complex systems"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Investing in Sustainability",
      "Environmental, Social, and Governance (ESG) framework and investments",
      "Future and End of ESG",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Shivam Agarwal — National University of Ireland Maynooth"
  },
  "climate-risk-and-climate-investing": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Responsible Investors are increasingly paying more attention not only to the transition risk but also to physical risk, the financial losses that come from climate change (droughts, floods, storms, etc.), not from the adaptation of the economy to prevent these losses. These concerns go beyond looking for investment opportunities that meet environmental, social and governance (ESG) objectives, while enhancing the value of investing performance. In today’s business environment, it is, therefore, no longer sufficient for organisations to simply acknowledge global sustainability challenges like climate change, resource depletion, and inequality – they’re expected to lead the way through them. The Sustainable Finance MCs series will support the development of knowledge and skills around financial strategies that create value for society and invest in a sustainable future. The MC “Introduction to Sustainable Finance – Part 4” focuses on Climate Risk and Climate Investing. The MC examines the motivations behind Climate investing, by examining climate risks transmission channels to financial stability, and the challenges involved in integrating climate risk into existing investment processes. It is designed for practitioners or aspiring professionals across the financial services sector looking to improve their understanding of ESG issues. This course builds on an understanding of the fundamentals of investment management and offers the tools and insights needed to develop financial strategies that create value for society and invest in a sustainable future."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Appraise current problems and/or innovations at forefront of the field",
              "Consolidate complex knowledge from a variety of sources",
              "Assess the long-term impact of actions",
              "Develop informed and innovative solutions to complex industry issues"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Completion of Introduction to Sustainable Finance – Parts 1, 2 and 3"
          }
        ]
      }
    ],
    "modules": [
      "Climate Risk and Climate Investing",
      "Carbon Credits and Regulation Framework",
      "Climate Investing",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Shivam Agarwal — National University of Ireland Maynooth"
  },
  "energy-markets": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential will provide an introduction to the demand and supply balance, a description of the power market, day-ahead price, system marginal price, unit commitment problem, calculation of the variable cost of generation, the concept of merit order, a description of the natural gas market, pricing formulas, gas hubs, take-or-pay clauses, a description of the carbon market, marginal abatement cost curve concept, and the impact of carbon market on power generation."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to: Identify the interconnections among power, natural gas, and carbon markets Understand the main drivers influencing energy markets, estimate the system marginal price on a power market, and develop quantitative analyses for describing market trends."
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowledge of the main units of measures used in the energy field and basic understanding of the main definitions of macro-economic aggregations (e.g., GDP, value added, etc.)."
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Market Fundamentals",
      "Fundamentals of Power Market",
      "Fundamentals of Natural Gas Market",
      "Fundamentals of Carbon Market",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Vincenzo Bianco — Università degli Studi di Napoli Parthenope"
  },
  "data-analytics-for-the-energy-sector": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This module will provide an overview of the role of data analytics in the energy industry, including how data is collected, processed, and analysed to support decision making. Introduction to data analytics in the energy sector: This module will provide an overview of the role of data analytics in the energy industry, including how data is collected, processed, and analysed to support decision making. Energy data sources and systems: This module will explore the different types of data sources and systems used in the energy sector, including sensors, meters, and data platforms. Students will learn how to access and integrate data from these sources. Energy data visualisation and dashboarding: This module will introduce students to the use of data visualisation and dashboarding techniques to explore and communicate energy data. Students will learn how to create effective visualisations and dashboards using industry-standard tools. Energy data analysis and modelling: This module will cover the use of data analysis and modelling techniques to support decision making in the energy sector. Students will learn how to use statistical and predictive modelling methods to analyse energy data and make predictions about future energy demand and supply. Case studies in energy data analytics: In this module, students will apply the concepts and techniques learned in the previous modules to real-world case studies from the energy industry. Students will work in teams to analyse data and develop solutions to real-world problems facing the energy sector. Overall, this course will provide students with a comprehensive understanding of the role of data analytics in the energy sector and the skills and tools needed to analyse and use energy data effectively."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the role of data analytics in the energy industry and how it can be used to support decision making",
              "Identify the different types of data sources and systems used in the energy sector and know how to access and integrate data from these sources",
              "Use data visualisation and dashboarding techniques to explore and communicate energy data effectively",
              "Apply statistical and predictive modelling methods to analyse energy data and make predictions about future energy demand and supply",
              "Analyse real-world case studies from the energy industry and develop solutions to real-world problems using data analytics techniques",
              "Collaborate with other students to apply data analytics concepts and techniques to solve problems in the energy sector"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic knowledge of data concepts and techniques: Students should have a basic understanding of data concepts and techniques, such as data types, data sources, data cleaning, and data visualisation"
          },
          {
            "type": "paragraph",
            "text": "Familiarity with programming and statistical analysis: Students should have some experience with programming languages, such as Python or R, and statistical analysis tools, such as Excel or SPSS"
          },
          {
            "type": "paragraph",
            "text": "Basic knowledge of the energy industry: Students should have a general understanding of the energy industry and its challenges and opportunities"
          }
        ]
      }
    ],
    "modules": [
      "R Basics",
      "R Visualisations",
      "R Analysis 1",
      "R Analysis 2",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Fabiano Pallonetto — National University of Ireland Maynooth"
  },
  "energy-utilisation-and-storage": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To achieve the emission reduction targets set by the European Union, it is necessary to phase out fossil fuels and accelerate the energy transition towards an energy system based on renewable energy sources. Energy storage and active management of local resources play a key role in this transition to a carbon-neutral economy as critical tools to facilitate the integration of variable renewable energy sources. Therefore, it is essential to empower professionals with skills in energy storage technologies and demand-side management that help enhance the integration of renewable energy sources. The aim of this MC is to increase the awareness of the participants on the relevance of local energy resources management and storage capabilities as tools to accommodate higher levels of local generation based on variable renewable sources and, at the same time, to facilitate the accommodation of higher levels of demand arising, for example, form the electrification of the transportation sector. The possible double role of storage equipment, static batteries or electric vehicles, is challenging and, at the same time, provides many opportunities in the energy transition process."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Adequately characterize energy needs and availability, as well as optimization measures",
              "Discuss the multiple alternatives to supply the local energy needs",
              "Assess and evaluate alternative consumption patterns through demand-side management",
              "Evaluate the role of storage in meeting energy needs",
              "Characterize the alternative functions/roles of the storage facilities/equipment: energy and flexibility"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic notions of energy consumption and unit measures used in the energy field"
          }
        ]
      }
    ],
    "modules": [
      "Energy consumption and energy supply alternatives and availability in urban environments",
      "Local energy networks",
      "Electrification strategies: the main challenges",
      "Demand-side management",
      "Energy management algorithms",
      "Storage and EVs as flexibility, energy and ancillary services providers",
      "Energy storage business models"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Álvaro Gomes — University of Coimbra"
  },
  "introduction-to-sustainable-finance": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sustainable finance is a broad and evolving field that aims to align financial decision-making with environmental, social, and governance (ESG) considerations. It involves integrating sustainability principles into investment decisions, lending practices, and overall financial strategies. The goal of sustainable finance is to support projects and businesses that contribute positively to the environment and society while mitigating risks associated with unsustainable practices. Key components of sustainable finance include impact investing, which focuses on generating measurable social and environmental benefits alongside financial returns. Environmental and social risk assessments help investors and financial institutions evaluate the sustainability performance of companies and projects. Additionally, sustainable finance encourages the integration of ESG factors into corporate reporting and decision-making processes, fostering greater transparency and accountability. The MC “Introduction to Sustainable Finance” offers the tools and insights needed to develop financial strategies that create value for society and invest in a sustainable future. Students will learn about the pressures, trends, and opportunities in the current financial system. They will investigate the strategic business implications of social and environmental challenges and discover how best to plan through sustainable initiatives like impact investing, the integration of Environmental, Social, and Governance (ESG) investing, and positive screening."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the pressures, trends, and opportunities within the current financial system related to sustainable finance",
              "Analyse the strategic business implications of social and environmental challenges in the context of sustainable finance",
              "Develop financial strategies that create value for society and contribute to a sustainable future",
              "Explore sustainable initiatives like impact investing, ESG integration, and positive screening for responsible and impactful investment decisions"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic understanding of the global financial system and main definitions of macro-economic aggregation"
          }
        ]
      }
    ],
    "modules": [
      "Fundamentals of Sustainable Finance",
      "Financing Sustainability",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Emmanuel Kypraios — National University of Ireland Maynooth"
  },
  "energy-strategy-and-energy-transition": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Achieving the ambitious goal of carbon neutrality by 2050 will require not only a focus on energy efficiency to reduce current energy needs, but also a strong commitment to renewable energy sources. These goals will require profound changes in all sectors of society (e.g., industry, buildings, transportation, and agriculture) and in the energy policies that govern countries, thus creating several challenges that will need to be addressed. Nevertheless, unique opportunities will also be created that will lead to new services and business models. This course provides information on the technical and societal challenges and opportunities for a sustainable energy transition. The aim of this module is to provide fundamentals on new possible local business models including RES through enabling technologies. To do so, it will address technical innovations and methods to decarbonise the power generation sector, while analysing the effects and main challenges of a high proportion of renewable energy in the power system, such as security of supply, reliability, and resilience. Furthermore, non-technical innovations, such as social, markets, political, and regulatory, will also be addressed."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Characterise the technical possibilities for decarbonising the energy and end-user sectors",
              "Recognise and assess innovations that go beyond technological solutions to help with a sustainable energy transition",
              "Discuss the main challenges raised by the energy transition process, namely due to the massive dissemination of generation based on renewable sources and the increasing demand resulting from electrification of our societies",
              "Discuss the different tools and approaches to deal with the energy transition process"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Challenges and Methods to Decarbonise the energy production sector",
      "Energy Usage, with focus on how to decarbonise the end-use sectors",
      "Non-technological Innovations",
      "Renewable Power Systems",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Patrícia Pereira Silva — University of Coimbra"
  },
  "circular-economy-for-sustainable-cities": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A Circular economy is needed for improving resource efficiency and developing societies and companies towards sustainability. The concept has become popular over the past decade, among academics, policymakers and practitioners, in order to address sustainability challenges such as resource scarcity, environmental pollution, plastic waste, and the climate emergency in a strategic manner. The circular economy entails transforming production, supply chains, and business models from linear to circular, and transform waste and excess resources into valuable new materials and products. There is a need to explore ways for companies and societies to adopt circular principles and to develop concrete business cases based on those principles. The aim of the course is for the student to develop knowledge of how a transition towards a circular economy helps to meet the great sustainability challenges of our time. The student develops knowledge of and an understanding of basic environmental economics, different issues and policy instruments. Furthermore, the course shows the importance of a circular approach linked to both the private and public spheres and offers an understanding of design and effect of the policies and instruments that refer support and drive the transition to sustainability."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Identify and describe basic linear and circular economic concepts at the micro, meso and macro level as well as account for which control instruments are used for a sustainable economy",
              "Develop a deeper understanding of dynamics and complexity in the interaction between circularity and economic development",
              "Critically review academic research and argue for different forms of explanations about industrial change and company actions with particular focus on resource efficiency",
              "Analyse and discuss relevant policies and instruments for the circular economy"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to circular economy",
      "Circular strategies",
      "Circular economy in Europe",
      "Circular economy in companies",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Marie Mattsson — Halmstad University"
  },
  "sustainable-development-goals-for-cities": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Over the last decade multiple indicators to assess sustainability have been created. Indeed, the number of targets in the Sustainable Development Goals framework is 169. The EU Sustainable city assessment goals amount to at least another hundred. This module aims to teach sustainability with the focus on decarbonisation by assessing achievements of targets by use of indicators. The students will develop their own indicator framework to use for assessing the energy sustainability in a city of their own choice or a pre-selected city. The indicators will be based on all three pillars of sustainability, which address decarbonisation. With this MC, learners will first learn the definition of sustainability. The students will learn how to use indicators and in particular how to use indicators for assessing performance towards political decided targets. In addition, students will become familiar with the tools and methods to understand how indicators become measurable. The students will work on assessing a city of their choice – or use a pre-selected city."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand sustainable development indicators.",
              "Understand how to use SDIs.",
              "Understand how to apply SDI on a specific city case."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic understanding of the concept of sustainable development"
          }
        ]
      }
    ],
    "modules": [
      "UN Sustainable development goals (SDGs)",
      "SDG processes and SDG 7, 11, 12 and 13",
      "Using SDGs for sustainable development in cities",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Per Sieverts Nielsen — Technical University of Denmark"
  },
  "sustainable-business-models": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Skills needed for creating and analysing sustainable business models in general and sustainable business models for renewable energy in particular. The course focuses on knowledge about how organisations can work strategically and sustainably with issues related to business models and development of value. Included in the business models are the following parts: (i) value proposition, (ii) value creation and delivery, (iii) value capture and (iv) value intention."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand basic concepts related to sustainable business models",
              "Overall have knowledge about challenges (drivers, barriers) of business models for renewable energies",
              "Analyse and evaluate a sustainable business model"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Sustainable Business Models",
      "Global challenges and business models",
      "Business model canvas",
      "Barriers and challenges",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Pia Ulvenblad — Halmstad University"
  },
  "social-acceptance-of-technologies": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This module aims to assess the social dimension of sustainability by specifically focusing on the social acceptance of technology by society. The social dimension of sustainability is an area that needs to be explored, and with this MC we expect that learners will be enlightened about the one important social aspect of sustainable technological implementation. Before the diffusion of the technology, public engagement is very important to understand the barriers that consumers, investors, and policy maker might face. This model will teach about the techniques and strategies for acceptance of the technologies. With this MC, learners will first learn the definition of social acceptance and its importance for technology implementation and policy development. The three-pillar approach to social acceptance will be covered in MC. The pillars are socioeconomic acceptance, market acceptance, and community acceptance. A framework for quantifying social acceptance will also be presented. Quantified social acceptance will help decision-makers in a data-driven decision process."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the concept of social acceptance",
              "Understand the methods of public engagement for technology",
              "Understand the importance of social acceptance in decision making"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic understanding of climate change",
              "Basic knowledge of energy policies"
            ]
          }
        ]
      }
    ],
    "modules": [
      "The concept",
      "The theory",
      "The pillars",
      "The analysis and data",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Ramazan Sari — Technical University of Denmark"
  },
  "strategic-behaviour-in-energy-markets-options-and-games": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Since the 1990s, feed-in tariffs have been one of the most widely applied energy policies to stimulate renewable energy. Nevertheless, feed-in tariff schemes have been victims of their own success and have been criticised for leading to unreasonable and uncontrollable costs. Auctions have been proposed as an alternative to feed-in tariffs and are becoming an increasingly popular energy policy to promote renewable energy. The aim of auctions is to create more competition to reduce production costs. Thus, by fixing in advance the volume of energy that will be put up for auction, the public budget made available can be controlled in advance, which is not the case with an open window in the case of a feed-in tariff. In this context, various economics tools permit the assessment of the effect on an investor’s decision of increased competition under different market uncertainties. Concepts from games theory and auctions will be presented in this MC."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC will convey the following learning outcomes:"
          },
          {
            "type": "list",
            "items": [
              "Increased skills in using the energy economics toolbox and decision-making criteria",
              "Valuation of energy projects under competition, strategic behaviour and price uncertainty",
              "Develop critical thinking of complex market strategies with an options-games approach"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Interest in energy economics, renewable technology engineering, energy technology systems, mathematical models, optimisation"
          }
        ]
      }
    ],
    "modules": [
      "Fundamentals of renewable energy markets",
      "Auctions for renewable energy",
      "Theoretical modelling: games and options",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Oana Ionescu — Université Grenoble Alpes"
  },
  "management-of-innovation-projects": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Project management skills for managing and running innovation projects based on renewable energy systems is important. In the early stage of the renewable energy transition, or in the fuzzy front-end of the development, it is important to combine different skills and to build trust. Leadership and management provide the baseline when balancing between degrees of freedom, tasks and outcomes of the project. Compared to more traditional innovation projects, the focus on RES adds an extra element in to management of the innovation process. The course focuses on innovation from a project management perspective, more specifically new product development projects, projects for change in internal processes and multi project environments. Common to the planning and implementation of these three areas is that they contain high uncertainty and various influencing factors and stakeholders that have dependencies on each other."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The objectives of the course are:"
          },
          {
            "type": "list",
            "items": [
              "To learn about new product development projects, how to lead them and their typical life cycle",
              "An in-depth understanding of change projects in internal processes, and management of multi-project environments as complex systems"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Project Management Overview",
      "Pre-study and Planning",
      "Execution",
      "Closure",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Henrik Barth — Halmstad University"
  },
  "gender-mainstreaming-and-intersectionality": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There is a gender diversity and imbalance in the work force related to the energy sector and a need for a gender inclusive industry. This means to increase women’s participation in the transition to renewable energy systems. Research shows that diversity enhances innovation and creativity and thus there are needs for promoting diversity within the energy sector. The course focuses on gender mainstreaming and how to increase women’s participation in the energy sector. It also focuses on barriers and drivers for women participation and that these barriers can be linked to intersectionality aspects."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand basic concepts related to gender mainstreaming and intersectionality",
              "Understand the relation between social constructions and barriers for women",
              "Evaluate cases with both gender inclusive and gender exclusive behaviours and scenarios"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to gender equality",
      "Gender equality in society",
      "Intersectionality",
      "Gender/intersectionality and leadership",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Pia Ulvenblad — Halmstad University"
  },
  "decision-making-for-energy-projects-under-uncertainty": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC aims to introduce participants to theoretical aspects of dynamic optimisation and considers implications of real options theory to decision-making process. Applications will focus on problems in energy and environmental economics. Policy and regulation uncertainty and their impact on the investment decision and behaviour of investors will also be examined. More particularly, it will include elements related to:"
          },
          {
            "type": "list",
            "items": [
              "Classical approach of Net Present Value",
              "Modelling a decision-making process related to energy investments under uncertainty",
              "Solving for the optimal time to invest and the option value",
              "Practice through numerical illustration (i.e. Monte Carlo simulations in Excel, Matlab)"
            ]
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Among learning outcomes, we can cite:"
          },
          {
            "type": "list",
            "items": [
              "Increased skills on modelling in energy economics",
              "Model a decision-making process related to energy investments under uncertainty",
              "Contrast different investment strategies in uncertain context in order to choose the optimal one",
              "Apply conceptual and analytical economic models to real life problems"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Interest in energy economics, energy technology systems, mathematical models, optimisation"
          }
        ]
      }
    ],
    "modules": [
      "Main features of investments in the energy field",
      "Uncertainty decision-making and real options",
      "Minimum energy consumption standards. Passivhaus",
      "Introduction to some real options techniques: Binomial tree, Dynamic Programming",
      "Real options in energy projects",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Oana Ionescu — Université Grenoble Alpes"
  },
  "energy-justice-and-poverty": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This module aims to assess the social dimension of sustainability by specifically focusing on the poverty and justice issues of policy and technology implementations. Economy, Environment and Society are the three pillars of the sustainability. The Economy and Environment dimension has relatively well-developed assessment tools. However, the social dimension is still developing in terms of quantifiable variables and assessment tools. Thus, the social dimension of sustainability is an area that needs to be explored, and with this MC we expect that learners will be enlightened about the one important social aspect of sustainable technological implementation. With this MC, learners will first learn the definition of energy poverty in different countries. There are many definitions, and there is no consensus on one single definition. The measures of energy poverty will be an additional topic to be covered. Linked to energy poverty, the MC will cover procedural, distributional, and recognition justice. The importance of these two main concepts on policy development and technology uptake will also be covered."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the concept of the energy poverty",
              "Understand the energy poverty measurements",
              "Procedural justice",
              "Distributional justice",
              "Recognition justice",
              "Understand the policy development by using energy poverty and justice concepts"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic understanding of climate change",
              "Basic knowledge about energy policies"
            ]
          }
        ]
      }
    ],
    "modules": [
      "The concept",
      "Energy justice cases and analysis",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Ramazan Sari — Technical University of Denmark"
  },
  "energy-policy": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Given the goal of achieving carbon neutrality by 2050 and the current energy crisis plaguing the European Union, defining appropriate energy policies to address current challenges and achieve the established targets is increasingly essential. These policies should address in a concerted manner all economic sectors and parts of society, including for example industry, buildings, and agriculture, as all will play an important role. The aim of this module is to provide an understanding of the development of EU energy policy, namely the climate and RES directives, and the current challenges to meeting the 2050 climate neutrality objective. The objectives of this micro-credential are to acquaint students with energy policy and economic concepts, both in analytical and modelling terms; promote research skills in frontier areas as \"economy-business-engineering\"; promote awareness of policy and decision-making processes affecting energy management and development in both government and industry, including the economic, policy, regulatory, and institutional drivers that shape management decisions."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand how energy and climate change policies are designed and implemented",
              "Understand the importance of regulation",
              "Understand climate change, ensuring economic development, fighting inequality, managing the rapid transition to renewable energy",
              "Develop policy analyses and guidelines in a wide range of energy-related areas"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic microeconomics"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Energy Policy and Climate Governance of the EU",
      "Electricity Market Reforms and Competition in the Electricity Industry",
      "Renewable Energy: Policy Incentives",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Patrícia Pereira Silva — University of Coimbra"
  },
  "enacting-a-circular-economy": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In order to enact a circular economy, and move towards sustainable energy usage, it is critical that we have an understanding of and can critically engage with environmental world views. Furthermore, the development of multi-stakeholder partnerships with regards to renewable energy materials and the development of new policy and legislation in this sphere is imperative. The Energy and the Circular Economy MC will support the development of knowledge and skills around the concept of the circular economy, specifically focusing on sustainable energy usage. This MC will introduce the skills and attributes required for critical reflection and action on creating a circular economy with sustainable energy use. Learners will be introduced to the concept of environmental world views, and the impact that these can have on collective action. Through dialogic focus groups, thought experiments, and case studies, learners will critically reflect on their own personal views, in addition to engaging with those of collective groups. Students will learn about the current initiatives, opportunities and challenges associated with enacting a circular economy, and how best to plan for multi-stakeholder involvement in energy-related initiatives."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Contextualise and reflect on environmental world views",
              "comprehend and critically engage with the role of energy use in the circular economy",
              "Critically engage with current initiatives regarding energy usage for a circular economy",
              "Contextualise theory and relate this to varying societal groups’ ability",
              "Motivation and opportunity to enact a circular economy with sustainable energy use and carry out stakeholder mapping and circular economy project planning activities"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamental concepts",
      "Introduction to the Circular Economy and Sustainable Energy Use",
      "Sustainable Fashion",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Fabiano Pallonetto — National University of Ireland Maynooth"
  },
  "analysis-of-energy-consumption": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The present MC will support the development of knowledge and skills to analyse the rationale behind energy consumption of a given territorial energy system (e.g., at country level, regional level, city level, urban district level, etc.). The analysis of the consumption trend is relevant to assess the effectiveness of implemented energy policies as well as to understand how the energy consumption structure can evolve in the future. A mix of technical and socio-economic variables will be considered to develop adequate quantitative analyses in order to suggest informed decisions to policy makers or companies based on an analytical framework. The MC “Analysis of Energy Consumption” will provide an overview of analytical methods for analysing the trend of energy consumption from a system of any territorial extension (e.g., country level, regional level, city level, etc.). A mix of simple (e.g., intensity estimation, growth rates, etc.) and more complex (e.g., weather adjustment, decomposition analysis, etc.) analytical frameworks will be introduced. The aim is to interpret the time trend of energy consumption with reference to total consumption or to a specific source (e.g., electricity consumption, natural gas consumption, etc.). Technical and socio-economic variables will be employed for the definition of significant indexes and KPIs to explain the consumption trend."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Identify the components influencing the energy consumption",
              "Calculate relevant KPIs for the analysis of energy consumption",
              "Compare the main features of energy consumption trend for different systems (e.g., countries, cities, etc.)",
              "Recognize the effect of different energy policies on the consumption trend"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowledge of the main units of measures used in the energy field and basic understanding of the main definitions of macro-economic aggregations (e.g., GDP, value added, etc.)."
          }
        ]
      }
    ],
    "modules": [
      "Introduction to the Analysis of Energy Consumption",
      "Indicators for the analysis of energy Consumption",
      "Decomposition of Energy Consumption",
      "Practical Modeling",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Vincenzo Bianco — Università degli Studi di Napoli Parthenope"
  },
  "energy-management-and-smart-communities": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To facilitate the dissemination of local generation based on variable renewable energy sources and the electrification of our societies, two pillars of the energy transition, the active management of all available resources is critical. Community energy production should preferably be used locally, requiring local management and energy transactions. As resource management facilitates the dissemination of local generation, a deep understanding of existing dynamics between generation and consumption at local level and a thorough knowledge of its optimisation issues are required. Some aggregation at the resource management level enormously benefits the dissemination of variable renewable sources and the local utilisation of local generation. Concepts such as energy communities and microgrids are at stake, and tools such as demand-side management activities will play a critical role. Energy communities will reshape the traditional electricity system, and the active participation of citizens will accelerate the energy transition process. This module aims to increase the participant’s awareness of the relevance of local/community energy generation and the usefulness of active management of energy resources. Different forms of aggregation and sharing local generation will be discussed. Participants will acquire in-depth knowledge of community energy production and sharing challenges. The legal framework will be debated, and the role of energy communities, nano/microgrids and virtual-power plants in the energy transition process will be discussed."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be:"
          },
          {
            "type": "list",
            "items": [
              "Able to clearly understand the role of dispersed generation in the energy transition process and the need for active management of different resources (generating units, controllable demand, storage).",
              "Very familiar with the concept, objectives and barriers of demand-side management.",
              "Able to understand the concepts and the roles of energy communities, microgrids and virtual power plants in the overall transition process.",
              "Aware of the main objectives, constraints, technical requirements and consumer preferences that are at stake in energy management activities at different aggregation levels: individual consumers, buildings, communities, and cities/regions.",
              "Aware of the main challenges, barriers and drivers for local transactions of energy."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic energy concepts"
            ]
          }
        ]
      }
    ],
    "modules": [
      "DSM: concept, evolution, barriers and cost-benefit analysis",
      "DSM: a cost-effectiveness analysis",
      "Energy communities, microgrids, and virtual power plants: definition of concepts, legal framework, drivers and challenges",
      "Resources management and Local Transactions",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Álvaro Gomes — University of Coimbra"
  },
  "decarbonisation-of-thermal-energy": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Space heating, cooling and hot water are essential end-uses contributing to cities' global final energy consumption. This MC will focus on decarbonising these energy demands, mainly through electrification. Learners will understand the relevance of thermal demand for cities and the climate goals that the EU Green Deal established on this topic. First, we will assess the current state of the existing technology employed in the cities to face the issue. Then, we will explore the alternatives available to decarbonise the thermal demand in urban areas. The MC will focus on decarbonising thermal energy demands, mainly through electrification. First, it will provide an overview of the relevance of thermal energy in the cities' carbon footprint. Next, we will highlight this sector's EU Green Deal climate targets. The subsequent topic will assess the existing thermal energy systems for heating, cooling and Domestic Hot Water (DHW) in European cities. Ultimately, the MC will provide the skills for designing alternative technologies for achieving a carbon-neutral city. These alternatives involve solar collectors for DHW, heat pumps for heating and cooling, biomass boilers and hybrid systems, including storage."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the relevance and challenges of decarbonising urban thermal demands",
              "Size solar DHW installations",
              "Size heat pumps installations for residential heating and cooling",
              "Size biomass boilers at a residential scale",
              "Design basic hybrid systems involving storage"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following prerequisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on thermodynamics, heat transfer and hydraulics at EQF 4-5 level"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Concept and impact of thermal energy systems in an urban environment",
      "Alternative heat pump technologies for residential heating, cooling and DHW",
      "Solar energy systems to decarbonise DHW thermal energy demand in the residential sector",
      "Alternative technologies to decarbonise thermal energy systems in cities",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Carla Montagud — Universitat Politècnica de València"
  },
  "small-scale-wind-power": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the future electric grid, customers might get extra income by agreeing to sometimes be disconnected. In this context, small-scale wind power may be complementary when a delimited urban area or a building is designed for islanding operation, typically in combination with solar PV generation and battery storage. However, successful implementation requires knowledge of the wind resource and production estimates, knowledge about key aspects of the different small-scale wind turbine concepts, and maintenance considerations. The course introduces different concepts for small-scale wind turbines (vertical-axis wind turbines and horizontal-axis wind turbines), the principles of the energy conversion in these devices, how different online tools can be used to estimate the production at a location, implications for the local environment (for example noise and vibrations), and economic considerations. System robustness in combination with other PV generation is also briefly covered."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Describe the energy conversion in relevant concepts for small-scale wind turbines",
              "Evaluate the performance of a wind turbine with the help of the power curve and online wind resource characteristics",
              "Explain how small-scale wind turbines affect the local environment",
              "Judge the system value of adding wind generation in different contexts"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Wind power basics",
      "Turbine technology",
      "System considerations",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Fredric Ottermo — Halmstad University"
  },
  "biogas-systems-for-climate-transition": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Biogas can be produced from a variety of waste substrates including household waste, sewage sludge and industrial organic waste. Biogas systems benefit society by increasing self-sufficiency of energy, mitigating climate change, provide the transport sector with a renewable fuel and also by producing a digestate (fertilizer) that can substitute for mineral fertilizers. There is a need for knowledge and experience in order to explore this energy system and how it can benefit societies. The course introduces the underlying microbiological processes that enable the oxygen-free digestion process and how different substrates, and varying parameters affect the production of biogas. In the next step, the different processes and digestion systems are described and discussed. Further into the course students will study different types of application options for biogas and digestion residues. Emphasis is placed on analyses of the environmental and economic benefits of biogas systems. A practical course element may occur, where the students get the opportunity to participate in an excursion to biogas plants."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should be able to:"
          },
          {
            "type": "list",
            "items": [
              "Describe different types of oxygen-free digestion systems and the most common constituent components in these, as well as being able to describe the most likely applications for these technologies",
              "Understand the most important environmental issues with respect to the digestion process, biogas and the residue, as well as being able to clarify the meaning of these in relation to environmental protection issues",
              "Explain the different areas of use for biogas. From given conditions be able to justify which areas of use bring the greatest profit with a perspective on sustainable development",
              "Evaluate how biogas technology can contribute to a long-term sustainable development"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to biogas",
      "Biogas market",
      "Biogas in circular economy",
      "Biogas in Europe",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Marie Mattsson — Halmstad University"
  },
  "energy-policy-and-flexible-technologies": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC aims to address the economy of flexible technology integration. Flexible technologies such as electric vehicles, storage and decentralised renewable energy need a specific distribution network to be deployed by new investments or by modernising existing networks. The MC proposes to assess the theoretical business model for coordinating investments in network and flexible technologies. More particularly, it will include elements related to:"
          },
          {
            "type": "list",
            "items": [
              "Distribution network investments",
              "Economy of flexible technologies",
              "Business models for flexible technologies",
              "Network and flexible technology investment coordination"
            ]
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Among learning outcomes, we can cite:"
          },
          {
            "type": "list",
            "items": [
              "Increased skills on flexible technology",
              "Understand the business model of efficient coordination of the investments linked to flexible technologies"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Interest in energy economics, flexible technology, electricity actors’ business models"
          }
        ]
      }
    ],
    "modules": [
      "Study of the thermal performance of the buildings",
      "Regulation of network monopolies",
      "Energy policy of smart grid",
      "Network integration of flexible technology",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Haikel Khalfallah — Université Grenoble Alpes"
  },
  "case-studies-in-energy-management": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The present MC will support the development of knowledge and skills to solve practical multidisciplinary problems in Energy Management. The application of quantitative technical and economic methodologies is paramount in the development of business cases supporting the investment process with specific reference to the energy field (e.g., energy efficiency, RES development, etc.). This MC provides practical insight to develop a quantitative decision-making framework supporting energy investments. The MC “Case Studies in Energy Management” will combine technical and financial techniques for developing quantitative models for the development of business cases. Five cases will be illustrated and commented during this MC. The aim is to provide a practical applicable framework to develop independent evaluations with specific focus on energy efficiency and RES investments. Spreadsheet based models will be introduced to develop the necessary calculations. The concepts of sensitivity and scenario analyses will be also introduced."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Illustrate the logic for defining techno-economic models",
              "Develop quantitative models for the development of energy-based business cases",
              "Analyse different business cases based on technical and financial indicators",
              "Propose quantitative conclusions"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowledge of the main units of measures used in the energy field, fundamentals of finance, fundamentals of energy concepts (e.g., efficiency)."
          }
        ]
      }
    ],
    "modules": [
      "Energy, Environmental and Economic Analysis of the Cold Ironing for Cruise Ships",
      "Evaluation of Energy Efficiency Measures in Buildings",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Vincenzo Bianco — Università degli Studi di Napoli Parthenope"
  },
  "basics-of-energy-efficiency": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The micro-credential allows to introduce the importance of energy efficiency in today's world, emphasizing its role in reducing energy costs, environmental impact, and promoting sustainability. It provides context by discussing global energy consumption trends and the urgency of mitigating climate change. It equips participants to readily apply energy-saving practices and become advocates for change, empowering them to play a role in creating a more sustainable future. A non-technical overview of energy efficiency is presented, highlighting its relevance in daily life, from homes to businesses. The economic and environmental benefits of energy efficiency are explored. How energy efficiency is a key aspect of responsible and sustainable resource management is emphasized."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the importance of energy efficiency and its critical role in reducing energy costs, mitigating environmental impact, and promoting sustainability.",
              "Examine global energy consumption trends and recognize the urgency of adopting energy efficiency practices to combat climate change.",
              "Identify energy-saving practices that can be implemented in daily life, both in residential and commercial settings.",
              "Explore the economic and environmental benefits of energy efficiency, including cost savings and reduced ecological footprint."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics of mathematics and physics."
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Energy Efficiency",
      "Energy Efficiency in Buildings",
      "Energy Efficiency in Industry and Transports",
      "Understanding the Impact of Energy Efficiency Measures",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Sergio Nardini — UNICAMP"
  },
  "environmental-social-governance-finance": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "One of the new stakeholders in the sustainability world is finance. Big banks, investment funds, multilateral financial institutions are setting up products and procedures to capture their clients’ funds and to channel them to ESG investments. This is why it is necessary to understand how these flows work and operate and how, quite often, are mismanaged, ending up in a “greenwashing” stalemate, a condition that investors, companies and professionals want to avoid. This course is designed for investment practitioners who want to learn more about how to analyse and integrate material Economic Social Governance factors into their day-to-day roles. It is suitable for anyone working in front or back offices and adjacent roles — including sales and distribution, wealth management, product development, financial advice, consulting, risk — as well as anyone looking to improve their understanding of Economic Social Governance issues briefly guide the student in the history of ESG Finance."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Describe key environmental, social, and governance issues",
              "Explain how stakeholders influence corporate Economic Social Governance performance",
              "Analyse ESG risks and opportunities",
              "Assess ESG company performance using publicly available information"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Fundamental Concepts",
      "Greenwhasing",
      "Institutional Investors",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Michele Russo — EPTA"
  },
  "green-infrastructure-finance": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The International Energy Agency (IEA) states that to reduce energy-related CO2 emissions by half by 2050, an extra $46 trillion in investments in energy supply and use is required compared to the business-as-usual scenario. This necessitates additional investments of $750 billion annually by 2030 and even higher investments exceeding $1.6 trillion per year from 2030 to 2050. This course explores the financial and economic aspects of sustainable infrastructure, emphasizing the critical role of green investments in addressing climate change. Participants will learn about sustainable finance instruments, risk assessment, regulatory frameworks, and impact assessment for green projects. Through a comprehensive financial framework, the course provides insights into planning, evaluating, and financing green infrastructure projects, aligning them with economic policies and sustainable principles to support a low-carbon future."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the fundamentals of green infrastructure and its role in sustainability.",
              "Evaluate various financing mechanisms and investment strategies for green projects.",
              "Analyse and mitigate risks associated with green infrastructure investments.",
              "Understand regulatory frameworks, incentives and policy."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics of economics, finance and mathematics"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Green Infrastructure",
      "Investments and Instruments",
      "Miscellaneous Financing",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Dr. Shivam Agarwal — NUIM"
  },
  "decision-making-towards-a-sustainable-city": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Buildings are responsible for approximately 40% of the EU’s energy consumption. Almost 85% of the EU’s building stock was built before 2001 and will stand till 2050. Thus, the decision-making process and the involvement of every citizen in developing sustainable technologies and solutions based on energy data optimal solutions are critical. This MC provides students with the knowledge and skills necessary for understanding different levels of decision-making in renovations of buildings and how the scale can affect the city's sustainability at large. Learners will be introduced to the state-of-the-art renovation in Europe, considering the differences in climatic zones and countries with different approaches and levels of decision-making towards the renovation, and will be equipped with knowledge in renovation ecosystems. Learners will be able to assess how decision-making levels impact the sustainability of houses, neighbourhoods and city at large, what the risks are and how this process engages citizens and increases their social responsibility"
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Analyse the impact of buildings on energy consumption, with a specific focus on the European context, where aging infrastructure contributes significantly to energy demand.",
              "Examine the multi-level decision-making processes involved in building renovations and how these decisions impact sustainability at the house, neighbourhood, and city levels.",
              "Evaluate the development of an ecosystem for building renovation, including the integration of renewable energy sources and sustainable technologies.",
              "Develop skills in assessing risks and outcomes associated with different levels of decision-making for sustainable renovations.",
              "Recognize the importance of citizen engagement in sustainable urban development."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic knowledge of the building energy sector."
          }
        ]
      }
    ],
    "modules": [
      "Understanding of Renovation",
      "Renovation Decision Making Peculiarities",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Ramūnas Gatautis, Rimantas Bakas, Rolandas Urbonas — LEI"
  },
  "life-cycle-analysis-in-construction": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In a world where sustainability matters more than ever, this program offers a simplified, non-technical exploration of energy efficiency that is suitable for individuals from diverse backgrounds. Everyday relevance will be highlighted, such as reducing utility costs, improving environmental responsibility, and fostering sustainability. This program equips participants to readily apply energy-saving practices and become advocates for change, empowering them to play a role in creating a more sustainable future. A non-technical overview of energy efficiency is presented, highlighting its relevance in daily life, from homes to businesses. The economic and environmental benefits of energy efficiency are explored. How energy efficiency is a key aspect of responsible and sustainable resource management is emphasized."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the Fundamentals: Grasp the basic principles of energy efficiency and its importance in conserving energy resources.",
              "Identify Energy Inefficiencies: Recognize common areas of energy wastage in buildings, appliances, and industrial processes.",
              "Implement Energy-Saving Practices: Learn practical strategies to reduce energy consumption in everyday life and within various settings.",
              "Analyze Cost Savings: Understand how energy efficiency can lead to economic savings for individuals and organizations.",
              "Promote Energy Efficiency: Develop the skills to advocate for energy-efficient practices in personal and professional contexts."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics of mathematics and physics."
          }
        ]
      }
    ],
    "modules": [
      "Introduction",
      "The Environmental impact of Building Materials",
      "Life Cycle Assessment (LCA) and Sustainable Building Materials",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Inês Ricardo, Lecturer Tugba Atatoprak — CECOLAB"
  },
  "urban-metabolism-strategies": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Urban metabolism and urban mine strategies are considered essential strategies to reduce environmental impact of human activities. This MC will lead the learners to the understanding of the complex meaning of waste and its many aspects, starting from the fundamental waste framework directive (2008/98/EC) and its new release. This is an essential starting point for understanding potential waste recovery strategies, particularly solid and construction and demolition waste at the urban level. We will explore the different approaches to valorise waste by reducing the consumption of raw materials, also by contributing to the reduction of the energy consumption (by considering that already embedded in pre-existing materials) required for their transformation. The MC is also suitable for learners with no or limited technical background, who want to start acquiring new skills in the energy sector. The MC will introduce the concept of waste at the European level and the recently introduced changes in the definition of end-of-waste. The European classification of waste and the procedures for obtaining an end-of-waste classification are then presented. Methods for assessing the environmental impacts associated with the generation of construction and demolition waste are provided, followed by a description of the main material and waste streams at the urban scale. Also, a general framework on energy consumption and CO2 emission in production process of buildings materials will be provided. Recurrent urban metabolism and mining strategies are then provided. Students will then be introduced to the various methods of carrying out a pre-demolition audit of an existing building to maximise the value and reuse of existing materials."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants should:"
          },
          {
            "type": "list",
            "items": [
              "Have a clear understanding of solid waste management, particularly construction and demolition waste",
              "Be able to choose between building materials and components with recycled content or virgin resources",
              "Be able to map the urban settlement, considering buildings as urban mines and distinguishing between different residual materials to be valorised",
              "Have the knowledge of the concept of sustainability and environmental impact in relation to the construction sector"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamental concepts",
      "Technical and natural metabolisms",
      "Energies and materials",
      "Data and waste management",
      "Waste valorisation",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor A. Monsù, Professor S. Pulina — University of Sassari"
  },
  "digital-payments-and-smart-city-platforms": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The European Union is committed to supporting the development of Smart Cities, where the use of digital solutions makes traditional networks and services more efficient for the benefit of its inhabitants and businesses. Among all aspects involved in the development of smart cities, the transformation of an existing payment framework into smart payment plays a pivotal role in establishing innovative financing models and schemes. The inclusion of various digital payment models into the payment ecosystem across a variety of transactions between citizens, businesses and public institutions can act as facilitator for financial inclusions, transparency and new business opportunities across different sectors – such as, energy and water utilities, urban mobility, education, social services, healthcare, communities of citizens, taxes and fees, etc. This MC will introduce the learner to the most innovative smart payment schemes and services in relation to smart cities and the arising new business and market opportunities. The MC is also suitable for learners with no or limited financial or banking background, who want to acquire new skills and competence on payment schemes and financial services. This micro-credential is aimed at providing a general understanding on digital payment frameworks and their role in smart cities and communities. Since payments are a significant feature in everyday life, featuring the majority of basic services offered to citizens and businesses, they form the core of the economic activity, from business procurements to salaries payment, consumer spending, tax collection and public services. The MC will introduce the learner to the most important smart payment tools currently available and the new innovation brought by digitalisation. Methods to evaluate the digital payment readiness of a city will be introduced and discussed, together with the most important internal and external challenges faced by smart cities in developing and implementing smart payments. Finally, practical case studies and worldwide best practices will be discussed and analysed."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, the learner:"
          },
          {
            "type": "list",
            "items": [
              "Will understand the role of smart payment schemes in smart cities",
              "Will be able to identify and select the different payment methods and models",
              "Will have the knowledge of the new market and business opportunities related to smart payments"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No prerequisites"
          }
        ]
      }
    ],
    "modules": [
      "Fundamental concepts",
      "Implementing Digital Payment in Smart Cities",
      "Best practices in the world",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Dr. Francesco Chiari — University of Sassari"
  },
  "introduction-to-renewable-energies": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowing the fundamentals of renewable energy sources (RES) is an essential step towards understanding RES-based technologies and their potential applications. This MC will introduce the learners to the vast world of renewable energy systems, from the main concepts and definitions to the most recent technologies developed and their applications in different sectors. We will explore the different types of RES – from solar and wind energies to geothermal, hydroelectric and biomass technologies – from both theoretical and practical points of view. Specific case studies will be developed and discussed, with particular attention to the integration of RES technologies in urban areas. This micro-credential is aimed at providing a general understanding of renewable energy sources by discussing the different technologies and applications. The MC will start by introducing the learners to several basic definitions and concepts of the following RES: solar, wind, geothermal, hydroelectric and biomass. The technologies available, practical applications and design examples will be introduced and discussed for each RES. Special attention will be given to RES integration in urban context aimed at supporting the reduction of fossil-fuel consumptions and the sustainable transition of cities."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, the learner:"
          },
          {
            "type": "list",
            "items": [
              "Will have a clear understanding of the definition and classification of renewable energy",
              "Will have the knowledge of the main features of solar, hydro, wind, geothermal and biomass sources",
              "Will be able to characterise the different RES technologies depending on the application"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level",
              "MC on introduction on energy systems"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamental concepts",
      "Solar Energy",
      "Geothermal energy and biomass",
      "Wind energy and hydropower",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Mattia De Rosa — University of Sassari"
  },
  "fundamentals-of-energy-systems": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The acquisition of a general knowledge on the main physical principles of thermodynamics and heat transfer is fundamental in order to be able to analyse and evaluate renewable technologies and energy efficiency solutions. The learners will be introduced to the basic concepts and definitions to form a solid and sound foundation of the principles of thermodynamics and heat transfer, to support the comprehension of the physical mechanism occurring in energy technologies and systems. Although the topic of this MC is intrinsically technical, its general approach makes it suitable also for students with a limited STEM background. This micro-credential is aimed at providing a general competence on the main concepts of thermodynamics and heat transfer. This MC will provide a sound foundation on thermodynamics and heat transfer principles, through the identification of the specific vocabulary and precise definitions of the basic concepts – such as units system, equilibrium, properties, process and cycle, etc. The energy transfer mechanism, such as heat transfer and work, and the concept of efficiency will be discussed in relation to the energy conservation principle, with the support of examples and exercises. Specific case studies related to renewable energy technologies and the building sector will be developed and discussed to transfer the theoretical knowledge acquired into practice."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Will acquire the knowledge of the general language used in thermodynamics and heat transfer",
              "Will know the main concepts of energy, process efficiency, properties of matter, energy balance, unit measures and heat transfer mechanisms",
              "Will be able to identify and quantify the energy flows characterising a specific process and its efficiency"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basics on mathematics and physics at EQF 4-5 level."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamental concepts",
      "Energy systems: demands and production",
      "Sustainability and security of supply",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Mattia De Rosa — University of Sassari"
  },
  "understanding-critical-raw-materials": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Acquiring a general knowledge of the importance of Critical Raw Materials is of paramount importance in understanding what is the impact of material supply in the manufacture of high-tech products. This MC, created by University of Sassari, in collaboration with Università degli Studi di Enna Kore, will introduce the importance of CRMs in Europe, the purpose of the CRMs list and what are the main challenges related to this topic. We will present the role of CRMs in the manufacturing processes and the strategies used by the EU to address the raw materials challenges. The MC is suitable for learners with none or limited technical background, who want to start acquiring new skills in the materials science and technology. This MC is an introductory guide to the Critical Raw Materials (CRMs) list created by the European Community. The list contains a group of raw materials, mostly minerals, that are strategic to the EU economy and are at risk of not being adequately supplied. The MC outlines the motivations of the EU’s CRMs list and methodology used to set the list and it will introduce the learners to the main CRMs groups in the EU economy, with a general description of their chemo-physical properties. Then, a general background on the application of CRMs in industrial application, with a special focus on renewable energies technologies, will be provided. Finally some case studies about the importance of CRMs in the manufacture of high-tech products will be presented."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, the learner:"
          },
          {
            "type": "list",
            "items": [
              "Has a clear understanding on the definition and role of CRMs",
              "Is able to browse EU documents about CRMs",
              "Understands the challenge of CRMs in Europe",
              "Knows the main applications of CRMs"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics on mathematics, physics and general chemistry at EQF 5"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to CRMs: definitions and role of CRMs in EU",
      "Purpose of the list of CRMs: main materials group and classifications",
      "Chemo-physical features of the main classes of CRMs",
      "Case studies of CRMs applications with a focus on energy-related applications"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor G. Catalanotti, L. Malfatti — University of Sassari"
  },
  "info-course-on-energy-efficiency-in-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This information course introduces the fundamental concepts of energy efficiency in buildings and highlights how individuals can contribute to a more sustainable and climate-friendly future. Buildings account for a large share of energy use and greenhouse gas emissions, making them one of the key areas where positive change can have a real impact. This course helps participants understand how energy is consumed in buildings, what measures can reduce consumption, and how these actions benefit both the environment and everyday life. Participants will explore topics such as climate change and pollution, energy-saving practices, net-zero energy buildings, renewable energy solutions, and smart building technologies. Social engagement and financing opportunities are also discussed to show how communities and individuals can take part in the energy transition. It aims to raise awareness and provide practical information to encourage people to make more informed, sustainable choices for their homes and communities."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand how and why buildings consume energy, and why managing energy use is essential.",
              "Recognize the environmental impacts of energy consumption, including climate change, pollution, and water use.",
              "Explain the main benefits of an energy-efficient home, such as reduced bills, improved comfort, and increased property value.",
              "Identify simple energy efficiency strategies that can be applied at home (insulation, efficient lighting, smart controls, etc.).",
              "Describe what net-zero energy buildings are and why they are key to a sustainable future.",
              "Understand how renewable energy technologies (solar, geothermal, biomass) can reduce dependence on fossil fuels.",
              "Explore how smart buildings and interconnected systems can optimize energy use and improve convenience.",
              "Appreciate the social aspects of energy efficiency, including engagement, energy communities, and collective action.",
              "Identify available financing opportunities that can support energy renovations and retrofitting projects."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Energy Use and the Environment",
      "Energy Efficiency and Renewable Solutions",
      "Smart and Connected Buildings",
      "Social and Financial Dimensions"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Janina Alvarez, Irini Ntavlourou — INCOMA and EELI"
  },
  "business-model-for-energy-efficiency-in-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential addresses the critical link between energy efficiency in buildings and financial innovation, recognizing that energy solutions require not just technological advancement but also viable financial strategies. This course, designed to bridge the gap between technical expertise and financial acumen in the field of energy efficiency in buildings, targets professionals from both technical and business backgrounds and equips learners with knowledge on cutting-edge financial instruments and business models specifically designed to support energy efficiency projects and unlock private investments. Participants will learn to leverage tools such as grants, on-bill schemes, on-tax schemes, green bonds, energy performance contracts, energy service contracts, and other innovative tools to make energy projects viable and appealing."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Identify the main financial instruments and business models related to the energy efficiency of buildings",
              "Assess the suitability of the forementioned financial instruments",
              "Find synergies and select between the financial instruments"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Introduction",
      "On-Bill and On-Tax Financial Schemes",
      "Energy Performance Contracting",
      "Green Debt-From Green Mortgages to Green Loans",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Pablo Baigorria Kobylinski, José María Arejola — CREARA"
  },
  "probabilistic-approach-for-energy-efficiency-evaluation": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Probabilistic Approach for the Evaluation of Energy Efficiency Measures MC is designed to equip professionals with the skills and knowledge needed to address the critical challenges of energy efficiency and financial analysis within the context of building sustainability. In an age marked by environmental concerns and the need for cost-effective energy solutions, this MC offers a comprehensive understanding of how to evaluate and implement energy-saving measures in buildings. Learners will delve into the core principles of probabilistic modelling, data analysis, and financial evaluation, gaining practical insights into assessing the impact of energy efficiency measures while accounting for uncertainties in real-world scenarios. This MC empowers individuals to make informed, data-driven decisions regarding the implementation of energy-saving strategies in buildings."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Recall key concepts and principles related to energy efficiency measures in buildings.",
              "Explain the probabilistic approach for evaluating energy efficiency measures.",
              "Describe the relationship between energy conservation and financial sustainability.",
              "Apply probabilistic modelling techniques to analyse energy efficiency measures.",
              "Evaluate the potential impact and risks associated with energy efficiency strategies within a probabilistic framework."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowledge of energy efficiency of buildings and energy auditing"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to the Evaluation of Energy Efficiency Measures",
      "The Energy Renovation Tool - A practial approach for Deterministic and Probabilitic evaluations",
      "Using the ERV-Tool",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Vincenzo Bianco — UNIPARTHENOPE"
  },
  "communication-strategies-with-financial-institutions": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "One of the biggest obstacles during the process of negotiating a loan aimed at the green conversion of one's business is the lack of knowledge of the parameters and evaluation criteria applied by Banking Institutions or Financial Institutions. The purpose of this Micro Credential is to provide small, medium-sized entrepreneurs and business professionals with the tools to prepare a proper dossier to support the application for financing and successfully conduct the negotiation of financing aimed at the green conversion of their business or accompany by small- to medium-sized business professionals to the negotiation of financing. Furthermore, this program is designed to equip participants with the necessary skills and insights to adeptly navigate the negotiation process associated with securing financing for environmentally sustainable initiatives, by offering guidance on effective negotiation strategies tailored specifically to the unique needs and challenges of green financing."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Evaluate parameters applied by financial institutions to grant financing.",
              "Apply methods and techniques for a successful loan application.",
              "Select and apply methods and techniques for evaluating the affordability of a loan."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Fundamental Concepts",
      "Evaluation Methods for Energy Efficency Credit",
      "Business Planning",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Michele Russo, Rossana Gravina — EPTA"
  },
  "energy-auditing-of-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A detailed energy audit of the building must be performed to determine the true potential of savings and ensure sustainable results. An energy audit is defined by the European Efficiency Directive as a systematic procedure with the aim of obtaining sufficient information on the current state of energy consumption of a building or a group of buildings to identify and quantify cost-effective energy saving options, including a report on the relevant equipment. It includes an inspection of the building, analysis and evaluation of the existing condition of the building and the proposal of various measures, the implementation of which would reduce energy consumption and improve the internal climate of the building. It presents an important tool in current efforts to significantly reduce the energy consumption of existing buildings. The aim of the MC is to clarify the differences between energy certification and energy auditing of buildings and to provide information on who can perform it, how to do it and when an energy audit is mandatory."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the purpose and importance of energy audits in identifying potential energy savings and achieving sustainable results in buildings.",
              "Gain knowledge of the European Efficiency Directive’s definition and requirements for conducting systematic energy audits.",
              "Learn the key steps involved in performing an energy audit, including building inspection, condition analysis, and evaluation of energy consumption.",
              "Develop skills in identifying and quantifying cost-effective energy-saving options for both individual buildings and groups of buildings.",
              "Develop proposals for implementing energy-saving measures to reduce overall energy consumption and improve indoor environmental quality."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic understating of energy efficiency in the building sector"
          }
        ]
      }
    ],
    "modules": [
      "Fundamental Concepts",
      "Energy Auditing of Building Process",
      "Energy Saving Measures",
      "Technical and Economical Evaluation",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Prof. Ing. Dušan Petráš, PhD., Ing. Anna Predajnianska, PhD. — STUBA"
  },
  "incorporation-of-natural-materials-in-energy-renovation-of-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Energy renovation of buildings is strongly related with both adding new materials and replacing existing equipment or structural elements with new ones. The Natural Materials for Building Energy Renovation course introduces sustainable natural materials for energy-efficient building renovations. Participants will explore market-available products, innovative techniques, and in-situ material production to enhance building sustainability. The course covers the economic, technical, and environmental aspects of natural materials, including their benefits, limitations, certification standards, and life cycle impacts. Designed for professionals with a technical or economic background, this course equips learners to integrate natural materials into energy renovation strategies, supporting sustainable and high-quality built environments."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Propose natural or mainly natural materials in retrofitting of buildings",
              "Understand the benefits and the weak points of using natural materials in building renovation",
              "Get familiar with companies and natural products for the building sector",
              "Get familiar with different techniques of creating natural materials for the building sector.",
              "Understand the economic and environmental advantages concerning the use of natural materials and techniques in energy retrofitting."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basic understating of energy efficiency"
          }
        ]
      }
    ],
    "modules": [
      "Introduction",
      "Building Elements and Natural Materials",
      "Certifications",
      "Risk, Protection and Maintenance",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Associate Prof. Maria Mandalaki, Prof. Despoina Dimelli, Lecturer Myrsini Kaltsa, Lecturer Angelliki Pappa — TUC"
  },
  "circular-economy-in-the-built-environment": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Circular Economy is considered a key strategy to promote sustainability and resource efficiency, and in particular to the building environment, since there is a need to raise awareness of problems in the Built Environment, encouraging decision-makers to adopt circular and sustainable solutions based Circular Economy solutions. This course focuses on the principles of the Circular Economy and sustainability and the advantages implicit in their implementation in the Built Environment. This course will teach practical methods to enhance circularity's impact, promote energy efficiency and decarbonization measures. Learners will have the opportunity to analyse different case studies about Circular Economy in the Built Environment. Additionally, the program explores environmental impact assessment and circularity methodologies that provide a comprehensive approach to sustainable practices. By raising awareness and providing practical skills, the course aims to empower individuals to play a key role in progressing towards a more resilient future."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the importance of transition for circularity and sustainability and promote their implementation in the Built Environment.",
              "Understand and apply the principles of Sustainability and Circular Economy.",
              "Develop practices to improve circularity and assess their impact on the Built Environment.",
              "Identify and promote measures that contribute for energy efficiency and decarbonization."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Sustainability and the Circular Economy",
      "Circular Economy for the Built Environment",
      "Energy Efficiency and Decarbonisation in the Built Environment",
      "Methodology of Environmental Impact Evaluation (LCA) and Circularity",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Miguel Carvalho, Lecturer Joana Santos — CECOLAB"
  },
  "energy-consumption-in-buildings": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Understanding the ways energy is supplied and consumed at building level is a paramount step for assessing potential measures to reduce primary energy and carbon emission measures. This MC will introduce the learners to the main aspects related to energy consumption in buildings, from the main concepts and definitions to the assessment methods aimed at evaluating the building energy performance. We will also explore the most common technologies and strategies to reduce the heating and cooling energy demands at both building and district levels. Specific case studies will be developed and discussed, with a particular focus on energy efficiency measures and on the integration of RES technologies in buildings and districts."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "navigate the main drivers of the building energy consumptions.",
              "understand the main types of energy consumptions in buildings.",
              "be able to assess and evaluate the heating and cooling demands.",
              "be able to detect solutions to improve the building energy performance."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics on mathematics and physics at EQF 5 level."
          }
        ]
      }
    ],
    "modules": [
      "Introduction",
      "Energy Use in Buildings",
      "Building Energy Systems",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Mattia De Rosa — UNIGE"
  },
  "energy-performance-contracting-epc": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Energy Performance Contracting of Buildings course provides a comprehensive introduction to energy performance contracting (EPC), a service agreement between an energy service provider and a client, aimed at improving energy efficiency with guaranteed energy savings. Participants will learn the fundamentals of EPC, focusing on the structure and implementation of these contracts in building projects. The course covers the essential elements of successful energy performance contracts, including streamlined service delivery, comprehensive energy-saving measures, financial structuring, and guaranteed savings outcomes."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "have acquired a clear understanding of the definition of energy service company.",
              "have acquired a clear definition of energy performance contracting process.",
              "know the legislative background of the EPC processing.",
              "be able to define the financing options for modernisation of existing buildings through a guaranteed energy service."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Knowledge of energy efficiency of buildings and energy auditing"
          }
        ]
      }
    ],
    "modules": [
      "Fundamental Concepts",
      "Energy Performance Contracting Process and Methods",
      "Energy Savings Measures",
      "Financing and Economic Evaluation",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Prof. Ing. Michal Krajčík, PhD. — STUBA"
  },
  "energy-efficiency-in-buildings-for-vet-up-skilling": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential provides a comprehensive introduction to the principles and practices of energy efficiency, the circular economy, and smart building technologies within the built environment. It explores how these concepts are essential to reducing environmental impact, cutting energy consumption, and achieving the European Union’s climate neutrality goals by 2050, as outlined in the European Green Deal and the EU Circular Economy Action Plan. It is designed for professionals and learners seeking to enhance their knowledge of sustainable construction practices, retrofitting methods, and the integration of renewable energy solutions. Learners will gain a clear understanding of how energy-efficient design, retrofitting strategies, and smart systems integration can contribute to sustainable development across the building lifecycle — from design and construction to renovation and operation. The course combines European policy frameworks with technical and practical insights, offering an applied understanding of how innovation and sustainability intersect in the construction sector."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Explain the main concepts of energy efficiency and the circular economy, particularly in the context of buildings.",
              "Understand key EU policies, directives, and strategies related to energy efficiency and sustainability.",
              "Identify financing and funding opportunities available for green transition projects.",
              "Apply assessment tools for evaluating energy efficiency and environmental performance in buildings.",
              "Recognize the importance of building envelopes, heating and cooling systems, and lighting sources in retrofitting strategies.",
              "Understand how to integrate renewable energy systems (solar, geothermal, biomass) in building design and renovation.",
              "Explore the principles of smart buildings, including automation, smart materials, and the Smart Readiness Indicator (SRI)."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Energy Efficiency and Circular Economy",
      "Retrofitting of Buildings",
      "Smart Buildings",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Janina Alvarez, Irini Ntavlourou — INCOMA and EELI"
  },
  "systemic-design-for-energy-retrofitting": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential offers a comprehensive overview of how systemic design can drive sustainable energy retrofitting across different contexts. The module begins with an Introduction to Systemic Design for Energy Retrofitting and a reading on Change Leadership for Building Energy Retrofitting, helping learners build a foundation in systems thinking and change management. Students then explore Mindset and Approaches for Systemic Design, including Scharmer’s 3Cs framework applied to retrofitting and Meadows’ perspective on “Dancing with Systems.” This is followed by a focus on Stakeholder Engagement and Co-Creation, with readings and exercises on impactful communication, stakeholder activation, and the use of green nudging techniques. The module continues with Data-Informed Decision Making and Strategy Development, where participants learn to use data analysis and strategic planning to guide retrofitting projects. In the final section, Creating Viable Business Cases and Scaling Strategies for Retrofitting, students develop innovative business models and explore how to scale solutions effectively. Each unit concludes with a test to reinforce learning, culminating in a final exam that integrates knowledge from all five units."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Explain the core principles of systemic design and change leadership in the context of energy retrofitting.",
              "Apply systemic thinking tools (such as Scharmer’s 3Cs and Meadows’ systems approach) to identify leverage points for sustainable interventions.",
              "Design stakeholder engagement and co-creation strategies that promote collaboration and behavioral change in retrofitting initiatives.",
              "Interpret and use data to inform decision-making and develop effective retrofitting strategies.",
              "Develop innovative business models and upscaling strategies to enhance the impact and financial viability of retrofitting projects.",
              "Evaluate the effectiveness of systemic design approaches in addressing environmental, social, and economic challenges related to building renovation."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Foundations of Systemic Design and Change Leadership",
      "Mindset and Approaches for Systemic Design",
      "Stakeholder Engagement and Co-creation in Energy Retrofitting Iinitiatives",
      "Data-Informed Decision Making and Strategy Development",
      "Creating Viable Business Cases and Scaling Strategies for Retrofitting",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Chloe Chavardes, Dr. Olga Glumac, Dr. Jennifer Krueckeberg, Evdokia Bairampa, Paula Vega — Three O'Clock"
  },
  "advertising-and-public-relations-in-the-energy-sector": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Advertising serves as a pivotal tool for disseminating information about energy innovations, promoting sustainable practices, raising awareness about the importance of energy efficiency, and helps filling the gap between technological advancements and public acceptance. Public relations play a crucial role in fostering trust and credibility within the energy sector, facilitating open communication with stakeholders. This MC aims at providing students with the knowledge and skills necessary for rational advertising and public relations decision creating long-lasting value for organisations in the Energy sector. During this MC the students will get acquainted with the latest trends and concepts of advertising and public relations to orientate themselves in the advertising and public relations activities and to develop, implement and evaluate advertising and public relations plans. Students will gain knowledge of key internal and external factors that impact the process of developing, implementing, and managing plans of advertising and public relations, as well as in periods of crisis."
          }
        ]
      },
      {
        "title": "Learning Objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the role of advertising in promoting energy innovations, raising awareness and bridging the gap between technological advancements and public acceptance.",
              "Examine the importance of public relations in building trust and credibility within the energy sector, facilitating transparent communication with key stakeholders.",
              "Develop skills in creating and implementing advertising and public relations plans that add long-term value to organizations within the energy sector.",
              "Identify and assess internal and external factors that impact advertising and public relations efforts, including legal, ethical, and social responsibility considerations.",
              "Cultivate the ability to make informed decisions regarding advertising and public relations strategies that enhance organizational credibility and align with sustainable business goals."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Advertising",
      "Public Relations",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Aušra Pažėraitė — Vytautas Magnus University"
  },
  "sustainability-circular-economy-and-esg-investing": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This \"Sustainability, Circular Economy and ESG Investing\" micro-credential is designed to meet the evolving needs of professionals navigating the increasingly complex domains of environmental sustainability and financial decision-making. You may choose to complete this micro-credential here and be awarded a BoostMySkills RES4CITY Certificate. Alternatively, as this micro-credential has been formally accredited by Maynooth University, you may earn 5 ECTS credits by applying to enroll in this micro-credential via Maynooth University at this link. To earn the ECTS credits, learners will be required to pay a fee and complete an assessment. This formal accreditation by Maynooth University adds further recognition of this course and its content. Questions related to the Maynooth University enrolment process can be sent to microcredentials@mu.ie. The development of this micro-credential arises from the critical recognition that sustainable development and investment are not only moral imperatives but also key drivers of innovation and competitiveness in the modern economy. The urgency of addressing environmental challenges, coupled with the rising influence of ESG (Environmental, Social, and Governance) factors on investment decisions, underscores the need for a micro-credential that equips participants with the skills to implement sustainable practices and investment strategies. The circular economy offers a framework for minimizing waste and optimizing resource use, which is crucial for long-term sustainability. Meanwhile, ESG investing represents a shift in how value is assessed, emphasizing the importance of sustainability in financial performance. This dynamic MC offers an in-depth exploration into the intersections of sustainability, circular economy practices, and ESG investing, tailored for individuals seeking to make a meaningful impact in their professional fields through sustainable practices. Participants will gain a robust understanding of the critical theories and practical applications that underpin sustainability in business and investment decisions, focusing on innovative strategies that align with global sustainability goals."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Contextualise and reflect on environmental world views",
              "Comprehend and critically engage with the role of energy use in the circular economy",
              "Critically engage with current initiatives regarding energy usage for a circular economy",
              "Contextualise theory and relate this to varying societal groups’ ability",
              "Gain the motivation and opportunity to enact a circular economy with sustainable energy use and carry out stakeholder mapping and circular economy project planning activities",
              "Learn about new product development projects, how to lead them and their typical life cycle",
              "Gain an in-depth understanding of change projects in internal processes",
              "Understand the management of multi-project environments as complex systems"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamental Concepts",
      "Introduction to the Circular Economy and Sustainable Energy Use",
      "Sustainable Fashion",
      "Intermediate Exam",
      "Investing in Sustainability",
      "Environmental, Social, and Governance (ESG) framework and investments",
      "Future and End of ESG",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Fabiano Pallonetto, Professor Shivam Agarwal — National University of Ireland Maynooth"
  },
  "pv-integration-in-shading-systems": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Shading systems play a crucial role in optimizing indoor environmental conditions by regulating natural light and maintaining thermal comfort. With advancements in solar technology, these systems now offer a unique opportunity to harness solar energy through the integration of Photovoltaic (PV) surfaces. This micro-credential explores the innovative potential of integrating PV systems into shading devices, examining the latest technological developments and their impact on energy production. Participants will gain insight into the technical challenges associated with efficient integration, as well as the strategies to overcome them. The course also analyzes the benefits and limitations of PV-integrated shading solutions, focusing on energy efficiency, indoor environmental quality, and aesthetic design. By the end of the course, participants will be equipped with the knowledge to design and evaluate shading systems that enhance building performance and contribute to sustainable energy production."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Demonstrate an understanding of the principles and benefits of integrating Photovoltaic (PV) systems into shading devices.",
              "Analyse and evaluate different PV technologies suitable for shading applications, considering energy efficiency and environmental impact.",
              "Assess the contribution of PV-integrated shading to indoor environmental quality and building sustainability.",
              "Design conceptual models of shading systems that optimize both solar energy production and interior comfort."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of physics at EQF 4-5 level.",
              "Principles of shading systems and energy systems."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Shading Systems",
      "Photovoltaic (PV) Technologies",
      "Integration of PV in Shading Devices",
      "Energy Efficiency and Environmental Impact",
      "Technical Challenges and Solutions",
      "Aesthetic and Architectural Considerations"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Mandalaki Maria, Vlatitsi Lydia — TUC"
  },
  "carbon-neutrality-and-esg": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "As the global community confronts the urgent challenge of the climate crisis, achieving Carbon Neutrality has become an essential goal for the long-term viability of both cities and corporations. Concurrently, ESG (Environmental, Social, and Governance) has emerged as the definitive framework for assessing an organization's sustainability and strategic resilience. This micro-credential provides a comprehensive overview of how to strategically integrate carbon neutrality objectives with the broader ESG landscape. The course journey begins with the fundamentals, explaining the climate crisis and the evolution of the ESG ecosystem. It then proceeds with a deep dive into each of the three pillars, covering critical topics such as decarbonization pathways, the energy transition, the circular economy, corporate accountability, stakeholder engagement, and good governance. Finally, the course equips learners to navigate the practical opportunities and risks, exploring ESG strategy, investment trends, and the future outlook. Through case studies and practical exercises, participants will gain the knowledge needed to lead impactful sustainability initiatives."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Define the core concepts of Carbon Neutrality and ESG and explain the evolution of the ESG ecosystem and its strategic importance.",
              "Analyze key strategies for decarbonization and the energy transition, and evaluate environmental risks and opportunities beyond carbon, including the circular economy and natural capital.",
              "Assess the key components of the Social pillar, including corporate accountability, human rights in business, stakeholder engagement, and supply chain responsibility.",
              "Understand the fundamentals of corporate governance frameworks and analyze the role of corporate ethics, fair competition, and accountability in practice.",
              "Identify and evaluate ESG-related opportunities and risks, such as greenwashing and the ESG investment landscape, in order to develop an effective strategy.",
              "Develop a foundational roadmap for integrating ESG principles and advancing toward carbon neutrality within an organization."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No pre-requisites"
          }
        ]
      }
    ],
    "modules": [
      "Carbon Neutrality and ESG",
      "The Environmental Pillar: From Climate Action to Natural Capital",
      "The Social Pillar: Engaging Stakeholders, Building Trust",
      "The Governance Pillar: Frameworks for Accountability and Long-Term Value",
      "Navigating the ESG Landscape: Opportunity, Risk, and Investment",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Professor Kihyun Kim — Kangwon National University | COSS for New Energy Industry"
  },
  "heat-pumps-and-district-heating-in-urban-areas": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Heating accounts for a significant share of urban energy demand and greenhouse gas emissions. As cities pursue climate neutrality, the shift from fossil-fuel-based systems to clean, efficient alternatives is essential. Two of the most promising solutions are heat pumps — enabling highly efficient electrification of heat — and district heating networks, which can integrate diverse renewable and waste heat sources at scale. This micro-credential introduces the role of heat pumps and modern district heating in the decarbonisation of urban areas. It provides background on the technologies, their integration into urban energy systems, and the opportunities they offer for reducing emissions, improving efficiency, and enhancing energy security. Participants will also explore practical examples and emerging trends shaping the future of sustainable cities."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Explain the role of heating in urban energy demand and its impact on emissions.",
              "Describe the operating principles and applications of heat pumps in residential and district contexts.",
              "Identify synergies between electrification, renewable energy integration, and district heating.",
              "Assess opportunities for deploying these technologies in different urban contexts."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of energy systems."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Urban Heating and Decarbonisation",
      "Heat Pumps: Principles and Technologies",
      "District Heating Systems: Components and Operation",
      "Synergies with Renewable Energy and Storage",
      "Applications, Challenges and Future Trends"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Prof. Mattia De Rosa — Università degli Studi di Genova"
  },
  "solar-systems-integration": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential focuses on the principles and practices of integrating solar energy systems into various built environments. Participants will explore the design, installation, and optimisation of solar technologies for residential, commercial, and industrial buildings. The course covers key topics such as site assessment, system sizing, architectural integration, and regulatory considerations. Through practical exercises and case studies, learners will gain hands-on experience in creating efficient solar solutions that enhance energy sustainability. Ideal for architects, engineers, and energy professionals, this micro-credential equips participants with the skills to effectively incorporate solar systems into modern building designs, promoting environmental stewardship and reducing energy costs."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Perform thorough site assessments to determine the feasibility of solar system integration.",
              "Design and implement efficient solar systems in the built environment.",
              "Understand the regulatory requirements for solar installations.",
              "Optimise solar system performance to maximise energy savings and promote sustainability."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of thermodynamics, heat transfer, and economic analysis."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Solar Integration",
      "Site Assessment and System Sizing",
      "Architectural Integration and Design Principles",
      "Permits, Codes and Legal Requirements",
      "Performance Optimisation and Case Studies"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Prof. Sergio Nardini, Prof. Bernardo Buonomo, Prof. Alessandro Mauro — Università degli Studi della Campania \"L. Vanvitelli\""
  },
  "energy-flexibility": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Buildings are a significant contributor to global energy usage, and addressing their energy demands is crucial for a more sustainable future. Demand Side Management (DSM) is a multifaceted approach that focuses on optimising energy use by shifting, reducing, or modifying electricity demand to achieve greater energy efficiency and reliability. The implementation of DSM strategies requires real-time data collection and optimisation techniques to enable the control of building energy systems. These smart controllers also unlock the exploitation of building energy flexibility — the ability to adjust energy consumption patterns in response to demand fluctuations, grid conditions, and renewable energy availability."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Attain a comprehensive understanding of the principles and concepts of Demand Side Management (DSM) and energy flexibility.",
              "Assess and optimise energy consumption in residential and commercial buildings.",
              "Identify, select, and apply various strategies for enhancing energy flexibility in building energy systems."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of building physics and energy markets."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Fundamentals of Demand Side Management",
      "Smart Building Technologies for Energy Optimisation",
      "Energy Flexibility in Residential and Commercial Buildings",
      "Demand Response Programmes Characterisation"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Prof. Mattia De Rosa — Università degli Studi di Genova"
  },
  "test": {
    "contentSections": [
      {
        "title": "About This Course",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Include your long course description here. The long course description should contain 150-400 words."
          },
          {
            "type": "paragraph",
            "text": "This is paragraph 2 of the long course description. Add more paragraphs as needed. Make sure to enclose them in paragraph tags."
          }
        ]
      },
      {
        "title": "Requirements",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Add information about the skills and knowledge students need to take this course."
          }
        ]
      }
    ],
    "modules": [],
    "workload": null,
    "createdBy": null
  },
  "energy-communities-implementation-in-the-urban-environment": {
    "contentSections": [
      {
        "title": "Context and Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This MC aims to give learners a good understanding of the local energy community (LEC) concept, its potential for a systematic change in the energy system and how to implement them. The MC will start by explaining the concept of LEC and its relevance in the urban context. Following this, we will set the European legal framework for LECs, explaining the similarities and differences between the Citizen Energy Communities and the Renewable Energy Communities. From here, we will explore the status of energy communities in the EU and some success stories to highlight the implications for the region and the energy system. Once they have performed this exercise, they will learn how to establish a LEC. Finally, we will discuss the possibilities of upscaling and interconnecting energy communities to decarbonise larger areas of the city."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the concept and implications of local energy communities",
              "Establish a new local energy community following basic guidelines",
              "Upscale and interconnect the communities"
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Basics knowledge of the energy systems"
          },
          {
            "type": "paragraph",
            "text": "Fundamental understanding of the energy market"
          }
        ]
      }
    ],
    "modules": [
      "Concept and Relevance of Energy Communities",
      "European Legislation: Citizen Energy Communities vs Renewable Energy Communities",
      "Current Status and Development of Local Energy Communities (LEC)",
      "LECs' Impact and Benefits: Technical, Economic, Environmental and Social Aspects",
      "Main Barriers and Challenges",
      "LEC Establishing Process",
      "Upscaling and Interconnecting Communities to Decarbonise Cities"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Álvaro Manso Burgos — Universitat Politècnica de València"
  },
  "environmental-certification-and-assessment-of-communities-and-buildings": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential is designed to provide professional engineers with essential skills for assessing environmental and social issues in a community. Its core aim is to introduce sustainability concepts at both the community and building scale. Participants will acquire skills in assessment methods and techniques, data collection and interpretation, enabling them to make informed choices across all dimensions of sustainability. The course covers management tools for organizing environmental concerns throughout the life cycle of buildings and communities, as well as guidelines for integrating sustainable design principles and renewable energy systems. Participants will gain the expertise to implement measures and certifications within the constantly evolving field of community and building sustainability — crucial knowledge for those aiming to lead the transition toward more energy-efficient and environmentally responsible built environments."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Identify key environmental and social sustainability issues relevant to communities and the built environment.",
              "Apply appropriate assessment methods and tools to evaluate sustainability impacts.",
              "Interpret environmental and social data to support sustainable decision-making.",
              "Integrate sustainable design principles and renewable energy systems into building and community planning.",
              "Implement management tools and certification systems to enhance sustainability across the lifecycle of buildings and communities."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "No formal prerequisites are required.",
              "General skills in analytical thinking, comparison, and map reading will be helpful."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Planning in Communities and Buildings",
      "Methods and Tools for Environmental Assessment and Certification",
      "Renewable Resources, Energy and Land Use",
      "Strategies for Environmental Design and Sustainable Transport"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Despina Dimelli, Maria Mandalaki — TUC"
  },
  "project-management-for-sustainability": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This course offers a practical and accessible introduction to project management with a focus on sustainability and impact. Based on the PMI standards (PMBOK), participants will explore how to design, plan, and manage projects that support the green and digital transitions. Through real-world cases and simple tools, students will learn to define objectives, structure project activities, manage stakeholders, and evaluate results. The course includes key concepts such as project life cycle, SMART goals, risk management, and communication strategies, with a European perspective on funding and sustainability. Ideal for students, professionals, or changemakers looking to apply project management to social and environmental challenges, this micro-credential emphasizes clarity, adaptability, and purpose."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Design and plan small-scale projects using key project management processes and tools.",
              "Define sustainable goals and align project activities with social and environmental impact.",
              "Communicate effectively with stakeholders and manage collaboration across teams.",
              "Apply basic risk management strategies to ensure project adaptability and resilience."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "None"
            ]
          }
        ]
      }
    ],
    "modules": [
      "Sustainable Project Management",
      "Planning and Structuring for Impact",
      "Teams, Stakeholders and Communication",
      "Risk, Monitoring and Impact Evaluation",
      "EU Projects and Real-World Practice"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "María Martha Barroso Quiroga, Adrian Noheda, Jon Larrachea & Juan Viesca — Finnovaregio (FINN)"
  },
  "professional-english": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential equips learners with the linguistic, intercultural, and professional communication competences necessary for technical collaboration in the energy sector. Designed for intermediate to upper-intermediate learners (B1–B2 CEFR), it combines language development with sector-specific content and authentic case studies. Participants will strengthen their ability to communicate technical information, produce professional reports, and engage effectively in international projects and negotiations. The asynchronous delivery ensures flexibility and engagement through interactive simulations."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Demonstrate competence in technical vocabulary, grammar, and written style specific to the energy sector.",
              "Produce professional reports, emails, and project documentation in clear, professional English.",
              "Deliver structured presentations and actively participate in international meetings.",
              "Apply intercultural communication strategies to minimise miscommunication in multinational projects."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "English proficiency at B1–B2 level (CEFR).",
              "Basic familiarity with energy-related concepts."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Technical English Foundations",
      "Written Communication in Professional Contexts",
      "Spoken Communication for Meetings & Collaboration",
      "Cross-Cultural & Experiential Learning",
      "Project & Assessment"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Chrysi Koundouraki — EELI"
  },
  "decarbonisation-of-energy-in-the-residential-sector": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Space heating, cooling, and hot water are major residential energy uses in cities. This micro-credential focuses on reducing and decarbonising these demands by improving building efficiency, electrifying heating and cooling, and using alternative energy sources. Learners will explore the role of residential energy in urban areas and the EU Green Deal's climate targets. The course reviews current efficient building methods and examines options for decarbonising thermal demand, with a strong emphasis on renewable energy integration — including heat pumps, biomass boilers, and hybrid systems with storage capabilities."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Understand the relevance and challenges of decarbonising urban energy demands.",
              "Evaluate efficient building techniques to reduce energy consumption in European cities.",
              "Size heat pump installations for residential heating and cooling and biomass boilers at a residential scale.",
              "Design basic hybrid renewable energy systems integrating heat pumps, PV generation, and storage."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of thermodynamics, heat transfer, and hydraulics."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Thermal Energy Needs in Cities and EU Green Deal Targets",
      "Efficient Building Techniques",
      "Heat Pump Systems for Residential Heating and Cooling",
      "Biomass Boilers at Residential Scale",
      "Hybrid Systems with Storage, PV and Heat Pumps"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Carla Montagud, Mar Cañada, Carlos Vargas, David Alfonso, Lucas Martínez — Polytechnic University of Valencia, Institute of Energy Engineering (UPV, IIE)"
  },
  "renewable-energy-communities-in-cities": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Renewable Energy Communities (RECs) are a key tool to decentralise and democratise the energy sector, proven to engage citizens and make them more active participants in the energy transition. This micro-credential provides the foundational knowledge around what RECs are, how they can be implemented, and how to assess their benefits. Participants will explore the technical, regulatory, and economic dimensions of RECs within a European context, gaining the skills to analyse business models, energy sharing mechanisms, and the regulatory landscape shaping the future of community energy."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Characterise a Renewable Energy Community and identify its key technical elements.",
              "Critically discuss the regulatory framework surrounding RECs at European and Member State level.",
              "Analyse potential REC business models and energy sharing mechanisms.",
              "Evaluate the economic and environmental benefits of a REC."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic understanding of energy systems and economics."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Conceptualisation of Renewable Energy Communities",
      "Energy Communities in European and MS Legislation",
      "Technical and Business Models of RECs",
      "Energy Sharing Mechanisms and Economic Evaluation",
      "Future Challenges and Opportunities"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "David Ribó-Pérez, Álvaro Manso-Burgos — Polytechnic University of Valencia, Institute of Energy Engineering (UPV, IIE)"
  },
  "smart-energy-systems-in-building-construction": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential introduces the principles of smart energy systems in modern building construction, focusing on the integration of renewable energy sources, energy management, and efficiency optimisation. Participants will explore modern renewable energy technologies, demand response strategies, and digital monitoring tools. The module uses best practices and practical exercises to enhance understanding of how intelligent, connected systems can transform the way buildings consume and manage energy."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Demonstrate the ability to design energy-efficient systems incorporating renewable energy sources.",
              "Implement smart control strategies to improve building energy performance.",
              "Apply knowledge of EU energy frameworks and best practices in building construction."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "No formal prerequisites required; a basic understanding of renewable technologies and energy systems is beneficial."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Smart Energy Systems",
      "Renewable Energy Integration in Smart Buildings",
      "Energy Management and Efficiency",
      "Digital Tools and Automation"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Vangelis Giannousas, Irini Ntavlourou — EELI"
  },
  "introduction-to-energy-management": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential equips professionals with core knowledge and practical tools to measure, analyse, and improve energy performance in buildings and small industrial facilities. Over six to eight weeks, participants explore how energy is generated and consumed, identify savings opportunities, and develop an energy management plan aligned to ISO 50001. Interactive lectures, case studies, and a guided virtual audit culminate in a business-case presentation."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Produce an energy flow diagram and key performance indicators for a given facility.",
              "Prioritise energy-saving opportunities using payback, NPV, and carbon abatement metrics.",
              "Draft an energy policy and action plan that meets core ISO 50001 clauses.",
              "Design a monitoring and verification plan in line with IPMVP.",
              "Present an evidence-based business case to implement a chosen efficiency project."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic algebra and spreadsheet skills (e.g., MS Excel or Google Sheets).",
              "Familiarity with secondary-school physics concepts of energy and power.",
              "Access to a PC with internet and ability to install free analysis software."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Energy Fundamentals, Metering and Data",
      "Energy Auditing and Load Profiling",
      "System Efficiency: Lighting, HVAC, Motors and Industrial Loads",
      "Renewable Generation, Storage and Energy Management Systems",
      "Economics, Regulation, Monitoring and Capstone Project"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Fabiano Pallonetto — Maynooth University"
  },
  "dataspaces-for-energy-communities": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential equips professionals with the knowledge and skills to design, implement, and govern data spaces that enable secure, sovereign data sharing within citizen energy communities. Grounded in the European Data Strategy, Gaia-X and IDSA reference models, the course explores semantic interoperability, privacy-preserving architectures, and compliant data governance aligned with the Data Act and GDPR. Through case studies from leading EU pilots, learners prototype an open-source energy data space that links prosumers, DSOs, aggregators, and public authorities — unlocking data-driven services such as flexibility markets, peer-to-peer trading, and community engagement dashboards."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Design and document a standards-compliant data space architecture for an energy community.",
              "Deploy an open-source connector (e.g., Eclipse Dataspace Connector) to ingest and expose smart-meter data.",
              "Draft legally binding data-sharing agreements aligned with the Data Act and GDPR.",
              "Assess data quality, interoperability, and security using defined KPIs and best practices."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "EQF level 6 (Bachelor) in engineering, computer science, renewable energy, or a related discipline.",
              "Basic Python or Java programming, understanding of power system operation and smart-meter data, and familiarity with EU data protection principles (GDPR)."
            ]
          }
        ]
      }
    ],
    "modules": [
      "EU Policy Context & Citizen Energy Communities",
      "Data Space Fundamentals & Reference Models",
      "Technical Architecture, Governance & Legal Frameworks",
      "Privacy, Security & Business Models",
      "Hands-on Lab: Building a Community Data Space Prototype"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Fabiano Pallonetto, Alba Rodriguez — Maynooth University"
  },
  "innovation-management-for-energy-transition": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential equips professionals and students with the skills to drive innovation in the energy transition within the building sector. Participants will learn to navigate the full innovation process, from ideation to implementation, using methodologies such as design thinking, systems innovation, and stakeholder collaboration. The course combines theoretical foundations with practical applications, featuring real-world case studies, collaborative innovation and policy frameworks, and business model innovation to ensure that participants can effectively develop and scale energy solutions in sustainable buildings."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Manage innovation processes from ideation to implementation in energy-efficient buildings.",
              "Apply design thinking to co-create solutions with stakeholders.",
              "Develop and validate energy solutions through iterative approaches and stakeholder feedback.",
              "Evaluate the scalability and impact of innovative technologies and business models.",
              "Understand the role of policy, funding, and regulation in energy innovation."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "No formal prerequisites are required.",
              "A basic understanding of sustainability, energy systems, or business strategy is beneficial."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Innovation in Energy Transition",
      "Design Thinking for Energy Solutions",
      "Scaling and Commercialising Energy Innovations",
      "Policy, Regulation, and Funding for Energy Innovation",
      "Case Studies and Practical Applications"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Marta Arniani, Paula Vega — Three o' clock"
  },
  "thermal-measurements": {
    "contentSections": [
      {
        "title": "Context and overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This micro-credential provides a comprehensive introduction to the essential thermal measurements used in monitoring energy systems. Participants will learn the principles and techniques for accurately measuring temperature, pressure, and flow rate, and understand the importance of these measurements in ensuring the efficiency, safety, and reliability of energy systems. Through practical exercises and real-world examples, learners will gain hands-on experience in using various measurement tools and interpreting data. Ideal for engineers, technicians, and energy professionals, this micro-credential equips participants with the skills to effectively monitor and optimise energy systems, contributing to improved performance and sustainability."
          }
        ]
      },
      {
        "title": "Learning objectives",
        "blocks": [
          {
            "type": "paragraph",
            "text": "On the completion of the micro-credential, participants will be able to:"
          },
          {
            "type": "list",
            "items": [
              "Perform accurate temperature, pressure, and flow rate measurements using appropriate tools and techniques.",
              "Analyse and interpret measurement data to assess the performance of energy systems.",
              "Apply thermal measurements to optimise the efficiency and reliability of energy systems."
            ]
          }
        ]
      },
      {
        "title": "Background",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The following pre-requisites are essential for the completion of the MC:"
          },
          {
            "type": "list",
            "items": [
              "Basic knowledge of thermodynamics and heat transfer."
            ]
          }
        ]
      }
    ],
    "modules": [
      "Introduction to Thermal Measurements",
      "Positive energy district (PED) as a fair approach",
      "Key performance indicators to characterise a PED",
      "Tackling mobility",
      "Enhancing efficiency in the building stock",
      "Decarbonising energy demand",
      "Final Exam"
    ],
    "workload": "Up to 15hrs per week for 5 weeks",
    "createdBy": "Lecturer Álvaro Manso Burgos, Lecturer Isabel Aparisi Cerdá — Universitat Politècnica de València"
  }
};

export const getCourseContent = (slug: string): CourseContent | undefined => coursesContent[slug];
