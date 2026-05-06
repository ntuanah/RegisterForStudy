import { useEffect, useState } from "react";
import CourseDetail from "../../../components/users/CourseDetail";
import CourseList from "../../../components/users/CourseList";
import RegisterResult from "../../../components/users/RegisterResult";
import { toast } from "react-toastify";
import { getRegistrationStatusAPI } from "../../../service/registrationService";

const RegisterStudyPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [regStatus, setRegStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const res = await getRegistrationStatusAPI();
        if (res.data.code === 1000) {
          setRegStatus(res.data.result);
        }
      } catch (error) {
        toast.error("Không thể kiểm tra trạng thái đăng ký!");
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);

  const handleRegisterSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!regStatus || regStatus.eligible === false) {
    return (
      <div>
        <div className="p-5 border-b border-gray-300 shadow-xl">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-[#0A4174] rounded-full"></span>
            Đăng ký học
          </h2>
        </div>

        <div className="p-10 flex justify-center">
          <div className="bg-blue-50 border border-[#5483B3] p-10 rounded-2xl shadow-lg max-w-2xl w-full text-center space-y-6">
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#5483B3]">
                Chưa đến thời hạn đăng ký
              </h2>
              <p className="text-slate-600 font-medium ">
                Hiện tại không có đợt đăng ký nào được mở.
              </p>
            </div>

            <p className="text-sm text-slate-400 italic">
              * Vui lòng quay lại vào thời gian quy định để thực hiện đăng ký học phần.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Đăng ký học
        </h2>
      </div>

      <div className="p-8 space-y-5">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Danh sách học phần mở
          </h1>

          <p className="text-slate-500 mt-1">
            Lựa chọn các học phần đề đăng ký trong kỳ này
          </p>
        </div>

        <CourseList onRegisterSuccess={handleRegisterSuccess}/>

        <RegisterResult refreshTrigger={refreshTrigger}/>
      </div>
    </div>
  );
};

export default RegisterStudyPage;
