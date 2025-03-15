"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/customFormElements/customButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { updatePostSchema } from "@/validations/updatePostSchema";
import CustomInput from "../customFormElements/customInput";

const UserPostDetails = ({ post, handleDeletePost }) => {
  const [commentsLength, setCommentLength] = useState(0);
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
    // dispatch(updatePostService({ postId, authorId: loggedInUser?.id }));
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log("data : ", data);
  };

  useEffect(() => {
    dispatch(fetchAllCommentsOnPostService(post?.id)).then((data) => {
      setCommentLength(data?.payload?.comments.length);
    });
  }, []);

  return (
    <div className="flex justify-between md:justify-around items-center p-2 w-full md:w-1/2 text-center">
      <div className="md:hidden block">
        <span className="font-semibold">Posted on : </span>
        {post?.updatedAt.split("T")[0]}
      </div>
      <div className="hidden md:block w-24">
        {post?.updatedAt.split("T")[0]}
      </div>
      <div className="hidden md:block w-20">5</div>
      <div className="hidden md:block w-20">{commentsLength}</div>
      <div className="flex items-center gap-2 w-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Drawer>
              <DrawerTrigger className="hover:bg-green-600 p-2 border border-green-600 rounded-md text-green-600 hover:text-white transition-all ease-in-out">
                <MdModeEdit />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Update your post</DrawerTitle>
                  <DrawerDescription className="p-2">
                    <CustomInput
                      control={form.control}
                      label="Title"
                      name="title"
                      placeholder="Enter title for your post..."
                    />
                    <Textarea
                      placeholder="Update post content here..."
                      className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full text-black"
                      name="content"
                      // value={updatedPostContent}
                      // ref={postContentInput}
                      // onChange={(e) => {
                      //   setUpdatedPostContent(e.target.value);
                      // }}
                    />
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <DrawerClose
                      className="hover:bg-neutral-200 shadow-md p-2 border border-neutral-200 rounded-md w-full md:w-28 font-semibold transition-all ease-in-out"
                      // onClick={() => {
                      //   clearComment();
                      // }}
                    >
                      Cancel
                    </DrawerClose>
                    <CustomButton
                      buttonText="Update Post"
                      buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                      // customButtonAction={() =>
                      //   handleUpdateComment(comment?.id, updatedCommentContent)
                      // }
                      // disabled={updatedCommentContent.length < 2}
                    />
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </form>
        </Form>
        <AlertDialog>
          <AlertDialogTrigger
            className="hover:bg-red-600 p-2 border border-red-600 rounded-md text-red-600 hover:text-white transition-all ease-in-out"
            asChild
          >
            <div>
              <MdDelete />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-lg w-[90vw] md:w-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Permanently delete this post?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white h"
                onClick={() => handleDeletePost(post?.id)}
              >
                <MdDelete />
                <span>Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserPostDetails;
