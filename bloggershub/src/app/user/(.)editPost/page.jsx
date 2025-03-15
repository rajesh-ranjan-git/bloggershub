"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { MdOutlinePostAdd } from "react-icons/md";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { updatePostSchema } from "@/validations/updatePostSchema";
import CustomButton from "@/components/customFormElements/customButton";
import CustomFileInput from "@/components/customFormElements/customFileInput";
import CustomInput from "@/components/customFormElements/customInput";
import CustomTextarea from "@/components/customFormElements/customTextarea";
import updatePostService from "@/services/posts/updatePostService";

const EditPost = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.authReducer);

  const form = useForm({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(updatePostService({ postId, authorId: loggedInUser?.id }));
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <section className="flex justify-center items-center px-10 w-screen h-screen">
      <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="m-0 p-0 border-none rounded-lg md:w-auto min-w-[60vw]">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="shadow-md p-4 border-[#a3ab09] border-t-4 rounded-lg min-h-96">
            <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
              <MdOutlinePostAdd />
              <span>Edit this Post</span>
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
                {/* <div className="relative p-3 emailBox">
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
                </div> */}
                <div className="p-3">
                  <CustomButton
                    type="submit"
                    buttonText="Edit post"
                    buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                    disabled={false}
                  />
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditPost;
