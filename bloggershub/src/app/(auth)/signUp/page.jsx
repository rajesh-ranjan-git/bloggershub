"use client";

import CustomButton from "@/components/customForm/customButton";
import CustomInput from "@/components/customForm/customInput";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { signUpSchema } from "@/validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data : ", data);
    console.log("Submit called");
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
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96 min-h-96">
        <h1 className="p-4 font-semibold text-2xl text-center">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-2">
              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email..."
                inputStyle="w-full"
                labelStyle="text-md"
              />
            </div>
            <div className="p-2">
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password..."
                inputStyle="w-full outline-blue-400 focus:outline-blue-400"
                labelStyle="text-md"
              />
            </div>
            <div className="p-2">
              <CustomInput
                control={form.control}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password..."
                inputStyle="w-full outline-blue-400 focus:outline-blue-400"
                labelStyle="text-md"
              />
            </div>
            <div className="p-2">
              <CustomButton
                type="submit"
                buttonText="Sign Up"
                buttonStyle="w-full bg-blue-400 hover:bg-blue-600"
                disabled={false}
              />
            </div>
          </form>
        </Form>
        <div className="p-1 text-sm text-center">
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
