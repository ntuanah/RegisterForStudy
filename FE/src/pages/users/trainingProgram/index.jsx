import { useEffect, useState } from "react";
import TrainingProgramTable from "../../../components/users/TrainingProgramTable";
import { getMyProgramTreeAPI } from "../../../service/userService";
import { toast } from "react-toastify";

const TrainingProgramPage = () => {
  const [programData, setProgramData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProgramTree = async () => {
      try {
        setIsLoading(true);
        const response = await getMyProgramTreeAPI();
        const { data } = response;
        
        if (data.code === 1000 || data.code === 200) {
          setProgramData(data.result);
        } else {
          toast.error(data.message || "Không thể tải chương trình đào tạo!");
        }
      } catch (error) {
        console.error("Lỗi fetch program tree:", error);
        toast.error("Lỗi kết nối máy chủ!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramTree();
  }, []);

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Chương trình đào tạo
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black ">
            {programData ? programData.programName : "Đang tải..."}
          </h1>
          {programData && (
             <div className="flex gap-4 mt-3">
               <span className="bg-blue-50 text-[#5483B3] font-semibold px-4 py-1.5 rounded-md border border-blue-100">
                 Thời gian: {programData.durationYears} năm
               </span>
               {programData.minTotalCredits && (
                 <span className="bg-blue-50 text-[#5483B3] font-semibold px-4 py-1.5 rounded-md border border-blue-100">
                   Tín chỉ tích lũy tối thiểu: {programData.minTotalCredits} TC
                 </span>
               )}
             </div>
          )}
        </div>

        <TrainingProgramTable programData={programData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default TrainingProgramPage;
