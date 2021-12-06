import AxiosClient from '../../utils/axiosClient';

const SalaryServices = {
  create: (data: any): Promise<any> => {
    const results = AxiosClient.post('/salary', data);
    return results;
  },

  update: (data: any, id: string): Promise<any> => {
    const results = AxiosClient.put(`/salary/${id}`, data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/salary/${id}`);
    return results;
  },

  index: (): Promise<any> => {
    const results = AxiosClient.get(`/salary`);
    return results;
  },

  destroy: (id: string): Promise<any> => {
    const results = AxiosClient.delete(`/salary/${id}`);
    return results;
  }
};

export default SalaryServices;
