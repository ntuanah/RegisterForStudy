import axiosClient from '../utils/axiosClient';

export const getAllMajorsAPI = async () => {
  return await axiosClient.get(`/majors`);
};

export const searchMajorAPI = async (keyword) => {
  return await axiosClient.get(`/majors?keyword=${keyword}`);
};