"use client";

import { toast } from "@/hooks/use-toast";
import checkAuthService from "@/services/auth/checkAuthService";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
