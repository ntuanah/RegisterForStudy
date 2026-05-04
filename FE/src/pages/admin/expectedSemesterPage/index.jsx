import { useState } from "react";
import ExpectedSemesterTable from "../../../components/admin/ExpectedSemesterTable";
import { downloadClassSectionTemplateAPI } from "../../../service/classSectionService";
import { importClassSectionsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";
import {
  exportSemesterSchedulePdfAPI,
  initScheduleAPI,
} from "../../../service/scheduleService";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { approvePendingClassSectionsAPI } from "../../../service/classSectionService";

const ExpectedSemesterPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleInitSchedule = async () => {
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn khởi tạo khung lịch học cho học kỳ hiện tại không?",
      )
    )
      return;

    try {
      setIsInitializing(true);
      const response = await initScheduleAPI();
      const { data } = response;

      if (data.code === 1000 || data.code === 200) {
        const { totalSections, newlyCreated, alreadyHadSchedule } = data.result;
        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-bold">Khởi tạo lịch học hoàn tất!</span>
            <span className="text-sm">Tổng số lớp: {totalSections}</span>
            <span className="text-sm">Tạo mới: {newlyCreated} lớp</span>
            <span className="text-sm">
              Đã có lịch từ trước: {alreadyHadSchedule} lớp
            </span>
          </div>,
          { autoClose: 5000 },
        );
        setRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(data.message || "Khởi tạo lịch thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khởi tạo lịch:", error);
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleApproveClasses = async () => {
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn phê duyệt tất cả các lớp học phần đang chờ trong học kỳ này?",
      )
    )
      return;

    try {
      setIsApproving(true);
      const semesterRes = await getCurrentSemesterAPI();
      if (semesterRes.data.code !== 1000 || !semesterRes.data.result?.id) {
        return toast.error("Không tìm thấy thông tin học kỳ hiện tại!");
      }

      const currentSemesterId = semesterRes.data.result.id;

      const response = await approvePendingClassSectionsAPI(currentSemesterId);
      if (response.data.code === 1000 || response.data.code === 200) {
        toast.success(
          response.data.message || "Phê duyệt lớp học phần thành công!",
        );
        setRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(response.data.message || "Phê duyệt thất bại!");
      }
    } catch (error) {
      console.error("Lỗi phê duyệt lớp:", error);
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsApproving(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const semesterRes = await getCurrentSemesterAPI();
      if (semesterRes.data.code !== 1000 || !semesterRes.data.result?.id) {
        return toast.error("Không tìm thấy thông tin học kỳ hiện tại!");
      }

      const currentSemesterId = semesterRes.data.result.id;

      const response = await exportSemesterSchedulePdfAPI(currentSemesterId);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Hoc_Ky_Du_Kien_${semesterRes.data.result.name.replace(/\//g, "_")}.pdf`,
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Xuất file PDF thành công!");
    } catch (error) {
      console.error("Lỗi xuất file PDF:", error);
      toast.error("Có lỗi xảy ra khi xuất file!");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setIsDownloading(true);
      const response = await downloadClassSectionTemplateAPI();

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "class_sections_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Tải form mẫu thành công!");
    } catch (error) {
      console.error("Lỗi tải file:", error);
      toast.error("Có lỗi xảy ra khi tải form mẫu!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleImportClick = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx";

      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsImporting(true);
        try {
          const response = await importClassSectionsAPI(file);
          const data = response.data;

          if (data.code === 200) {
            toast.success(data.result || "Import thành công!");
            setRefreshTrigger((prev) => prev + 1);
          } else {
            toast.error(data.message || "Import thất bại!");
          }
        } catch (apiError) {
          console.error("Lỗi gọi API:", apiError);
          toast.error(
            apiError.response?.data?.message || "Lỗi kết nối server!",
          );
        } finally {
          setIsImporting(false);
        }
      };

      input.click();
    } catch (error) {
      console.error("Lỗi quá trình import:", error);
    }
  };

  const isAnyActionRunning =
    isInitializing || isApproving || isExporting || isImporting || isDownloading;

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Học kỳ dự kiến
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Học kỳ dự kiến
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý thông tin cho học kỳ dự kiến.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleInitSchedule}
              disabled={isAnyActionRunning}
              className={`h-fit font-medium border border-[#0A4174] rounded-full p-3 transition-all duration-300 flex items-center gap-2
                ${
                  isInitializing
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {isInitializing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang khởi tạo...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      fill="currentColor"
                      d="M880 624v256H624v288h256v256h288v-256h256V879.999h-256V624zm48 48h192v256h256v192h-256v256H928v-257.5H672V928h256zm103.357-569.317l-12.761.021h-.336l-.338.006l-12.76.194l-.338.006l-.336.01l-12.756.365l-.337.01l-.336.014l-12.75.537l-.336.015l-.338.018l-12.74.709l-.338.02l-.336.023l-12.73.88l-.337.024l-.336.027l-12.716 1.053l-.336.027l-.336.032l-12.701 1.224l-.336.033l-.336.036l-12.682 1.396l-.336.037l-.336.041l-12.66 1.567l-.336.04l-.336.048l-12.635 1.736l-.336.047l-.336.05l-12.609 1.909l-.336.05l-.336.055l-12.58 2.08l-.336.055l-.336.06l-12.547 2.25l-.338.061l-.334.065l-12.513 2.42l-.336.066l-.336.068l-12.477 2.592l-.338.07l-.333.075l-12.438 2.761l-.336.075l-.336.08l-12.394 2.931l-.338.08l-.334.084l-6.688 1.682l-8.789 3.102l-8.058 4.681l-7.051 6.094l-5.797 7.299l-4.342 8.246l-2.736 8.908l-1.035 9.262l.7 9.295l2.415 9l4.043 8.398l5.53 7.502l6.827 6.344l7.885 4.967l8.672 3.418l9.154 1.748l9.319.021l7.628-1.3l6.336-1.592l11.696-2.766l11.771-2.617l11.977-2.485l11.722-2.267l11.899-2.133l11.935-1.973l11.83-1.79l12.002-1.651l11.885-1.47l12.053-1.327l12.068-1.164l12.09-.998l12.111-.84l11.98-.666l12.13-.51l12.133-.347l11.992-.182l12.14-.021l12.133.142l11.989.305l11.97.463l12.248.64l11.94.787l12.074.961l12.049 1.123l12.027 1.29l11.863 1.433l11.932 1.608l11.951 1.777l12.01 1.959l11.861 2.101l11.662 2.235l3.024.62l9.264 1.022l9.292-.714l8.999-2.428l8.39-4.055l7.492-5.543l6.334-6.836l4.957-7.894l3.405-8.676l1.734-9.156l.01-9.32l-1.725-9.159l-3.392-8.68l-4.947-7.898l-6.325-6.846l-7.486-5.55l-8.387-4.067l-7.435-2.142l-3.295-.678l-.342-.07l-.342-.067l-12.504-2.394l-.34-.065l-.341-.06l-12.54-2.223l-.34-.06l-.34-.055l-12.573-2.05l-.34-.054l-.34-.05l-12.601-1.876l-.34-.05l-.342-.047l-12.629-1.701l-.338-.047l-.342-.041l-12.652-1.53l-.34-.04l-.34-.036l-12.676-1.357l-.337-.037l-.34-.032l-12.695-1.183l-.34-.031l-.338-.028l-12.713-1.011l-.338-.028l-.338-.021l-12.728-.84l-.338-.022l-.338-.017l-12.738-.668l-.338-.018l-.338-.011l-12.75-.495l-.336-.013l-.338-.008l-12.756-.323l-.338-.01l-.336-.004l-12.76-.15l-.337-.004zm503.895 160.926l-9.111 1.962l-8.588 3.622l-7.766 5.15l-6.676 6.504l-5.353 7.629l-3.844 8.49l-2.201 9.057l-.482 9.306l1.251 9.235l2.946 8.843l4.535 8.141l5.967 7.16l5.892 5.016l3.012 2.183l.064.047l5.016 3.703l.06-.045l4.704 3.532l.082.062l4.431 3.385l.068.053l4.819 3.742l4.781 3.777l.088.07l4.549 3.657l.125.101l4.453 3.643l4.691 3.9l.114.094l4.43 3.746l4.396 3.78l.094.081l4.59 4.014l4.556 4.053l.098.088l4.31 3.902l4.493 4.133l.1.091l4.234 3.963l4.424 4.211l4.156 4.024l.112.11l4.47 4.403l.031.032l3.98 3.984l.083.086l4.287 4.369l4.092 4.238l.051.053l4.33 4.566l.096.102l3.98 4.271l3.993 4.356l.04.045l4.218 4.683l4.066 4.596l.094.106l3.957 4.554l.055.063l3.854 4.511l3.963 4.721l3.74 4.531l.096.12l3.888 4.798l3.877 4.868l3.66 4.68l.069.09l3.88 5.052l.084.11l3.653 4.845l.078.103l3.693 4.99l.453.614l.473.598l5.48 6.947l5.354 6.943l5.178 6.865l5.062 6.87l5.115 7.095l4.98 7.073l4.825 7.007l4.715 7.002l.064.098l4.814 7.322l4.682 7.29l4.607 7.345l4.454 7.268l4.535 7.582l4.299 7.365l4.3 7.55l4.223 7.598l4.07 7.508l4.069 7.69l3.945 7.66l2.633 5.242l4.941 7.904l6.32 6.848l7.483 5.557l8.385 4.07l8.992 2.445l9.29.733l9.266-1.004l8.918-2.705l8.262-4.315l7.317-5.773l6.119-7.03l4.709-8.043l3.133-8.777l1.449-9.207l-.283-9.314l-2.008-9.102l-2.928-7.164l-2.756-5.486l-.117-.233l-.12-.234l-4.2-8.15l-.12-.233l-.123-.232l-4.285-8.106l-.123-.232l-.125-.23l-4.37-8.061l-.126-.23l-.129-.231l-4.455-8.016l-.127-.228l-.13-.23l-4.54-7.968l-.13-.228l-.133-.229l-4.625-7.92l-.133-.228l-.135-.227l-4.709-7.869l-.135-.228l-.138-.225l-4.791-7.82l-.139-.227l-.14-.224l-4.874-7.77l-.142-.226l-.143-.223l-4.957-7.717l-.144-.225l-.147-.222l-5.037-7.666l-.147-.223l-.15-.223l-5.121-7.609l-.148-.223l-.153-.22l-5.203-7.557l-.152-.22l-.155-.22l-5.283-7.501l-.154-.22l-.158-.218l-5.366-7.443l-.156-.22l-.16-.218l-5.447-7.386l-.16-.217l-.162-.217l-5.526-7.328l-.164-.217l-.166-.215l-5.605-7.267l-.166-.217l-.17-.213l-5.21-6.604l-3.505-4.736l-.131-.176l-.13-.175l-3.997-5.297l-.13-.174l-.134-.174l-4.035-5.252l-.133-.174l-.132-.172l-4.073-5.207l-.134-.172l-.137-.17l-4.11-5.164l-.136-.171l-.137-.168l-4.148-5.12l-.137-.17l-.139-.167l-4.187-5.075l-.139-.168l-.139-.166l-4.224-5.03l-.139-.167l-.14-.166l-4.262-4.986l-.14-.164l-.144-.164l-4.296-4.942l-.143-.164l-.143-.16l-4.334-4.898l-.144-.162l-.145-.16l-4.369-4.854l-.144-.16l-.147-.16l-4.406-4.81l-.145-.157l-.146-.158l-4.441-4.766l-.147-.156l-.148-.157l-4.477-4.72l-.148-.157l-.149-.154l-4.511-4.676l-.149-.154l-.15-.152l-4.545-4.633l-.15-.152l-.151-.15l-4.58-4.59l-.152-.151l-.15-.148l-4.616-4.545l-.15-.149l-.155-.148l-4.646-4.5l-.153-.149l-.154-.146l-4.682-4.455l-.152-.147l-.154-.144l-4.715-4.412l-.154-.143l-.157-.145l-4.746-4.367l-.154-.142l-.156-.14l-4.78-4.325l-.156-.14l-.156-.141l-4.812-4.28l-.157-.138l-.158-.139l-4.842-4.234l-.158-.14l-.158-.134l-4.873-4.191l-.158-.137l-.16-.135l-4.905-4.146l-.16-.135l-.16-.133l-4.934-4.103l-.16-.133l-.162-.131l-4.965-4.059l-.16-.13l-.162-.131l-4.996-4.014l-.16-.13l-.162-.128l-5.026-3.97l-.162-.13l-.162-.124l-5.055-3.928l-.162-.125l-.164-.125l-5.084-3.883l-.162-.125l-.164-.123l-5.113-3.838l-.164-.123l-.165-.121l-5.14-3.795l-.164-.121l-.166-.12l-3.34-2.425l-8.022-4.746l-8.761-3.176l-9.2-1.494z"
                      opacity=".98"
                    />
                  </svg>
                  <span>Khởi tạo lịch học</span>
                </>
              )}
            </button>

            <button
              onClick={handleApproveClasses}
              disabled={isAnyActionRunning}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2
                ${
                  isApproving
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {isApproving ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang phê duyệt...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16.977 19.5A9 9 0 0 0 10 3.223M16.977 19.5V16m0 3.5H20.5M7 4.516a9 9 0 0 0 7 16.261M7 4.516V8m0-3.484H3.5"
                    />
                  </svg>
                  <span>Đổi trạng thái lớp</span>
                </>
              )}
            </button>

            <button
              onClick={handleImportClick}
              disabled={isImporting || isDownloading}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2
                ${
                  isImporting || isDownloading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#5483B3] hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {!isImporting && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1"
                  />
                </svg>
              )}
              {isImporting ? "Đang xử lý..." : "Thêm môn học"}
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isAnyActionRunning}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2
                ${
                  isExporting
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang xuất file...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="currentColor"
                        d="m12 5l-.707-.707l.707-.707l.707.707zm1 9a1 1 0 1 1-2 0zM6.293 9.293l5-5l1.414 1.414l-5 5zm6.414-5l5 5l-1.414 1.414l-5-5zM13 5v9h-2V5z"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M5 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"
                      />
                    </g>
                  </svg>
                  <span>Xuất file học kỳ dự kiến</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTemplate}
              disabled={isDownloading}
              className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 
                ${
                  isDownloading
                    ? "bg-gray-400 cursor-not-allowed opacity-80"
                    : "bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
                }`}
            >
              {!isDownloading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M12 4.5v11m3.5-3.5L12 15.5L8.5 12"
                  />
                </svg>
              )}
              {isDownloading ? "Đang tải..." : "Tải form"}
            </button>
          </div>
        </div>

        <ExpectedSemesterTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default ExpectedSemesterPage;
