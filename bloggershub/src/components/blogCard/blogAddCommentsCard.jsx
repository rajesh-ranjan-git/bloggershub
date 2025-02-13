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
import CustomTextarea from "../customFormElements/customTextarea";

const BlogAddCommentsCard = () => {
  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Add Comments</CardTitle>
        <CardDescription>Post your comment here.</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomTextarea placeholder="Type your message here..." />
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline" className="shadow-md">
          Cancel
        </Button>
        <CustomButton
          buttonText="Add Comment"
          buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
          disabled={false}
        />
      </CardFooter>
    </Card>
  );
};

export default BlogAddCommentsCard;
