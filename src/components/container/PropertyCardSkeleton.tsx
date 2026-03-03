import { Skeleton } from "../ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <article className="w-full max-w-3xs shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full min-h-48 overflow-hidden relative bg-light-100">
        <div className="absolute top-1 left-1 z-10 bg-gray-200/75 rounded-xl flex gap-0">
          <Skeleton className="h-8 w-16 rounded-s-lg" />
          <Skeleton className="h-8 w-14 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col w-full px-4 py-8 space-y-4">
        <Skeleton className="h-3 w-32" />

        <div className="space-y-2 mb-4">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="flex justify-between items-center mt-4 gap-4">
          <Skeleton className="h-8 w-40" />
          <div className="w-max space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCardSkeleton;
