import { FaBlog, FaInfoCircle } from "react-icons/fa";
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
];
