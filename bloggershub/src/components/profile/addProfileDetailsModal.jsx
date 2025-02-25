"use client";

import CustomButton from "@/components/customFormElements/customButton";
import CustomInput from "@/components/customFormElements/customInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import signInService from "@/services/auth/signInService";
import { signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { UserRoundPen } from "lucide-react";
import { updateProfileItems } from "@/config/config";

const AddProfileDetailsModal = ({
  typeOfProfileData,
  handleUpdateProfileData,
}) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    dispatch(signInService(formData)).then((data) => {
      if (data?.payload?.success) {
        router.push("/");
        toast({
          title: "Sign In successful!",
          description: data.payload.message,
        });
      } else {
        toast({
          title: "Sign In failed!",
          variant: "destructive",
          description: data.payload.message,
        });
      }
    });
    // router.push("/");
  };

  const handleDialogClose = () => {
    setOpen(false);
    handleUpdateProfileData("");
  };

  return (
    <section className="flex justify-center items-center px-10 w-full h-full">
      <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="m-0 p-0 border-none rounded-lg w-[90vw] md:w-auto">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="shadow-md p-4 border-t-4 border-blue-400 rounded-lg min-w-96">
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
                    {updateProfileItems.map((profileItem) => (
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
                        buttonText="Update Profile"
                        buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
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
                            buttonStyle="w-full bg-blue-400 hover:bg-blue-600 text-white shadow-md"
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
