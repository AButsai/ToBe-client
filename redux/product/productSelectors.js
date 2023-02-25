import { productApi } from './productAPI';

const getAllProducts = state =>
  productApi.endpoints.getAllProducts.select()(state).data ?? [];

const filteredProducts = state => {
  return getAllProducts(state)?.products?.filter(
    product => product?.role === 'product'
  );
};
const filteredBanners = state =>
  getAllProducts(state)?.products?.filter(
    product => product?.role === 'banner'
  );
const addProduct = state =>
  productApi.endpoints.addProduct.select()(state).data ?? [];
const updateProduct = state =>
  productApi.endpoints.updateProduct.select()(state).data ?? [];
const deleteProduct = state =>
  productApi.endpoints.deleteProduct.select()(state).data ?? [];

export {
  getAllProducts,
  filteredProducts,
  filteredBanners,
  addProduct,
  updateProduct,
  deleteProduct,
};
