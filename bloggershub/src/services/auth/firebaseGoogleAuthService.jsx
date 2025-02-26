import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseGoogleAuthServiceApi } from "@/services/apiUrls";

const firebaseGoogleAuthService = createAsyncThunk(
  "/auth/firebaseGoogleAuth",
  async (formData) => {
    try {
      const firebaseGoogleAuthServiceResponse = await axios.post(
        firebaseGoogleAuthServiceApi,
        formData,
        {
          withCredentials: true,
        }
      );

      return firebaseGoogleAuthServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default firebaseGoogleAuthService;
