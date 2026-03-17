const AddTrainingProgram = ({close}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm môn học</h2>

          <button
            onClick={close}
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

        <div className="space-y-10">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Khoá
            </label>
            <div className="w-full">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>K33</option>
                <option>K34</option>
                <option>K35</option>
                <option>K36</option>
                <option>K37</option>
                <option>K38</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Ngành
            </label>
            <div className="w-full">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>Công nghệ thông tin</option>
                <option>Hệ thống thông tin</option>
                <option>Trí tuệ nhân tạo</option>
                <option>2025-2026</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              STC
            </label>
            <div className="w-full">
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
        </div>

        <div className="flex justify-end mt-5">
          <button className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 12h8m0 0h8m-8 0V4m0 8v8"
              />
            </svg>
            Thêm chương trình đào tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingProgram;
