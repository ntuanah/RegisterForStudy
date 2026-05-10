import React, { useEffect, useState } from "react";
import {
  getInvoiceDetailsAPI,
  getMyInvoicesAPI,
  processPaymentVNPayAPI,
} from "../../../service/tuitionService";
import { toast } from "react-toastify";

const PayTuition = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isPayingId, setIsPayingId] = useState(null);

  useEffect(() => {
    const fetchMyInvoices = async () => {
      try {
        setIsLoading(true);
        const res = await getMyInvoicesAPI();
        if (res.data.code === 1000) {
          setInvoices(res.data.result || []);
        } else {
          toast.error(res.data.message || "Lỗi lấy danh sách hóa đơn!");
        }
      } catch (error) {
        toast.error("Lỗi kết nối khi lấy dữ liệu học phí!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyInvoices();
  }, []);

  const handleToggleDetails = async (invoiceId) => {
    if (expandedInvoiceId === invoiceId) {
      setExpandedInvoiceId(null);
      return;
    }

    setExpandedInvoiceId(invoiceId);

    if (!invoiceDetails[invoiceId]) {
      try {
        setIsLoadingDetails(true);
        const res = await getInvoiceDetailsAPI(invoiceId);
        if (res.data.code === 1000) {
          setInvoiceDetails((prev) => ({
            ...prev,
            [invoiceId]: res.data.result || [],
          }));
        }
      } catch (error) {
        toast.error("Không thể lấy chi tiết hóa đơn!");
      } finally {
        setIsLoadingDetails(false);
      }
    }
  };

  const handlePayment = async (invoiceId) => {
    try {
      setIsPayingId(invoiceId);
      
      const payload = {
        invoiceId: invoiceId,
        bankCode: "NCB"
      };

      const res = await processPaymentVNPayAPI(payload);

      if (res.data.code === 1000 && res.data.result.status === "OK") {
        toast.success("Đang chuyển hướng sang cổng thanh toán VNPay...");
        
        const paymentUrl = res.data.result.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error("Không tìm thấy đường dẫn thanh toán!");
        }
      } else {
        toast.error(res.data.message || "Có lỗi xảy ra khi tạo giao dịch!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi hệ thống khi kết nối VNPay!");
    } finally {
      setIsPayingId(null);
    }
  };

  const formatCurrency = (amount) => {
    if (amount == null) return "-";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "PAID":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-xs">
            Đã thanh toán
          </span>
        );
      case "UNPAID":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-600 font-bold rounded-full text-xs">
            Chưa thanh toán
          </span>
        );
      case "PARTIAL":
        return (
          <span className="px-3 py-1 bg-orange-100 text-orange-600 font-bold rounded-full text-xs">
            Thanh toán 1 phần
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold rounded-full text-xs">
            {status || "Không xác định"}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            Học phí
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 w-16 whitespace-nowrap">
                  STT
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 whitespace-nowrap">
                  Đợt / Học kỳ
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 w-32 whitespace-nowrap">
                  Hạn nộp
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 w-32 whitespace-nowrap text-right">
                  Tổng học phí
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 w-50 whitespace-nowrap text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 w-24 whitespace-nowrap text-center">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    Bạn chưa có khoản học phí nào cần đóng.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice, index) => (
                  <React.Fragment key={invoice.id}>
                    <tr
                      className={`hover:bg-slate-50 transition-colors ${expandedInvoiceId === invoice.id ? "bg-blue-50/30" : ""}`}
                    >
                      <td className="px-6 py-4  ">{index + 1}</td>
                      <td className="px-6 py-4 ">{invoice.semesterName}</td>
                      <td className="px-6 py-4 ">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#0A4174]">
                        {formatCurrency(invoice.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusBadge(invoice.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() => handleToggleDetails(invoice.id)}
                            className={`
    text-white font-medium border border-[#0A4174] rounded-full
    px-4 py-2 bg-[#5483B3]
    hover:bg-gray-200 hover:text-[#5483B3]
    cursor-pointer transition-all duration-300
    hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap
  `}
                            title={
                              expandedInvoiceId === invoice.id
                                ? "Đóng chi tiết"
                                : "Xem chi tiết"
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              >
                                <path d="M3 13c3.6-8 14.4-8 18 0" />
                                <path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
                              </g>
                            </svg>
                          </button>

                          {invoice.status !== "PAID" && (
                            <button 
                              onClick={() => handlePayment(invoice.id)}
                              disabled={isPayingId === invoice.id}
                              className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                            >
                              {isPayingId === invoice.id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18px"
                                  height="18px"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M13.5 13a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zM2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25zM4.75 5A1.75 1.75 0 0 0 3 6.75V8h14V6.75A1.75 1.75 0 0 0 15.25 5zM17 9H3v4.25c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 17 13.25z"
                                  />
                                </svg>
                              )}
                              {isPayingId === invoice.id ? "Đang xử lý..." : "Thanh toán học phí"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {expandedInvoiceId === invoice.id && (
                      <tr className="bg-slate-50 border-b-2 border-slate-200">
                        <td colSpan="6" className="px-8 py-5">
                          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                              <thead className="bg-blue-50">
                                <tr>
                                  <th className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase">
                                    STT
                                  </th>
                                  <th className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase">
                                    Tên học phần
                                  </th>
                                  <th className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase text-center">
                                    Số TC
                                  </th>
                                  <th className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase text-right">
                                    Đơn giá
                                  </th>
                                  <th className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase text-right">
                                    Thành tiền
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-xs">
                                {isLoadingDetails ? (
                                  <tr>
                                    <td
                                      colSpan="5"
                                      className="px-5 py-6 text-center text-slate-500"
                                    >
                                      Đang tải chi tiết...
                                    </td>
                                  </tr>
                                ) : !invoiceDetails[invoice.id] ||
                                  invoiceDetails[invoice.id].length === 0 ? (
                                  <tr>
                                    <td
                                      colSpan="5"
                                      className="px-5 py-6 text-center text-slate-500 italic"
                                    >
                                      Hóa đơn này không có chi tiết môn học.
                                    </td>
                                  </tr>
                                ) : (
                                  <>
                                    {invoiceDetails[invoice.id].map(
                                      (detail, dIndex) => (
                                        <tr
                                          key={detail.id}
                                          className="hover:bg-slate-50"
                                        >
                                          <td className="px-5 py-3 text-slate-500">
                                            {dIndex + 1}
                                          </td>
                                          <td className="px-5 py-3 ">
                                            {detail.subjectName}
                                          </td>
                                          <td className="px-5 py-3 text-center">
                                            {detail.credits}
                                          </td>
                                          <td className="px-5 py-3 text-right text-slate-500">
                                            {formatCurrency(detail.unitPrice)}
                                          </td>
                                          <td className="px-5 py-3 text-right font-medium text-[#5483B3]">
                                            {formatCurrency(detail.subTotal)}
                                          </td>
                                        </tr>
                                      ),
                                    )}
                                    <tr className="bg-blue-50/50">
                                      <td
                                        colSpan="4"
                                        className="px-5 py-3 text-right font-bold text-slate-700 text-sm"
                                      >
                                        Tổng học phí
                                      </td>
                                      <td className="px-5 py-3 text-right font-black text-red-600 text-sm">
                                        {formatCurrency(invoice.totalAmount)}
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayTuition;
