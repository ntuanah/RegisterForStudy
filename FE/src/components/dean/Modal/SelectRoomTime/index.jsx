import { useState } from "react";

const SelectRoomTime = ({ close }) => {
  const [enabled, setEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("A");
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chọn phòng, giờ học</h2>

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

        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center">
              1. Chọn ngày trong tuần
            </h3>

            <div className="flex gap-2">
              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 2
              </button>

              <button className="border border-[#0A4174] px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 3
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 4
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 5
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 6
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Thứ 7
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Chủ nhật
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center">
                2. Chọn chọn tiết học
              </h3>

              <div className="flex items-center gap-4">
                <span className="text-lg text-slate-600">Học trực tuyến</span>

                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
                    enabled ? "bg-[#5483B3]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      enabled ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              <button className="border border-[#0A4174] px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 1
              </button>

              <button className="border border-[#0A4174] px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 2
              </button>

              <button className="border border-[#0A4174] px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 3
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 4
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 5
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 6
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 7
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 8
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 9
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 10
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 11
              </button>

              <button className="border border-slate-300 px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100">
                Tiết 12
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center ">
              3. Phân bổ phòng học
            </h3>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("A")}
                className={`h-fit font-medium rounded-full px-5 py-2 transition-all duration-300 flex items-center gap-2 cursor-pointer
                ${
                  activeTab === "A"
                    ? "bg-[#5483B3] text-white border border-[#0A4174]"
                    : "text-[#5483B3] border border-transparent hover:bg-gray-100"
                }
                `}
              >
                Toà nhà A
              </button>

              <button
                onClick={() => setActiveTab("B")}
                className={`h-fit font-medium rounded-full px-5 py-2 transition-all duration-300 flex items-center gap-2 cursor-pointer
                ${
                  activeTab === "B"
                    ? "bg-[#5483B3] text-white border border-[#0A4174]"
                    : "text-[#5483B3] border border-transparent hover:bg-gray-100"
                }
                `}
              >
                Toà nhà B
              </button>
            </div>

            <div>
              {activeTab === "A" && (
                <>
                  <div className="mb-6">
                    <h4 className="text-gray-500 font-semibold mb-3">Tầng 5</h4>

                    <div className="grid grid-cols-4 gap-4">
                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A501</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A502</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A503</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-red-200 bg-red-50  rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold text-red-400">
                          A505
                        </div>
                        <div className="text-sm text-red-300">Đang bận</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A506</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A507</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A508</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-500 font-semibold mb-3">Tầng 6</h4>

                    <div className="grid grid-cols-4 gap-4">
                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A601</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A602</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A603</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-red-200 bg-red-50  rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold text-red-400">
                          A605
                        </div>
                        <div className="text-sm text-red-300">Đang bận</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A606</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A607</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">A608</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "B" && (
                <>
                  <div className="mb-6">
                    <h4 className="text-gray-500 font-semibold mb-3">Tầng 5</h4>

                    <div className="grid grid-cols-4 gap-4">
                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B501</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B502</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B503</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-red-200 bg-red-50  rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold text-red-400">
                          B505
                        </div>
                        <div className="text-sm text-red-300">Đang bận</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-500 font-semibold mb-3">Tầng 6</h4>

                    <div className="grid grid-cols-4 gap-4">
                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B601</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B602</div>
                        <div className="text-sm text-gray-500">80 chỗ</div>
                      </button>

                      <button className="h-fit border border-gray-200 rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold">B603</div>
                        <div className="text-sm text-gray-500">40 chỗ</div>
                      </button>

                      <button className="h-fit border border-red-200 bg-red-50  rounded-xl px-5 py-2 text-center  hover:bg-slate-100 cursor-pointer">
                        <div className="text-lg font-bold text-red-400">
                          B605
                        </div>
                        <div className="text-sm text-red-300">Đang bận</div>
                      </button>
                    </div>
                  </div>
                </>
              )}
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
                  d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
                />
              </svg>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRoomTime;
