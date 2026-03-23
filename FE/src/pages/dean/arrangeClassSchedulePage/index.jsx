import MainContent from "./mainContent";
import SidebarCourseList from "./SidebarCourseList";

const ArrangeClassSchedulePage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Sắp xếp lịch phòng học
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-5">
          <h1 className="text-3xl font-black text-slate-900">
            Sắp xếp lịch phòng học
          </h1>
          <p className="text-slate-500 mt-1">
            Sắp xếp lịch và phòng học cho các học phần.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <SidebarCourseList />
          </div>

          <div className="col-span-9">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangeClassSchedulePage;
