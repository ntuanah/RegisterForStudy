import React, { useEffect, useState } from "react";
import { getMyTimetableAPI } from "../../../service/registrationService";
import { toast } from "react-toastify";

const TimetablePage = () => {
  const [scheduleGrid, setScheduleGrid] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const periods = Array.from({ length: 15 }, (_, i) => i + 1); 
  const days = [2, 3, 4, 5, 6, 7, 8]; 

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        setIsLoading(true);
        const scheduleRes = await getMyTimetableAPI();
          
        if (scheduleRes.data.code === 1000) {
          const enrollments = scheduleRes.data.result || [];
          const rawSchedule = [];

          enrollments.forEach(enrollment => {
            const section = enrollment.classSection;
            if (section && section.schedules) {
              section.schedules.forEach(schedule => {
                rawSchedule.push({
                  ...schedule,
                  subjectName: section.subjectName,
                  subjectCode: section.subjectCode,
                  sectionCode: section.sectionCode
                });
              });
            }
          });
          
          const grid = {};
          periods.forEach(p => {
            grid[p] = {};
            days.forEach(d => {
              grid[p][d] = { type: "empty" };
            });
          });

          rawSchedule.forEach(cls => {
            const day = cls.dayOfWeek;
            const start = cls.startPeriod;
            const end = cls.endPeriod;
            const span = end - start + 1;

            if (grid[start] && grid[start][day]) {
              grid[start][day] = { type: "class", data: cls, span: span };
            }

            for (let p = start + 1; p <= end; p++) {
              if (grid[p] && grid[p][day]) {
                grid[p][day] = { type: "skip" };
              }
            }
          });

          setScheduleGrid(grid);
        }
      } catch (error) {
        console.error("Lỗi tải lịch trình:", error);
        toast.error("Không thể tải thời khóa biểu!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetableData();
  }, []);

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Thời khoá biểu
        </h2>
      </div>

      <div className="p-4 md:p-8">

        <div className="border border-slate-200 rounded-xl shadow-sm mt-5 overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 w-1 whitespace-nowrap">
                  Tiết
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 2</h2> 
                  </div>
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 3</h2> 
                  </div>
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 4</h2>  
                  </div>
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 5</h2> 
                  </div>
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 6</h2> 
                  </div>
                </td>
                <td className="border-e border-slate-100 px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 7</h2> 
                  </div>
                </td>
                <td className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Chủ nhật</h2> 
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex justify-center items-center">
                      <div className="w-10 h-10 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                periods.map((period) => (
                  <tr key={period}>
                    <td className="border-e border-slate-100 px-6 py-4 text-center text-slate-500 font-bold bg-slate-50/50">
                      {period}
                    </td>
                    {days.map((day, index) => {
                      const cell = scheduleGrid[period]?.[day];
                      const isLastColumn = index === days.length - 1;
                      const cellClass = `${isLastColumn ? '' : 'border-e border-slate-100'} px-6 py-4 text-center`;

                      if (!cell || cell.type === "empty") {
                        return <td key={day} className={cellClass}></td>;
                      }

                      if (cell.type === "skip") {
                        return null; 
                      }

                      if (cell.type === "class") {
                        const { data, span } = cell;
                        return (
                          <td key={day} className={cellClass} rowSpan={span}>
                            <div className="text-xs space-y-1">
                              <p className="font-bold text-gray-700">{data.roomName || 'Chưa xếp phòng'}</p>
                              <p className="text-[#5483B3] font-semibold">
                                {data.subjectName} ({data.subjectCode})
                              </p>
                              <p className="text-slate-600">LHP: {data.sectionCode}</p> 
                              <p className="text-slate-600">Số tiết: {span}</p> 
                              <p className="text-slate-600">Tiết: {data.startPeriod}-{data.endPeriod}</p>
                              {data.lecturerName && (
                                <p className="text-blue-600 font-medium mt-1">GV: {data.lecturerName}</p>
                              )}
                            </div>
                          </td>
                        );
                      }
                      
                      return null;
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
