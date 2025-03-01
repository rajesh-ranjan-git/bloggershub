"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
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

const UserPostDetails = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentsReducer);

  useEffect(() => {
    dispatch(fetchAllCommentsOnPostService(post?.id));
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
      <div className="hidden md:block w-20">{comments?.length}</div>
      <div className="flex items-center gap-2 w-20">
        <Button
          variant="outline"
          className="hover:bg-green-600 p-0 border-green-600 w-10 text-green-600 hover:text-white"
          onClick={() => router.push("/user/editPost")}
        >
          <MdModeEdit />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-red-600 p-0 border-red-600 w-10 text-red-600 hover:text-white"
            >
              <MdDelete />
            </Button>
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
              <AlertDialogAction className="flex items-center gap-2 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white h">
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
