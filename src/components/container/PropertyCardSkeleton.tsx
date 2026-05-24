import { Skeleton } from "../ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <article className="w-full overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="h-72 bg-slate-100">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-4 px-5 py-6">
        <Skeleton className="h-4 w-2/3 rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/80">
          <Skeleton className="h-7 w-28 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCardSkeleton;
