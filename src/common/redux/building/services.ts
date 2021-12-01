import AxiosClient from '../../utils/axiosClient';
import { BuildingParams } from './ActionTypes';

const BuildingServices = {
  update: (data: BuildingParams): Promise<any> => {
    const results = AxiosClient.put('/building', data);
    return results;
  },

  show: (): Promise<any> => {
    const results = AxiosClient.get(`/building`);
    return results;
  }
};

export default BuildingServices;
