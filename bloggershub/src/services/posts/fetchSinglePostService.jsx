import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSinglePostServiceApi } from "@/services/apiUrls";

const fetchSinglePostService = createAsyncThunk(
  "/posts/fetchSinglePost",
  async (postId) => {
    try {
      const fetchSinglePostServiceResponse = await axios.get(
        `${fetchSinglePostServiceApi}/${postId}`
      );

      return fetchSinglePostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchSinglePostService;
