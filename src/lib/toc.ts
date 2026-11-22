import GithubSlugger from "github-slugger";

/** Builds a table of contents from level-two headings, matching rehype-slug ids. */
export function getToc(body: string) {
  const slugger = new GithubSlugger();
  return body
    .split("\n")
    .filter((l) => /^##\s/.test(l))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
      return { text, id: slugger.slug(text) };
    });
}
