import { Skeleton } from "@/components/ui/skeleton";

const CustomSinglePostLoader = () => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg w-96">
      <div className="flex flex-col items-center space-x-4 w-full">
        <Skeleton className="rounded-t-lg w-72 md:w-full h-64" />
        <div className="flex flex-col gap-5 p-5 w-full">
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-1/3 h-10" />
        </div>
      </div>
    </div>
  );
};

export default CustomSinglePostLoader;
