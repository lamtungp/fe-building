import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const UsedSvServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/used_service', data);
    return results;
  },

  update: (data: any, id: string): Promise<any> => {
    const results = AxiosClient.put(`/used_service/${id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/used_service/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/used_service`);
    return results;
  },

  indexUsedService: (): Promise<any> => {
    const results = AxiosClient.get(`/used_service`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/used_service/${id}`);
    return results;
  }
};

export default UsedSvServices;
