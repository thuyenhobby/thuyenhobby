import ReactMarkdown from "react-markdown";
import type { ComponentProps } from "react";
import { getR2PublicUrl } from "@/lib/r2";

type BookshelfMdxContentProps = {
  content: string;
};

const components: ComponentProps<typeof ReactMarkdown>["components"] = {
  h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-tight">{children}</h3>,
  p: ({ children }) => <p className="mt-5 leading-8 text-muted">{children}</p>,
  a: ({ href, children }) => {
    const isExternal = Boolean(href && /^https?:\/\//i.test(href));

    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="font-semibold text-accent underline-offset-4 hover:underline">
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mt-6 border-l-4 border-accent/40 bg-foreground/[0.03] px-5 py-3 text-muted">{children}</blockquote>,
  code: ({ children }) => <code className="rounded-md bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>,
  pre: ({ children }) => <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-slate-950 p-4 text-sm leading-7 text-slate-100">{children}</pre>,
  img: ({ src, alt }) => {
    const imageSrc = src ? getR2PublicUrl(String(src)) : "";

    return <img src={imageSrc} alt={alt ?? ""} className="mt-6 h-auto w-full rounded-2xl border border-border object-cover" loading="lazy" />;
  },
};

export function BookshelfMdxContent({ content }: BookshelfMdxContentProps) {
  return (
    <div className="mt-10">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
