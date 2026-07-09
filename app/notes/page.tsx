import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { createPageMetadata } from "@/lib/metadata";
import { notes } from "@/lib/notes";

export const metadata = createPageMetadata({
  title: "Notes",
  description: "Ghi chú ngắn của Thuyên về Git, Vercel, Cloudflare R2, env và các bài học nhỏ.",
  path: "/notes",
});

export default function NotesPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Notebook"
        title="Notes"
        description="Không phải blog dài. Đây là những ghi chú nhỏ, command, lỗi đã gặp và bài học muốn lưu lại."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {notes.map((note) => (
          <article key={note.title} className="rounded-2xl border border-border p-5 transition hover:border-accent">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <StatusBadge>{note.type}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{note.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
