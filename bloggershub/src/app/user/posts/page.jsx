"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkAuthService from "@/services/auth/checkAuthService";
import fetchProfileService from "@/services/profile/fetchProfileService";
import UserPost from "@/components/userPost/userPost";
import UserPostHeading from "@/components/userPost/userPostHeading";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { userProfile } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileService(user?.id));
    } else {
      dispatch(checkAuthService());
    }
  }, [dispatch, user]);
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="p-5 border-[#a3ab09] border-b-4 w-full md:w-1/3 xl:w-1/5 font-semibold text-3xl xl:text-left text-center">
          {`${userProfile?.firstName}'s Posts` || "User Posts"}
        </div>
        <div className="flex flex-col gap-4 py-4 min-h-dvh">
          <UserPostHeading />
          <UserPost />
        </div>
      </div>
    </section>
  );
};

export default Posts;
