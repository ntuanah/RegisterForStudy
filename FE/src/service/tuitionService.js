import axiosClient from '../utils/axiosClient';

export const getRegistrationPeriodsBySemesterAPI = async (semesterId, page = 0, size = 1000) => {
  return await axiosClient.get(`/registration-periods/semester/${semesterId}?page=${page}&size=${size}`);
};

export const generateTuitionInvoicesAPI = async (registrationPeriodId) => {
  return await axiosClient.post(`/tuitions/invoices/generate/${registrationPeriodId}`);
};

export const getAdminTuitionInvoicesAPI = async (page, size) => {
  return await axiosClient.get(`/tuitions/admin/invoices?page=${page}&size=${size}`);
};

export const getMyInvoicesAPI = async () => {
  return await axiosClient.get(`/tuitions/my-invoices`);
};

export const getInvoiceDetailsAPI = async (invoiceId) => {
  return await axiosClient.get(`/tuitions/invoices/${invoiceId}/details`);
};

export const processPaymentVNPayAPI = async (payload) => {
  return await axiosClient.post(`/tuitions/payments/vnpay`, payload);
};