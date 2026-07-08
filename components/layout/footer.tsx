import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}
