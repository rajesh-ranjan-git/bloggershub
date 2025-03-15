"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { UserRoundPen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProfileItems, updateProfileName } from "@/config/config";
import { updateProfileSchema } from "@/validations/updateProfileSchema";
import updateProfileService from "@/services/profile/updateProfileService";
import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";

const AddProfileDetailsModal = ({
  typeOfProfileData,
  setIsProfileUpdated,
  setTypeOfProfileData,
}) => {
  const [open, setOpen] = useState(true);
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      designation: "",
      email: "",
      dob: "",
      phoneNumber: "",
      bio: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(
      updateProfileService({ formData: formData, userId: loggedInUser?.id })
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
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setOpen(false);
    setTypeOfProfileData("");
  };

  return (
    <section className="flex justify-center items-center px-10 w-full h-full">
      <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="m-0 p-0 border-none rounded-lg w-[90vw] md:w-auto">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="shadow-md p-4 border-[#bec44d] border-t-4 rounded-lg min-w-96">
            <div className="flex justify-center items-center gap-2 p-4 font-semibold text-2xl">
              <UserRoundPen />
              {typeOfProfileData === "updateProfile" ? (
                <span>Update Profile</span>
              ) : (
                updateProfileItems
                  .filter((profileItem) => profileItem.id === typeOfProfileData)
                  .map((profileItem) => (
                    <span
                      key={profileItem.id}
                    >{`Update ${profileItem.label}`}</span>
                  ))
              )}
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {typeOfProfileData && typeOfProfileData === "updateProfile" ? (
                  <>
                    {updateProfileItems.map((profileItem) => {
                      if (profileItem.id === "name") {
                        return updateProfileName.map((nameItem) => {
                          return (
                            <div
                              className="relative p-3 emailBox"
                              key={nameItem.id}
                            >
                              <CustomInput
                                control={form.control}
                                label={nameItem.label}
                                name={nameItem.id}
                                placeholder={nameItem.placeholder}
                              />
                            </div>
                          );
                        });
                      } else {
                        return (
                          <div
                            className="relative p-3 emailBox"
                            key={profileItem.id}
                          >
                            <CustomInput
                              control={form.control}
                              label={profileItem.label}
                              name={profileItem.id}
                              placeholder={profileItem.placeholder}
                            />
                          </div>
                        );
                      }
                    })}
                    <div className="p-3">
                      <CustomButton
                        type="submit"
                        buttonText="Update Profile"
                        buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                        disabled={false}
                      />
                    </div>
                  </>
                ) : typeOfProfileData === "name" ? (
                  <>
                    {updateProfileName.map((profileItem) => (
                      <div
                        className="relative p-3 emailBox"
                        key={profileItem.id}
                      >
                        <CustomInput
                          control={form.control}
                          label={profileItem.label}
                          name={profileItem.id}
                          placeholder={profileItem.placeholder}
                        />
                      </div>
                    ))}
                    <div className="p-3">
                      <CustomButton
                        type="submit"
                        buttonText="Update Name"
                        buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                        disabled={false}
                      />
                    </div>
                  </>
                ) : (
                  updateProfileItems
                    .filter(
                      (profileItem) => profileItem.id === typeOfProfileData
                    )
                    .map((profileItem) => (
                      <div key={profileItem.id}>
                        <div className="relative p-3 emailBox">
                          <CustomInput
                            control={form.control}
                            label={profileItem.label}
                            name={profileItem.id}
                            placeholder={profileItem.placeholder}
                          />
                        </div>
                        <div className="p-3">
                          <CustomButton
                            type="submit"
                            buttonText={profileItem.buttonText}
                            buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                            disabled={false}
                          />
                        </div>
                      </div>
                    ))
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AddProfileDetailsModal;
