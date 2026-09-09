export const SITE_URL = 'https://asifhemel.dev'

export const profile = {
  name: 'Asif Uddin Ahmed Hemel',
  firstName: 'Asif',
  lastName: 'Hemel',
  title: 'Senior Software Engineer',
  tagline: 'Building enterprise-grade web applications with modern technologies',
  email: 'hemel18103112@gmail.com',
  location: 'Dhaka, Bangladesh',
  timezone: 'UTC+6',
  languages: ['English', 'Hindi', 'Bangla'],
  yearsOfExperience: 4.5,
  totalProjects: 25,
  branchesDeployed: 300,
  availability: 'open',
  resumeUrl: '/resume.pdf',
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/hemel18681', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/hemel18681', icon: 'linkedin' },
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01a47be791d9dd0b3c', icon: 'upwork' },
  { name: 'Facebook', url: 'https://www.facebook.com/hemel18681', icon: 'facebook' },
]

export const stats = [
  { label: 'Years Experience', value: 4.5, suffix: '+' },
  { label: 'Projects Delivered', value: 25, suffix: '+' },
  { label: 'Branches Deployed', value: 300, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
]

export const skills = {
  frontend: {
    label: 'Frontend',
    icon: 'layout',
    items: [
      { name: 'React / Next.js', level: 95, icon: 'reactjs' },
      { name: 'Angular / RxJS', level: 92, icon: 'js' },
      { name: 'TypeScript', level: 93, icon: 'ts' },
      { name: 'Tailwind CSS', level: 95, icon: 'tailwind' },
      { name: 'HTML5 / CSS3', level: 98, icon: 'html' },
      { name: 'JavaScript (ES6+)', level: 95, icon: 'js' },
    ],
  },
  backend: {
    label: 'Backend & Microservices',
    icon: 'server',
    items: [
      { name: 'Node.js / NestJS', level: 90, icon: 'nodejs' },
      { name: '.NET / ASP.NET Core', level: 88, icon: 'js' },
      { name: 'C# / Entity Framework', level: 87, icon: 'js' },
      { name: 'REST APIs / GraphQL', level: 92, icon: 'js' },
      { name: 'Microservices Architecture', level: 85, icon: 'js' },
      { name: 'Medusa.js / E-commerce', level: 80, icon: 'js' },
    ],
  },
  cloud: {
    label: 'Cloud & DevOps',
    icon: 'cloud',
    items: [
      { name: 'AWS (EC2, S3, Lambda)', level: 88, icon: 'aws' },
      { name: 'Docker / Containers', level: 87, icon: 'docker' },
      { name: 'CI/CD Pipelines', level: 85, icon: 'github' },
      { name: 'Serverless Architecture', level: 82, icon: 'aws' },
      { name: 'Firebase', level: 85, icon: 'firebase' },
      { name: 'Vercel / Netlify', level: 90, icon: 'vscode' },
    ],
  },
  databases: {
    label: 'Databases & Architecture',
    icon: 'database',
    items: [
      { name: 'PostgreSQL', level: 90, icon: 'mysql' },
      { name: 'MongoDB / NoSQL', level: 88, icon: 'mysql' },
      { name: 'MySQL / MariaDB', level: 87, icon: 'mysql' },
      { name: 'Redis / Caching', level: 80, icon: 'mysql' },
      { name: 'Data Modeling', level: 88, icon: 'mysql' },
      { name: 'Query Optimization', level: 85, icon: 'mysql' },
    ],
  },
}

export const experience = [
  {
    id: 'enosis-senior',
    company: 'Enosis Solutions',
    role: 'Senior Software Engineer',
    period: 'Dec 2024 — Present',
    location: 'Dhaka, Bangladesh',
    description: 'Leading multiple enterprise projects, driving feature development, modernizing legacy systems, and mentoring team members while improving Angular UI/UX and performance by 30-40%.',
    metrics: [
      { label: 'UI/UX & Performance', value: '+30-40%' },
      { label: 'Response Time', value: '+70%' },
      { label: 'Build Process Time', value: '+150%' },
    ],
    achievements: [
      'Improved Angular UI/UX and performance by 30-40% using actions, effects, reducers, RxJS, NgRx, and signals for state management.',
      'Led SQL to NoSQL database migration, improving response time by 70%.',
      'Upgraded Angular and third-party packages for better support, improving build process time by more than 150%.',
      'Implemented the Help and Support feature for a better user experience, resulting in a 20% rise in user count.',
    ],
    tech: ['Angular', 'RxJS', 'NgRx', 'TypeScript', 'Node.js', 'SQL', 'NoSQL', 'AWS'],
  },
  {
    id: 'enosis-software',
    company: 'Enosis Solutions',
    role: 'Software Engineer',
    period: 'Dec 2022 — Nov 2024',
    location: 'Dhaka, Bangladesh',
    description: 'Full-stack development on enterprise asset and file management platforms, redesigning core modules and building predictive analytics and mapping features.',
    metrics: [
      { label: 'File Manager Response', value: '+120%' },
      { label: 'Map Accuracy', value: '+35%' },
      { label: 'Bugs Fixed', value: '100+' },
    ],
    achievements: [
      'Redesigned a file manager system with folder/file creation, navigation, renaming, copy-paste, extraction, bookmarking, sharing, and deletion, delivering 120% better response time than the previous version.',
      "Developed a feature that analyzes past years' data to generate future probable results, enhancing predictive insights and helping clients decide on their work 50% faster.",
      'Developed a map feature for users to design elements and retrieve area details, giving about 35% more accurate results.',
      'Fixed 100+ bugs, ensuring pinpoint accuracy and enhancing overall software stability and efficiency.',
    ],
    tech: ['Angular', 'RxJS', 'NgRx', 'TypeScript', 'Node.js', 'SQL', 'NoSQL', 'AWS'],
  },
  {
    id: 'implevista',
    company: 'Implevista',
    role: 'Junior Software Engineer',
    period: 'Jul 2021 — Nov 2022',
    location: 'Dhaka, Bangladesh',
    description: 'Redesigned banking software deployed across 300+ branches and built a subscription-based product management tool with integrated HR features.',
    metrics: [
      { label: 'Banking Performance', value: '+200%' },
      { label: 'Branches Covered', value: '300+' },
      { label: 'Reporting Accuracy', value: '100%' },
    ],
    achievements: [
      'Redesigned banking software, achieving a 200%+ performance boost and 100% accurate reporting across 300+ branches.',
      'Developed a subscription-based product management tool with integrated HR features, reaching a 1.5% monthly growth rate and increasing client profits through financial tracking and analysis.',
      'Created an image editing tool with custom options to modify and save detailed images for future editing.',
    ],
    tech: ['Angular', '.NET Core', 'Dapper', 'Entity Framework', 'SQL', 'TypeScript'],
  },
]

export const projects = [
  {
    id: 'banking-core',
    title: 'Core Banking System',
    category: 'Office',
    description: 'Enterprise banking platform serving 300+ branches nationwide. Real-time transaction processing with 200% speed improvement.',
    fullDescription: 'Architected and developed a comprehensive core banking system that serves over 300 branches across Bangladesh. The platform handles real-time transaction processing, account management, loan processing, and regulatory reporting. Led the migration from legacy systems to a modern Angular/.NET stack, resulting in a 200% improvement in processing speed.',
    tech: ['Angular', '.NET', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    image: '/assets/images/projects/banking-core.png',
    metrics: { speed: '+200%', branches: '300+', uptime: '99.9%' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'social-media',
    title: 'Social Media Platform',
    category: 'Office',
    description: 'Full-featured social networking platform with real-time messaging, content sharing, and community features.',
    fullDescription: 'Built a comprehensive social media platform with real-time messaging capabilities, content sharing, user profiles, news feeds, and community management features. Implemented WebSocket-based real-time updates and optimized media delivery.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3', 'Redis'],
    image: '/assets/images/projects/social-media.png',
    metrics: { users: '10K+', realtime: 'WebSocket', perf: '<100ms' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'asset-management',
    title: 'Asset Management System',
    category: 'Office',
    description: 'Enterprise asset tracking and management platform with real-time monitoring and analytics dashboard.',
    fullDescription: 'Developed an enterprise-grade asset management system for tracking physical and digital assets across multiple locations. Features include real-time monitoring, automated alerts, depreciation tracking, and comprehensive analytics dashboards.',
    tech: ['Angular', '.NET', 'SQL Server', 'Chart.js', 'Docker', 'Azure'],
    image: '/assets/images/projects/asset-management.png',
    metrics: { tracking: 'Real-time', assets: '50K+', reports: 'Auto-gen' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'file-management',
    title: 'File Management System',
    category: 'Office',
    description: 'Secure file storage and management platform with version control, sharing, and access control.',
    fullDescription: 'Designed and implemented a secure file management system with features including file versioning, granular access control, real-time collaboration, file sharing with expiring links, and comprehensive audit logging.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'JWT', 'Firebase'],
    image: '/assets/images/projects/file-management.png',
    metrics: { storage: 'AWS S3', versioning: 'Yes', security: 'Enterprise' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'product-management',
    title: 'Product Management Platform',
    category: 'Personal - Web',
    description: 'Kanban-style product management tool with sprint planning, backlog management, and team collaboration.',
    fullDescription: 'Built a comprehensive product management platform inspired by Jira and Trello. Features include Kanban boards, sprint planning, backlog management, time tracking, team collaboration tools, and detailed reporting dashboards.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    image: '/assets/images/projects/product-management.png',
    metrics: { features: '50+', boards: 'Kanban', agile: 'Scrum' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'hostility-detection',
    title: 'AI Hostility Detection',
    category: 'Personal - Web',
    description: 'Research project on human hostility detection using deep learning. Presented at FCV 2022 Japan.',
    fullDescription: 'Research project implementing deep learning models for human hostility detection from video sequences. Published and presented at the International Conference on Frontiers of Computer Vision (FCV 2022) in Japan. Achieved 94% accuracy using CNN-LSTM architecture.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'CNN', 'LSTM', 'NumPy'],
    image: '/assets/images/projects/hostility-detection.png',
    metrics: { accuracy: '94%', conference: 'FCV 2022', country: 'Japan' },
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'expense-tracker-mobile',
    title: 'Expense Tracker Mobile',
    category: 'Personal - Mobile',
    description: 'Local-first Android finance app for expenses, accounts, investments, loans, reports, and multi-currency tracking.',
    fullDescription: 'Built a private, local-first personal finance application for Android with feature parity across expenses, cash and bank accounts, cards, mobile financial services, investments, loans, categories, and reports. The Expo and React Native app stores day-to-day financial data on-device, supports exchange rates and light/dark themes, and gives users portable JSON backup and restore. APK v1.0.0 is available for Android.',
    tech: ['Expo', 'React Native', 'TypeScript', 'Zustand', 'AsyncStorage', 'Zod'],
    image: '/assets/images/projects/expense-tracker-mobile-cover-v2.png',
    metrics: { release: 'v1.0.0', modules: '10+', storage: 'Local-first' },
    liveUrl: '',
    githubUrl: '',
  },
]

export const achievements = [
  {
    id: 'icpc',
    title: 'ICPC Dhaka Regional',
    year: '2020',
    description: 'Honorable Mention at ICPC Dhaka Regional Contest',
    icon: 'trophy',
  },
  {
    id: 'ncpc',
    title: 'NCPC Bangladesh',
    year: '2020',
    description: 'Honorable Mention at National Collegiate Programming Contest',
    icon: 'award',
  },
  {
    id: 'iubat-champion',
    title: 'IUBAT Programming Champion',
    year: '2021',
    description: 'Champion of IUBAT Intra University Programming Contest',
    icon: 'medal',
  },
  {
    id: 'fcv-japan',
    title: 'FCV 2022 Japan',
    year: '2022',
    description: 'Research paper presentation at International Conference on Frontiers of Computer Vision, Japan',
    icon: 'globe',
  },
  {
    id: 'book-publication',
    title: 'Published Author',
    year: '2021',
    description: 'Co-authored "৫৫টি প্রোগ্রামিং সমস্যা ও সমাধান" — a competitive programming problem book',
    icon: 'book',
  },
]

export const testimonials = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    role: 'CTO, TechVentures Inc.',
    text: 'Asif delivered exceptional work on our enterprise platform. His expertise in Angular and .NET resulted in a 200% performance improvement. Highly recommended for complex projects.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: 't2',
    name: 'Rafiq Ahmed',
    role: 'Product Manager, FinBank',
    text: 'Working with Asif was a game-changer for our banking system migration. His deep understanding of microservices architecture and AWS helped us deploy across 300+ branches seamlessly.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/rafiq/100/100',
  },
  {
    id: 't3',
    name: 'David Chen',
    role: 'Founder, StartupLab',
    text: 'Asif built our MVP from scratch in just 8 weeks. His full-stack capabilities and attention to detail are outstanding. The platform handles thousands of users daily without issues.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/david/100/100',
  },
]

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Lab', href: '#ai-tools' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
]

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'IUBAT — International University of Business Agriculture and Technology',
    year: '2021',
    location: 'Dhaka, Bangladesh',
  },
]

export const conferences = [
  {
    title: 'Human Hostility Detection via Deep Learning',
    conference: 'International Conference on Frontiers of Computer Vision (FCV 2022)',
    paper: 'Human Hostility Detection via Deep Learning',
    location: 'Japan',
    year: '2022',
    type: 'Research Presentation',
    description: 'Presented deep learning research utilizing CNN-LSTM architectures for real-time automated hostility detection in surveillance video streams.',
  },
]

export const books = [
  {
    title: '৫৫টি প্রোগ্রামিং সমস্যা ও সমাধান',
    subtitle: '55 Programming Problems and Solutions',
    role: 'Co-Author',
    year: '2021',
    description: 'A competitive programming problem book covering algorithms, data structures, and problem-solving techniques.',
  },
]

export const aiTools = [
  {
    id: 'pitch-generator',
    name: 'Matchmaker Pitch Generator',
    description: 'Paste a job description and get a tailored proposal that matches your skills to their requirements.',
    icon: 'sparkles',
  },
  {
    id: 'resume-analyzer',
    name: 'CV Validator',
    description: 'Analyze your resume against industry standards and get a detailed competency report.',
    icon: 'file-check',
  },
  {
    id: 'project-ideator',
    name: 'Architecture Ideator',
    description: 'Describe your project and get a full tech stack recommendation with architecture blueprint.',
    icon: 'lightbulb',
  },
  {
    id: 'tech-quiz',
    name: 'Tech Quiz',
    description: 'Test your knowledge with interactive technical questions on various topics.',
    icon: 'brain',
  },
]
