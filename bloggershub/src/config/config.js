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

export const updateProfileItems = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name...",
    buttonText: "Update Name",
  },
  {
    id: "designation",
    label: "Designation",
    placeholder: "Enter your designation...",
    buttonText: "Update Designation",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    buttonText: "Update Email",
  },
  {
    id: "dob",
    label: "Date of Birth",
    placeholder: "Enter your date of birth...",
    buttonText: "Update Date of Birth",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number...",
    buttonText: "Update Phone Number",
  },
  {
    id: "bio",
    label: "Bio",
    placeholder: "Enter your bio...",
    buttonText: "Update Bio",
  },
];
