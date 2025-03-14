import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { likeCommentServiceApi } from "@/services/apiUrls";

const likeCommentService = createAsyncThunk(
  "/posts/likeCommentService",
  async ({ liked, commentId, userId }) => {
    try {
      const likeCommentServiceResponse = await axios.post(
        likeCommentServiceApi,
        {
          liked,
          commentId,
          userId,
        }
      );

      return likeCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default likeCommentService;
