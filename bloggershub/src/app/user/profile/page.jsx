"use client";

import AddProfileDetailsModal from "@/components/profile/addProfileDetailsModal";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const [typeOfProfileData, setTypeOfProfileData] = useState("");
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.authReducer);
  const { userProfile } = useSelector((state) => state.profileReducer);

  const handleUpdateProfileData = (type) => {
    setTypeOfProfileData(type);
  };

  useEffect(() => {
    dispatch(fetchProfileService(user?.id));
  }, [dispatch, user]);

  return (
    <>
      <section className="flex justify-center pt-16 w-full">
        <div className="flex flex-col justify-center px-5 md:px-10">
          <div className="p-5 border-b-4 border-blue-400 font-semibold text-3xl text-center">
            {userProfile?.firstName ? userProfile?.firstName : user?.email}'s
            Profile
          </div>
          <div className="justify-between gap-5 lg:gap-10 grid lg:grid-cols-2 py-10">
            <div className="text-center">
              <Card className="hover:shadow-md w-full">
                <CardHeader>
                  {userProfile?.firstName ? (
                    userProfile?.lastName ? (
                      userProfile?.middleName ? (
                        <CardTitle className="text-3xl">{`${userProfile?.firstName} ${userProfile?.middleName} ${userProfile?.lastName}`}</CardTitle>
                      ) : (
                        <CardTitle className="text-3xl">{`${userProfile?.firstName} ${userProfile?.lastName}`}</CardTitle>
                      )
                    ) : (
                      <CardTitle className="text-3xl">{`${userProfile?.firstName}`}</CardTitle>
                    )
                  ) : (
                    <CardTitle className="text-3xl">{`${user?.email}`}</CardTitle>
                  )}
                  <CardDescription className="hidden"></CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="p-1 border-2 border-blue-400 rounded-full overflow-hidden">
                    <Image
                      src={
                        userProfile?.profileImage || "/images/latest_pic.png"
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
                    {userProfile?.designation}
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="w-full">
              <Card className="hover:shadow-md w-full">
                <CardHeader className="text-center">
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription className="text-md">
                    {userProfile?.designation}
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
                          {userProfile?.firstName ? (
                            userProfile?.lastName ? (
                              userProfile?.middleName ? (
                                `${userProfile?.firstName} ${userProfile?.middleName} ${userProfile?.lastName}`
                              ) : (
                                `${userProfile?.firstName} ${userProfile?.lastName}`
                              )
                            ) : (
                              `${userProfile?.firstName}`
                            )
                          ) : (
                            <Button
                              className="bg-blue-400 hover:bg-blue-600 w-full"
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
                          {userProfile?.designation ? (
                            userProfile?.designation
                          ) : (
                            <Button
                              className="bg-blue-400 hover:bg-blue-600 w-full"
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
                          {userProfile?.dob ? (
                            userProfile?.dob
                          ) : (
                            <Button
                              className="bg-blue-400 hover:bg-blue-600 w-full"
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
                          {userProfile?.phoneNumber ? (
                            userProfile?.phoneNumber
                          ) : (
                            <Button
                              className="bg-blue-400 hover:bg-blue-600 w-full"
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
                          {userProfile?.bio ? (
                            userProfile?.bio
                          ) : (
                            <Button
                              className="bg-blue-400 hover:bg-blue-600 w-full"
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
                    className="bg-blue-400 hover:bg-blue-600 w-full"
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
