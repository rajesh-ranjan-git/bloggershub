import { Card } from "@/components/ui/card";
import CustomPostContentLoader from "@/components/customLoaderComponents/customPostContentLoader";
import CustomPostImageLoader from "@/components/customLoaderComponents/customPostImageLoader";
import CustomPostTitleLoader from "@/components/customLoaderComponents/customPostTitleLoader";

const Contact = () => {
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
        <div className="w-full">
          <Card className="hover:shadow-md">
            <CustomPostTitleLoader />
          </Card>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
          <div className="hover:shadow-md rounded-lg w-full lg:w-1/2">
            <CustomPostImageLoader />
          </div>
          <Card className="hover:shadow-md p-4 w-full lg:w-1/2">
            <CustomPostContentLoader />
          </Card>
        </div>
        <Card className="hover:shadow-md p-4 w-full">
          <CustomPostContentLoader />
        </Card>
      </div>
    </section>
  );
};

export default Contact;
