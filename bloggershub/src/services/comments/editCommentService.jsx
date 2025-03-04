import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { editCommentServiceApi } from "@/services/apiUrls";

const editCommentService = createAsyncThunk(
  "/posts/editCommentService",
  async ({ id, content, userId }) => {
    try {
      const editCommentServiceResponse = await axios.put(
        editCommentServiceApi,
        {
          id,
          content,
          userId,
        }
      );

      return editCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default editCommentService;
