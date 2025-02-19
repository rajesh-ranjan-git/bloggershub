import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCommentsOnPostServiceApi } from "../apiUrls";

const fetchAllCommentsOnPostService = createAsyncThunk(
  "/posts/fetchAllCommentsOnPostService",
  async (postId) => {
    try {
      const fetchAllCommentsOnPostServiceResponse = await axios.get(
        `${fetchAllCommentsOnPostServiceApi}/${postId}`
      );

      return fetchAllCommentsOnPostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllCommentsOnPostService;
