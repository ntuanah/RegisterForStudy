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
        <div className="flex gap-5">
          <div className="w-48">
            <select
              name=""
              id=""
              className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option>Học kỳ 1</option>
              <option>Học kỳ 2</option>
            </select>
          </div>

          <div className="w-48">
            <select
              name=""
              id=""
              className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option>2022-2023</option>
              <option>2023-2024</option>
              <option>2024-2025</option>
              <option>2025-2026</option>
            </select>
          </div>
        </div>

        <PayTuition />
      </div>
    </div>
    );
};

export default PayTuitionPage;
