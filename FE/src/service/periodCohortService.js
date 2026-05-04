import axiosClient from "../utils/axiosClient";

export const getPeriodCohortsAPI = async (registrationPeriodId) => {
  return await axiosClient.get(`/period-cohorts/period/${registrationPeriodId}`);
};

export const createPeriodCohortAPI = async (data) => {
  return await axiosClient.post(`/period-cohorts`, data);
};

export const updatePeriodCohortAPI = async (id, data) => {
  return await axiosClient.put(`/period-cohorts/${id}`, data);
};

export const deletePeriodCohortAPI = async (id) => {
  return await axiosClient.delete(`/period-cohorts/${id}`);
};