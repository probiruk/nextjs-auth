import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./auth/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/auth",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.originalStatus === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      "/get-access-token",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
