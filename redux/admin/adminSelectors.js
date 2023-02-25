import { adminApi } from './adminAPI';

const getAllUsers = state =>
  adminApi.endpoints.getAllUsers.select()(state).data ?? [];
const getWhiteList = state =>
  adminApi.endpoints.getWhiteList.select()(state).data ?? [];
const updateRoleUser = state =>
  adminApi.endpoints.updateRoleUser.select()(state).data ?? [];
const addToList = state =>
  adminApi.endpoints.addToList.select()(state).data ?? [];
const deleteFromList = state =>
  adminApi.endpoints.deleteFromList.select()(state).data ?? [];

export { getAllUsers, getWhiteList, updateRoleUser, addToList, deleteFromList };
