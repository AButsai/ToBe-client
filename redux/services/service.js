import axios from 'axios';

// import { isRejectedWithValue } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://tobeapi-1-t6466481.deta.app/api/';

export const authToken = {
  set: token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset: () => (axios.defaults.headers.common['Authorization'] = ''),
};

export const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    try {
      const res = await axios({
        url,
        method,
        data: body,
        params,
      });
      return { data: res.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data:
            axiosError.response?.data?.message ||
            axiosError.response?.statusText ||
            axiosError.message,
        },
      };
    }
  };

// export const rtkQueryErrorLogger = (_) => (next) => (action) => {
//   if (isRejectedWithValue(action)) {
//     const { payload } = action;
//     const error = {
//       status: payload?.status ? ` Code: ${payload.status}.` : "",
//       data: payload?.data ? ` Message: ${JSON.stringify(payload.data)}.` : "",
//     };
//     const errorMessage = `Server connection error.${error.status}${error.data}`;
//     toastErrorNotification.show(errorMessage);
//   }

//   return next(action);
// };
