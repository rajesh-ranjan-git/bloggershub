import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOutServiceApi } from "@/services/apiUrls";

const signOutService = createAsyncThunk("/auth/signOut", async () => {
  try {
    const signOutServiceResponse = await axios.post(
      signOutServiceApi,
      {},
      {
        withCredentials: true,
      }
    );

    return signOutServiceResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default signOutService;
