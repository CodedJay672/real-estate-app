import { Skeleton } from "../ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />

      {/* Content skeleton */}
      <div className="flex flex-col w-full px-4 py-8 space-y-4">
        {/* Date skeleton */}
        <Skeleton className="h-4 w-24" />

        {/* Title and location skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Price and specs skeleton */}
        <div className="flex justify-between items-center mt-4 gap-4">
          <Skeleton className="h-7 w-32" />
          <div className="w-max space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCardSkeleton;
