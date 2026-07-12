export default function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-card border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-lg bg-neutral-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-neutral-200" />
          <div className="h-3 w-1/2 rounded bg-neutral-200" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-neutral-200" />
        <div className="h-5 w-20 rounded-full bg-neutral-200" />
      </div>
      <div className="mt-4 h-4 w-1/3 rounded bg-neutral-200" />
    </div>
  );
}