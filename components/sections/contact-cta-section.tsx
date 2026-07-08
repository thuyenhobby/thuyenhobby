import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";

export function ContactCtaSection() {
  return (
    <Section>
      <div className="rounded-lg border border-border bg-foreground p-8 text-background sm:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold opacity-80">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Bạn đang cần một website cá nhân hoặc sản phẩm web gọn gàng?
          </h2>
          <p className="mt-4 leading-7 opacity-80">
            Tôi luôn sẵn sàng trao đổi về dự án frontend, portfolio, blog cá nhân hoặc ý tưởng cần
            được triển khai thành sản phẩm web thực tế.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-6 border-background/30 text-background hover:border-background hover:text-background">
            Liên hệ ngay
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
