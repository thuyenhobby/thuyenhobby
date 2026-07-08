import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/series", label: "Series" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="focus-ring shrink-0 rounded-md text-sm font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav
          aria-label="Mobile navigation"
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-2.5 py-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
