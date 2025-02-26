import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLatestPostsServiceApi } from "@/services/apiUrls";

const fetchLatestPostsService = createAsyncThunk(
  "/posts/fetchLatestPosts",
  async () => {
    try {
      const fetchLatestPostsServiceResponse = await axios.get(
        fetchLatestPostsServiceApi
      );

      return fetchLatestPostsServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchLatestPostsService;
