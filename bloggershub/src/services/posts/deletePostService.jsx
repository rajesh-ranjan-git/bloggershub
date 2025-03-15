import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deletePostServiceApi } from "@/services/apiUrls";

const deletePostService = createAsyncThunk(
  "/posts/deletePostService",
  async ({ postId, authorId }) => {
    console.log("postId : ", postId);
    console.log("authorId : ", authorId);
    try {
      const deletePostServiceResponse = await axios.post(
        `${deletePostServiceApi}/${postId}`,
        { authorId }
      );

      return deletePostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default deletePostService;
