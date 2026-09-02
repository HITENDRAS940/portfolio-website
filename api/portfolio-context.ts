import { profiles, projects, skillGroups } from '../src/portfolio-data.js';

const projectContext = projects
  .map((project) => {
    const links = project.links
      .map(([label, href]) => `${label}: ${href}`)
      .join('; ');

    return [
      `- ${project.name} (${project.year})`,
      `Role: ${project.role}`,
      `Description: ${project.description}`,
      `Stack: ${project.stack}`,
      `Links: ${links}`,
    ].join('. ');
  })
  .join('\n');

const skillsContext = skillGroups
  .map(([group, value]) => `- ${group}: ${value}`)
  .join('\n');

const profilesContext = profiles
  .map(([label, detail, href]) => `- ${label}: ${detail}. ${href}`)
  .join('\n');

export const portfolioContext = `
Name: Hitendra Singh Shaktawat
Location: Udaipur, India
Status: Open to opportunities
Primary focus: Backend engineering and distributed systems
Profile: Java-first backend engineer and Computer Science student at VIT Vellore. He builds transaction-safe APIs, event-driven services, and production systems.

Education:
- Vellore Institute of Technology, Vellore, India
- B.Tech in Computer Science and Engineering
- 2023 - 2027
- CGPA: 8.43 / 10 as of July 2026

Skills:
${skillsContext}

Projects and GitHub repositories:
The following project list comes from Hitendra's public GitHub repositories and portfolio data. Some small learning or practice repositories have limited public metadata, so describe those conservatively.
${projectContext}

Public profiles:
${profilesContext}

Contact:
- Email: hitendras940@gmail.com
- Phone: +91 94606 29707
`.trim();
