"use client";

import { useEffect, useState } from "react";
import HeaderRightContent from "./headerRightContent";
import Logo from "./logo";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRoundIcon, Menu, UserRoundIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { navListItems } from "@/config/navListItems";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Header = () => {
  // const [headerBackground, setHeaderBackground] = useState(false);
  const [openNavSheet, setOpenNavSheet] = useState(false);

  const router = useRouter();
  // const currentPath = usePathname();

  // useEffect(() => {
  //   if (currentPath === "/") {
  //     console.log("headerBackground : ", headerBackground);
  //     setHeaderBackground(() => true);
  //   } else {
  //     console.log("headerBackground : ", headerBackground);
  //     setHeaderBackground(() => false);
  //   }
  // }, [currentPath]);

  // useEffect(() => {
  //   if (currentPath === "/") {
  // setHeaderBackground(true);
  //     document.addEventListener("scroll", () => {
  //       if (window.scrollY >= 700) {
  //         console.log("headerBackground : ", headerBackground);
  //         setHeaderBackground(() => false);
  //       } else {
  //         console.log("headerBackground : ", headerBackground);
  //         setHeaderBackground(() => true);
  //       }
  //     });

  //     return () => {
  //       document.removeEventListener("scroll", () => {});
  //     };
  //   }
  // }, [headerBackground, currentPath]);

  return (
    <section
      // className={`top-0 fixed flex justify-center lg:justify-between items-center shadow-md px-10 border-b w-full z-40 h-16 ${
      //   headerBackground ? "bg-transparent text-white" : "bg-white text-black"
      // }`}
      className="top-0 fixed flex justify-center lg:justify-between items-center shadow-md px-10 border-b w-full z-40 h-16 ${
        bg-white text-black"
    >
      <Logo />
      <HeaderRightContent />
      <Sheet open={openNavSheet} onOpenChange={setOpenNavSheet}>
        <SheetTrigger
          className="lg:hidden right-2 absolute hover:bg-blue-400 p-2 border-1 hover:border-white rounded-md hover:text-white text-xl transition-all ease-in-out"
          variant="outline"
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="rounded-r-lg w-72 h-screen">
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
                        className="flex justify-center items-center gap-2 hover:bg-blue-300/70 p-2 px-4 rounded-lg"
                        href={navItem.path}
                        onClick={() => setOpenNavSheet(false)}
                      >
                        {navItem.icon}
                        <span>{navItem.label}</span>
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <Separator className="my-5" />
          <SheetFooter>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex justify-center items-center gap-4 hover:bg-blue-300/70 rounded-md text-xl cursor-pointer">
                  <div>
                    <Avatar className="border-2 border-transparent hover:border-blue-400 rounded-full w-12 h-12 active:scale-90 transition-all ease-in-out">
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
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Header;
