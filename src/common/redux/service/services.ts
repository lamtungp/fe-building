import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const SvServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/service', data);
    return results;
  },

  update: (data: any): Promise<any> => {
    const results = AxiosClient.put(`/service/${data.id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/service/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/service`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/service/${id}`);
    return results;
  }
};

export default SvServices;
