export interface BuildingState {
  // jwtToken: string;
  user: any;
}

const initialState: BuildingState = {
  // jwtToken: '',
  user: { email: '', token: '' }
};
