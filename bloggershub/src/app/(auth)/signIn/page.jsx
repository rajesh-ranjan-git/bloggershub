// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Invalid email",
//   }),
//   password: z
//     .string()
//     .min(6, {
//       message: "Password must be at least 6 characters.",
//     })
//     .max(20, {
//       message: "Password must be at most 20 characters.",
//     }),
// });

// export const LoginForm = () => {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
// };

const SignIn = () => {
  return (
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <div className="border-2 border-black rounded-lg min-w-96 min-h-96">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
        Sign In Page
      </div>
    </section>
  );
};

export default SignIn;
