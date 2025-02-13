"use client";

import { useEffect, useState } from "react";
import HeaderRightContent from "./headerRightContent";
import Logo from "./logo";
import { usePathname } from "next/navigation";

const Header = () => {
  const [headerBackground, setHeaderBackground] = useState(true);

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
      className={`top-0 fixed flex justify-center md:justify-between items-center shadow-md px-10 border-b w-full z-40 h-16 ${
        headerBackground ? "bg-white text-black" : "bg-transparent text-white"
      }`}
    >
      <Logo />
      <HeaderRightContent />
    </section>
  );
};

export default Header;
