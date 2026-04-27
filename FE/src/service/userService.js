import axiosClient from "../utils/axiosClient";

export const getAllUsersAPI = async (searchWord = "", page = 0) => {
  let url = `/users?page=${page}`;

  if (searchWord && searchWord.trim() !== "") {
    url += `&search=${encodeURIComponent(searchWord)}`; 
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

export const exportStudentsToPdfAPI = async () => {
  return await axiosClient.get("/students/export-pdf", {
    responseType: "blob", 
  });
};

export const getMyProgramTreeAPI = async () => {
  return await axiosClient.get("/students/my-program-tree");
};

