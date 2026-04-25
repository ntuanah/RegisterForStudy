import { useEffect, useState } from "react";
import CourseItem from "../../../../components/dean/CourseItem";
import { getCurrentSemesterAPI } from "../../../../service/semesterService";
import { getOpenedSubjectsInFacultyAPI } from "../../../../service/classSectionService";
import { toast } from "react-toastify";

const SidebarCourseList = ({ selectedSubject, onSelectSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const semesterRes = await getCurrentSemesterAPI();
        const semesterData = semesterRes.data;

        if (semesterData.code === 1000 && semesterData.result?.id) {
          const currentSemesterId = semesterData.result.id;

          const subjectsRes =
            await getOpenedSubjectsInFacultyAPI(currentSemesterId);
          const subjectsData = subjectsRes.data;

          if (subjectsData.code === 1000) {
            setSubjects(subjectsData.result || []);
          } else {
            toast.error("Không thể tải danh sách môn học!");
          }
        } else {
          toast.error("Không tìm thấy học kỳ hiện tại!");
        }
      } catch (error) {
        console.error("Lỗi tải SidebarCourseList:", error);
        toast.error("Lỗi kết nối máy chủ!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 rounded-xl bg-blue-50">
      <h3 className="font-bold mb-4 text-[#5483B3]">Các môn đã mở từ admin</h3>

      <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
          />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung bất kỳ"
          className="flex-1 outline-none text-sm"
        />
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto p-2 mt-5 custom-scrollbar flex-1">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#5483B3] border-t-transparent rounded-full"></div>
          </div>
        ) : subjects.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-5">
            Chưa có môn học nào được mở.
          </p>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className={
                selectedSubject?.id === subject.id
                  ? "ring-1 ring-[#0A4174] rounded-xl"
                  : ""
              }
            >
              <CourseItem subject={subject} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarCourseList;
