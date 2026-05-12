import axiosClient from "../utils/axiosClient";

export const getSubjectRecommendationsAPI = async () => {
  return await axiosClient.get(`/v1/advising/recommendations`);
};