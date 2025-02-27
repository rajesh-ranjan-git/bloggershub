import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/customFormElements/customButton";

const BlogAddCommentsCard = () => {
  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Add Comments</CardTitle>
        <CardDescription>Post your comment here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your message here..."
          className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full"
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline" className="shadow-md">
          Cancel
        </Button>
        <CustomButton
          buttonText="Add Comment"
          buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
          disabled={false}
        />
      </CardFooter>
    </Card>
  );
};

export default BlogAddCommentsCard;
