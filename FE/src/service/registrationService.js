import axiosClient from "../utils/axiosClient";

export const getMyTimetableAPI = async () => {
  return await axiosClient.get(`/registration/my-timetable`);
};

export const cancelEnrollmentAPI = async (classSectionId) => {
  return await axiosClient.delete(`/registration/enroll/${classSectionId}`);
};

export const enrollClassAPI = async (payload) => {
  return await axiosClient.post(`/registration/enroll`, payload);
};

export const getRegistrationStatusAPI = async () => {
  return await axiosClient.get(`/registration/status`);
};

export const syncRedisAPI = async (semesterId) => {
  return await axiosClient.post(`/admin/registration/sync-redis/${semesterId}`);
};

export const clearRedisAPI = async () => {
  return await axiosClient.delete(`/registration/clear-redis`);
};