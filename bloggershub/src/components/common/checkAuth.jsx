"use client";

import checkAuthService from "@/services/auth/checkAuthService";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const path = usePathname();

  useEffect(() => {
    dispatch(checkAuthService()).then((data) => {
      if (!data.payload.success) {
        if (path.includes("/user")) {
          redirect("/");
        }
      }
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default CheckAuth;
