import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const CompanyServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/company', data);
    return results;
  },

  update: (data: any): Promise<any> => {
    const results = AxiosClient.put('/company', data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/company/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/company`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/company/${id}`);
    return results;
  }
};

export default CompanyServices;
