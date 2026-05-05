import axiosClient from "../utils/axiosClient";

export const createRegistrationPeriodAPI = async (data) => {
  return await axiosClient.post('/registration-periods', data);
};

export const getRegistrationPeriodsAPI = async (page = 1, size = 10) => {
  return await axiosClient.get(`/registration-periods?page=${page - 1}&size=${size}`);
};

export const updateRegistrationPeriodAPI = async (id, data) => {
  return await axiosClient.put(`/registration-periods/${id}`, data);
};

export const deleteRegistrationPeriodAPI = async (id) => {
  return await axiosClient.delete(`/registration-periods/${id}`);
};

