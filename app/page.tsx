import { RoomScene } from "@/components/room/room-scene";
import { RoomZoneGrid } from "@/components/room/room-zone-grid";
import { PageShell } from "@/components/ui/page-shell";
import { Tag } from "@/components/ui/tag";
import { createPageMetadata } from "@/lib/metadata";
import { roomZones } from "@/lib/room";

export const metadata = createPageMetadata({
  title: "Thuyên Hobby",
  description: "Không gian số để lưu tài nguyên, chia sẻ ghi chép và xây công cụ nhỏ.",
  path: "/",
});

const currentHighlights = [
  "Đang sắp xếp tài nguyên học web.",
  "Đang viết lại ghi chép ngắn.",
  "Đang thử vài utility nhỏ.",
];

export default function HomePage() {
  return (
    <PageShell>
      <p className="mb-5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
        Thuyên Hobby - một căn phòng nhỏ cho tài nguyên, ghi chép và công cụ.
      </p>

      <RoomScene zones={roomZones} />

      <section className="mt-8" aria-labelledby="quick-access-title">
        <h2 id="quick-access-title" className="mb-4 text-lg font-semibold tracking-tight">
          Mở nhanh
        </h2>
        <RoomZoneGrid zones={roomZones} />
      </section>

      <section className="mt-8" aria-label="Hiện tại">
        <div className="rounded-3xl border border-border bg-background p-4 shadow-soft">
          <div className="grid gap-3 text-sm md:grid-cols-3">
            {currentHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-foreground/[0.03] px-4 py-3">
                <Tag className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">Hiện tại</Tag>
                <span className="text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
