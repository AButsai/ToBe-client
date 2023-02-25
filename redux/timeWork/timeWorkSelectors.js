import { timeWorkApi } from './timeWorkAPI';

const getTimeWork = state =>
  timeWorkApi.endpoints.getTimeWork.select()(state).data ?? [];
const updateTimeWork = state =>
  timeWorkApi.endpoints.updateTimeWork.select()(state).data ?? [];

export { getTimeWork, updateTimeWork };
