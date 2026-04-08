import axiosClient from "../utils/axiosClient";

// education
export const getAllProgramsAPI = async () => {
  return await axiosClient.get(`/education-programs`);
};

export const searchProgramAPI = async (keyword) => {
  return await axiosClient.get(`/education-programs?keyword=${keyword}`);
};

export const getProgramTreeAPI = async (id) => {
  return await axiosClient.get(`/education-programs/${id}/tree`);
};

export const createProgramAPI = async (data) => {
  return await axiosClient.post(`/education-programs`, data);
};

export const assignCohortAPI = async (data) => {
  return await axiosClient.post(`/education-programs/assign-cohort`, data);
};

export const removeCohortFromProgramAPI = async (programId, cohortId) => {
  return await axiosClient.delete(`/education-programs/${programId}/cohorts/${cohortId}`);
};

export const getLinkedCohortsAPI = async (programId) => {
  return await axiosClient.get(`/education-programs/${programId}/cohorts`);
};

export const updateProgramAPI = async (id, data) => {
  return await axiosClient.put(`/education-programs/${id}`, data);
};

export const deleteProgramAPI = async (id) => {
  return await axiosClient.delete(`/education-programs/${id}`);
};

export const publishProgramAPI = async (id) => {
  return await axiosClient.patch(`/education-programs/${id}/publish`);
};

// default
export const getTemplateTreeAPI = async () => {
  return await axiosClient.get(`/section-default-subjects/template-tree`);
};

export const addSubjectToDefaultSectionAPI = async (data) => {
  return await axiosClient.post(`/section-default-subjects`, data);
};

export const deleteSubjectFromDefaultSectionAPI = async (sectionDefaultId, subjectId) => {
  return await axiosClient.delete(`/section-default-subjects?sectionDefaultId=${sectionDefaultId}&subjectId=${subjectId}`);
};

//program subject
export const addSubjectToProgramSectionAPI = async (data) => {
  return await axiosClient.post(`/program-subjects`, data);
};

export const removeSubjectFromProgramSectionAPI = async (sectionId, subjectId) => {
  return await axiosClient.delete(`/program-subjects?sectionId=${sectionId}&subjectId=${subjectId}`);
};

