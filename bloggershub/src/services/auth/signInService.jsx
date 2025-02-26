import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInServiceApi } from "@/services/apiUrls";

const signInService = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const signInServiceResponse = await axios.post(signInServiceApi, formData, {
      withCredentials: true,
    });
    return signInServiceResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default signInService;
