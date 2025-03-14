import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateCommentServiceApi } from "@/services/apiUrls";

const updateCommentService = createAsyncThunk(
  "/posts/updateCommentService",
  async ({ id, content, userId }) => {
    try {
      const updateCommentServiceResponse = await axios.put(
        updateCommentServiceApi,
        {
          id,
          content,
          userId,
        }
      );

      return updateCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateCommentService;
