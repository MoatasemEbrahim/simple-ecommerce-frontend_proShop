import axiosInstance from '../utils/axios/axiosInstance';
import { Product } from '../types/product';

const productsAPI = {
  getProducts: async ():Promise<Product[]> => {
    try {
      const res = await axiosInstance.get('/products');
      return res?.data || [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  },
  getProductById: async (id):Promise<Product|null> => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },
};

export default productsAPI;
