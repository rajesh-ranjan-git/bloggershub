"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import fetchProfileService from "@/services/profile/fetchProfileService";
import AddProfileDetailsModal from "@/components/profile/addProfileDetailsModal";
import CaptureCamera from "@/components/captureCamera/captureCamera";
import updateProfileService from "@/services/profile/updateProfileService";
import updateProfileImageService from "@/services/profile/updateProfileImageService";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUploading, setProfileImageUploading] = useState(false);
  const [uploadedProfileImageUrl, setUploadedProfileImageUrl] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [typeOfProfileData, setTypeOfProfileData] = useState("");
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { userProfile } = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileService(loggedInUser?.id));
    setIsProfileUpdated(false);
  }, [dispatch, isProfileUpdated]);

  useEffect(() => {
    if (!showCamera) {
      setProfileImage(null);
    }
  }, [showCamera]);

  useEffect(() => {
    if (!profileImageUploading) {
      setShowCamera(false);
    }

    if (uploadedProfileImageUrl && uploadedProfileImageUrl !== "") {
      dispatch(
        updateProfileImageService({
          profileImage: uploadedProfileImageUrl,
          userId: loggedInUser?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          setIsProfileUpdated(true);
          toast({
            title: "Profile updated successfully!",
            description: data.payload.message,
          });
        } else {
          toast({
            title: "Profile update failed!",
            variant: "destructive",
            description: data.payload.message,
          });
        }
      });
    }
  }, [profileImageUploading]);

  return (
    <>
      <section className="flex justify-center pt-16 w-full">
        {loggedInUser ? (
          <div className="flex flex-col justify-center px-5 md:px-10">
            <div className="p-5 border-[#a3ab09] border-b-4 font-semibold text-3xl text-center">
              {(userProfile || loggedInUser)?.profile?.firstName
                ? (userProfile || loggedInUser)?.profile?.firstName
                : (userProfile || loggedInUser)?.email}
              's Profile
            </div>

            <div className="justify-between gap-5 lg:gap-10 grid lg:grid-cols-2 py-10">
              <div className="text-center">
                <Card className="hover:shadow-md w-full">
                  <CardHeader>
                    {(userProfile || loggedInUser)?.profile?.firstName ? (
                      (userProfile || loggedInUser)?.profile?.lastName ? (
                        (userProfile || loggedInUser)?.profile?.middleName ? (
                          <CardTitle className="text-3xl">{`${
                            (userProfile || loggedInUser)?.profile?.firstName
                          } ${
                            (userProfile || loggedInUser)?.profile?.middleName
                          } ${
                            (userProfile || loggedInUser)?.profile?.lastName
                          }`}</CardTitle>
                        ) : (
                          <CardTitle className="text-3xl">{`${
                            (userProfile || loggedInUser)?.profile?.firstName
                          } ${
                            (userProfile || loggedInUser)?.profile?.lastName
                          }`}</CardTitle>
                        )
                      ) : (
                        <CardTitle className="text-3xl">{`${
                          (userProfile || loggedInUser)?.profile?.firstName
                        }`}</CardTitle>
                      )
                    ) : (
                      <CardTitle className="text-3xl">{`${
                        (userProfile || loggedInUser)?.email
                      }`}</CardTitle>
                    )}
                    <CardDescription className="hidden"></CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <div className="group relative p-1 border-[#a3ab09] border-2 rounded-full overflow-hidden cursor-pointer">
                      <Image
                        src={
                          (userProfile || loggedInUser)?.profile
                            ?.profileImage || "/images/latest_pic.png"
                        }
                        width={300}
                        height={300}
                        alt="profileImage"
                        className="z-0 rounded-full max-w-72 max-h-72 object-cover"
                      />
                      <div className="bottom-0 left-0 z-40 absolute flex flex-col justify-center items-center bg-neutral-600 opacity-0 group-hover:opacity-80 w-full h-24 transition-opacity duration-300" />
                      <DropdownMenu>
                        <DropdownMenuTrigger className="bottom-0 left-0 z-50 absolute flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 w-full h-24 font-semibold text-white text-sm transition-opacity duration-300">
                          <Camera size={30} />
                          <span>Update</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            Choose an option
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setShowCamera(true)}
                          >
                            Take a photo
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Choose from photos
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Dialog open={showCamera} onOpenChange={setShowCamera}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="pb-4 text-center">
                              {profileImage ? "Save photo" : "Capture photo"}
                            </DialogTitle>
                            <DialogDescription className="hidden"></DialogDescription>
                            <CaptureCamera
                              image={profileImage}
                              setImage={setProfileImage}
                              imageUploading={profileImageUploading}
                              setImageUploading={setProfileImageUploading}
                              uploadedImageUrl={uploadedProfileImageUrl}
                              setUploadedImageUrl={setUploadedProfileImageUrl}
                            />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center items-center pb-5">
                    <p className="text-lg text-center">
                      {(userProfile || loggedInUser)?.profile?.designation}
                    </p>
                  </CardFooter>
                </Card>
              </div>
              <div className="w-full">
                <Card className="hover:shadow-md w-full">
                  <CardHeader className="text-center">
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription className="text-md">
                      {(userProfile || loggedInUser)?.profile?.designation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table className="text-lg">
                      <TableCaption>Personal Details</TableCaption>
                      <TableHeader className="hidden"></TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Name</TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.profile
                              ?.firstName ? (
                              (userProfile || loggedInUser)?.profile
                                ?.lastName ? (
                                (userProfile || loggedInUser)?.profile
                                  ?.middleName ? (
                                  `${
                                    (userProfile || loggedInUser)?.profile
                                      ?.firstName
                                  } ${
                                    (userProfile || loggedInUser)?.profile
                                      ?.middleName
                                  } ${
                                    (userProfile || loggedInUser)?.profile
                                      ?.lastName
                                  }`
                                ) : (
                                  `${
                                    (userProfile || loggedInUser)?.profile
                                      ?.firstName
                                  } ${
                                    (userProfile || loggedInUser)?.profile
                                      ?.lastName
                                  }`
                                )
                              ) : (
                                `${
                                  (userProfile || loggedInUser)?.profile
                                    ?.firstName
                                }`
                              )
                            ) : (
                              <Button
                                className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                                onClick={() => setTypeOfProfileData("name")}
                              >
                                Add Name
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Designation
                          </TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.profile
                              ?.designation ? (
                              (userProfile || loggedInUser)?.profile
                                ?.designation
                            ) : (
                              <Button
                                className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                                onClick={() =>
                                  setTypeOfProfileData("designation")
                                }
                              >
                                Add Designation
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Email</TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.email}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">DOB</TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.profile?.dob ? (
                              (userProfile || loggedInUser)?.profile?.dob.split(
                                "T"
                              )[0]
                            ) : (
                              <Button
                                className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                                onClick={() => setTypeOfProfileData("dob")}
                              >
                                Add Date of Birth
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Ph No.</TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.profile
                              ?.phoneNumber ? (
                              (userProfile || loggedInUser)?.profile
                                ?.phoneNumber
                            ) : (
                              <Button
                                className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                                onClick={() =>
                                  setTypeOfProfileData("phoneNumber")
                                }
                              >
                                Add Phone Number
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bio</TableCell>
                          <TableCell>
                            {(userProfile || loggedInUser)?.profile?.bio ? (
                              (userProfile || loggedInUser)?.profile?.bio
                            ) : (
                              <Button
                                className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                                onClick={() => setTypeOfProfileData("bio")}
                              >
                                Add Bio
                              </Button>
                            )}
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
                    <Button
                      className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                      onClick={() => setTypeOfProfileData("updateProfile")}
                    >
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
        ) : (
          <div className="w-full h-dvh text-center">
            Loading user profile...
          </div>
        )}
      </section>
      {typeOfProfileData !== "" ? (
        <AddProfileDetailsModal
          typeOfProfileData={typeOfProfileData}
          setIsProfileUpdated={setIsProfileUpdated}
          setTypeOfProfileData={setTypeOfProfileData}
        />
      ) : null}
    </>
  );
};

export default Profile;
