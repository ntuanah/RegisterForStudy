import axiosClient from "../utils/axiosClient";

export const getScheduleByIdAPI = async (scheduleId) => {
  return await axiosClient.get(`/schedules/${scheduleId}`);
};

export const updateScheduleTimeAPI = async (scheduleId, data) => {
  return await axiosClient.patch(`/schedules/${scheduleId}/time`, data);
};

export const updateScheduleRoomAPI = async (scheduleId, data) => {
  return await axiosClient.patch(`/schedules/${scheduleId}/room`, data);
};

export const deleteScheduleTimeAPI = async (scheduleId) => {
  return await axiosClient.delete(`/schedules/${scheduleId}/time`);
};

export const deleteScheduleRoomAPI = async (scheduleId) => {
  return await axiosClient.delete(`/schedules/${scheduleId}/room`);
};

export const autoAssignScheduleAPI = async (semesterId) => {
  return await axiosClient.post(`/schedules/semester/${semesterId}/auto-assign`);
};

