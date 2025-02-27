"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaUserPlus, FaUserShield } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CircleUserRoundIcon, Menu, UserRoundIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { navListItems } from "@/config/config";
import HeaderRightContent from "@/components/header/headerRightContent";
import Logo from "@/components/header/logo";

const Header = () => {
  const [openNavSheet, setOpenNavSheet] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state) => state.authReducer);

  return (
    <section
      className="top-0 fixed flex justify-center lg:justify-between items-center shadow-md px-10 border-b w-full z-40 h-16 ${
        bg-white text-black"
    >
      <Logo />
      <HeaderRightContent />
      <Sheet open={openNavSheet} onOpenChange={setOpenNavSheet}>
        <SheetTrigger
          className="lg:hidden left-2 absolute hover:bg-[#bec44d] p-2 border-1 hover:border-white rounded-md hover:text-white text-xl transition-all ease-in-out"
          variant="outline"
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="rounded-r-lg w-64 h-screen">
          <SheetHeader>
            <SheetTitle className="text-3xl">
              <Link href="/" onClick={() => setOpenNavSheet(false)}>
                Blogger's Hub
              </Link>
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <Separator className="my-5" />
          <div className="h-[75vh]">
            <ul className="flex flex-col items-center gap-2 w-full text-md">
              {navListItems && navListItems.length > 0
                ? navListItems.map((navItem) => (
                    <li key={navItem.id} className="w-full">
                      <Link
                        className="flex justify-center items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg"
                        href={navItem.path}
                        onClick={() => setOpenNavSheet(false)}
                      >
                        {navItem.icon}
                        <span>{navItem.label}</span>
                      </Link>
                    </li>
                  ))
                : null}

              {!user && (
                <>
                  <li>
                    <Link
                      className="flex items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg w-full"
                      href="/signIn"
                    >
                      <FaUserShield />
                      <span>Sign In</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 hover:bg-[#bec44d] p-2 px-4 rounded-lg w-full"
                      href="/signUp"
                    >
                      <FaUserPlus />
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {user && (
            <>
              <Separator className="my-5" />
              <SheetFooter>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <div className="flex justify-center items-center gap-4 hover:bg-[#bec44d] rounded-md text-xl cursor-pointer">
                      <div>
                        <Avatar className="border-2 hover:border-[#bec44d] border-transparent rounded-full w-12 h-12 active:scale-90 transition-all ease-in-out">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>RR</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <SheetTitle>
                          <span>Rajesh Ranjan</span>
                        </SheetTitle>
                        <SheetDescription>rajesh@gmail.com</SheetDescription>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <UserRoundIcon size={15} />
                      <span>Rajesh Ranjan</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenNavSheet(false);
                        router.push("/user/profile");
                      }}
                    >
                      <CircleUserRoundIcon />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenNavSheet(false);
                        router.push("/user/posts");
                      }}
                    >
                      <BsPostcard />
                      <span>Posts</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenNavSheet(false);
                        router.push("/user/createPost");
                      }}
                    >
                      <MdOutlinePostAdd />
                      <span>Create Post</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenNavSheet(false);
                        router.push("/");
                      }}
                    >
                      <RiLogoutCircleRLine />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Header;
