"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UpdatePost = () => {
  const { postId } = useParams();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.authReducer);

  const form = useForm({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(
      updatePostService({ postId, authorId: loggedInUser?.id, formData })
    ).then((data) => {
      router.back();
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
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
              <span>Update this Post</span>
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
            </div> */}
                <div className="relative p-3 emailBox">
                  <CustomInput
                    control={form.control}
                    label="Tags (comma-separated)"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                  />
                </div>
                {/* <div className="relative p-3 emailBox">
                  <div className="items-center gap-1.5 grid w-full max-w-sm">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" />
                  </div>
                </div> */}
                <div className="p-3">
                  <CustomButton
                    type="submit"
                    buttonText="Update post"
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

export default UpdatePost;
