import { Skeleton } from "@/components/ui/skeleton";

const CustomPostContentSkeleton = () => {
  return (
    <div className="flex flex-col justify-center gap-2 w-full h-full">
      <Skeleton className="rounded-lg w-full h-10" />
      <Skeleton className="rounded-lg w-1/2 h-10" />
      <Skeleton className="rounded-lg w-1/4 h-10" />
      <Skeleton className="rounded-lg w-1/3 h-10" />
      <Skeleton className="rounded-lg w-full h-10" />
      <Skeleton className="rounded-lg w-1/4 h-10" />
      <Skeleton className="rounded-lg w-1/2 h-10" />
    </div>
  );
};

export default CustomPostContentSkeleton;
