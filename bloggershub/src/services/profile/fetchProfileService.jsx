import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileServiceApi } from "../apiUrls";

const fetchProfileService = createAsyncThunk(
  "/posts/fetchSinglePostService",
  async (userId) => {
    try {
      const fetchProfileServiceResponse = await axios.get(
        `${fetchProfileServiceApi}/${userId}`
      );

      return fetchProfileServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchProfileService;
