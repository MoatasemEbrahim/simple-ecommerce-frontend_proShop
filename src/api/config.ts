import axiosInstance from '../utils/axios/axiosInstance';

const configAPI = {
  getPaypalConfig: async () => {
    const res = await axiosInstance.get('/config/paypal');
    return res.data;
  },
};

export default configAPI;
