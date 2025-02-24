"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import signUpService from "@/services/auth/signUpService";
import { signUpSchema } from "@/validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import firebaseGoogleAuth from "@/firebase/firebaseGoogleAuth";
import firebaseGoogleAuthService from "@/services/auth/firebaseGoogleAuthService";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(signUpService(formData)).then((data) => {
      if (data.payload.success) {
        router.push("/");
        toast({
          title: "Sign Up successful!",
          description: data.payload.message,
        });
      } else {
        toast({
          title: "Sign Up failed!",
          variant: "destructive",
          description: data.payload.message,
        });
      }
    });
    // router.push("/");
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
      <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96 min-h-96">
        <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
          <FaUserPlus />
          <span>Sign Up</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative p-3">
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
            <div className="relative p-3">
              <CustomInput
                control={form.control}
                label="Confirm Password"
                name="password_confirmation"
                placeholder="Confirm your password..."
              />
            </div>
            <div className="relative p-3">
              <CustomButton
                type="submit"
                buttonText="Sign Up"
                buttonStyle="w-full bg-blue-400 hover:bg-blue-600"
                disabled={false}
              />
            </div>
          </form>
        </Form>
        <div className="p-3">
          <Button
            className="flex justify-center items-center bg-blue-100 hover:bg-blue-50 shadow-md w-full text-black"
            onClick={() => handleFirebaseGoogleAuth()}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>
        </div>
        <div className="p-2 text-sm text-center">
          Already have an account?
          <Link
            className="ml-2 font-semibold hover:text-blue-600 hover:underline"
            href="/signIn"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
