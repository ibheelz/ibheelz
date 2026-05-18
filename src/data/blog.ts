export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "CTF" | "Web" | "Network" | "Dev";
  readTime: number;
  date: string;
  content?: string;
}

export const posts: BlogPost[] = [
  {
    slug: "htb-machine-walkthrough",
    title: "HackTheBox Machine Walkthrough: Exploiting SSTI",
    description: "Deep dive into exploiting Server-Side Template Injection vulnerabilities in a real HackTheBox machine.",
    category: "CTF",
    readTime: 12,
    date: "2025-01-15",
    content: "This is a placeholder for the full blog post content.",
  },
  {
    slug: "web-app-penetration-testing-guide",
    title: "Web Application Penetration Testing: A Complete Guide",
    description: "Comprehensive guide covering reconnaissance, scanning, exploitation, and reporting for web app security.",
    category: "Web",
    readTime: 18,
    date: "2025-01-10",
    content: "This is a placeholder for the full blog post content.",
  },
  {
    slug: "network-reconnaissance-osint",
    title: "Advanced OSINT Techniques for Network Reconnaissance",
    description: "Learn passive reconnaissance methods using free tools to gather intelligence on target networks.",
    category: "Network",
    readTime: 14,
    date: "2025-01-05",
    content: "This is a placeholder for the full blog post content.",
  },
];
