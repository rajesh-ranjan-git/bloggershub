import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSinglePostServiceApi } from "../apiUrls";

const fetchSinglePostService = createAsyncThunk(
  "/posts/fetchSinglePostService",
  async (postId) => {
    console.log("postId : ", postId);
    try {
      const fetchSinglePostServiceResponse = await axios.get(
        `${fetchSinglePostServiceApi}/${postId}`
      );

      console.log(
        "fetchSinglePostServiceResponse : ",
        fetchSinglePostServiceResponse
      );

      return fetchSinglePostServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchSinglePostService;
