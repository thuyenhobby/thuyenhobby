import { RoomZoneItem } from "@/components/room/room-zone-item";
import type { RoomZone } from "@/lib/room";

type RoomSceneProps = {
  zones: RoomZone[];
};

export function RoomScene({ zones }: RoomSceneProps) {
  return (
    <section id="workspace-map" aria-label="Workspace board">
      <div className="relative h-40 overflow-hidden rounded-3xl border border-cyan-700/15 bg-[radial-gradient(circle_at_20%_16%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#edf7fb_58%,#e2e8f0_58%,#f8fafc_100%)] shadow-sm dark:border-cyan-300/15 dark:bg-[radial-gradient(circle_at_20%_16%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(245,158,11,0.12),transparent_28%),linear-gradient(180deg,#07111f_0%,#0f172a_58%,#111827_58%,#020617_100%)] md:hidden">
        <div className="absolute inset-x-4 top-4 h-16 rounded-2xl border border-cyan-900/10 bg-white/35 dark:border-white/10 dark:bg-white/[0.04]" aria-hidden="true" />
        <div className="absolute bottom-3 left-4 right-4 h-14 rounded-2xl border border-slate-900/10 bg-slate-900/[0.04] [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)] dark:border-white/10 dark:bg-white/[0.06]" aria-hidden="true" />
        <div className="absolute bottom-8 left-8 h-9 w-20 rounded-xl border border-amber-800/20 bg-amber-500/20 dark:border-amber-300/20 dark:bg-amber-400/15" aria-hidden="true" />
        <div className="absolute right-8 top-9 h-20 w-16 rounded-lg border border-violet-800/15 bg-violet-500/12 dark:border-violet-300/15 dark:bg-violet-400/12" aria-hidden="true">
          <span className="absolute bottom-2 left-2 h-10 w-2 rounded bg-violet-500/45" />
          <span className="absolute bottom-2 left-6 h-8 w-2 rounded bg-amber-500/45" />
          <span className="absolute bottom-2 right-3 h-11 w-2 rounded bg-cyan-500/40" />
        </div>
        <div className="absolute bottom-8 left-[46%] h-9 w-24 rounded-lg border border-cyan-800/15 bg-cyan-500/15 dark:border-cyan-300/15 dark:bg-cyan-400/12" aria-hidden="true" />
      </div>

      <div className="relative hidden min-h-[420px] overflow-hidden rounded-[2rem] border border-cyan-700/15 bg-[radial-gradient(circle_at_16%_14%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_76%_14%,rgba(245,158,11,0.14),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#edf7fb_57%,#e2e8f0_57%,#f8fafc_100%)] shadow-soft dark:border-cyan-300/15 dark:bg-[radial-gradient(circle_at_16%_14%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_76%_14%,rgba(245,158,11,0.11),transparent_28%),linear-gradient(180deg,#07111f_0%,#0f172a_57%,#111827_57%,#020617_100%)] md:block lg:min-h-[500px]">
        <div className="absolute inset-5 rounded-[1.5rem] border border-slate-900/10 bg-white/35 dark:border-white/10 dark:bg-white/[0.03]" aria-hidden="true" />
        <div className="absolute left-5 right-5 top-[56.5%] h-px bg-slate-900/10 dark:bg-white/10" aria-hidden="true" />
        <div
          className="absolute bottom-7 left-10 right-10 h-[35%] rounded-[2rem] border border-slate-900/10 bg-[linear-gradient(115deg,rgba(15,23,42,0.05),rgba(14,165,233,0.08))] [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)] dark:border-cyan-300/10 dark:bg-[linear-gradient(115deg,rgba(14,165,233,0.08),rgba(15,23,42,0.42))]"
          aria-hidden="true"
        />

        <div className="absolute left-[9%] top-[12%] h-24 w-32 rounded-2xl border border-cyan-700/20 bg-cyan-100/65 shadow-sm dark:border-cyan-200/20 dark:bg-cyan-400/10" aria-hidden="true">
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-700/15 dark:bg-cyan-200/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-700/15 dark:bg-cyan-200/20" />
        </div>

        <div className="absolute left-[36%] top-[13%] h-20 w-32 rounded-2xl border border-slate-900/10 bg-white/45 p-3 dark:border-white/10 dark:bg-white/[0.04]" aria-hidden="true">
          <div className="h-full rounded-xl border border-cyan-700/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(245,158,11,0.12))] dark:border-cyan-200/15" />
        </div>

        <div className="absolute right-[25%] top-[9%] h-14 w-14 rounded-full border border-amber-700/20 bg-amber-300/35 shadow-[0_0_55px_rgba(245,158,11,0.22)] dark:border-amber-200/20 dark:bg-amber-300/15" aria-hidden="true" />

        <div className="absolute left-[13%] top-[64%] h-20 w-40 rounded-2xl border border-amber-800/25 bg-amber-700/[0.18] shadow-md dark:border-amber-300/20 dark:bg-amber-500/[0.14]" aria-hidden="true">
          <div className="absolute inset-x-0 top-7 h-px bg-amber-900/20 dark:bg-amber-200/20" />
          <div className="absolute bottom-3 left-1/2 h-4 w-8 -translate-x-1/2 rounded-md border border-amber-900/20 dark:border-amber-200/25" />
        </div>

        <div className="absolute right-[10%] top-[18%] h-40 w-40 rounded-xl border border-violet-900/15 bg-violet-600/10 shadow-sm dark:border-violet-200/15 dark:bg-violet-400/10" aria-hidden="true">
          <div className="absolute inset-x-4 top-10 h-px bg-violet-900/15 dark:bg-violet-200/20" />
          <div className="absolute inset-x-4 top-20 h-px bg-violet-900/15 dark:bg-violet-200/20" />
          <div className="absolute inset-x-4 top-[7.5rem] h-px bg-violet-900/15 dark:bg-violet-200/20" />
          <div className="absolute bottom-4 left-5 h-16 w-4 rounded-t bg-violet-500/35" />
          <div className="absolute bottom-4 left-12 h-12 w-4 rounded-t bg-amber-500/35" />
          <div className="absolute bottom-4 left-20 h-20 w-4 rounded-t bg-cyan-500/30" />
          <div className="absolute bottom-4 right-8 h-11 w-4 rounded-t bg-emerald-500/30" />
        </div>

        <div className="absolute bottom-[20%] left-[48%] h-4 w-64 rounded bg-slate-700/20 dark:bg-slate-200/15" aria-hidden="true" />
        <div className="absolute bottom-[27%] left-[50%] h-16 w-44 rounded-xl border border-cyan-700/20 bg-cyan-200/30 shadow-sm dark:border-cyan-200/20 dark:bg-cyan-400/[0.12]" aria-hidden="true">
          <div className="mx-5 mt-4 h-2 rounded-full bg-cyan-700/15 dark:bg-cyan-200/20" />
          <div className="mx-5 mt-3 h-2 w-2/3 rounded-full bg-emerald-700/15 dark:bg-emerald-200/20" />
        </div>
        <div className="absolute bottom-[13%] left-[52%] h-16 w-9 rounded-b-full border border-slate-900/10 bg-slate-900/[0.08] dark:border-white/10 dark:bg-white/[0.08]" aria-hidden="true" />

        {zones.map((zone) => (
          <RoomZoneItem key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
