export interface ExperienceEntry {
  type: "work" | "ctf";
  title: string;
  org: string;
  dateRange: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    type: "work",
    title: "Penetration Tester",
    org: "TechSec Consulting",
    dateRange: "2024 - Present",
    bullets: [
      "Conducted security assessments on 15+ web applications",
      "Identified and documented critical vulnerabilities (CVSS 9.0+)",
      "Delivered remediation recommendations to development teams",
    ],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    org: "Digital Innovations Ltd",
    dateRange: "2022 - 2024",
    bullets: [
      "Built scalable web applications using React and Node.js",
      "Reduced API response time by 40% through optimization",
      "Implemented security best practices across 5 production systems",
    ],
  },
  {
    type: "ctf",
    title: "HackTheBox Pro Hacker",
    org: "HackTheBox",
    dateRange: "Rank: Top 5%",
    bullets: [
      "Solved 50+ machines across multiple difficulty levels",
      "Specialized in web exploitation and privilege escalation",
    ],
  },
  {
    type: "ctf",
    title: "TryHackMe Hall of Fame",
    org: "TryHackMe",
    dateRange: "Top 2% Global Rank",
    bullets: [
      "Completed 80+ security training rooms",
      "Active contributor to community challenges",
    ],
  },
];
