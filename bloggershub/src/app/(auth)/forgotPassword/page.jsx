"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import forgotPasswordService from "@/services/auth/forgotPasswordService";
import { forgotPasswordSchema } from "@/validations/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaUserShield } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(forgotPasswordService(formData)).then((data) => {
      if (data?.payload?.success) {
        router.push("/signIn");
        toast({
          title: "Password update successful!",
          description: data.payload.message,
        });
      } else {
        toast({
          title: "Password update failed!",
          variant: "destructive",
          description: data.payload.message,
        });
      }
    });
  };

  return (
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96 min-h-96">
        <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
          <FaUserShield />
          <span>Forgot Password</span>
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
                placeholder="Enter new password..."
              />
            </div>
            <div className="relative p-3">
              <CustomInput
                control={form.control}
                label="Confirm Password"
                name="password_confirmation"
                placeholder="Confirm your new password..."
              />
            </div>
            <div className="p-3">
              <CustomButton
                type="submit"
                buttonText="Change Password"
                buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
                disabled={false}
              />
            </div>
          </form>
        </Form>
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
    </section>
  );
};

export default ForgotPassword;
