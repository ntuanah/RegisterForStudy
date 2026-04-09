import { useState, useRef, useEffect } from "react";
import UserFilterBar from "../../../components/admin/UserFilterBar";
import UserManagementTable from "../../../components/admin/UserManagementTable";
import {
  downloadExcelTemplateAPI,
  downloadLecturerExcelTemplateAPI,
  importExcelAPI,
  importLecturerExcelAPI,
} from "../../../service/authService";
import { toast } from "react-toastify";

const UserManagementPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImportingStudent, setIsImportingStudent] = useState(false); 
  const [isImportingLecturer, setIsImportingLecturer] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const studentFileInputRef = useRef(null);
  const lecturerFileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Hàm kích hoạt chọn file
  const handleTriggerStudentFileInput = () => {
    if (studentFileInputRef.current) {
      studentFileInputRef.current.click();
    }
  };

  const handleStudentFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = null; 

    try {
      setIsImportingStudent(true);
      const response = await importExcelAPI(file);
      const data = response.data;

      if (data.code === 1000) {
        toast.success("Thêm sinh viên thành công!");
        setRefreshTrigger((prev) => prev + 1); 
      } else {
        toast.error(
          data.message ||
            "Thêm sinh viên thất bại, vui lòng kiểm tra lại file!",
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsImportingStudent(false);
    }
  };

  const handleTriggerLecturerFileInput = () => {
    if (lecturerFileInputRef.current) {
      lecturerFileInputRef.current.click();
    }
  };

  const handleLecturerFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = null;

    try {
      setIsImportingLecturer(true);
      const response = await importLecturerExcelAPI(file);
      const data = response.data;

      if (data.code === 1000) {
        toast.success(data.message || "Xử lý file Excel giảng viên hoàn tất!");
        setRefreshTrigger(prev => prev + 1);
      } else {
        toast.error(
          data.message ||
            "Thêm giảng viên thất bại, vui lòng kiểm tra lại file!",
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsImportingLecturer(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setIsDownloading(true);
      setIsDropdownOpen(false);
      const response = await downloadExcelTemplateAPI();

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Template_SinhVien.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Tải form mẫu sinh viên thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải form mẫu!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadLecturerTemplate = async () => {
    try {
      setIsDownloading(true);
      setIsDropdownOpen(false);
      const response = await downloadLecturerExcelTemplateAPI();

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Template_GiangVien.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Tải form mẫu giảng viên thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải form mẫu giảng viên!");
    } finally {
      setIsDownloading(false);
    }
  };

  const isAnyImporting = isImportingStudent || isImportingLecturer;

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý người dùng
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Quản lý người dùng
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý tài khoản và thông tin người dùng.
            </p>
          </div>

          <div className="flex gap-6">
            <button className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.552 20.968a2.577 2.577 0 0 1-2.5-2.73c-.012-2.153 0-4.306 0-6.459a.5.5 0 0 1 1 0c0 2.2-.032 4.4 0 6.6c.016 1.107.848 1.589 1.838 1.589h12.463A1.55 1.55 0 0 0 19.825 19a3 3 0 0 0 .1-1.061v-6.16a.5.5 0 0 1 1 0c0 2.224.085 4.465 0 6.687a2.567 2.567 0 0 1-2.67 2.5Z"
                />
                <path
                  fill="currentColor"
                  d="M12.337 3.176a.46.46 0 0 0-.311-.138q-.021.002-.043-.006c-.022-.008-.027 0-.041.006a.46.46 0 0 0-.312.138L7.961 6.845a.5.5 0 0 0 .707.707l2.816-2.815v10.742a.5.5 0 0 0 1 0V4.737L15.3 7.552a.5.5 0 0 0 .707-.707Z"
                />
              </svg>
              Xuất dữ liệu
            </button>

            <input
              type="file"
              ref={studentFileInputRef}
              onChange={handleStudentFileChange}
              accept=".xlsx"
              className="hidden"
            />

            <button
              onClick={handleTriggerStudentFileInput}
              disabled={isAnyImporting}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2
                ${
                  isAnyImporting
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#5483B3] hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {!isImportingStudent && (
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
                    <path d="M15 8A5 5 0 1 0 5 8a5 5 0 0 0 10 0m2.5 13v-7M14 17.5h7" />
                    <path d="M3 20a7 7 0 0 1 11-5.745" />
                  </g>
                </svg>
              )}
              {isImportingStudent ? "Đang xử lý..." : "Thêm sinh viên"}
            </button>

            <input
              type="file"
              ref={lecturerFileInputRef}
              onChange={handleLecturerFileChange}
              accept=".xlsx"
              className="hidden"
            />

            <button
              onClick={handleTriggerLecturerFileInput}
              disabled={isAnyImporting}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2
                ${
                  isAnyImporting
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#5483B3] hover:bg-gray-200 cursor-pointer hover:-translate-y-1"
                }`}
            >
              {!isImportingLecturer && (
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
                    <path d="M15 8A5 5 0 1 0 5 8a5 5 0 0 0 10 0m2.5 13v-7M14 17.5h7" />
                    <path d="M3 20a7 7 0 0 1 11-5.745" />
                  </g>
                </svg>
              )}
              {isImportingLecturer ? "Đang xử lý..." : "Thêm giảng viên"}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isDownloading}
                className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center justify-center gap-2 transition-all duration-300
                  ${
                    isDownloading
                      ? "bg-gray-400 opacity-80 cursor-not-allowed w-[180px]"
                      : "bg-[#5483B3] hover:bg-[#0A4174] hover:shadow-md cursor-pointer hover:-translate-y-1"
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
                {isDownloading ? "Đang tải..." : "Tải form mẫu"}

                {!isDownloading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m6 9l6 6l6-6"
                    />
                  </svg>
                )}
              </button>

              {isDropdownOpen && !isDownloading && (
                <div className="absolute right-0 mt-2 w-56 bg-blue-50 border border-[#0A4174] rounded-xl shadow-lg z-10 overflow-hidden transform origin-top transition-all">
                  <button
                    onClick={handleDownloadTemplate}
                    className="w-full text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#5483B3] transition-colors border-b border-gray-100 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-5 rounded-full bg-blue-400"></span>
                    Tải form Sinh viên
                  </button>
                  <button
                    onClick={handleDownloadLecturerTemplate}
                    className="w-full text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#5483B3] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-5 rounded-full bg-orange-400"></span>
                    Tải form Giảng viên
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <UserFilterBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        <UserManagementTable
          searchWord={searchWord}
          selectedRole={selectedRole}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </div>
  );
};

export default UserManagementPage;
