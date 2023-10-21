import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../services/service';
import { HYDRATE } from 'next-redux-wrapper';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['product'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({
    getAllProducts: build.query({
      query: () => ({
        url: '/product',
        method: 'GET',
      }),
      providesTags: ['product'],
      transformResponse: response => response.data,
    }),
    addProduct: build.mutation({
      query: ({ formData }) => ({
        url: `/product`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['product'],
    }),
    updateProduct: build.mutation({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['product'],
    }),
    deleteProduct: build.mutation({
      query: id => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
