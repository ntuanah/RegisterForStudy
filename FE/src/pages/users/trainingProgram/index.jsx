import { useEffect, useState } from "react";
import TrainingProgramTable from "../../../components/users/TrainingProgramTable";
import { getMyProgramTreeAPI } from "../../../service/userService";
import { toast } from "react-toastify";
import { getSubjectRecommendationsAPI } from "../../../service/AIService";

const TrainingProgramPage = () => {
  const [programData, setProgramData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);

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

  const handleGetRecommendations = async () => {
    try {
      setIsRecommending(true);
      const res = await getSubjectRecommendationsAPI();

      if (res.data && res.data.recommendedSubjects) {
        setRecommendationData(res.data);
        setShowRecommendationModal(true);
      } else {
        toast.error("Hệ thống chưa thể đưa ra gợi ý lúc này!");
      }
    } catch (error) {
      console.error("Lỗi lấy gợi ý:", error);
      toast.error("Lỗi kết nối khi lấy dữ liệu gợi ý AI!");
    } finally {
      setIsRecommending(false);
    }
  };

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Chương trình đào tạo
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="mb-6">
            <h1 className="text-3xl font-black ">
              {programData ? programData.programName : "Đang tải..."}
            </h1>
            {programData && (
              <div className="flex gap-4 mt-3">
                <span className="bg-blue-50 text-[#5483B3] font-semibold px-4 py-1.5 rounded-full border border-blue-100">
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

          <button
            type="button"
            onClick={handleGetRecommendations}
            disabled={isRecommending}
            className="w-full sm:w-auto justify-center h-fit font-medium border border-[#0A4174] rounded-full p-3 transition-all duration-300 flex items-center gap-2 text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isRecommending ? (
              <div className="w-5 h-5 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="m320 192l-85.333-32L320 127.968l32-85.301l32.03 85.301L469.333 160l-85.303 32L352 277.333zM149.333 362.667L42.667 320l106.666-42.667L192 170.667l42.667 106.666L341.333 320l-106.666 42.667L192 469.333z"
                />
              </svg>
            )}
            <span>
              {isRecommending ? "Đang phân tích..." : "Gợi ý môn học"}
            </span>
          </button>
        </div>

        <TrainingProgramTable programData={programData} isLoading={isLoading} />
      </div>

      {showRecommendationModal && recommendationData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-[700px] rounded-xl p-5 md:p-6 border border-[#0A4174] max-h-[95vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <span className="text-[#0A4174]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="m320 192l-85.333-32L320 127.968l32-85.301l32.03 85.301L469.333 160l-85.303 32L352 277.333zM149.333 362.667L42.667 320l106.666-42.667L192 170.667l42.667 106.666L341.333 320l-106.666 42.667L192 469.333z"
                    />
                  </svg>
                </span>
                Gợi ý môn học (AI)
              </h2>

              <button
                onClick={() => setShowRecommendationModal(false)}
                className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
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
              </button>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Đánh giá tổng quan
                </label>
                <div className="w-full text-sm border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-slate-700 outline-none leading-relaxed">
                  {recommendationData.explanation}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Danh sách ưu tiên đăng ký
                </label>
                <div className="space-y-3">
                  {recommendationData.recommendedSubjects.map(
                    (subject, index) => (
                      <div
                        key={subject.subjectId}
                        className="w-full text-sm border border-gray-300 rounded-lg p-4 bg-white hover:border-[#5483B3] transition-colors"
                      >
                        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2 mb-2">
                          <div className="font-bold text-[#0A4174] text-base">
                            {index + 1}. {subject.subjectName} (
                            {subject.subjectCode})
                          </div>
                          <div className="text-xs font-bold text-[#5483B3] bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 self-start md:self-auto">
                            Độ phù hợp: {subject.score}%
                          </div>
                        </div>
                        <p className="text-slate-600 mt-1">
                          <span className="font-medium text-slate-500">
                            Lý do:{" "}
                          </span>
                          {subject.reason}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingProgramPage;
