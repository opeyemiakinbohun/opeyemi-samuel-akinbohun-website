import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Notes } from "./Notes";
import { Pipeline } from "./Pipeline";

const components = {
  Pipeline,
  Notes,
  table: (props: React.ComponentProps<"table">) => (
    <div className="table-scroll"><table {...props} /></div>
  ),
};

/** Renders trusted, repository-authored MDX only. Never pass visitor input here. */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose mdx-body">
      <MDXRemote source={source} components={components} options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }} />
    </div>
  );
}
