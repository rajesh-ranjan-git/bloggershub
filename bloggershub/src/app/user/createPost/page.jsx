"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomFileInput from "@/components/customFormElements/customFileInput";
import CustomInput from "@/components/customFormElements/customInput";
import CustomTextarea from "@/components/customFormElements/customTextarea";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlinePostAdd } from "react-icons/md";

const CreatePost = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
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
      <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg w-full md:w-[70vw] min-h-96">
        <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
          <MdOutlinePostAdd />
          <span>Create a New Post</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative p-3 emailBox">
              <CustomInput
                control={form.control}
                label="Title"
                name="title"
                placeholder="Enter title for your post..."
              />
            </div>
            <div className="relative p-3 emailBox">
              <CustomTextarea
                control={form.control}
                label="Content"
                name="content"
                placeholder="Write your post content here..."
              />
            </div>
            <div className="relative p-3 emailBox">
              <CustomFileInput
                control={form.control}
                label="Thumbnail"
                name="thumbnail"
              />
            </div>
            <div className="relative p-3 emailBox">
              <CustomInput
                control={form.control}
                label="Tags (comma-separated)"
                name="tags"
                placeholder="Tags (comma-separated)"
              />
            </div>
            <div className="p-3">
              <CustomButton
                type="submit"
                buttonText="Save post"
                buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
                disabled={false}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreatePost;
