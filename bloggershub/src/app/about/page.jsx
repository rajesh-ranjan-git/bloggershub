import CustomSinglePostLoader from "@/components/customLoaderComponents/customSinglePostLoader";

const About = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
        </div>
      </div>
    </section>
  );
};

export default About;
