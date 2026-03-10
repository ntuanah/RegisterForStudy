import CourseDetail from "../../../components/users/CourseDetail";
import CourseList from "../../../components/users/CourseList";
import RegisterResult from "../../../components/users/RegisterResult";

const RegisterStudyPage = () => {
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
            Danh sách học phần mở học kỳ 2 năm học 2025 - 2026
          </h1>

          <p className="text-slate-500 mt-1">
            Lựa chọn các học phần đề đăng ký trong kỳ này
          </p>
        </div>

        <CourseList />
        <CourseList />

        <RegisterResult />
      </div>
    </div>
  );
};

export default RegisterStudyPage;
