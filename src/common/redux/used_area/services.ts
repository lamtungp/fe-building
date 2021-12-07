import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const UsedAreaServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/used_area', data);
    return results;
  },

  update: (data: any, id: string): Promise<any> => {
    const results = AxiosClient.put(`/used_area/${id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/used_area/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/used_area`);
    return results;
  },

  indexUsedArea: (): Promise<any> => {
    const results = AxiosClient.get(`/used_area`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/used_area/${id}`);
    return results;
  }
};

export default UsedAreaServices;
