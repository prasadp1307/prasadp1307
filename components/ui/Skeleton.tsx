export function StatCardSkeleton() {
  return (
    <div className="card p-6 space-y-3">
      <div className="skeleton h-4 w-24 rounded-lg" />
      <div className="skeleton h-8 w-16 rounded-lg" />
      <div className="skeleton h-3 w-32 rounded-lg" />
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <div className="skeleton h-5 w-32 rounded-lg" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-5 w-28 rounded-lg" />
          <div className="skeleton h-3 w-40 rounded" />
        </div>
      </div>
    </div>
  );
}
