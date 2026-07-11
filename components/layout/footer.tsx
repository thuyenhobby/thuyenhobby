import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

const workspaceLinks = [
  { href: "/", label: "Workspace" },
  { href: "/me", label: "Me" },
  { href: "/post", label: "Post" },
  { href: "/memory", label: "Memory" },
  { href: "/drawer", label: "Drawer" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-5 md:py-7">
      <Container className="grid gap-4 text-sm text-muted md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono font-semibold text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-xs leading-5 md:text-sm">quietly building small things.</p>
          <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} {siteConfig.name}.</p>
        </div>
        <nav aria-label="Footer workspace links" className="flex flex-wrap gap-x-3 gap-y-2">
          {workspaceLinks.map((link) => (
            <a key={link.label} href={link.href} className="focus-ring rounded-md font-medium transition hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
