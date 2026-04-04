import axiosClient from '../utils/axiosClient';

export const getAllMajorsAPI = async () => {
  return await axiosClient.get(`/majors`);
};

export const searchMajorAPI = async (keyword) => {
  return await axiosClient.get(`/majors?keyword=${keyword}`);
};

export const createMajorAPI = async (data) => {
  return await axiosClient.post(`/majors`, data);
};

export const getMajorByIdAPI = async (id) => {
  return await axiosClient.get(`/majors/${id}`);
};

export const updateMajorAPI = async (id, data) => {
  return await axiosClient.put(`/majors/${id}`, data);
};