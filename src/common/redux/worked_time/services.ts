import AxiosClient from '../../utils/axiosClient';

const WorkedTimeServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/worked_time', data);
    return results;
  },

  update: (data: any, id: string): Promise<any> => {
    const results = AxiosClient.put(`/worked_time/${id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/worked_time/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/worked_time`);
    return results;
  },

  indexUsedArea: (): Promise<any> => {
    const results = AxiosClient.get(`/worked_time`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/worked_time/${id}`);
    return results;
  }
};

export default WorkedTimeServices;
