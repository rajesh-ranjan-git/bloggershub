"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaUserShield } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { signInSchema } from "@/validations/signInSchema";
import signInService from "@/services/auth/signInService";
import firebaseGoogleAuthService from "@/services/auth/firebaseGoogleAuthService";
import firebaseGoogleAuth from "@/firebase/firebaseGoogleAuth";
import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";

const SignIn = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(signInService(formData)).then((data) => {
      if (data?.payload?.success) {
        router.push("/");
        toast({
          title: "Sign In successful!",
          description: data?.payload?.message,
        });
      } else {
        toast({
          title: "Sign In failed!",
          variant: "destructive",
          description: data?.payload?.message,
        });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    console.log("I am here");
    router.push("/");
  };

  const handleFirebaseGoogleAuth = async () => {
    const formData = await firebaseGoogleAuth();

    dispatch(firebaseGoogleAuthService(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        router.push("/");
      } else {
        if (data?.payload?.message === "Validation Error") {
          toast({
            title: data?.payload?.message,
            description: data?.payload?.errors?.email,
            variant: "destructive",
          });
        } else {
          toast({
            title: data?.payload?.message || "Something went wrong!",
            variant: "destructive",
          });
        }
      }
    });
  };

  return (
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="m-0 p-0 border-none rounded-lg w-[90vw] md:w-auto">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="shadow-md p-4 border-[#a3ab09] border-t-4 rounded-lg min-w-80 md:min-w-96 min-h-96">
            <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
              <FaUserShield />
              <span>Sign In</span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="relative p-3 emailBox">
                  <CustomInput
                    control={form.control}
                    label="Email"
                    name="email"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="relative p-3">
                  <CustomInput
                    control={form.control}
                    label="Password"
                    name="password"
                    placeholder="Enter your password..."
                  />
                </div>
                <div className="p-3">
                  <CustomButton
                    type="submit"
                    buttonText="Sign In"
                    buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                    disabled={false}
                  />
                </div>
              </form>
            </Form>
            <div className="p-3">
              <Button
                className="flex justify-center items-center bg-[#bec44d]/30 hover:bg-[#a3ab09]/40 shadow-md w-full text-black"
                onClick={() => handleFirebaseGoogleAuth()}
              >
                <FcGoogle />
                <span>Continue with Google</span>
              </Button>
            </div>
            <div className="p-2 text-sm text-center">
              <Link
                className="font-semibold hover:text-[#a3ab09] hover:underline"
                href="/forgotPassword"
              >
                Forgot password?
              </Link>
            </div>
            <div className="p-2 text-sm text-center">
              Don't have an account?
              <Link
                className="ml-2 font-semibold hover:text-[#a3ab09] hover:underline"
                href="/signUp"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SignIn;
