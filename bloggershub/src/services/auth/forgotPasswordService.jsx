import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordServiceApi } from "../apiUrls";

const forgotPasswordService = createAsyncThunk(
  "/auth/forgotPassword",
  async (formData) => {
    try {
      const forgotPasswordServiceResponse = await axios.post(
        forgotPasswordServiceApi,
        formData,
        {
          withCredentials: true,
        }
      );
      return forgotPasswordServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default forgotPasswordService;
