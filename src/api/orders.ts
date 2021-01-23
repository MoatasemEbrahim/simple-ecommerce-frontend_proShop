import axiosInstance from '../utils/axios/axiosInstance';

const ordersAPI = {
  createOrder: async (orderData) => {
    const res = await axiosInstance.post('/orders', orderData);
    return res.data;
  },
};

export default ordersAPI;
