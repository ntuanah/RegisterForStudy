import { useEffect, useState } from "react";
import TheoryClassCard from "../../../../components/dean/TheoryClassCard";
import { getClassSectionsBySubjectAPI } from "../../../../service/classSectionService";
import { toast } from "react-toastify";

const MainContent = ({ selectedSubject }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!selectedSubject) return;
      
      try {
        setIsLoading(true);
        const response = await getClassSectionsBySubjectAPI(selectedSubject.id);
        const { data } = response;
        if (data.code === 1000) {
          setClasses(data.result || []);
        } else {
          toast.error("Không lấy được danh sách lớp học phần!");
          setClasses([]);
        }
      } catch (error) {
        toast.error("Lỗi khi tải chi tiết lớp học phần!");
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [selectedSubject]);

  if (!selectedSubject) {
    return (
      <div className="p-10 rounded-xl bg-blue-50 h-full flex flex-col items-center justify-center text-slate-400 border border-dashed border-blue-200">
        <p className="text-lg font-semibold">Chưa có môn học nào được chọn</p>
        <p className="text-sm">Vui lòng chọn một môn học ở danh sách bên trái để bắt đầu xếp lịch.</p>
      </div>
    );
  }
  return (
    <div className="p-5 rounded-xl bg-blue-50 h-full max-h-[800px] flex flex-col">
      <div className=" pb-4 mb-4">
        <h4 className="font-black text-2xl text-[#5483B3]">{selectedSubject.name}</h4>
        <div className="flex gap-4 mt-2 text-sm text-slate-600 font-medium">
          <span className="bg-white px-3 py-1 rounded-md shadow-sm border border-[#0A4174]">Mã môn: {selectedSubject.code}</span>
          <span className="bg-white px-3 py-1 rounded-md shadow-sm border border-[#0A4174]">Số lớp hiện có: {classes.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
             <div className="w-8 h-8 border-4 rounded-full"></div>
          </div>
        ) : classes.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            Môn học này chưa có lớp học phần nào.
          </p>
        ) : (
          classes.map((parentClass, index) => (
            <TheoryClassCard 
              key={parentClass.id} 
              theoryClass={parentClass} 
              index={index + 1} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MainContent;
