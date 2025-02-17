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

const Header = () => {
  const [headerBackground, setHeaderBackground] = useState(true);
  const [openNavSheet, setOpenNavSheet] = useState(false);

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath === "/") {
      setHeaderBackground(false);
    } else {
      setHeaderBackground(true);
    }
  }, [currentPath]);

  useEffect(() => {
    if (currentPath === "/") {
      setHeaderBackground(false);
      document.addEventListener("scroll", () => {
        if (window.scrollY >= 700) {
          setHeaderBackground(true);
        } else {
          setHeaderBackground(false);
        }
      });

      return () => {
        document.removeEventListener("scroll", () => {});
      };
    } else {
      setHeaderBackground(true);
    }
  }, []);

  return (
    <section
      className={`top-0 fixed flex justify-center lg:justify-between items-center shadow-md px-10 border-b w-full z-40 h-16 ${
        headerBackground ? "bg-white text-black" : "bg-transparent text-white"
      }`}
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
          <div className="pt-10 h-[85vh]">
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
          <SheetFooter>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex justify-center items-center gap-4 hover:bg-blue-300/70 p-1 rounded-md text-xl cursor-pointer">
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
