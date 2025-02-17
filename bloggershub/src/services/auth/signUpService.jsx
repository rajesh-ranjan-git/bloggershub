import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpServiceApi } from "../apiUrls";

const signUpService = createAsyncThunk("/auth/signUp", async (formData) => {
  try {
    const signUpResponse = await axios.post(signUpServiceApi, formData, {
      withCredentials: true,
    });
    return signUpResponse.data;
  } catch (error) {
    console.log("error during signUp : ", error);
    return error.response.data;
  }
});

export default signUpService;
