import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsByAuthorServiceApi } from "../apiUrls";

const fetchAllPostsByAuthorService = createAsyncThunk(
  "/posts/fetchAllPostsByAuthor",
  async ({ authorId }) => {
    try {
      const fetchAllPostsByAuthorServiceResponse = await axios.get(
        `${fetchAllPostsByAuthorServiceApi}/${authorId}`
      );

      return fetchAllPostsByAuthorServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllPostsByAuthorService;
