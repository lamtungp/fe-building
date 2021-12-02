import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const CompanyServices = {
  create: async (data: any): Promise<any> => {
    const results = await AxiosClient.post('/company', data);
    return results;
  },

  update: async (data: any): Promise<any> => {
    const results = await AxiosClient.put(`/company/${data.id}`, data);
    return results;
  },

  show: async (id: string): Promise<any> => {
    const results = await AxiosClient.get(`/company/${id}`);
    return results;
  },

  index: async (): Promise<any> => {
    const results = await AxiosClient.get(`/company`);
    return results;
  },

  destroy: async (id: string): Promise<any> => {
    const results = await AxiosClient.delete(`/company/${id}`);
    return results;
  }
};

export default CompanyServices;
