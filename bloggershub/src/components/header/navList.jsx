import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserPlus, FaUserShield } from "react-icons/fa";
import { CircleUserRoundIcon, UserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navListItems } from "@/config/config";
import fetchProfileService from "@/services/profile/fetchProfileService";
import signOutService from "@/services/auth/signOutService";

const NavList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedInUserLoading, loggedInUser } = useSelector(
    (state) => state.authReducer
  );

  const handleSignOut = () => {
    dispatch(signOutService()).then((data) => {
      redirect("/");
    });
  };

  useEffect(() => {
    dispatch(fetchProfileService(loggedInUser?.id));
  }, [dispatch]);

  return (
    <div>
      <ul className="flex justify-around items-center gap-2 text-md">
        {navListItems && navListItems.length > 0
          ? navListItems.map((navItem) => (
              <li key={navItem.id}>
                <Link
                  className="flex items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg"
                  href={navItem.path}
                >
                  {navItem.icon}
                  <span>{navItem.label}</span>
                </Link>
              </li>
            ))
          : null}

        {isLoggedInUserLoading ? null : !loggedInUser ? (
          <>
            <li>
              <Link
                className="flex items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg"
                href="/signIn"
              >
                <FaUserShield />
                <span>Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg"
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
                  <Avatar className="border-2 hover:border-[#bec44d] border-transparent rounded-full active:scale-90 transition-all ease-in-out cursor-pointer">
                    <AvatarImage
                      src={
                        loggedInUser?.profile?.profileImage ||
                        "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>RR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <UserRoundIcon size={15} />
                    <span>{`${
                      loggedInUser?.profile?.firstName
                        ? loggedInUser?.profile?.firstName
                        : loggedInUser?.email
                    }`}</span>
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
                  <DropdownMenuItem onClick={() => handleSignOut()}>
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
