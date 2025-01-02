import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_API_KEY;
console.log("BASE_URL", BASE_URL);  
export const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: BASE_URL, // No need to pass baseUrl here, it is directly used
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });