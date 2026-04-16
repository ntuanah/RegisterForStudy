import { useState } from "react";
import ExpectedSemesterTable from "../../../components/admin/ExpectedSemesterTable";
import { downloadClassSectionTemplateAPI } from "../../../service/classSectionService";
import { importClassSectionsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";

const ExpectedSemesterPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
