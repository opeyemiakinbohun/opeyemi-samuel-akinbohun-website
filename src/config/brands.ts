/**
 * Brand asset register. Every logo shown on the site is listed here with its
 * source and the relationship it represents. Nothing is drawn from scratch.
 *
 * kind "icon": the official mark as published in the Simple Icons project
 *   (simpleicons.org, SVG data released under CC0). Trademarks remain the
 *   property of their owners and are used only to identify the organisation.
 * kind "file": an official file the owner has supplied in /public/logos.
 * kind "text": no lawful source available yet. The name is shown as plain
 *   text until the owner adds the official file and switches kind to "file".
 */
import {
  siAcm,
  siBarclays,
  siEclipsemosquitto,
  siElsevier,
  siGit,
  siGithub,
  siHomeassistant,
  siHuawei,
  siIeee,
  siJupyter,
  siLinux,
  siMqtt,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPrisma,
  siNeon,
  siTypescript,
  siPython,
  siScikitlearn,
  siStellar,
  siUbuntu,
  siVercel,
  siVirtualbox,
  siWireshark,
  siZenodo,
} from "simple-icons";

type SimpleIcon = { title: string; path: string; hex: string };

type Common = { id: string; name: string; guidelines?: string; /** Show in the brand's own colour by default. */ brandColour?: boolean };
export type Brand =
  | (Common & { kind: "icon"; icon: SimpleIcon })
  | (Common & { kind: "file"; src: string; width: number; height: number })
  | (Common & { kind: "text"; short?: string });

const icon = (id: string, name: string, i: SimpleIcon, guidelines?: string, brandColour = false): Brand => ({ id, name, kind: "icon", icon: i, guidelines, brandColour });
const text = (id: string, name: string, short?: string, guidelines?: string): Brand => ({ id, name, kind: "text", short, guidelines });

export const brands: Record<string, Brand> = {
  // Education and academic
  huddersfield: { id: "huddersfield", name: "University of Huddersfield", kind: "file", src: "/logos/university-of-huddersfield.png", width: 320, height: 320 },
  strathclyde: { id: "strathclyde", name: "University of Strathclyde", kind: "file", src: "/logos/strathclyde.png", width: 496, height: 160, guidelines: "https://www.strath.ac.uk/" },
  spriteplus: { id: "spriteplus", name: "SPRITE+", kind: "file", src: "/logos/spriteplus.png", width: 970, height: 432, guidelines: "https://spritehub.org/" },

  // Credentials
  isc2: { id: "isc2", name: "ISC2 Certified in Cybersecurity", kind: "file", src: "/logos/isc2-cc.png", width: 512, height: 512, guidelines: "https://www.isc2.org/" },
  huawei: icon("huawei", "Huawei", siHuawei, "https://e.huawei.com/ph/material/partner/0a72728b864949c48b22106454352483", true),
  azure: { id: "azure", name: "Microsoft", kind: "file", src: "/logos/microsoft.png", width: 960, height: 960, guidelines: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks" },

  // Research venues and publishers
  ieee: icon("ieee", "IEEE", siIeee, "https://brand-experience.ieee.org/guidelines/brand-identity/"),
  acm: icon("acm", "ACM", siAcm),
  elsevier: icon("elsevier", "Elsevier", siElsevier),
  scientificreports: { id: "scientificreports", name: "Scientific Reports (Springer Nature)", kind: "file", src: "/logos/springer-nature.png", width: 682, height: 298, guidelines: "https://www.springernature.com/" },
  iet: { id: "iet", name: "IET Blockchain", kind: "file", src: "/logos/iet.png", width: 1260, height: 649, guidelines: "https://www.theiet.org/" },
  zenodo: icon("zenodo", "Zenodo", siZenodo, "https://about.zenodo.org"),

  // Career
  barclays: icon("barclays", "Barclays", siBarclays),

  // Contact
  github: icon("github", "GitHub", siGithub, "https://github.com/logos"),
  linkedin: text("linkedin", "LinkedIn", "in", "https://brand.linkedin.com/"),

  // Technology
  python: icon("python", "Python", siPython, "https://www.python.org/community/logos/"),
  homeassistant: icon("homeassistant", "Home Assistant", siHomeassistant, "https://design.home-assistant.io/#brand/logo"),
  wireshark: icon("wireshark", "Wireshark", siWireshark),
  mqtt: icon("mqtt", "MQTT", siMqtt),
  mosquitto: icon("mosquitto", "Eclipse Mosquitto", siEclipsemosquitto),
  linux: icon("linux", "Linux", siLinux),
  ubuntu: icon("ubuntu", "Ubuntu", siUbuntu, "https://design.ubuntu.com/brand"),
  virtualbox: icon("virtualbox", "VirtualBox", siVirtualbox),
  git: icon("git", "Git", siGit),
  pandas: icon("pandas", "pandas", siPandas),
  numpy: icon("numpy", "NumPy", siNumpy),
  scikitlearn: icon("scikitlearn", "scikit-learn", siScikitlearn),
  jupyter: icon("jupyter", "Jupyter", siJupyter, "https://github.com/jupyter/design"),
  nextjs: icon("nextjs", "Next.js", siNextdotjs),
  vercel: icon("vercel", "Vercel", siVercel),
  stellar: icon("stellar", "Stellar", siStellar, "https://stellar.org/brand-resources"),
  typescript: icon("typescript", "TypeScript", siTypescript, "https://www.typescriptlang.org/branding"),
  prisma: icon("prisma", "Prisma", siPrisma),
  neon: icon("neon", "Neon", siNeon),
};

export const brand = (id: string) => brands[id];
export const isWide = (id: string) => { const b = brands[id]; return !!b && b.kind === "file" && b.width / b.height > 1.6; };
