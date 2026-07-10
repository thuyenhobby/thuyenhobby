import Link from "next/link";

type RoomTrailItem = {
  label: string;
  href?: string;
};

type RoomTrailProps = {
  items: RoomTrailItem[];
};

export function RoomTrail({ items }: RoomTrailProps) {
  return (
    <nav aria-label="Workspace trail" className="flex flex-wrap items-center gap-1 text-sm font-semibold text-muted">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="focus-ring rounded-md px-1 text-violet-700 hover:underline dark:text-violet-300">
              {item.label}
            </Link>
          ) : (
            <span className="line-clamp-1 px-1 text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
