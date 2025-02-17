import { FaBlog, FaInfoCircle, FaUserPlus, FaUserShield } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";

export const navListItems = [
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    icon: <FaBlog />,
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    icon: <FaInfoCircle />,
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    icon: <MdConnectWithoutContact />,
  },
  {
    id: "signIn",
    label: "Sign In",
    path: "/signIn",
    icon: <FaUserShield />,
  },
  {
    id: "signUp",
    label: "Sign Up",
    path: "/signUp",
    icon: <FaUserPlus />,
  },
];
