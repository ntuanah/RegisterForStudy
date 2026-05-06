import { useEffect, useState } from "react";
import { cancelEnrollmentAPI, getMyTimetableAPI } from "../../../service/registrationService";
import { toast } from "react-toastify";

const RegisterResult = ({ refreshTrigger }) => {
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);

  const fetchMyTimetable = async () => {
    try {
      setIsLoading(true);
      const res = await getMyTimetableAPI();
      if (res.data.code === 1000) {
        setRegisteredClasses(res.data.result || []);
      }
    } catch (error) {
      toast.error("Lỗi khi tải kết quả đăng ký môn học!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTimetable();
  }, [refreshTrigger]);

  const handleCancelEnrollment = async (classSectionId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đăng ký lớp học phần này?")) return;

    try {
      setIsDeletingId(classSectionId);
      const res = await cancelEnrollmentAPI(classSectionId);
      if (res.data.code === 1000) {
        toast.success("Hủy đăng ký lớp học phần thành công!");
        fetchMyTimetable();
      } else {
        toast.error(res.data.message || "Hủy đăng ký thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi hệ thống khi hủy đăng ký!");
    } finally {
      setIsDeletingId(null);
    }
  };

  const formatSchedules = (schedules) => {
    if (!schedules || schedules.length === 0) return "Chưa xếp lịch";
    return schedules
      .map((s) => `${s.dayOfWeekName}, Tiết ${s.startPeriod}-${s.endPeriod}, ${s.roomName || 'Chưa xếp phòng'}`)
      .join(" | ");
  };

  const formatLecturers = (schedules) => {
    if (!schedules || schedules.length === 0) return "Chưa phân công";
    const names = [...new Set(schedules.map((s) => s.lecturerName))].filter(Boolean);
    return names.length > 0 ? names.join(", ") : "Chưa phân công";
  };

  const formatComponentType = (type) => {
    if (type === "PRACTICE") return "Thực hành";
    return "Lý thuyết"; 
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">
        Kết quả đăng ký học: 
      </h3>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-[10px] text-left border-collapse">
          <thead className="bg-blue-50 text-slate-400">
            <tr>
              <th className="px-6 py-2 font-bold">STT</th>
              <th className="px-6 py-2 font-bold">Loại</th>
              <th className="px-6 py-2 font-bold">Mã LHP</th>
              <th className="px-6 py-2 font-bold">Tên LHP</th>
              <th className="px-6 py-2 font-bold">STC</th>
              <th className="px-6 py-2 font-bold">GV</th>
              <th className="px-6 py-2 font-bold">Lịch học</th>
              <th className="px-6 py-2 font-bold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center">
                  <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin mx-auto"></div>
                </td>
              </tr>
            ) : registeredClasses.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-slate-500 italic">
                  Bạn chưa đăng ký môn học nào.
                </td>
              </tr>
            ) : (
              registeredClasses.map((item, index) => {
                const section = item.classSection;
                const isDeletingThis = isDeletingId === section.id;

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-600">{index + 1}</td>
                    <td className="px-6 py-4">{formatComponentType(section.subjectComponentType)}</td>
                    <td className="px-6 py-4 ">{section.sectionCode}</td>
                    <td className="px-6 py-4 ">{section.subjectName}</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-slate-700">{formatLecturers(section.schedules)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatSchedules(section.schedules)}</td>
                    <td className="px-6 py-4 text-right flex justify-end">
                      <button 
                        onClick={() => handleCancelEnrollment(section.id)}
                        disabled={isDeletingThis}
                        className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isDeletingThis ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
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
                              strokeWidth="2"
                              d="M18 6L6 18M6 6l12 12"
                            />
                          </svg>
                        )}
                        {isDeletingThis ? "Đang hủy..." : "Hủy"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterResult;
