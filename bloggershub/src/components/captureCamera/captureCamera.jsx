"use client";

import { Camera, SwitchCamera } from "lucide-react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CaptureCamera = ({ image, setImage }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setImage(imageSrc);
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
              //   onClick={capture}
              className="flex justify-center items-center gap-2 bg-[#bec44d] hover:bg-[#a3ab09] shadow-md mt-4 px-4 py-2 rounded-lg text-white"
            >
              <Camera size={20} />
              <span>Use this photo?</span>
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
