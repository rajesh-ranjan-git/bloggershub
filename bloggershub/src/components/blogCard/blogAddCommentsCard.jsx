import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "../customFormElements/customButton";

const BlogAddCommentsCard = () => {
  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Add Comments</CardTitle>
        <CardDescription>Post your comment here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="items-center gap-4 grid w-full">
            <div className="flex flex-col space-y-1.5">
              <Textarea placeholder="Type your message here." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
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
