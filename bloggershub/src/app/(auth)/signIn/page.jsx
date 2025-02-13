"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data : ", data);
    console.log("Submit called");
    console.log("toast : ", toast);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <section className="flex justify-center items-center px-10 w-full h-full">
      <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96 min-h-96">
        <h1 className="p-4 font-semibold text-2xl text-center">Sign In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative p-3 emailBox">
              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder=""
              />
            </div>
            <div className="relative p-3">
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder=""
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
    </section>
  );
};

export default SignIn;
