import { FaHeartPulse } from "react-icons/fa6";
import Logo from "@/components/header/logo";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <section className="flex justify-center items-center gap-5 bg-white px-2 md:px-10 py-3 border-t w-full h-16 text-black footerShadow">
      <div className="hidden md:block">
        <Logo />
      </div>
      <Separator orientation="vertical" className="hidden md:flex" />
      <div className="flex justify-center items-center gap-2 font-semibold text-sm md:text-xl">
        <span>Made with </span>
        <FaHeartPulse color="red" />
        <span> by Rajesh Ranjan!</span>
      </div>
    </section>
  );
};

export default Footer;
