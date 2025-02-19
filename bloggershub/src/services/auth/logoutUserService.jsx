import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserServiceApi } from "../apiUrls";

const logoutUserService = createAsyncThunk("/auth/logout", async () => {
  try {
    const logoutUserResponse = await axios.post(
      logoutUserServiceApi,
      {},
      {
        withCredentials: true,
      }
    );

    return logoutUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default logoutUserService;
