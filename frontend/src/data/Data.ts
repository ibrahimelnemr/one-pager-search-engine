import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";

export const RealOnePagers = [
    {
        username: "ielnemr",
        email: "ielnemr@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/ielnemr",
        profileImage: "https://raw.githubusercontent.com/ibrahimelnemr/one-pager-search-engine/refs/heads/main/frontend/public/images/Ibrahim%20El%20Nemr.jpg",
        name: "Ibrahim El Nemr",
        title: "Software Engineer",
        officialTitle: "Analyst",
        costCenter: "T&T, EAID, Customer As a Service / Operate",
        businessSkills: ["Adaptability", "Communication"],
        technologySkills: ["Programming languages: Java, Python, TypeScript, SQL Databases: PostgreSQL, MongoDB Frameworks: React.js, Spring Boot, Node.js, MongoDB, Other: Git, Agile"],
        industryExperience: ["Ecommernce, Banking, Education"],
        education: "BA in Economics, minor in Computer Science, the American University in Cairo",
        languages: "Arabic English French",
        certificates: "Udacity Full Stack JavaScript Developer Nanodegree Udacity iOS Developer Nanodegree",
        summaryOfProfessionalExperience: "Ibrahim El Nemr is a full-stack developer with extensive experience in end-to-end development across a variety of frameworks and technologies, including Spring Boot, PostgreSQL, React.js, Node.js, MongoDB, iOS and Flutter. He demonstrates exceptional flexibility and a strong willingness to learn new frameworks and technology stacks, adapting to business and technology requirements to deliver quality results in collaboration with cross-functional teams.",
        relevantExperience: `Full Stack Engineer, Flagak
        Coordinated with CTO to design and implement new backend in Java Spring Boot and PostgreSQL using layered architecture
        Implemented admin APIs on Node TypeScript backend with MongoDB and mongoose
        Added features to ecommerce admin management site using React, TypeScript and Material UI
        
        Back-End Developer, AUC Student Union
        Implemented new backend features for a mobile application being used by 7000+ students
        Added features to ecommerce admin management site using React, TypeScript and Material UI
        
        Technical Intern, CIB
        Explored uses of SAS for data analytics
        Researched and proposed solutions for financial data analysis and reporting `,
        selectedClients: ""

    }
]

export const MockOnePagers = [
    {
        username: "jdoe",
        email: "jdoe@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/jdoe",
        profileImage: "https://i.pravatar.cc/300?img=12",
        name: "John Doe",
        title: "Senior Software Engineer",
        officialTitle: "Consultant",
        costCenter: "Technology & Transformation, Cloud Engineering",
        businessSkills: ["Leadership", "Problem Solving", "Communication"],
        technologySkills: ["Java, Python, React, Node.js, AWS, Docker, Kubernetes"],
        industryExperience: ["Finance, Healthcare, Retail"],
        education: "MSc in Computer Science, Stanford University",
        languages: "English, Spanish",
        certificates: "AWS Certified Solutions Architect, Google Cloud Professional Developer",
        summaryOfProfessionalExperience: "John is a highly skilled software engineer with 7 years of experience in cloud computing, microservices, and full-stack development. He has led multiple enterprise-scale projects and specializes in designing scalable architectures.",
        relevantExperience: `Senior Software Engineer, Deloitte
        - Designed and implemented scalable microservices architecture using AWS Lambda and DynamoDB.
        - Led a team in developing an AI-driven recommendation system for a major healthcare provider.
        
        Software Engineer, TechCorp
        - Built RESTful APIs using Node.js and Express for a fintech startup.
        - Developed CI/CD pipelines using Jenkins and Docker, improving deployment efficiency by 30%.
        
        Cloud Engineer, StartUp X
        - Migrated legacy applications to cloud-native solutions, reducing operational costs by 40%.`,
        selectedClients: "Major US Banks, Fortune 500 Retailers"
    },
    {
        username: "asmith",
        email: "asmith@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/asmith",
        profileImage: "https://i.pravatar.cc/300?img=12",
        name: "Alice Smith",
        title: "Data Scientist",
        officialTitle: "Senior Consultant",
        costCenter: "AI & Analytics, Data Science",
        businessSkills: ["Analytical Thinking", "Data Visualization", "Critical Thinking"],
        technologySkills: ["Python, R, SQL, TensorFlow, Power BI, Apache Spark"],
        industryExperience: ["Banking, Retail, Telecommunications"],
        education: "PhD in Data Science, MIT",
        languages: "English, French",
        certificates: "Microsoft Certified: Azure Data Scientist Associate",
        summaryOfProfessionalExperience: "Alice is an experienced data scientist specializing in machine learning, big data analytics, and AI-driven business insights. She has worked with Fortune 500 companies to implement predictive modeling solutions.",
        relevantExperience: `Senior Data Scientist, Deloitte
        - Developed predictive models for customer churn analysis, increasing retention rates by 25%.
        - Led a data pipeline optimization project that improved ETL efficiency by 50%.
        
        Data Scientist, FinTech Co.
        - Designed fraud detection models using machine learning, reducing fraud cases by 40%.
        - Conducted A/B testing for marketing campaigns, resulting in a 20% increase in conversions.`,
        selectedClients: "Leading Telecom Providers, Global Retail Chains"
    },
    {
        username: "mjohnson",
        email: "mjohnson@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/mjohnson",
        profileImage: "https://i.pravatar.cc/300?img=2",
        name: "Michael Johnson",
        title: "Cybersecurity Consultant",
        officialTitle: "Manager",
        costCenter: "Cyber Risk, Security & Privacy",
        businessSkills: ["Risk Management", "Incident Response", "Compliance"],
        technologySkills: ["Network Security, SIEM, Identity & Access Management, SOC Operations"],
        industryExperience: ["Financial Services, Government, Healthcare"],
        education: "BSc in Information Security, Harvard University",
        languages: "English, German",
        certificates: "CISSP, CISM, CEH",
        summaryOfProfessionalExperience: "Michael is a cybersecurity expert with a deep understanding of risk management, vulnerability assessment, and compliance. He has helped organizations fortify their security posture and respond to cyber threats.",
        relevantExperience: `Cybersecurity Manager, Deloitte
        - Led security audits for Fortune 500 clients, ensuring compliance with GDPR and ISO 27001.
        - Developed and implemented a Zero Trust security model for a global financial institution.
        
        Security Consultant, SecureTech
        - Conducted penetration testing and vulnerability assessments across cloud and on-prem systems.
        - Implemented SIEM solutions to enhance real-time threat detection.`,
        selectedClients: "Global Investment Firms, Government Agencies"
    },
    {
        username: "rgarcia",
        email: "rgarcia@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/rgarcia",
        profileImage: "https://i.pravatar.cc/300?img=12",
        name: "Rachel Garcia",
        title: "Cloud Solutions Architect",
        officialTitle: "Senior Manager",
        costCenter: "Cloud Engineering, Digital Transformation",
        businessSkills: ["Cloud Strategy", "Solution Architecture", "IT Infrastructure"],
        technologySkills: ["AWS, Azure, Google Cloud, Terraform, Kubernetes, DevOps"],
        industryExperience: ["Retail, Logistics, Automotive"],
        education: "MBA in IT Management, Yale University",
        languages: "English, Italian",
        certificates: "AWS Certified Solutions Architect – Professional, Azure Solutions Architect Expert",
        summaryOfProfessionalExperience: "Rachel is an expert in cloud strategy and infrastructure modernization, helping enterprises transition to cloud-native architectures while optimizing costs and performance.",
        relevantExperience: `Cloud Solutions Architect, Deloitte
        - Designed and implemented a hybrid cloud architecture for a multinational retailer.
        - Developed automated infrastructure provisioning using Terraform and Kubernetes.
        
        Senior Cloud Engineer, CloudTech
        - Led a cloud migration project, reducing operational costs by 35%.
        - Built CI/CD pipelines for faster application deployments, reducing release cycles by 50%.`,
        selectedClients: "Automobile Manufacturers, Global Logistics Providers"
    },
    {
        username: "tlee",
        email: "tlee@deloitte.com",
        dpnProfileLink: "https://people.deloitte/profile/tlee",
        profileImage: "https://i.pravatar.cc/300?img=12",
        name: "Thomas Lee",
        title: "Business Analyst",
        officialTitle: "Consultant",
        costCenter: "Strategy & Operations, Business Transformation",
        businessSkills: ["Process Improvement", "Market Research", "Stakeholder Communication"],
        technologySkills: ["Tableau, Power BI, Excel, SQL, BPMN"],
        industryExperience: ["Energy, Insurance, Technology"],
        education: "BBA in Business Analytics, University of Chicago",
        languages: "English, Mandarin",
        certificates: "Certified Business Analysis Professional (CBAP)",
        summaryOfProfessionalExperience: "Thomas is a results-driven business analyst with expertise in process optimization, data analysis, and strategic decision-making. He has advised multinational clients on business process improvements.",
        relevantExperience: `Business Analyst, Deloitte
        - Conducted business process reengineering for an energy company, improving efficiency by 20%.
        - Developed interactive dashboards in Tableau for data-driven decision-making.
        
        Market Analyst, Tech Innovations
        - Led market research initiatives to identify new product opportunities.
        - Provided financial modeling insights for investment planning.`,
        selectedClients: "Fortune 500 Tech Firms, Global Insurance Companies"
    }
];


