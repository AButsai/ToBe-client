import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from '../services/service';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['admin'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({
    getAllUsers: build.query({
      query: () => ({
        url: '/admin/users',
        method: 'GET',
      }),
      providesTags: ['admin'],
      transformResponse: response => response.data,
    }),
    getWhiteList: build.query({
      query: () => ({
        url: '/admin/white-list',
        method: 'GET',
      }),
      providesTags: ['admin'],
      transformResponse: response => response.data.whiteList,
    }),
    updateRoleUser: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/${id}/update-role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['admin'],
    }),
    addToList: build.mutation({
      query: ({ ...patch }) => ({
        url: '/admin/add-to-white-list',
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['admin'],
    }),
    deleteFromList: build.mutation({
      query: ({ ...patch }) => ({
        url: '/admin/delete-from-white-list',
        method: 'DELETE',
        body: patch,
      }),
      invalidatesTags: ['admin'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetWhiteListQuery,
  useUpdateRoleUserMutation,
  useAddToListMutation,
  useDeleteFromListMutation,
} = adminApi;
