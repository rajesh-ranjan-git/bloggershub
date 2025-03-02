import ViewProfile from "@/components/profile/viewProfile";

const PublicProfile = async ({ params }) => {
  const { userId } = await params;
  return (
    <>
      <ViewProfile userId={userId} />
    </>
  );
};

export default PublicProfile;
