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
import Image from "next/image";

const Header = () => {
  const [openNavSheet, setOpenNavSheet] = useState(false);
  const router = useRouter();
  const { isLoggedInUserLoading, loggedInUser } = useSelector(
    (state) => state.authReducer
  );

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
            <SheetTitle className="text-2xl">
              <Link
                href="/"
                onClick={() => setOpenNavSheet(false)}
                className="flex items-center gap-1"
              >
                <Image src="/logoIcon.svg" alt="logo" width={30} height={30} />
                <span>Blogger's Hub</span>
              </Link>
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <Separator className="my-5" />
          <div className="h-[75vh]">
            <ul className="flex flex-col items-center gap-2 w-full">
              {navListItems && navListItems.length > 0
                ? navListItems.map((navItem) => (
                    <li key={navItem.id} className="w-full">
                      <Link
                        className="flex justify-start items-center gap-4 hover:bg-[#bec44d] p-3 px-5 rounded-lg font-semibold text-lg"
                        href={navItem.path}
                        onClick={() => setOpenNavSheet(false)}
                      >
                        {navItem.icon}
                        <span>{navItem.label}</span>
                      </Link>
                    </li>
                  ))
                : null}
              {isLoggedInUserLoading
                ? null
                : !loggedInUser && (
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                      <li className="w-full">
                        <Link
                          className="flex justify-center items-center gap-2 hover:bg-[#bec44d] p-2 rounded-lg w-full"
                          href="/signIn"
                        >
                          <FaUserShield />
                          <span>Sign In</span>
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link
                          className="flex justify-center items-center gap-2 hover:bg-[#bec44d] p-2 rounded-lg w-full"
                          href="/signUp"
                        >
                          <FaUserPlus />
                          <span>Sign Up</span>
                        </Link>
                      </li>
                    </div>
                  )}
            </ul>
          </div>
          {isLoggedInUserLoading
            ? null
            : loggedInUser && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <div className="flex justify-center items-center gap-4 rounded-md w-full text-xl cursor-pointer">
                          <div>
                            <Avatar className="border-2 hover:border-[#bec44d] border-transparent rounded-full w-12 h-12 active:scale-90 transition-all ease-in-out">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>RR</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <SheetTitle className="text-left">
                              <span>{`${
                                loggedInUser?.profile?.firstName
                                  ? loggedInUser?.profile?.firstName
                                  : loggedInUser?.email
                              }`}</span>
                            </SheetTitle>
                            <SheetDescription>
                              {loggedInUser?.email}
                            </SheetDescription>
                          </div>
                        </div>
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
                  </div>
                </>
              )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Header;
