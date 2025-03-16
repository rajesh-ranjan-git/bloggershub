import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileImageServiceApi } from "@/services/apiUrls";

const updateProfileImageService = createAsyncThunk(
  "/posts/updateProfileImageService",
  async ({ profileImage, userId }) => {
    try {
      const updateProfileImageServiceResponse = await axios.post(
        `${updateProfileImageServiceApi}/${userId}`,
        { profileImage }
      );

      return updateProfileImageServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateProfileImageService;
