import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthServiceApi } from "@/services/apiUrls";

// For cookies
const checkAuthService = createAsyncThunk("/auth/checkAuth", async () => {
  try {
    const checkAuthServiceResponse = await axios.get(checkAuthServiceApi, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });

    return checkAuthServiceResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

// For localStorage
// const checkAuthService = createAsyncThunk("/auth/checkAuth", async (token) => {
//   try {
//     const checkAuthServiceResponse = await axios.get(checkAuthServiceApi, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//         Expires: "0",
//       },
//     });

//     return checkAuthServiceResponse.data;
//   } catch (error) {
//     return error.response.data;
//   }
// });

export default checkAuthService;
