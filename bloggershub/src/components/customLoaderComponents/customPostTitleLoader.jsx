import { Skeleton } from "@/components/ui/skeleton";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CustomPostTitleLoader = () => {
  return (
    <CardHeader>
      <CardTitle className="text-3xl">
        <Skeleton className="w-1/2 h-10" />
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        <Skeleton className="rounded-full w-10 h-10" />
        <Skeleton className="w-1/4 h-10" />
      </CardDescription>
    </CardHeader>
  );
};

export default CustomPostTitleLoader;
