import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Liên hệ Thuyên Trần để góp ý bài viết, trao đổi về web development hoặc kết nối học tập.",
  path: "/contact",
});

const socialLinks = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Facebook / X", href: "https://x.com/" },
];

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold text-accent">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Góp ý, trao đổi hoặc kết nối.</h1>
        <p className="mt-5 leading-8 text-muted">
          Nếu bạn có góp ý cho bài viết, muốn trao đổi về Next.js, deployment, Cloudflare R2 hoặc
          chỉ đơn giản là muốn kết nối trong hành trình học web, bạn có thể liên hệ qua email hoặc
          các kênh bên dưới.
        </p>
        <Card className="mt-8">
          <p className="text-sm font-semibold text-foreground">Email</p>
          <a className="mt-2 inline-block font-semibold text-accent hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-full border border-border px-3 py-2 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Card>
        <div className="mt-8">
          <ButtonLink href={`mailto:${siteConfig.email}`}>Gửi email</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
