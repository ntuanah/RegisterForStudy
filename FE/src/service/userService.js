import axiosClient from "../utils/axiosClient";

export const getAllUsersAPI = (searchWord, page, role) => {
  if (role && role !== "ALL") {
    return axiosClient.get(
      `/users/get-by-role?role=${role}&search=${searchWord}&page=${page}`
    );
  } else {
    return axiosClient.get(
      `/users?search=${searchWord}&page=${page}`
    );
  }
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

export const getLecturersByMajorAPI = async (majorId) => {
  return await axiosClient.get(`/users/lecturers/${majorId}?size=1000`);
};
