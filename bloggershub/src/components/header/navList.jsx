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

const NavList = () => {
  const router = useRouter();

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
                <DropdownMenuLabel>Rajesh Ranjan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/user/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/user/posts")}>
                  Posts
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/user/createPost")}
                >
                  Create Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/")}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavList;
