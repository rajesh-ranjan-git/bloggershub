import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileServiceApi } from "@/services/apiUrls";

const updateProfileService = createAsyncThunk(
  "/posts/fetchSinglePostService",
  async ({ formData, userId }) => {
    try {
      const updateProfileServiceResponse = await axios.post(
        `${updateProfileServiceApi}/${userId}`,
        formData
      );

      return updateProfileServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateProfileService;
