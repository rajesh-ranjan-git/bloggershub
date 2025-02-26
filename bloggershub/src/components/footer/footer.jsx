import { FaHeartPulse } from "react-icons/fa6";
import Logo from "@/components/header/logo";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <section className="bottom-0 fixed flex justify-center items-center gap-5 bg-white px-10 py-3 border-t w-full h-16 text-black footerStyle">
      <Logo />
      <Separator orientation="vertical" />
      <div className="flex justify-center items-center gap-2 font-semibold text-2xl">
        <span>Made with </span>
        <FaHeartPulse color="red" />
        <span> by Rajesh Ranjan!</span>
      </div>
    </section>
  );
};

export default Footer;
