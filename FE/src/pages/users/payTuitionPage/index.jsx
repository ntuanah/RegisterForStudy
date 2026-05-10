import PayTuition from "../../../components/users/PayTuition";

const PayTuitionPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Đóng học phí
        </h2>
      </div>
      <div className="p-10 space-y-5">

        <PayTuition />
      </div>
    </div>
  );
};

export default PayTuitionPage;
