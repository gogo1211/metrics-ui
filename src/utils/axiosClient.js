import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE } from './constants';

const createAxiosClient = (baseURL) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.response.use(null, (error) => {
    toast.error(error?.response?.data.message);
    return Promise.reject(error);
  });

  return instance;
};

export default createAxiosClient(API_BASE);
