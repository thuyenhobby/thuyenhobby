import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";

export function AboutPreviewSection() {
  return (
    <Section>
      <div className="grid gap-8 rounded-lg border border-border p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-accent">Me</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Tôi thích xây dựng sản phẩm web gọn gàng và đáng tin cậy.
          </h2>
        </div>
        <div>
          <p className="leading-8 text-muted">
            Tôi là Thuyên Trần, một Web Developer / Frontend Developer quan tâm đến trải nghiệm
            người dùng, hiệu năng và cách tổ chức code dễ mở rộng. Tôi xem mỗi dự án như một hệ
            thống nhỏ cần rõ ràng từ giao diện, nội dung đến quy trình deploy.
          </p>
          <ButtonLink href="/me" variant="ghost" className="mt-5 px-0">
            Open Me
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
