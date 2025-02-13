"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomButton from "../customFormElements/customButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { AiOutlineLike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsReplyAllFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const BlogCommentsCard = () => {
  const [commentButtonsBackground, setCommentButtonsBackground] =
    useState(null);

  const handleCommentButtonHover = (e) => {
    if (commentButtonsBackground !== e.target.id) {
      setCommentButtonsBackground(e.target.id);
    } else {
      setCommentButtonsBackground(null);
    }
  };

  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>Recent comments</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="hover:shadow-md p-4 border rounded-md w-full h-96">
          <div>
            <div className="flex justify-start items-center gap-4">
              <Avatar>
                <AvatarImage src="/images/latest_pic.png" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">Rajesh Ranjan</h2>
                <p className="text-muted-foreground text-sm">13/02/2025</p>
              </div>
            </div>
            <div className="my-2 p-2 border rounded-md">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio et voluptas, veritatis quas sed eligendi quos sit
                omnis nobis exercitationem laboriosam suscipit totam sunt vel
                eius impedit maiores eaque temporibus? Atque, labore? Magnam eos
                perferendis dolor dicta numquam. Nisi omnis molestiae facilis
                cum numquam iusto est molestias fugiat consectetur laudantium,
                similique cupiditate eligendi error quis maiores, doloremque
                fugit porro vero!
              </p>
            </div>
            <div
              className="flex justify-between items-center text-xl"
              onMouseEnter={(e) => {
                handleCommentButtonHover(e);
              }}
              onMouseLeave={(e) => {
                handleCommentButtonHover(e);
              }}
            >
              <div className="flex justify-between items-center gap-4">
                <div
                  className={`flex items-center gap-2 p-2 border border-transparent rounded-md transition-all ease-in-out cursor-pointer ${
                    commentButtonsBackground === "like"
                      ? "bg-blue-600 hover:border-blue-600 text-white"
                      : ""
                  }`}
                  id="like"
                >
                  <AiOutlineLike title="Like" />
                  <span className="text-sm">Like</span>
                </div>
                <div
                  className={`flex items-center gap-2 p-2 border border-transparent rounded-md transition-all ease-in-out cursor-pointer ${
                    commentButtonsBackground === "reply"
                      ? "bg-blue-600 hover:border-blue-600 text-white"
                      : ""
                  }`}
                  id="reply"
                >
                  <BsReplyAllFill
                    title="Reply"
                    className="hover:text-blue-600"
                  />
                  <span className="text-sm">Reply</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div
                  className={`flex items-center gap-2 p-2 border border-transparent rounded-md transition-all ease-in-out cursor-pointer ${
                    commentButtonsBackground === "edit"
                      ? "bg-green-600 hover:green-blue-600 text-white"
                      : ""
                  }`}
                  id="edit"
                >
                  <FaEdit title="Edit" className="hover:text-green-600" />
                  <span className="text-sm">Edit</span>
                </div>
                <div
                  className={`flex items-center gap-2 p-2 border border-transparent rounded-md transition-all ease-in-out cursor-pointer ${
                    commentButtonsBackground === "delete"
                      ? "bg-red-600 hover:border-red-600 text-white"
                      : ""
                  }`}
                  id="delete"
                >
                  <MdDelete title="Delete" className="hover:text-red-600" />
                  <span className="text-sm">Delete</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-5" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BlogCommentsCard;
