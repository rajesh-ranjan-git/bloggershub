import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsServiceApi } from "../apiUrls";

const fetchAllPostsService = createAsyncThunk(
  "/posts/fetchAllPosts",
  async () => {
    try {
      const fetchAllPostsServiceResponse = await axios.get(
        fetchAllPostsServiceApi
      );

      return fetchAllPostsServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllPostsService;
