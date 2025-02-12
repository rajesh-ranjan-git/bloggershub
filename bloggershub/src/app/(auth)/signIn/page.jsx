"use client";

import CustomButton from "@/components/customForm/customButton";
import CustomInput from "@/components/customForm/customInput";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SignIn = () => {
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
      <div className="border-2 border-black rounded-lg min-w-96 min-h-96">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-20"
          >
            <CustomInput
              control={form.control}
              label="Email"
              name="email"
              placeholder="Enter your email..."
              inputStyle="w-full"
              labelStyle="text-md"
            />
            <CustomInput
              control={form.control}
              label="Password"
              name="password"
              placeholder="Enter your password..."
              inputStyle="w-full"
              labelStyle="text-md"
            />
            <CustomButton
              type="submit"
              buttonText="Sign In"
              buttonStyle="w-full"
              disabled={false}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignIn;
