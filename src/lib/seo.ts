import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMeta({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: "website" | "article" | "profile" }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, type, siteName: site.name, locale: site.locale },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function personJsonLd() {
  const sameAs = [site.contact.linkedin, site.contact.github].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phoneDisplay,
    jobTitle: "Cybersecurity PhD researcher",
    affiliation: { "@type": "CollegeOrUniversity", name: "University of Huddersfield" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Huddersfield" },
    ],
    address: { "@type": "PostalAddress", addressLocality: "Huddersfield", addressCountry: "GB" },
    knowsAbout: ["Applied cryptography", "Homomorphic encryption", "IoT security", "Digital forensics", "Network analysis", "Machine learning", "Python"],
    sameAs,
  };
}
