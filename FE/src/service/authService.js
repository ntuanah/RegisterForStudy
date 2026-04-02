import axios from 'axios';
import axiosClient from '../utils/axiosClient';

const API_URL = import.meta.env.VITE_API_URL;

export const loginAPI = async (username, password) => {
    return await axios.post(`${API_URL}/auths/login`, {
        username,
        password
    }, {
        withCredentials: true
    });
};

export const refreshTokenAPI = async () => {
    return await axios.post(`${API_URL}/auths/refresh-token`, {}, {
        withCredentials: true 
    });
};
 
export const downloadExcelTemplateAPI = async () => {
    return await axiosClient.get('/auths/excel-template', {
        responseType: 'blob', 
    });
};

export const importExcelAPI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return await axiosClient.post('/auths/import-excel', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });
};

export const forgotPasswordAPI = async (email) => {
    return await axios.post(`${API_URL}/auths/forgot-password`, { email });
};

export const verifyOtpAPI = async (email, otp) => {
    return await axios.post(`${API_URL}/auths/verify-otp`, { email, otp });
};

export const resetPasswordAPI = async (email, resetToken, newPassword, confirmPassword) => {
    return await axios.post(`${API_URL}/auths/reset-password`, {
        email,
        resetToken,
        newPassword,
        confirmPassword
    });
};

export const logoutAPI = async () => {
    return await axiosClient.post('/auths/logout');
};