import { useEffect, useState } from "react";
import { getAdminTuitionInvoicesAPI } from "../../../service/tuitionService";
import { toast } from "react-toastify";

const PayTuitionTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInvoices = async (page) => {
    try {
      setIsLoading(true);
      const response = await getAdminTuitionInvoicesAPI(page - 1, 10);
      const { data } = response;

      if (data.code === 1000) {
        setInvoices(data.result?.content || []);
        setTotalPages(data.result?.totalPages || 1);
      } else {
        toast.error(data.message || "Lỗi tải danh sách công nợ!");
      }
    } catch (error) {
      console.error("Lỗi khi tải công nợ:", error);
      toast.error(error.response?.data?.message || "Lỗi kết nối đến server!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pageNumbers;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PAID":
        return (
          <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-[11px]">
            Đã thanh toán
          </span>
        );
      case "UNPAID":
        return (
          <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-[11px]">
            Chưa thanh toán
          </span>
        );
      default:
        return (
          <span className="text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-[11px]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5 bg-white flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-10 whitespace-nowrap">
                STT
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32 whitespace-nowrap">
                Mã SV
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                Họ và tên
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                Học kỳ
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap text-right w-40">
                Tổng học phí
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap text-center w-50">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center">
                  <div className="flex justify-center items-center gap-2 text-slate-500">
                    <div className="w-5 h-5 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                    Đang tải dữ liệu...
                  </div>
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-500 italic"
                >
                  Không có dữ liệu hóa đơn học phí nào.
                </td>
              </tr>
            ) : (
              invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {invoice.studentCode}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {invoice.studentName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {invoice.semesterName}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-[#0A4174]">
                    {formatCurrency(invoice.totalAmount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderStatus(invoice.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="px-4 md:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50 rounded-b-xl">
            <span className="text-sm text-slate-500">
              Trang{" "}
              <span className="font-bold text-[#5483B3]">{currentPage}</span> /{" "}
              {totalPages}
            </span>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                  ${
                    currentPage === 1
                      ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                      : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="m15 18l-6-6l6-6"
                  />
                </svg>
              </button>

              {getPageNumbers().map((num, index) =>
                num === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-slate-500 font-bold tracking-widest"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${num}`}
                    onClick={() => handlePageChange(num)}
                    className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all flex items-center justify-center
                      ${
                        currentPage === num
                          ? "bg-[#5483B3] text-white border-[#0A4174] shadow-md cursor-default"
                          : "border-slate-300 text-slate-600 bg-white hover:bg-blue-50 hover:text-[#5483B3] hover:border-[#5483B3] cursor-pointer"
                      }`}
                  >
                    {num}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                  ${
                    currentPage === totalPages
                      ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                      : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="m9 18l6-6l-6-6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayTuitionTable;
