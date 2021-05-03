import axiosInstance from '../utils/axios/axiosInstance';

const ordersAPI = {
  createOrder: async (orderData) => {
    const res = await axiosInstance.post('/orders', orderData);
    return res.data;
  },
  getOrderById: async (id) => {
    const res = await axiosInstance.get(`/orders/${id}`);
    return res.data;
  },
  payOrder: async (id, paymentInfo) => {
    const res = await axiosInstance.post(`/orders/${id}/pay`, paymentInfo);
    return res.data;
  },
  getLoggedInUserOrders: async () => {
    const res = await axiosInstance.get('/orders/myOrders');
    return res.data;
  },
};

export default ordersAPI;
