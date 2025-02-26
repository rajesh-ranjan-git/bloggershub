import CustomPostSkeleton from "@/components/customLoaderComponents/customPostSkeleton";

const About = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
          <CustomPostSkeleton />
        </div>
      </div>
    </section>
  );
};

export default About;
