import Link from "next/link";

const BlogCard = () => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg max-w-sm">
      <img className="rounded-t-lg" src="/images/blog.jpg" alt="blogImage" />

      <div className="p-5">
        <h5 className="mb-2 font-bold text-gray-900 text-2xl tracking-tight">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <Link
          href="#"
          className="inline-flex items-center bg-blue-400 hover:bg-blue-600 hover:shadow-md px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-white text-sm text-center"
        >
          Read more
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
