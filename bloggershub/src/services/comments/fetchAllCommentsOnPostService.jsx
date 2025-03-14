import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCommentsOnPostServiceApi } from "@/services/apiUrls";

const fetchAllCommentsOnPostService = createAsyncThunk(
  "/posts/fetchAllCommentsOnPostService",
  async (postId) => {
    try {
      const fetchAllCommentsOnPostServiceResponse = await axios.get(
        `${fetchAllCommentsOnPostServiceApi}/${postId}`
      );

      console.log(
        "fetchAllCommentsOnPostServiceResponse.data : ",
        fetchAllCommentsOnPostServiceResponse.data
      );
      return fetchAllCommentsOnPostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllCommentsOnPostService;
