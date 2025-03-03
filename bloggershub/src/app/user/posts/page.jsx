"use client";

import { useSelector } from "react-redux";
import UserPost from "@/components/userPost/userPost";
import UserPostHeading from "@/components/userPost/userPostHeading";

const Posts = () => {
  const { isLoggedInUserLoading, loggedInUser } = useSelector(
    (state) => state.authReducer
  );

  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        {!isLoggedInUserLoading ? (
          <div className="p-5 border-[#a3ab09] border-b-4 w-full md:w-1/3 xl:w-1/5 font-semibold text-3xl xl:text-left text-center">
            {`${loggedInUser?.profile?.firstName}'s Posts` || "User Posts"}
          </div>
        ) : null}
        <div className="flex flex-col gap-4 py-4 min-h-dvh">
          <UserPostHeading />
          {!isLoggedInUserLoading ? (
            <UserPost />
          ) : (
            <div className="w-full h-dvh text-center">Loading user...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;
