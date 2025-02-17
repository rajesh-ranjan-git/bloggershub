"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import signInService from "@/services/auth/signInService";
import { signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";

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
      if (data.payload.success) {
        console.log("data.payload : ", data.payload);
        router.push("/");
        toast({
          title: "Sign In successful!",
          description: data.payload.message,
        });
      } else {
        toast({
          title: "Sign In failed!",
          variant: "destructive",
          description: data.payload.message,
        });
      }
    });
    router.push("/");
  };

  const handleDialogClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="m-0 p-0 border-none">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96 min-h-96">
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
                    buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
                    disabled={false}
                  />
                </div>
              </form>
            </Form>
            <div className="p-3">
              <Button className="flex justify-center items-center bg-blue-100 hover:bg-blue-50 shadow-md w-full text-black">
                <FcGoogle />
                <span>Continue with Google</span>
              </Button>
            </div>
            <div className="p-2 text-sm text-center">
              <Link
                className="font-semibold hover:text-blue-600 hover:underline"
                href="/signUp"
              >
                Forgot password?
              </Link>
            </div>
            <div className="p-2 text-sm text-center">
              Don't have an account?
              <Link
                className="ml-2 font-semibold hover:text-blue-600 hover:underline"
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
