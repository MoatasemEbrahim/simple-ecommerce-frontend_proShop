import axiosInstance from '../utils/axios/axiosInstance';
import { Product } from '../types/product';

const productsAPI = {
  getProducts: async ():Promise<Product[]> => {
    const res = await axiosInstance.get('/products');
    return res.data;
  },
  getProductById: async (id):Promise<Product|null> => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  },
};

export default productsAPI;
