/**
 * Site-wide configuration. Everything that identifies the owner, controls
 * navigation or switches a feature lives here, so pages never hardcode it.
 */

export const site = {
  name: "Opeyemi Samuel Akinbohun",
  monogram: "OSA",
  role: "Cybersecurity PhD researcher, University of Huddersfield",
  researchFocus: "Privacy-preserving smart-home IoT security",
  descriptor: "Cybersecurity researcher | Applied cryptography | Security engineering",
  description:
    "Opeyemi Samuel Akinbohun is a cybersecurity PhD researcher at the University of Huddersfield working on applied cryptography, smart-home IoT security, network analysis, digital forensics and machine learning. Open to UK industry and academic roles, including lecturing, postdoctoral and fellowship posts, from January 2028.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_GB",
  location: "Huddersfield, United Kingdom",

  contact: {
    email: "opeyemi.akinbohun@hud.ac.uk",
    phoneDisplay: "+44 7466 345053",
    phoneHref: "+447466345053",
    linkedin: "https://www.linkedin.com/in/opeyemi-akinbohun-610a48258/",
    linkedinLabel: "linkedin.com/in/opeyemi-akinbohun-610a48258",
    /** Left null until the owner confirms which account is public. */
    github: "https://github.com/opeyemiakinbohun/" as string | null,
  },

  availability: {
    status: "Open to industry and academic roles in the UK",
    start: "From January 2028, after PhD completion",
    startShort: "From January 2028",
    mobility: "Willing to relocate anywhere in the UK",
    workAuthorisation:
      "Please ask me directly and I will confirm the details that apply to your role and start date.",
  },

  /**
   * The CV PDF served from /public. Replace the file with your own approved
   * CV at the same path (or change this path) and every download button
   * updates. The bundled file is generated from this site's content.
   */
  cvFile: "/cv/Opeyemi-Samuel-Akinbohun-CV.pdf",
  cvLabel: "Download CV (PDF)",

  personal: {
    drivingLicence: "In progress",
    az104: "Preparation in progress, exam planned for 2027",
  },

  features: {
    /** Drafts are shown only when SHOW_DRAFTS=true (private previews). */
    showDrafts: process.env.SHOW_DRAFTS === "true",
  },
} as const;

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items?: NavItem[] };

/** Header navigation: grouped so the bar stays clean on every screen. */
export const navigation: NavGroup[] = [
  {
    label: "Work",
    href: "/projects",
    items: [
      { label: "All projects", href: "/projects", description: "Case studies with the evidence behind them" },
      { label: "MSc machine learning", href: "/projects/phishing-url-detection-machine-learning", description: "Phishing URL detection, eight classifiers" },
      { label: "Digital forensics", href: "/projects/digital-forensics", description: "MSc practicals with FTK Imager, Autopsy and EnCase" },
      { label: "Azure Cloud Lab", href: "/cloud-lab", description: "AZ-104 preparation and hands-on labs" },
    ],
  },
  { label: "Academic", href: "/academic-activities" },
  {
    label: "Articles",
    href: "/insights",
    items: [
      { label: "All articles", href: "/insights", description: "Technical writing and explainers" },
      { label: "Policy briefs", href: "/policy", description: "Cyber, cryptography and financial policy" },
    ],
  },
  { label: "Career Journey", href: "/career" },
  { label: "About", href: "/about" },
];

export const footerLinks: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Academic activities", href: "/academic-activities" },
  { label: "Articles", href: "/insights" },
  { label: "Policy briefs", href: "/policy" },
  { label: "Azure Cloud Lab", href: "/cloud-lab" },
  { label: "Career Journey", href: "/career" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy", href: "/privacy" },
  { label: "RSS", href: "/rss.xml" },
];
