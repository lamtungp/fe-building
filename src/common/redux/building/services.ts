import AxiosClient from '../../utils/axiosClient';
import { UpdateParams } from './ActionTypes';

const BuildingServices = {
  update: (data: UpdateParams): Promise<any> => {
    const results = AxiosClient.put('/building', data);
    return results;
  },

  show: (id: string): Promise<any> => {
    const results = AxiosClient.get(`/building/${id}`);
    return results;
  }
};

export default BuildingServices;
