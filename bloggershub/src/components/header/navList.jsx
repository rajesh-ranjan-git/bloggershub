import { navListItems } from "@/config/navListItems";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CircleUserRoundIcon, UserRoundIcon } from "lucide-react";
import { FaUserPlus, FaUserShield } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavList = () => {
  const router = useRouter();
  const { isLoading, user } = useSelector((state) => state.authReducer);

  return (
    <div>
      <ul className="flex justify-around items-center gap-2 text-md">
        {navListItems && navListItems.length > 0
          ? navListItems.map((navItem) => (
              <li key={navItem.id}>
                <Link
                  className="flex items-center gap-2 hover:bg-blue-300/70 p-2 px-4 rounded-lg"
                  href={navItem.path}
                >
                  {navItem.icon}
                  <span>{navItem.label}</span>
                </Link>
              </li>
            ))
          : null}

        {isLoading ? null : !user ? (
          <>
            <li>
              <Link
                className="flex items-center gap-2 hover:bg-blue-300/70 p-2 px-4 rounded-lg"
                href="/signIn"
              >
                <FaUserShield />
                <span>Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:bg-blue-300/70 p-2 px-4 rounded-lg"
                href="/signUp"
              >
                <FaUserPlus />
                <span>Sign Up</span>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="border-2 border-transparent hover:border-blue-400 rounded-full active:scale-90 transition-all ease-in-out cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <UserRoundIcon size={15} />
                    <span>Rajesh Ranjan</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/user/profile")}
                  >
                    <CircleUserRoundIcon />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/user/posts")}>
                    <BsPostcard />
                    <span>Posts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/user/createPost")}
                  >
                    <MdOutlinePostAdd />
                    <span>Create Post</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    <RiLogoutCircleRLine />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavList;
