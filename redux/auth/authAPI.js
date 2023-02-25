import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery, authToken } from '../services/service';

export let localToken;

if (typeof window !== 'undefined') {
  localToken = JSON.parse(localStorage.getItem('persist:root'));
  if (localToken) {
    const token = localToken.token.slice(1, -1);
    authToken.set(token);
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['auth'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({
    register: build.mutation({
      query: ({ ...patch }) => ({
        url: '/auth/register',
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['auth'],
    }),
    login: build.mutation({
      query: ({ ...patch }) => ({
        url: '/auth/login',
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['auth'],
    }),
    logout: build.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      invalidatesTags: ['auth'],
      async onQueryStarted(_, { dispatch }) {
        dispatch(authApi.util.resetApiState());
      },
    }),
    currentUser: build.query({
      query: () => ({
        url: '/user/current',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useCurrentUserQuery,
} = authApi;
