import axiosClient from "../utils/axiosClient";

export const getClassSectionGradesAPI = async (classSectionId) => {
  return await axiosClient.get(`/grades/class-section/${classSectionId}`);
};

export const updateMidtermScoreAPI = async (enrollmentId, score) => {
  return await axiosClient.patch(`/grades/midterm/${enrollmentId}?score=${score}`);
};

export const updateFinalScoreAPI = async (enrollmentId, score) => {
  return await axiosClient.patch(`/grades/final/${enrollmentId}?score=${score}`);
};

export const getMyTranscriptTreeAPI = async () => {
  return await axiosClient.get(`/grades/my-transcript-tree`);
};