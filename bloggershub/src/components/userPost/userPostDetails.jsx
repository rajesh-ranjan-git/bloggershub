import { Button } from "../ui/button";
import { MdDelete, MdModeEdit } from "react-icons/md";

const UserPostDetails = () => {
  return (
    <div className="flex justify-between md:justify-around items-center p-2 w-full md:w-1/2 text-center">
      <div className="md:hidden block">
        <span className="font-semibold">Posted on : </span>14/02/2024
      </div>
      <div className="hidden md:block w-20">14/02/2024</div>
      <div className="hidden md:block w-20">5</div>
      <div className="hidden md:block w-20">20</div>
      <div className="flex items-center gap-2 w-20">
        <Button
          variant="outline"
          className="hover:bg-green-600 p-0 border-green-600 w-10 text-green-600 hover:text-white"
        >
          <MdModeEdit />
        </Button>
        <Button
          variant="outline"
          className="hover:bg-red-600 p-0 border-red-600 w-10 text-red-600 hover:text-white"
        >
          <MdDelete />
        </Button>
      </div>
    </div>
  );
};

export default UserPostDetails;
