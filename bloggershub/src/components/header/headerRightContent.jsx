import NavList from "@/components/header/navList";

const HeaderRightContent = ({ handleSignOut }) => {
  return (
    <div className="hidden lg:flex">
      <NavList handleSignOut={handleSignOut} />
    </div>
  );
};

export default HeaderRightContent;
