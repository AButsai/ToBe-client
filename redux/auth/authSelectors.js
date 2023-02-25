export const getIsLogin = state => state.auth.isLogin;
export const getEmail = state => state.auth?.user?.email;
export const getPhone = state => state.auth?.user?.phone;
export const getName = state => state.auth?.user?.name;
export const getToken = state => state.auth?.token;
export const getUserId = state => state.auth?.user?._id;
export const getRole = state => state.auth?.user?.role;
