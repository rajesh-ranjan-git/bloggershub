import Image from "next/image";
import Link from "next/link";

const UserBlogPost = ({ post }) => {
  return (
    <div className="flex items-center gap-4 border-b md:border-none w-full md:w-1/2">
      <div className="w-1/2 md:1/3">
        <Link href={`/blog/${post?.id}`}>
          <Image
            className="rounded-lg md:rounded-r-none w-full h-40 object-cover"
            src={post?.postImage || "/images/blog.jpg"}
            alt="blogImage"
            width={300}
            height={300}
          />
        </Link>
      </div>
      <div className="p-1 w-1/2 md:w-2/3 overflow-clip">
        <h5
          className="mb-2 font-bold text-gray-900 text-xl line-clamp-2 tracking-tight"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          <Link
            href={`/blog/${post?.id}`}
            className="hover:text-[#a3ab09] hover:underline transition-all ease-in-out"
          >
            {post?.title ||
              "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
          </Link>
        </h5>
        <p
          className="hidden lg:block mb-3 font-normal text-gray-700 line-clamp-2 tracking-tight"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {post?.content || "Noteworthy technology acquisitions 2021"}
        </p>
      </div>
    </div>
  );
};

export default UserBlogPost;
