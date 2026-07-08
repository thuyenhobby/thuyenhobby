import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact - Thuyên Trần",
  description:
    "Liên hệ Thuyên Trần để trao đổi về frontend development, portfolio, blog cá nhân hoặc dự án web nhỏ.",
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
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Hãy bắt đầu một cuộc trò chuyện rõ ràng.
        </h1>
        <p className="mt-5 leading-8 text-muted">
          Nếu bạn muốn trao đổi về website cá nhân, frontend development, blog hoặc một ý tưởng web
          cần triển khai gọn gàng, bạn có thể liên hệ với tôi qua email hoặc các kênh social bên dưới.
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
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${siteConfig.email}`}>Gửi email</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Xem dự án trước
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
