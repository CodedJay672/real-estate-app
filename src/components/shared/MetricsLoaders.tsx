import { Skeleton } from "@/components/ui/skeleton";

export default function MetricsLoaders() {
  return (
    <div className="w-full flex-between gap-3 md:gap-6">
      {[...Array(4)].map((_, index) => (
        <article
          key={index}
          className="w-full p-4 bg-light-50 border border-border rounded-xl"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-12 w-20 mt-4" />
        </article>
      ))}
    </div>
  );
}
