import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";

export function AuthorNoteSection() {
  return (
    <Section>
      <div className="rounded-lg border border-border p-6 sm:p-8">
        <p className="text-sm font-semibold text-accent">Tác giả</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tôi là Thuyên Trần.</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Tôi xây blog này để ghi lại quá trình học, thực hành và chia sẻ kinh nghiệm làm web. Nội
          dung tập trung vào lập trình web, công cụ, deployment và hành trình tự xây sản phẩm cá nhân.
        </p>
        <ButtonLink href="/me" variant="ghost" className="mt-5 px-0">
          Đọc thêm về blog
        </ButtonLink>
      </div>
    </Section>
  );
}
