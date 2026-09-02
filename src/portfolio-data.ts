export const projects = [
  {
    name: 'Hyper',
    role: 'Sports booking / Mobile',
    year: '2026',
    description:
      'A production sports-booking application published on Google Play and the App Store, with concurrency-safe slot booking, Razorpay payments, dynamic pricing, settlements, and failure-safe booking states.',
    stack: 'Expo, Spring Boot, PostgreSQL, Docker',
    links: [
      [
        'github',
        'https://github.com/HITENDRAS940/hyper_render_prod.git'
      ],
      [
        'play-store',
        'https://play.google.com/store/apps/details?id=com.hitendras940.hyper',
      ],
      [
        'app-store',
        'https://apps.apple.com/us/app/hyper-book-sports-more/id6759787068',
      ],
    ],
  },
  {
    name: 'Video Streaming Platform',
    role: 'Event-driven / Microservices',
    year: '2026',
    description:
      'A distributed video platform with separate catalog, upload, encoding, and playback services. Kafka coordinates asynchronous workflows while FFmpeg produces adaptive HLS streams stored on AWS S3.',
    stack: 'Spring Boot, Kafka, PostgreSQL, AWS S3, FFmpeg',
    links: [['github', 'https://github.com/HITENDRAS940/Netflix.git']],
  },
  {
    name: 'Ticket Booking System',
    role: 'Booking platform / Full stack',
    year: '2026',
    description:
      'A production-oriented booking platform for movies and concerts. Customers can browse events, hold and book seats, receive QR tickets, cancel bookings, and join category-based waitlists while organisers and admins manage events, venues, layouts, and summaries.',
    stack:
      'React 19, Vite, Tailwind CSS, FastAPI, SQLAlchemy, Alembic, PostgreSQL, JWT, WebSockets',
    links: [
      ['github', 'https://github.com/HITENDRAS940/ticket-booking-system'],
    ],
  },
  {
    name: 'Hotreload',
    role: 'Developer tooling / CLI',
    year: '2026',
    description:
      'A Go-based CLI tool that watches source files, rebuilds projects, restarts servers, streams logs, debounces rapid saves, handles process groups, detects crashes, and prevents crash loops during backend development.',
    stack: 'Go, fsnotify, process management',
    links: [['github', 'https://github.com/HITENDRAS940/hotreload']],
  },
  {
    name: 'DDAS Chrome Extension',
    role: 'Download intelligence / Browser extension',
    year: '2025',
    description:
      'Data Duplication Alert System for intelligent download management. It monitors downloads, detects duplicate files, and combines a Chrome extension frontend with backend and middleware services.',
    stack: 'Chrome Extension, Java, Spring Boot, Python, JavaScript, AWS',
    links: [
      ['github', 'https://github.com/HITENDRAS940/ddas-chrome-extension'],
    ],
  },
  {
    name: 'E-commerce Backend API',
    role: 'Backend API / Commerce',
    year: '2025',
    description:
      'A Spring Boot e-commerce REST API with JWT authentication, cookie and header auth support, role-based access for admin, user, and seller roles, secure password handling, product management, and shopping-cart workflows.',
    stack: 'Java, Spring Boot, Spring Security, JWT',
    links: [['github', 'https://github.com/HITENDRAS940/E-commerce1']],
  },
  {
    name: 'CryptoMesh Frontend',
    role: 'Android frontend / Crypto',
    year: '2026',
    description:
      'Android frontend work-in-progress for CryptoMesh with Kotlin project structure, Jetpack Compose setup, Material 3 theming, and a bottom-navigation app shell.',
    stack: 'Kotlin, Jetpack Compose, Material 3',
    links: [['github', 'https://github.com/HITENDRAS940/cryptomesh-frontend']],
  },
  {
    name: 'Portfolio Website',
    role: 'Personal portfolio / AI terminal',
    year: '2026',
    description:
      'This React, TypeScript, and Vite portfolio with a terminal-oriented interface, command navigation, resume and social links, and an AI-powered ask command backed by a Vercel serverless API.',
    stack: 'React, TypeScript, Vite, CSS, Vercel, Gemini API',
    links: [
      ['github', 'https://github.com/HITENDRAS940/portfolio-website'],
      ['live', 'https://portfolio-website-seven-iota-34.vercel.app'],
    ],
  },
  {
    name: 'Hyper Manager',
    role: 'Admin dashboard / Operations',
    year: '2026',
    description:
      'Admin and manager dashboard UI for the Hyper ecosystem, based on a dashboard design bundle and deployed as a Vercel frontend for operations-facing workflows.',
    stack: 'TypeScript, CSS, JavaScript, HTML, Vercel',
    links: [
      ['github', 'https://github.com/HITENDRAS940/Hyper-Manager'],
      ['live', 'https://hyper-manager.vercel.app'],
    ],
  },
  {
    name: 'Hyper Admin App',
    role: 'Admin app / Hyper ecosystem',
    year: '2026',
    description:
      'TypeScript admin application work for the Hyper ecosystem, covering management-side interfaces around the sports booking product.',
    stack: 'TypeScript, JavaScript',
    links: [['github', 'https://github.com/HITENDRAS940/hyper_admin_app']],
  },
  {
    name: 'Hyper Invoice Generator Backend',
    role: 'Backend service / Invoicing',
    year: '2026',
    description:
      'Java backend service connected to the Hyper ecosystem for invoice-generation workflows.',
    stack: 'Java, HTML, Dockerfile',
    links: [
      [
        'github',
        'https://github.com/HITENDRAS940/Hyper-invoice-generator-backend',
      ],
    ],
  },
  {
    name: 'Hyper Backend',
    role: 'Backend API / Hyper early backend',
    year: '2026',
    description:
      'Earlier Java backend repository for the Hyper sports-booking product before the production backend evolved into the current Hyper backend.',
    stack: 'Java, Dockerfile',
    links: [['github', 'https://github.com/HITENDRAS940/hyper_backend']],
  },
  {
    name: 'Turf',
    role: 'Sports booking / Web frontend',
    year: '2026',
    description:
      'Web frontend for a turf-booking experience, deployed on Vercel as part of the broader sports booking product exploration.',
    stack: 'JavaScript, CSS, HTML, Vercel',
    links: [
      ['github', 'https://github.com/HITENDRAS940/Turf'],
      ['live', 'https://hyper-snowy.vercel.app'],
    ],
  },
  {
    name: 'Arena51 Master',
    role: 'Turf booking / Mobile app',
    year: '2025',
    description:
      'Comprehensive turf-booking mobile app codebase with real-time slot availability, theme system, payment simulation, and admin-management capabilities.',
    stack: 'React Native, Expo, TypeScript, C++, Kotlin, Swift',
    links: [['github', 'https://github.com/HITENDRAS940/Arena51-master']],
  },
  {
    name: 'ServiceBookingApp RN',
    role: 'React Native / Service booking',
    year: '2025',
    description:
      'React Native service-booking application codebase with booking flows, mobile UI structure, and Expo/TypeScript implementation.',
    stack: 'React Native, Expo, TypeScript, Shell',
    links: [['github', 'https://github.com/HITENDRAS940/ServiceBookingApp_RN']],
  },
  {
    name: 'Turf RN v1',
    role: 'React Native / Turf booking',
    year: '2025',
    description:
      'React Native turf-booking app iteration with real-time slot availability, theming, payment simulation, and admin-management features.',
    stack: 'React Native, Expo, TypeScript, Shell',
    links: [['github', 'https://github.com/HITENDRAS940/turf-rn-v1']],
  },
  {
    name: 'Turf RN',
    role: 'React Native / Turf booking',
    year: '2025',
    description:
      'Earlier React Native turf-booking app iteration in TypeScript, part of the progression toward the production Hyper app.',
    stack: 'React Native, Expo, TypeScript, Shell',
    links: [['github', 'https://github.com/HITENDRAS940/turf-rn']],
  },
  {
    name: 'Turf React Native Frontend',
    role: 'Mobile frontend / Turf booking',
    year: '2025',
    description:
      'React Native conversion of a turf-booking web app, with Expo and TypeScript mobile screens for user booking flows.',
    stack: 'React Native, Expo, TypeScript, Shell',
    links: [
      ['github', 'https://github.com/HITENDRAS940/turf-react-native-frontend'],
    ],
  },
  {
    name: 'Turf Booking Frontend',
    role: 'Mobile frontend / Turf booking',
    year: '2025',
    description:
      'React Native frontend repository for turf booking, converted from web app patterns into Expo and TypeScript mobile screens.',
    stack: 'React Native, Expo, TypeScript, Shell',
    links: [
      ['github', 'https://github.com/HITENDRAS940/Turf-booking-frontend'],
    ],
  },
  {
    name: 'Admin Manager Portal',
    role: 'Admin dashboard / UI',
    year: '2026',
    description:
      'Admin and manager dashboard frontend code bundle with TypeScript, CSS, JavaScript, and HTML implementation.',
    stack: 'TypeScript, CSS, JavaScript, HTML',
    links: [['github', 'https://github.com/HITENDRAS940/admin_manager_portal']],
  },
  {
    name: 'G2GNN',
    role: 'Machine learning / Graph neural networks',
    year: '2026',
    description:
      'PyTorch Geometric implementation of graph-of-graph neural network models for imbalanced graph classification, based on the G2GNN research codebase.',
    stack: 'Python, PyTorch Geometric, Shell',
    links: [['github', 'https://github.com/HITENDRAS940/G2GNN']],
  },
  {
    name: 'NeetCode Submissions',
    role: 'DSA practice / Interview prep',
    year: '2026',
    description:
      'Synced Java solutions for NeetCode coding interview problems, used to track accepted problem-solving submissions.',
    stack: 'Java',
    links: [['github', 'https://github.com/HITENDRAS940/neetcode-submissions']],
  },
  {
    name: 'Social Media Backend',
    role: 'Backend API / Social platform',
    year: '2025',
    description:
      'Java backend repository for social-media platform APIs and backend learning around social product features.',
    stack: 'Java',
    links: [['github', 'https://github.com/HITENDRAS940/social-media-backend']],
  },
  {
    name: 'Result Management Backend',
    role: 'Backend API / Education',
    year: '2025',
    description:
      'Java backend repository for result-management workflows and academic record handling.',
    stack: 'Java',
    links: [
      ['github', 'https://github.com/HITENDRAS940/resultManagementBackend'],
    ],
  },
  {
    name: 'Spring Result Management Backend',
    role: 'Spring backend / Education',
    year: '2025',
    description:
      'Spring-oriented Java backend repository for result-management workflows.',
    stack: 'Java, Spring',
    links: [
      [
        'github',
        'https://github.com/HITENDRAS940/springResultManagementBackend',
      ],
    ],
  },
  {
    name: 'E-commerce',
    role: 'Backend API / Commerce practice',
    year: '2025',
    description:
      'Earlier Java e-commerce backend repository used before the larger E-commerce1 backend API.',
    stack: 'Java',
    links: [['github', 'https://github.com/HITENDRAS940/E-commerce']],
  },
  {
    name: 'Ariha Frontend',
    role: 'Frontend / Vite app',
    year: '2025',
    description:
      'Small React and Vite frontend deployed on Vercel, based on a standard Vite setup.',
    stack: 'JavaScript, CSS, HTML, Vercel',
    links: [
      ['github', 'https://github.com/HITENDRAS940/ariha-frontend'],
      ['live', 'https://ariha-frontend.vercel.app'],
    ],
  },
  {
    name: 'Amazon Clone',
    role: 'Frontend practice / E-commerce UI',
    year: '2024',
    description:
      'HTML frontend practice project recreating an Amazon-style shopping interface.',
    stack: 'HTML',
    links: [['github', 'https://github.com/HITENDRAS940/amazon-clone']],
  },
  {
    name: 'HTML Portfolio',
    role: 'Portfolio practice / HTML',
    year: '2024',
    description:
      'Early HTML portfolio project used while learning static website structure.',
    stack: 'HTML',
    links: [['github', 'https://github.com/HITENDRAS940/html-portfolio']],
  },
  {
    name: 'RPS',
    role: 'Frontend practice / Game',
    year: '2025',
    description: 'Small HTML rock-paper-scissors practice project.',
    stack: 'HTML',
    links: [['github', 'https://github.com/HITENDRAS940/RPS']],
  },
  {
    name: 'Backend Learning',
    role: 'Learning repository / Backend',
    year: '2025',
    description:
      'JavaScript backend-learning repository used for backend fundamentals and practice work.',
    stack: 'JavaScript',
    links: [['github', 'https://github.com/HITENDRAS940/backend_learning']],
  },
  {
    name: 'Learn',
    role: 'Learning repository / JavaScript',
    year: '2025',
    description:
      'JavaScript learning repository for programming and web-development practice.',
    stack: 'JavaScript',
    links: [['github', 'https://github.com/HITENDRAS940/learn']],
  },
  {
    name: 'React Learning',
    role: 'Learning repository / React',
    year: '2025',
    description: 'React learning repository created for frontend practice.',
    stack: 'React',
    links: [['github', 'https://github.com/HITENDRAS940/react-learning']],
  },
  {
    name: 'Chai Aur React',
    role: 'Learning repository / React',
    year: '2025',
    description:
      'React learning repository following Chai aur React style practice work.',
    stack: 'React',
    links: [['github', 'https://github.com/HITENDRAS940/chai-aur-react']],
  },
  {
    name: 'Smart Parking',
    role: 'Prototype / Parking automation',
    year: '2026',
    description:
      'Smart-parking prototype repository with Python listed in GitHub language metadata.',
    stack: 'Python',
    links: [['github', 'https://github.com/HITENDRAS940/Smart_parking']],
  },
  {
    name: 'React Native CI/CD Pipeline Automation',
    role: 'DevOps practice / Mobile CI/CD',
    year: '2026',
    description:
      'Repository for React Native CI/CD pipeline automation practice.',
    stack: 'CI / CD, React Native',
    links: [
      [
        'github',
        'https://github.com/HITENDRAS940/react-native-CI-CD-pipeline-automation',
      ],
    ],
  },
  {
    name: 'Prac Repo',
    role: 'Practice repository / Java',
    year: '2025',
    description: 'Small Java practice repository from GitHub profile metadata.',
    stack: 'Java',
    links: [['github', 'https://github.com/HITENDRAS940/prac-repo']],
  },
  {
    name: 'Prac2',
    role: 'Practice repository',
    year: '2025',
    description: 'Small practice repository with limited public metadata.',
    stack: 'Practice',
    links: [['github', 'https://github.com/HITENDRAS940/prac2']],
  },
  {
    name: 'Prac',
    role: 'Practice repository',
    year: '2025',
    description: 'Small practice repository with limited public metadata.',
    stack: 'Practice',
    links: [['github', 'https://github.com/HITENDRAS940/prac']],
  },
  {
    name: 'MergingPrac',
    role: 'Git practice / Merging',
    year: '2025',
    description: 'Practice repository for Git merging workflows.',
    stack: 'Git',
    links: [['github', 'https://github.com/HITENDRAS940/mergingPrac']],
  },
  {
    name: 'Web',
    role: 'Practice repository / Web',
    year: '2025',
    description: 'Web-practice repository with limited public metadata.',
    stack: 'Web',
    links: [['github', 'https://github.com/HITENDRAS940/web']],
  },
  {
    name: 'Web Class Project',
    role: 'Class project / Web',
    year: '2025',
    description: 'Web class project repository with limited public metadata.',
    stack: 'Web',
    links: [['github', 'https://github.com/HITENDRAS940/web-class-project']],
  },
] as const;

export const skillGroups = [
  ['languages', 'Java, Python, C++, SQL'],
  ['backend', 'Spring Boot, Spring Security, JPA / Hibernate, REST APIs'],
  ['systems', 'PostgreSQL, Apache Kafka, Microservices, FFmpeg'],
  ['cloud', 'AWS, Docker, GitHub Actions, CI / CD'],
] as const;

export const profiles = [
  ['github', 'Code and projects', 'https://github.com/HITENDRAS940'],
  [
    'linkedin',
    'Experience and network',
    'https://www.linkedin.com/in/hitendra-singh-shaktawat-479758289/',
  ],
  ['leetcode', 'Problem solving', 'https://leetcode.com/u/hitendras940/'],
  [
    'geeksforgeeks',
    'DSA practice',
    'https://www.geeksforgeeks.org/user/hitendrij72/',
  ],
] as const;
