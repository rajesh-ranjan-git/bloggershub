import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updatePostServiceApi } from "@/services/apiUrls";

const updatePostService = createAsyncThunk(
  "/posts/updatePostService",
  async ({ postId, authorId, formData }) => {
    try {
      const updatePostServiceResponse = await axios.post(
        `${updatePostServiceApi}/${postId}`,
        { authorId, ...formData }
      );

      return updatePostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updatePostService;
