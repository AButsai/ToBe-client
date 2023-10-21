import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from '../services/service';

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['gallery'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({
    getGallery: build.query({
      query: () => ({
        url: '/gallery',
        method: 'GET',
      }),
      providesTags: ['gallery'],
      transformResponse: response => response.data.gallery,
    }),
    addFolder: build.mutation({
      query: ({ formData }) => ({
        url: '/gallery/folder',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['gallery'],
    }),
    getFolder: build.query({
      query: id => ({
        url: `/gallery/folder/${id}`,
        method: 'GET',
      }),
      providesTags: ['gallery'],
      transformResponse: response => response.data,
    }),
    updateFolder: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/gallery/folder/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['gallery'],
    }),
    deleteFolder: build.mutation({
      query: ({ id }) => ({
        url: `/gallery/folder/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['gallery'],
    }),
    uploadImage: build.mutation({
      query: ({ id, file }) => ({
        url: `/gallery/folder/images/${id}`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['gallery'],
    }),
    deleteImage: build.mutation({
      query: ({ folderId, imgId }) => ({
        url: `/gallery/folder/images/${folderId}/${imgId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['gallery'],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useAddFolderMutation,
  useGetFolderQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} = galleryApi;
