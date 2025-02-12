import BlogCard from "@/components/blogCard/blogCard";

const Blog = () => {
  return (
    <section className="flex justify-center pt-16 w-screen">
      <div className="flex flex-col justify-center px-10">
        <div className="p-5 border-b-4 border-blue-400 w-full xl:w-1/3 font-semibold text-3xl xl:text-left text-center">
          Latest Posts
        </div>
        <div className="flex md:flex-row flex-col flex-wrap justify-center gap-10 py-10 w-full">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
};

export default Blog;
