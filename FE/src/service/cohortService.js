import axiosClient from '../utils/axiosClient';

export const getAllCohortsAPI = async () => {
  return await axiosClient.get(`/cohorts`);
};

export const searchCohortAPI = async (keyword) => {
  return await axiosClient.get(`/cohorts?keyword=${keyword}`);
};

export const createCohortAPI = async (data) => {
  return await axiosClient.post(`/cohorts`, data);
};

export const getCohortByIdAPI = async (id) => {
  return await axiosClient.get(`/cohorts/${id}`);
};

export const updateCohortAPI = async (id, data) => {
  return await axiosClient.put(`/cohorts/${id}`, data);
};