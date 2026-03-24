import TheoryClassCard from "../../../../components/dean/TheoryClassCard";

const MainContent = () => {
  return (
    <div className="p-5 rounded-xl bg-blue-50">
      <div>
        <h4 className="font-bold text-xl mt-1">Ẩm thực Việt Nam</h4>
        <p className="text-sm text-slate-500">Số lượng lớp học phần mở: 2</p>
      </div>

      <div className="mt-4 space-y-5 max-h-[700px] overflow-y-auto pr-2">
        <TheoryClassCard />
        <TheoryClassCard />
        <TheoryClassCard />
      </div>
    </div>
  );
};

export default MainContent;
