// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/business/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (businessData) => ({
        url: '/business/register',
        method: 'POST',
        body: businessData,
      }),
    }),
    getBusiness: builder.query({
      query: (businessId) => ({
        url: `/business/${businessId}/dashboard`, // Adjust the endpoint if it needs businessId in params or body
        method: 'GET',
      }),
    }),
    getAnalytics: builder.query({
      query: (businessId) => ({
        url: `/business/${businessId}/analytics`, // Assuming this needs a businessId in URL
        method: 'GET',
      }),
    }),
    // Punch card endpoints
    createPunchCard: builder.mutation({
      query: (punchCardData) => ({
        url: '/punchcards',
        method: 'POST',
        body: punchCardData,
      }),
    }),
    getPunchCard: builder.query({
      query: (punchCardId) => ({
        url: `/punchcards/${punchCardId}`,
        method: 'GET',
      }),
    }),
    getAllPunchCards: builder.query({
      query: (businessId) => ({
        url: '/punchcards',
        method: 'GET',
        params: { businessId }, // Passing businessId in query string
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetBusinessQuery, 
  useGetAnalyticsQuery,
  useCreatePunchCardMutation, 
  useGetPunchCardQuery, 
  useGetAllPunchCardsQuery 
} = apiSlice;