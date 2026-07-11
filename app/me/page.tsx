import { DeskNowCard } from "@/components/desk/desk-now-card";
import { DeskProfileCard } from "@/components/desk/desk-profile-card";
import { DeskStackCard } from "@/components/desk/desk-stack-card";
import { DeskTimeline } from "@/components/desk/desk-timeline";
import { ZoneNextLinks } from "@/components/room/zone-next-links";
import { PageHeading } from "@/components/ui/page-heading";
import { PageShell } from "@/components/ui/page-shell";
import { StatPill } from "@/components/ui/stat-pill";
import { createPageMetadata } from "@/lib/metadata";
import { deskLinks } from "@/lib/desk";

export const metadata = createPageMetadata({
  title: "Me - anx.thnw",
  description: "Who I am, what I'm learning, and what I'm building.",
  path: "/me",
});

export default function MePage() {
  return (
    <PageShell variant="wide">
      <PageHeading
        eyebrow="Me"
        title="Me"
        description="who sits here, what I'm learning, and what I'm building."
        size="sm"
        compact
        stats={
          <>
            <StatPill label="currently" value="03" tone="cyan" />
            <StatPill label="stack" value="09" tone="emerald" />
            <StatPill label="logs" value="03" tone="violet" />
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-3">
          <DeskProfileCard />
          <DeskNowCard />
        </div>
        <div className="grid gap-3">
          <DeskStackCard />
          <section className="rounded-2xl border border-border bg-background p-3 shadow-sm dark:bg-white/[0.03] md:p-4" aria-label="Find me">
            <h2 className="text-base font-semibold tracking-tight">find me</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {deskLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="focus-ring rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted transition hover:border-cyan-500/45 hover:text-foreground"
                  target={link.href.startsWith("http") || link.href.startsWith("mailto:") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-3">
        <DeskTimeline />
      </div>

      <ZoneNextLinks current="me" />
    </PageShell>
  );
}
