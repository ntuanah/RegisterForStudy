import MyClassCard from "../../../components/lecturer/MyClassCard";

const MyClassPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Lớp học của tôi
        </h2>
      </div>

      <div className="p-10 grid grid-cols-4 gap-6">
        <MyClassCard />
        <MyClassCard />
        <MyClassCard />
        <MyClassCard />
        <MyClassCard />
      </div>
    </div>
  );
};

export default MyClassPage;
