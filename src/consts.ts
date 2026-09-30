export const SITE = {
  title: "Michael Melton",
  description:
    "Michael Melton is an IT professional in Chino, California, who builds internal tools and platforms for M&A discovery.",
  url: "https://michaelmelton.dev",
  author: "Michael Melton",
  locale: "en-US",
} as const;

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
];

export const SOCIALS: { href: string; label: string }[] = [
  { href: "mailto:mmelton13@gmail.com", label: "Email" },
  { href: "https://github.com/mmelton1", label: "GitHub" },
  { href: "https://www.linkedin.com/in/mjmelton", label: "LinkedIn" },
];

// Home page intro. Kept short on purpose; the longer version lives on /about/.
export const INTRO: string[] = [
  "I'm Michael, an IT professional in Chino, California. Every acquisition I work on comes with systems nobody on our side has seen: mailboxes, devices, domains and software, usually undocumented. I handle the discovery, turning all of it into clean, actionable data for planning the integration. I also build internal tools that gather most of that data automatically and keep it current as the systems change. Find some of the projects I've worked on below.",
];
