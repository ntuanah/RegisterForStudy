const CourseItem = ({ subject }) => {
  return (
    <div className="border border-[#0A4174] p-3 rounded-xl bg-white hover:shadow-md cursor-pointer ">
      <span className="text-[10px] font-bold text-[#5483B3] uppercase">
        Mã môn: {subject.code}
      </span>
      <h4 className="font-bold text-sm mt-1 text-slate-800">
        {subject.name}
      </h4>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-slate-500 font-medium">Số tín chỉ: {subject.credits}</p>
        <span className="text-[10px] bg-blue-100 text-[#5483B3] px-2 py-0.5 rounded font-bold">
          {subject.departmentName}
        </span>
      </div>
    </div>
  );
};

export default CourseItem;