import AxiosClient from '../../utils/axiosClient';
import { BuildingParams } from './ActionTypes';

const BuildingServices = {
  update: async (data: BuildingParams): Promise<any> => {
    const results = await AxiosClient.put('/building', data);
    return results;
  },

  show: async (): Promise<any> => {
    const results = await AxiosClient.get(`/building`);
    return results;
  }
};

export default BuildingServices;
