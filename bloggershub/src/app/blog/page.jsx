import BlogCard from "@/components/blogCard/blogCard";

const Blog = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10">
        <div className="p-5 border-b-4 border-blue-400 w-full md:w-1/3 xl:w-1/6 font-semibold text-3xl xl:text-left text-center">
          Latest Posts
        </div>
        <div className="justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
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
