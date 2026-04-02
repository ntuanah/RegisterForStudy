import axiosClient from '../utils/axiosClient';

export const getAllSubjectsAPI = async () => {
    return await axiosClient.get('/subjects');
};

export const searchSubjectAPI = async (keyword = '') => {
    const url = keyword ? `/subjects?keyword=${keyword}` : '/subjects';
    return await axiosClient.get(url);
};

export const addSubjectAPI = async (subjectData) => {
    return await axiosClient.post('/subjects', subjectData);
};

export const deleteSubjectAPI = (id) => {
  return axiosClient.delete(`/subjects/${id}`);
};

export const getSubjectByIdAPI = async (id) => {
  return await axiosClient.get(`/subjects/${id}`);
};

export const updateSubjectAPI = async (id, data) => {
  return await axiosClient.put(`/subjects/${id}`, data);
};

export const updatePrerequisitesAPI = async (id, data) => {
  return await axiosClient.put(`/subjects/${id}/prerequisites`, data);
};

export const getSubjectPrerequisitesAPI = async (id) => {
  return await axiosClient.get(`/subjects/${id}/prerequisites`);
};

export const createSubjectComponentAPI = async (data) => {
  return await axiosClient.post(`/subject-components`, data);
};