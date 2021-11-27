import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const EmployeeServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/employee', data);
    return results;
  },

  update: (data: any): Promise<any> => {
    const results = AxiosClient.put('/employee', data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/employee/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/employee`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/employee/${id}`);
    return results;
  }
};

export default EmployeeServices;
