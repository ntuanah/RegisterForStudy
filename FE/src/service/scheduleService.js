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

export const getPendingLecturerSubjectsAPI = async (semesterId) => {
  return await axiosClient.get(`/schedules/hod/pending-lecturers?semesterId=${semesterId}`);
};

export const getSuggestedLecturersAPI = async (scheduleId) => {
  return await axiosClient.get(`/schedules/${scheduleId}/suggest-lecturers`);
};

export const assignLecturerAPI = async (scheduleId, data) => {
  return await axiosClient.patch(`/schedules/${scheduleId}/lecturer`, data);
};

export const removeLecturerAPI = async (scheduleId) => {
  return await axiosClient.delete(`/schedules/${scheduleId}/lecturer`);
};

export const clearAutoAssignScheduleAPI = async (semesterId) => {
  return await axiosClient.delete(`/schedules/semester/${semesterId}/auto-assign`);
};

export const initScheduleAPI = async () => {
  return await axiosClient.post(`/schedules`);
};

export const exportSemesterSchedulePdfAPI = async (semesterId) => {
  return await axiosClient.get(`/schedules/semester/${semesterId}/export-pdf`, {
    responseType: "blob", 
  });
};

export const getLecturerScheduleAPI = async (lecturerCode, semesterId, page = 1, size = 12) => {
  return await axiosClient.get(`/schedules/lecturer/${lecturerCode}?semesterId=${semesterId}&page=${page - 1}&size=${size}`);
};
