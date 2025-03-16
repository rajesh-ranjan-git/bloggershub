"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { Camera, SwitchCamera } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { imageUploadApi } from "@/services/apiUrls";

const CaptureCamera = ({
  image,
  setImage,
  imageUploading,
  setImageUploading,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setImage(imageSrc);
  };

  const uploadImageToCloudinary = async () => {
    setImageUploading(true);

    if (image !== null) {
      console.log("I am here");
      const blob = await axios
        .get(image, { responseType: "blob" })
        .then((res) => res.data);

      // Convert Blob to File (JPG format)
      const imageFile = new File([blob], "captured.jpg", {
        type: "image/jpeg",
      });
      console.log("imageFile : ", imageFile);
      const imageUploadFormData = new FormData();
      imageUploadFormData.append("myFile", imageFile);
      const imageUploadResponse = await axios.post(
        imageUploadApi,
        imageUploadFormData
      );
      if (imageUploadResponse) {
        console.log("imageUploadResponse : ", imageUploadResponse);
        setUploadedImageUrl(imageUploadResponse?.data?.result?.url);
      }
    }

    setImageUploading(false);
  };

  return (
    <div>
      {!image && (
        <div className="flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border rounded-md w-full max-w-md"
          />
          <Button
            onClick={capture}
            className="flex justify-center items-center gap-2 bg-[#bec44d] hover:bg-[#a3ab09] shadow-md mt-4 px-4 py-2 rounded-lg text-white"
          >
            <Camera size={20} />
            <span>Capture</span>
          </Button>
        </div>
      )}
      {image && (
        <div className="flex flex-col items-center">
          <div>
            <Image
              src={image}
              alt="Captured"
              width={100}
              height={100}
              className="rounded-md w-full"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => uploadImageToCloudinary()}
              className="flex justify-center items-center gap-2 bg-[#bec44d] hover:bg-[#a3ab09] shadow-md mt-4 px-4 py-2 rounded-lg text-white"
            >
              <Camera size={20} />
              <span>
                {imageUploading ? "Image uploading..." : "Use this photo?"}
              </span>
            </Button>
            <Button
              onClick={() => setImage(null)}
              className="flex justify-center items-center gap-2 bg-[#bec44d] hover:bg-[#a3ab09] shadow-md mt-4 px-4 py-2 rounded-lg text-white"
            >
              <SwitchCamera size={20} />
              <span>Take another?</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureCamera;
