import { ButtonLink } from "@/components/ui/button";

export function BlogHero() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Blog chia sẻ kiến thức
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
          Ghi chép hành trình học và xây dựng sản phẩm web.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Blog chia sẻ về lập trình web, Next.js, deployment, Cloudflare, công cụ làm việc và
          kinh nghiệm thực tế khi tự xây sản phẩm cá nhân.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/blog">Đọc bài viết</ButtonLink>
          <ButtonLink href="/topics" variant="secondary">
            Xem chủ đề
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
