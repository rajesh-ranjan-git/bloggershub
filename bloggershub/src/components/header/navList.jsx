import { navListItems } from "@/config/navListItems";
import Link from "next/link";

const NavList = () => {
  return (
    <div>
      <ul className="flex justify-around items-center gap-2 text-md">
        {navListItems && navListItems.length > 0
          ? navListItems.map((navItem) => (
              <li key={navItem.id}>
                <Link
                  className="hover:bg-blue-300/70 p-2 px-4 rounded-lg"
                  href={navItem.path}
                >
                  {navItem.label}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default NavList;
