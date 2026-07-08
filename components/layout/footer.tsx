import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  { href: "https://github.com/", label: "GitHub" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "mailto:hello@example.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="grid gap-6 text-sm text-muted md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-semibold text-foreground">{siteConfig.name}</p>
          <p className="mt-2 max-w-xl leading-6">
            Blog ghi chép về lập trình web, Next.js, deployment, công cụ làm việc và hành trình tự
            xây sản phẩm cá nhân.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
        <nav aria-label="Social links" className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="focus-ring rounded-md font-medium transition hover:text-accent"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
