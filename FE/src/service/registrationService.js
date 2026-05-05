import axiosClient from "../utils/axiosClient";

export const getMyTimetableAPI = async () => {
  return await axiosClient.get(`/registration/my-timetable`);
};

export const cancelEnrollmentAPI = async (classSectionId) => {
  return await axiosClient.delete(`/registration/enroll/${classSectionId}`);
};