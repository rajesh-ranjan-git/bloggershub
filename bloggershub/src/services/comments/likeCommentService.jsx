import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { likeCommentServiceApi } from "@/services/apiUrls";

const likeCommentService = createAsyncThunk(
  "/posts/likeCommentService",
  async ({ liked, commentId, userId }) => {
    try {
      console.log("liked : ", liked);
      console.log("commentId : ", commentId);
      console.log("userId : ", userId);
      const likeCommentServiceResponse = await axios.post(
        likeCommentServiceApi,
        {
          liked,
          commentId,
          userId,
        }
      );

      console.log(
        "likeCommentServiceResponse.data : ",
        likeCommentServiceResponse.data
      );
      return likeCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default likeCommentService;
