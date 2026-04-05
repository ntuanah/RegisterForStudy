import axiosClient from "../utils/axiosClient";

export const getAllUsersAPI = async (searchWord = "") => {
  let url = `/users`;
  if (searchWord && searchWord.trim() !== "") {
    url += `?search=${searchWord}`;
  }
  return await axiosClient.get(url);
};

export const getMyInfoAPI = async () => {
  return await axiosClient.get(`/users/my-info`);
};

export const getUserByIdAPI = async (id) => {
  return await axiosClient.get(`/users/id/${id}`);
};

export const updateStudentProfileAPI = async (id, data) => {
  return await axiosClient.put(`/students/${id}/profile`, data);
};

