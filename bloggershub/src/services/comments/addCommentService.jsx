import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentServiceApi } from "@/services/apiUrls";

const addCommentService = createAsyncThunk(
  "/posts/addCommentService",
  async ({ content, postId, userId }) => {
    try {
      const addCommentServiceResponse = await axios.post(addCommentServiceApi, {
        content,
        postId,
        userId,
      });

      return addCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addCommentService;
