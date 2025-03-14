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
  },
  {
    id: "designation",
    label: "Designation",
    placeholder: "Enter your designation...",
    buttonText: "Update Designation",
  },
  {
    id: "dob",
    label: "Date of Birth",
    placeholder: "Enter your date of birth...",
    buttonText: "Update Date of Birth",
  },
  {
    id: "phoneNumber",
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

export const updateProfileName = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Enter your first Name...",
  },
  {
    id: "middleName",
    label: "Middle Name",
    placeholder: "Enter your middle name...",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name...",
  },
];
