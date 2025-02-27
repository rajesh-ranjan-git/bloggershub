const Banner = () => {
  return (
    <div className="flex justify-center items-center bg-[url(/images/banner.jpg)] bg-cover bg-no-repeat bg-center mt-16 border-b w-full h-[30vh] md:h-[50vh] xl:h-[80vh] text-black">
      <p className="text-xl md:text-3xl xl:text-5xl text-center">
        Welcome to Blogger's Hub
      </p>
    </div>
  );
};

export default Banner;
