import { Card } from "@/components/ui/card";
import CustomPostContentSkeleton from "@/components/customLoaderComponents/customPostContentSkeleton";
import CustomPostImageSkeleton from "@/components/customLoaderComponents/customPostImageSkeleton";
import CustomPostTitleSkeleton from "@/components/customLoaderComponents/customPostTitleSkeleton";

const Contact = () => {
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
        <div className="min-w-96">
          <Card className="hover:shadow-md">
            <CustomPostTitleSkeleton />
          </Card>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
          <div className="hover:shadow-md rounded-lg w-full lg:w-1/2">
            <CustomPostImageSkeleton />
          </div>
          <Card className="hover:shadow-md p-4 w-full lg:w-1/2">
            <CustomPostContentSkeleton />
          </Card>
        </div>
        <Card className="hover:shadow-md p-4 w-full">
          <CustomPostContentSkeleton />
        </Card>
      </div>
    </section>
  );
};

export default Contact;
