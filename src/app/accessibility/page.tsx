import { PageHead } from "@/components/PageHead";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Accessibility", description: "How this site is built to be accessible, and how to report a problem.", path: "/accessibility" });

const features = [
  "Reading controls in the header: stop motion, larger text, higher contrast, dark theme, a more legible font with wider spacing, and underlined links. Choices are saved on your device.",
  "Your operating system's reduced-motion setting is respected automatically. The only animation on the site is the testbed simulation, which runs only when you press Run.",
  "Every page works with a keyboard alone, with a visible focus outline and a skip link to the main content.",
  "Statuses use text and a shape, never colour alone.",
  "Diagrams have text explanations alongside them, and the interactive timeline announces what is active as you move it.",
  "Pages use semantic headings and landmarks for screen readers, and text meets WCAG 2.2 AA contrast.",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHead crumbs={[{ label: "Accessibility" }]} title="Accessibility" lede="This site aims to meet WCAG 2.2 level AA." />
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap prose">
          <h2>What is in place</h2>
          <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>Reporting a problem</h2>
          <p>If something is hard to use, please email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and tell me the page and what went wrong.</p>
        </div>
      </section>
    </>
  );
}
