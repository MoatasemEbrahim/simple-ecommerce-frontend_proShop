import axiosInstance from '../utils/axios/axiosInstance';

const productsAPI = {
  login: async (data:{email:string, password:string}) => {
    const res = await axiosInstance.post('/users/authenticate', data);
    return res.data;
  },
  logout: async () => {
    const res = await axiosInstance.get('/users/unauthenticate');
    return res.data;
  },
  register: async (data:{name:string, email:string, password:string}) => {
    const res = await axiosInstance.post('/users', data);
    return res.data;
  },
  getUserData: async () => {
    const res = await axiosInstance.get('/users/profile');
    return res.data;
  },
  updateProfile: async (data:{name:string, email:string, password:string}) => {
    const res = await axiosInstance.patch('/users/profile', data);
    return res.data;
  },
};

export default productsAPI;
