import UserPost from "@/components/userPost/userPost";
import UserPostHeading from "@/components/userPost/userPostHeading";

const Posts = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="p-5 border-b-4 border-blue-400 w-full md:w-1/3 xl:w-1/5 font-semibold text-3xl xl:text-left text-center">
          Rajesh's Posts
        </div>
        <div className="flex flex-col gap-4 py-4">
          <UserPostHeading />
          <UserPost />
        </div>
      </div>
    </section>
  );
};

export default Posts;
