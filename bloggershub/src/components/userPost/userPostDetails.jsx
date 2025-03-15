"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { MdDelete, MdModeEdit } from "react-icons/md";
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
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";

const UserPostDetails = ({ post, handleDeletePost }) => {
  const [commentsLength, setCommentLength] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

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
        <div
          className="hover:bg-green-600 p-2 border border-green-600 rounded-md text-green-600 hover:text-white transition-all ease-in-out cursor-pointer"
          onClick={() => router.push("/user/updatePost/" + post?.id)}
        >
          <MdModeEdit />
        </div>
        <AlertDialog>
          <AlertDialogTrigger
            className="hover:bg-red-600 p-2 border border-red-600 rounded-md text-red-600 hover:text-white transition-all ease-in-out cursor-pointer"
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
