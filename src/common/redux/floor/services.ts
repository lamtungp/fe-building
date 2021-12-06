import AxiosClient from '../../utils/axiosClient';

// import { UpdateParams } from './ActionTypes';

const FloorServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/floor', data);
    return results;
  },

  update: (data: any, id: string): Promise<any> => {
    const results = AxiosClient.put(`/floor/${id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/floor/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/floor`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/floor/${id}`);
    return results;
  }
};

export default FloorServices;
