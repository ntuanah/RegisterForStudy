import axiosClient from "../utils/axiosClient";

export const getAllRoomsAPI = async () => {
  return await axiosClient.get("/rooms");
};