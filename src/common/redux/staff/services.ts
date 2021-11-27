import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const StaffServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/staff', data);
    return results;
  },

  update: (data: any): Promise<any> => {
    const results = AxiosClient.put('/staff', data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/staff/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/staff`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/staff/${id}`);
    return results;
  }
};

export default StaffServices;
