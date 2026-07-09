import { PageShell } from "@/components/ui/page-shell";
import { PageHeading } from "@/components/ui/page-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About — Thuyên Hobby",
  description: "Giới thiệu ngắn về Thuyên Hobby và lý do xây căn phòng số này.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell className="max-w-3xl">
      <PageHeading
        eyebrow="About"
        title="Tôi là Thuyên."
        description="Tôi xây Thuyên Hobby để có một không gian riêng cho công nghệ."
      />
      <div className="space-y-4 text-base leading-8 text-muted">
        <p>
          Rương đồ lưu tài nguyên. Giá sách lưu ghi chép. Công cụ lưu những tiện ích nhỏ tôi muốn
          tự xây.
        </p>
        <p>
          Không phải CV, không phải portfolio. Chỉ là một căn phòng nhỏ để sắp xếp thứ tôi học và
          thích.
        </p>
      </div>
    </PageShell>
  );
}
