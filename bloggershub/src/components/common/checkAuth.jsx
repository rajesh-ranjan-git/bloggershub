"use client";

import checkAuthService from "@/services/auth/checkAuthService";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const path = usePathname();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.authReducer
  );
  console.log("path : ", path);

  if (isLoading) return <>Loading</>;

  if (path.includes("/user")) {
    console.log("User path");
    if (!isAuthenticated) {
      redirect("/");
    }
  }

  useEffect(() => {
    console.log("Before checkAuthService");
    dispatch(checkAuthService());
    console.log("After checkAuthService");
  }, [dispatch]);

  //   useEffect(() => {
  //     console.log("Before checkAuthService");
  //     console.log("path : ", path);
  //     dispatch(checkAuthService()).then((data) => {
  //       console.log("data : ", data);
  //       console.log("data.payload.success : ", data.payload.success);
  //       if (data.payload.success) {
  //         console.log(
  //           "isAuthenticated from inside checkAuthService : ",
  //           isAuthenticated
  //         );
  //         if (path.includes("/user")) {
  //           console.log("User path");
  //           if (!isAuthenticated) {
  //             redirect("/");
  //           }
  //         }
  //       }
  //     });
  //     console.log("After checkAuthService");
  //   }, [dispatch]);

  return <>{children}</>;
};

export default CheckAuth;
