import { apiSlice } from "../api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getAccessToken: builder.mutation({
      query: () => ({
        url: "/get-access-token",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAccessTokenMutation } = authApiSlice;
