import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCommentServiceApi } from "@/services/apiUrls";

const deleteCommentService = createAsyncThunk(
  "/posts/deleteCommentService",
  async ({ id, userId }) => {
    console.log("id : ", id);
    console.log("userId : ", userId);
    try {
      const deleteCommentServiceResponse = await axios.delete(
        deleteCommentServiceApi,
        {
          data: {
            id,
            userId,
          },
        }
      );

      return deleteCommentServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default deleteCommentService;
