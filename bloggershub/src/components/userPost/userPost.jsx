import { Separator } from "../ui/separator";
import UserBlogPost from "./userBlogPost";
import UserPostDetails from "./userPostDetails";

const UserPost = () => {
  return (
    <div className="flex md:flex-row flex-col items-center bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg w-full lg:h-40 overflow-clip">
      <UserBlogPost />
      <Separator orientation="vertical" className="hidden md:block" />
      <UserPostDetails />
    </div>
  );
};

export default UserPost;
