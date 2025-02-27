import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 font-bold text-3xl">
      <Image src="/logoIcon.svg" alt="logo" width={40} height={40} />
      <span>Blogger's Hub</span>
    </Link>
  );
};

export default Logo;
