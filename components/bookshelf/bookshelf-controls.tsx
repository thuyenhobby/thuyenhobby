type BookshelfTopic = {
  topic: string;
  count: number;
};

type BookshelfControlsProps = {
  topics: BookshelfTopic[];
};

export function BookshelfControls({ topics }: BookshelfControlsProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <section
      className="mb-4 rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-2.5 dark:border-violet-300/12 md:mb-5 md:p-3"
      aria-label="Post topics"
    >
      <div className="flex gap-2 overflow-x-auto pb-1">
        {topics.map((item) => (
          <span
            key={item.topic}
            className="inline-flex min-w-max items-center gap-2 rounded-xl border border-violet-500/15 bg-background px-3 py-1.5 text-sm font-semibold text-violet-800 dark:text-violet-200"
          >
            <span className="size-2 rounded-full bg-violet-500/60" aria-hidden="true" />
            {item.topic}
            <span className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-xs">{item.count}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
