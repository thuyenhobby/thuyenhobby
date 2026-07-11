import ReactMarkdown from "react-markdown";
import type { ComponentProps } from "react";
import Image from "next/image";
import { getR2PublicUrl } from "@/lib/r2";

type BookshelfMdxContentProps = {
  content: string;
};

function resolveContentUrl(value?: string) {
  if (!value) {
    return "";
  }

  if (/^(https?:|mailto:|tel:|#|\/)/i.test(value)) {
    return value;
  }

  return getR2PublicUrl(value);
}

const components: ComponentProps<typeof ReactMarkdown>["components"] = {
  h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold tracking-tight md:mt-10 md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-7 text-xl font-semibold tracking-tight md:mt-8 md:text-2xl">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-base leading-8 text-muted md:mt-5 md:text-[17px] md:leading-9">{children}</p>,
  a: ({ href, children }) => {
    const resolvedHref = resolveContentUrl(href);
    const isExternal = Boolean(resolvedHref && /^https?:\/\//i.test(resolvedHref));

    return (
      <a href={resolvedHref} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="font-semibold text-accent underline-offset-4 hover:underline">
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-base text-muted md:mt-5 md:text-[17px]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-base text-muted md:mt-5 md:text-[17px]">{children}</ol>,
  li: ({ children }) => <li className="leading-8 md:leading-9">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mt-5 border-l-4 border-accent/40 bg-foreground/[0.03] px-4 py-3 text-base text-muted md:mt-6 md:px-5 md:text-[17px]">{children}</blockquote>,
  code: ({ children }) => <code className="rounded-md bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>,
  pre: ({ children }) => <pre className="mt-5 overflow-x-auto rounded-2xl border border-border bg-slate-950 p-3 text-sm leading-7 text-slate-100 md:mt-6 md:p-4">{children}</pre>,
  img: ({ src, alt }) => {
    const imageSrc = resolveContentUrl(src ? String(src) : "");

    if (!imageSrc) {
      return null;
    }

    return (
      <Image
        src={imageSrc}
        alt={alt ?? ""}
        width={1200}
        height={675}
        className="mt-5 h-auto w-full rounded-2xl object-cover md:mt-6"
      />
    );
  },
};

export function BookshelfMdxContent({ content }: BookshelfMdxContentProps) {
  return (
    <div>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
