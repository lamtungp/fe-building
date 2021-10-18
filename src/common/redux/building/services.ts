import AxiosClient from '../../utils/axiosClient';

const BuildingServices = {
  update: (data: any): Promise<any> => {
    const results = AxiosClient.put('/building', data);
    return results;
  },

  show: (data: any): Promise<any> => {
    const results = AxiosClient.get('/building', data);
    return results;
  }
};
export default BuildingServices;
