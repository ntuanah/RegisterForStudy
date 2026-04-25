import axiosClient from "../utils/axiosClient";

export const getCurrentSemesterAPI = async () => {
  return await axiosClient.get('/semesters/current');
};