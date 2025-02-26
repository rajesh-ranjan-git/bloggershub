"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import checkAuthService from "@/services/auth/checkAuthService";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const path = usePathname();

  useEffect(() => {
    dispatch(checkAuthService()).then((data) => {
      if (!data?.payload?.success) {
        if (path.includes("/user")) {
          toast({
            title: "Unauthorized",
            description: "Please sign in to access this page.",
            variant: "destructive",
          });
          redirect("/");
        }
      }
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default CheckAuth;
