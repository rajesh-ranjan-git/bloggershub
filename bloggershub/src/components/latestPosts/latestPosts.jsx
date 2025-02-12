import BlogCard from "../blogCard/blogCard";

const LatestPosts = () => {
  return (
    <div className="flex flex-col justify-center items-center px-10">
      <div className="px-10 py-8 border-b-4 border-blue-400 font-semibold text-5xl">
        Latest Posts
      </div>
      <div className="flex md:flex-row flex-col flex-wrap justify-center items-center gap-10 py-10 w-full">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default LatestPosts;
