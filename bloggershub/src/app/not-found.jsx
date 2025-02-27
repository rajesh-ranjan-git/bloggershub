import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center items-center px-10 w-full h-dvh">
        <Image
          src="/pageNotFoundIcon.svg"
          alt="notFound"
          width={150}
          height={150}
        />
        <p className="text-3xl md:text-4xl text-center">
          Oops! You were not supposed to be here!
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
