import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updatePostServiceApi } from "@/services/apiUrls";

const updatePostService = createAsyncThunk(
  "/posts/updatePostService",
  async ({ postId, authorId }) => {
    console.log("postId : ", postId);
    console.log("authorId : ", authorId);
    try {
      const updatePostServiceResponse = await axios.post(
        `${updatePostServiceApi}/${postId}`,
        { authorId }
      );

      return updatePostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updatePostService;
