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
import AddProfileDetailsModal from "@/components/profile/addProfileDetailsModal";
import fetchProfileService from "@/services/profile/fetchProfileService";

const Profile = () => {
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [typeOfProfileData, setTypeOfProfileData] = useState("");
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { userProfile } = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileService(loggedInUser?.id));
    setIsProfileUpdated(false);
  }, [dispatch, isProfileUpdated]);

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
                    <div className="p-1 border-[#a3ab09] border-2 rounded-full overflow-hidden">
                      <Image
                        src={
                          (userProfile || loggedInUser)?.profile
                            ?.profileImage || "/images/latest_pic.png"
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
                          <TableCell className="font-medium">
                            Languages
                          </TableCell>
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
