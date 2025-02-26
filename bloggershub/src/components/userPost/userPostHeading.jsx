import { Separator } from "@/components/ui/separator";

const UserPostHeading = () => {
  return (
    <div className="hidden md:flex items-center bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg w-full h-10">
      <div className="w-1/2 font-bold text-center">Posts</div>
      <Separator orientation="vertical" />
      <div className="flex justify-around items-center w-1/2 font-semibold text-center">
        <div className="w-24">Date</div>
        <div className="w-20">Likes</div>
        <div className="w-20">Comments</div>
        <div className="w-20">Actions</div>
      </div>
    </div>
  );
};

export default UserPostHeading;
