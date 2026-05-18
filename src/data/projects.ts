export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "web-penetration-framework",
    title: "Web Penetration Testing Framework",
    description: "Automated web security testing tool built with Python and Flask. Identifies OWASP Top 10 vulnerabilities.",
    tags: ["Python", "Security", "Flask"],
    githubUrl: "https://github.com/ibheelz",
    featured: true,
  },
  {
    slug: "discord-bot-security",
    title: "Discord Bot Security Suite",
    description: "Discord bot for real-time security alerts and vulnerability notifications with webhook integrations.",
    tags: ["Node.js", "Discord.js", "Webhooks"],
    githubUrl: "https://github.com/ibheelz",
  },
  {
    slug: "ctf-challenge-solver",
    title: "CTF Challenge Solver",
    description: "Interactive platform for solving and sharing CTF challenges with built-in hint system and leaderboard.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/ibheelz",
  },
];
