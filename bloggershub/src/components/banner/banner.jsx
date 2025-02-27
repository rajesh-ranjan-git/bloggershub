import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[url(/images/banner.jpg)] bg-cover bg-no-repeat bg-center mt-16 border-b w-full h-[30vh] md:h-[50vh] xl:h-[80vh] text-black">
      <Image src="/logoIcon.svg" alt="logo" width={100} height={100} />
      <p className="text-xl md:text-3xl xl:text-5xl text-center">
        Welcome to Blogger's Hub
      </p>
    </div>
  );
};

export default Banner;
