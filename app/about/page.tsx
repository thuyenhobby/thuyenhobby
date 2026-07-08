import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Giới thiệu ngắn về Thuyên Trần và lý do xây dựng blog chia sẻ kiến thức về lập trình web.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Tôi là Thuyên Trần.</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-muted">
          <p>
            Tôi xây blog này để ghi lại quá trình học, thực hành và chia sẻ kinh nghiệm làm web.
            Đây không phải là một portfolio dài, mà là nơi tôi lưu lại những ghi chú có ích trong
            quá trình tự xây sản phẩm cá nhân.
          </p>
          <p>
            Nội dung tập trung vào lập trình web, Next.js, frontend, công cụ làm việc, deployment,
            Cloudflare R2, Vercel, GitHub và những bài học nhỏ khi biến ý tưởng thành website chạy
            được thật.
          </p>
          <p>
            Tôi ưu tiên cách viết ngắn gọn, thực tế và dễ áp dụng. Khi blog lớn hơn, phần nội dung
            có thể được chuyển sang MDX để bài viết có cấu trúc và ví dụ phong phú hơn.
          </p>
        </div>
      </Container>
    </Section>
  );
}
