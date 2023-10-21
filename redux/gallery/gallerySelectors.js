import { galleryApi } from './galleryAPI';

const getGallery = state =>
  galleryApi.endpoints.getGallery.select()(state).data ?? [];
const addFolder = state =>
  galleryApi.endpoints.addFolder.select()(state).data ?? [];
const getFolder = state =>
  galleryApi.endpoints.getFolder.select()(state).data ?? [];
const updateFolder = state =>
  galleryApi.endpoints.updateFolder.select()(state).data ?? [];
const deleteFolder = state =>
  galleryApi.endpoints.deleteFolder.select()(state).data ?? [];
const uploadImage = state =>
  galleryApi.endpoints.uploadImage.select()(state).data ?? [];
const deleteImage = state =>
  galleryApi.endpoints.deleteImage.select()(state).data ?? [];

export {
  getGallery,
  addFolder,
  getFolder,
  updateFolder,
  deleteFolder,
  uploadImage,
  deleteImage,
};
