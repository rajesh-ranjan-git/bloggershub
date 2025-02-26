import { Skeleton } from "@/components/ui/skeleton";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CustomPostTitleLoader = () => {
  return (
    <CardHeader>
      <CardTitle className="text-3xl">
        <Skeleton className="w-1/2 h-10" />
      </CardTitle>
      <CardDescription>
        <Skeleton className="w-1/4 h-10" />
      </CardDescription>
    </CardHeader>
  );
};

export default CustomPostTitleLoader;
