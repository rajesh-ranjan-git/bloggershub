import Image from "next/image";
import Link from "next/link";
import { MdOutlinePostAdd } from "react-icons/md";

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg max-w-sm">
      <Image
        className="rounded-t-lg min-w-96 h-64 object-cover"
        src={post?.postImage}
        alt="blogImage"
        width={300}
        height={300}
      />

      <div className="p-5">
        <h5 className="mb-2 font-bold text-gray-900 text-2xl line-clamp-1 tracking-tight">
          {post?.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 line-clamp-3">
          {post?.content}
        </p>
        <Link
          href={`/blog/${post?.id}`}
          className="inline-flex items-center gap-2 bg-[#bec44d] hover:bg-[#a3ab09] hover:shadow-md px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#bec44d] font-medium text-white text-sm text-center"
        >
          <MdOutlinePostAdd />
          <span>Read more</span>
          <svg
            className="ms-2 w-3.5 h-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
