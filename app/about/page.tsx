import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Thuyên Trần",
  description:
    "Tìm hiểu về Thuyên Trần, Web Developer / Frontend Developer quan tâm đến Next.js, TypeScript, hiệu năng và trải nghiệm người dùng.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Tôi là Thuyên Trần, Web Developer / Frontend Developer.
        </h1>
        <div className="mt-8 space-y-8 text-base leading-8 text-muted">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Giới thiệu</h2>
            <p className="mt-3">
              Tôi xây dựng giao diện web với trọng tâm là sự rõ ràng, tốc độ và khả năng bảo trì.
              Tôi thích những sản phẩm có cấu trúc tốt, nội dung dễ hiểu và trải nghiệm nhất quán
              trên mobile, tablet lẫn desktop.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Định hướng phát triển</h2>
            <p className="mt-3">
              Tôi đang tập trung phát triển sâu hơn ở hệ sinh thái Next.js, TypeScript, UI
              engineering, SEO kỹ thuật và cách triển khai ứng dụng web ổn định trên nền tảng cloud.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Cách tôi làm việc</h2>
            <p className="mt-3">
              Tôi bắt đầu từ mục tiêu của sản phẩm, sau đó chia nhỏ giao diện thành component rõ
              ràng, đặt tên dễ hiểu và giữ dữ liệu tách khỏi phần trình bày. Với mỗi thay đổi, tôi
              ưu tiên build được, dễ review và không làm phức tạp hệ thống khi chưa cần thiết.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Công nghệ tôi quan tâm</h2>
            <p className="mt-3">
              Những công nghệ tôi đang quan tâm gồm Next.js App Router, React, TypeScript, Tailwind
              CSS, Vercel, Cloudflare R2, MDX và các kỹ thuật tối ưu performance/accessibility.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Mục tiêu của website này</h2>
            <p className="mt-3">
              Website này là nơi tôi giới thiệu năng lực, lưu lại dự án cá nhân và viết về quá trình
              học tập. Về sau, tôi muốn nâng cấp blog sang MDX và tích hợp Cloudflare R2 để quản lý
              media cho các bài viết và case study.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
