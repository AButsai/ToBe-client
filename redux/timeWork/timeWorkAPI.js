import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from '../services/service';

export const timeWorkApi = createApi({
  reducerPath: 'timeWorkApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['timeWork'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({
    getTimeWork: build.query({
      query: () => ({
        url: '/time',
        method: 'GET',
      }),
      providesTags: ['timeWork'],
      transformResponse: response => response.data.timeWork,
    }),
    updateTimeWork: build.mutation({
      query: ({ ...patch }) => ({
        url: '/time',
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['timeWork'],
    }),
  }),
});

export const { useGetTimeWorkQuery, useUpdateTimeWorkMutation } = timeWorkApi;
