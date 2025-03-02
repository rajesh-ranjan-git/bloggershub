"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
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
import fetchProfileService from "@/services/profile/fetchProfileService";
import AddProfileDetailsModal from "@/components/profile/addProfileDetailsModal";

const UserProfile = () => {
  const [typeOfProfileData, setTypeOfProfileData] = useState("");
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { userProfile } = useSelector((state) => state.profileReducer);

  const handleUpdateProfileData = (type) => {
    setTypeOfProfileData(type);
  };

  useEffect(() => {
    dispatch(fetchProfileService(loggedInUser?.id));
  }, [dispatch, loggedInUser]);

  return (
    <>
      <section className="flex justify-center pt-16 w-full">
        <div className="flex flex-col justify-center px-5 md:px-10">
          <div className="p-5 border-[#a3ab09] border-b-4 font-semibold text-3xl text-center">
            {userProfile?.profile?.firstName
              ? userProfile?.profile?.firstName
              : loggedIn?.email}
            's Profile
          </div>
          <div className="justify-between gap-5 lg:gap-10 grid lg:grid-cols-2 py-10">
            <div className="text-center">
              <Card className="hover:shadow-md w-full">
                <CardHeader>
                  {userProfile?.profile?.firstName ? (
                    userProfile?.profile?.lastName ? (
                      userProfile?.profile?.middleName ? (
                        <CardTitle className="text-3xl">{`${userProfile?.profile?.firstName} ${userProfile?.profile?.middleName} ${userProfile?.profile?.lastName}`}</CardTitle>
                      ) : (
                        <CardTitle className="text-3xl">{`${userProfile?.profile?.firstName} ${userProfile?.profile?.lastName}`}</CardTitle>
                      )
                    ) : (
                      <CardTitle className="text-3xl">{`${userProfile?.profile?.firstName}`}</CardTitle>
                    )
                  ) : (
                    <CardTitle className="text-3xl">{`${userProfile?.email}`}</CardTitle>
                  )}
                  <CardDescription className="hidden"></CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="p-1 border-[#a3ab09] border-2 rounded-full overflow-hidden">
                    <Image
                      src={
                        userProfile?.profile?.profileImage ||
                        "/images/latest_pic.png"
                      }
                      width={300}
                      height={300}
                      alt="profileImage"
                      className="rounded-full max-w-72 max-h-72 object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center pb-5">
                  <p className="text-lg text-center">
                    {userProfile?.profile?.designation}
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="w-full">
              <Card className="hover:shadow-md w-full">
                <CardHeader className="text-center">
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription className="text-md">
                    {userProfile?.profile?.designation}
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
                          {userProfile?.profile?.firstName ? (
                            userProfile?.profile?.lastName ? (
                              userProfile?.profile?.middleName ? (
                                `${userProfile?.profile?.firstName} ${userProfile?.profile?.middleName} ${userProfile?.profile?.lastName}`
                              ) : (
                                `${userProfile?.profile?.firstName} ${userProfile?.profile?.lastName}`
                              )
                            ) : (
                              `${userProfile?.profile?.firstName}`
                            )
                          ) : (
                            <Button
                              className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                              onClick={() => handleUpdateProfileData("name")}
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
                          {userProfile?.profile?.designation ? (
                            userProfile?.profile?.designation
                          ) : (
                            <Button
                              className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                              onClick={() =>
                                handleUpdateProfileData("designation")
                              }
                            >
                              Add Designation
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Email</TableCell>
                        <TableCell>{user?.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">DOB</TableCell>
                        <TableCell>
                          {userProfile?.profile?.dob ? (
                            userProfile?.profile?.dob.split("T")[0]
                          ) : (
                            <Button
                              className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                              onClick={() => handleUpdateProfileData("dob")}
                            >
                              Add Date of Birth
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ph No.</TableCell>
                        <TableCell>
                          {userProfile?.profile?.phoneNumber ? (
                            userProfile?.profile?.phoneNumber
                          ) : (
                            <Button
                              className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                              onClick={() => handleUpdateProfileData("phone")}
                            >
                              Add Phone Number
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Languages</TableCell>
                        <TableCell>Hindi & English</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Nationality
                        </TableCell>
                        <TableCell>Indian</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hobbies</TableCell>
                        <TableCell>Movies, Songs & Coding</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bio</TableCell>
                        <TableCell>
                          {userProfile?.profile?.bio ? (
                            userProfile?.profile?.bio
                          ) : (
                            <Button
                              className="bg-[#bec44d] hover:bg-[#a3ab09] w-full"
                              onClick={() => handleUpdateProfileData("bio")}
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
                    onClick={() => handleUpdateProfileData("updateProfile")}
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
      </section>
      {typeOfProfileData !== "" ? (
        <AddProfileDetailsModal
          typeOfProfileData={typeOfProfileData}
          handleUpdateProfileData={handleUpdateProfileData}
        />
      ) : null}
    </>
  );
};

export default UserProfile;
