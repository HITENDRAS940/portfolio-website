export const projects = [
  {
    name: 'Hyper',
    role: 'Sports booking / Mobile',
    year: '2025',
    description:
      'A production sports-booking application published on Google Play and the App Store, with concurrency-safe slot booking, Razorpay payments, dynamic pricing, settlements, and failure-safe booking states.',
    stack: 'Expo, Spring Boot, PostgreSQL, Docker',
    links: [
      ['github', 'https://github.com/HITENDRAS940/hyper_render_prod.git'],
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
