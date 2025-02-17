import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const UserProfile = () => {
  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-5 md:px-10">
        <div className="p-5 border-b-4 border-blue-400 font-semibold text-3xl text-center">
          Rajesh's Profile
        </div>
        <div className="justify-between gap-5 lg:gap-10 grid lg:grid-cols-2 py-10">
          <div className="text-center">
            <Card className="hover:shadow-md w-full">
              <CardHeader>
                <CardTitle className="text-3xl">Rajesh Ranjan</CardTitle>
                <CardDescription className="hidden"></CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <div className="p-1 border-2 border-blue-400 rounded-full overflow-hidden">
                  <Image
                    src="/images/latest_pic.png"
                    width={300}
                    height={300}
                    alt="profileImage"
                    className="rounded-full max-w-72 max-h-72 object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center items-center pb-5">
                <p className="text-lg text-center">Full Stack Web Developer</p>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full">
            <Card className="hover:shadow-md w-full">
              <CardHeader className="text-center">
                <CardTitle>Profile Details</CardTitle>
                <CardDescription className="text-md">
                  Full Stack Web Developer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="text-lg">
                  <TableCaption>Personal Details</TableCaption>
                  <TableHeader className="hidden"></TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Name</TableCell>
                      <TableCell>Rajesh Ranjan</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Designation</TableCell>
                      <TableCell>Full Stack Web Developer</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>rajeshranjan8271@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DOB</TableCell>
                      <TableCell>18th January, 1997</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ph No.</TableCell>
                      <TableCell>+91-9999-34-0771</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Languages</TableCell>
                      <TableCell>Hindi & English</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nationality</TableCell>
                      <TableCell>Indian</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hobbies</TableCell>
                      <TableCell>Movies, Songs & Coding</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bio</TableCell>
                      <TableCell>
                        Ambitious web developer aiming to conquer the world.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Posts</TableCell>
                      <TableCell>15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Likes Received
                      </TableCell>
                      <TableCell>150</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex md:flex-row flex-col gap-2">
                <Button className="bg-blue-400 hover:bg-blue-600 w-full">
                  Update Profile
                </Button>
                <Button className="bg-red-400 hover:bg-red-600 w-full">
                  Delete your account?
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
