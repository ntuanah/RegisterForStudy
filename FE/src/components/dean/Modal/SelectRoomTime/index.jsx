import { useEffect, useMemo, useState } from "react";
import { getAllRoomsAPI } from "../../../../service/roomService";
import { toast } from "react-toastify";

const SelectRoomTime = ({ close }) => {
  const [activeTab, setActiveTab] = useState("A");
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const response = await getAllRoomsAPI();
        const { data } = response;
        if (data.code === 1000 || data.code === 200) {
          setRooms(data.result || []);
        } else {
          toast.error("Không lấy được danh sách phòng!");
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách phòng:", error);
        toast.error("Lỗi kết nối khi tải phòng học!");
      } finally {
        setIsLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  const groupedRooms = useMemo(() => {
    const groups = {};

    rooms.forEach((room) => {
      const roomName = room.name || "";
      const building = roomName.charAt(0).toUpperCase();
      const floor = roomName.charAt(1);

      if (!groups[building]) {
        groups[building] = {};
      }
      if (!groups[building][floor]) {
        groups[building][floor] = [];
      }

      groups[building][floor].push(room);
    });

    Object.keys(groups).forEach((building) => {
      Object.keys(groups[building]).forEach((floor) => {
        groups[building][floor].sort((a, b) => a.name.localeCompare(b.name));
      });
    });

    return groups;
  }, [rooms]);

  const buildingTabs = Object.keys(groupedRooms).sort();

  useEffect(() => {
    if (buildingTabs.length > 0 && !buildingTabs.includes(activeTab)) {
      setActiveTab(buildingTabs[0]);
    }
  }, [buildingTabs, activeTab]);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174] max-h-[85vh] flex flex-col">
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

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center">
                1. Chọn ngày trong tuần
              </h3>

              <div className="flex gap-2 flex-wrap">
                {[
                  "Thứ 2",
                  "Thứ 3",
                  "Thứ 4",
                  "Thứ 5",
                  "Thứ 6",
                  "Thứ 7",
                ].map((day) => (
                  <button
                    key={day}
                    className="border border-slate-300 px-8 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100 hover:border-[#0A4174] transition-colors"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center">
                  2. Chọn chọn tiết học
                </h3>


              </div>

              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((period) => (
                  <button
                    key={period}
                    className="border border-slate-300 px-3 py-2 rounded-lg font-semibold cursor-pointer hover:bg-slate-100 hover:border-[#0A4174] transition-colors"
                  >
                    Tiết {period}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center">
                3. Phân bổ phòng học
              </h3>

              {isLoadingRooms ? (
                <div className="flex justify-center py-5">
                  <div className="w-6 h-6 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : rooms.length === 0 ? (
                <p className="text-slate-500 italic">
                  Không có dữ liệu phòng học.
                </p>
              ) : (
                <>
                  <div className="flex gap-4 mb-6 border-b border-slate-200 pb-3 overflow-x-auto">
                    {buildingTabs.map((building) => (
                      <button
                        key={building}
                        onClick={() => setActiveTab(building)}
                        className={`h-fit font-bold rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2 cursor-pointer
                        ${
                          activeTab === building
                            ? "bg-[#5483B3] text-white border border-[#0A4174] shadow-md"
                            : "text-[#5483B3] border border-transparent hover:bg-blue-50"
                        }`}
                      >
                        Toà nhà {building}
                      </button>
                    ))}
                  </div>

                  <div>
                    {groupedRooms[activeTab] &&
                      Object.keys(groupedRooms[activeTab])
                        .sort()
                        .map((floor) => (
                          <div
                            key={floor}
                            className="mb-6 bg-blue-50 p-4 rounded-xl border border-[#0A4174]"
                          >
                            <h4 className="text-[#0A4174] font-black text-lg mb-4 pb-2">
                              Tầng {floor}
                            </h4>

                            <div className="grid grid-cols-5 gap-4">
                              {groupedRooms[activeTab][floor].map((room) => {
                                const isBusy = false; 

                                return (
                                  <button
                                    key={room.id}
                                    className={`h-fit border rounded-xl px-3 py-3 text-center transition-all cursor-pointer
                                    ${
                                      isBusy
                                        ? "border-red-200 bg-red-50 hover:bg-red-100 opacity-70"
                                        : "border-slate-300 bg-white hover:border-[#0A4174] hover:shadow-md"
                                    }`}
                                  >
                                    <div
                                      className={`text-lg font-black tracking-wider ${isBusy ? "text-red-500" : "text-[#0A4174]"}`}
                                    >
                                      {room.name}
                                    </div>
                                    <div
                                      className={`text-xs mt-1 font-medium ${isBusy ? "text-red-400" : "text-slate-500"}`}
                                    >
                                      {isBusy
                                        ? "Đang bận"
                                        : `${room.capacity} chỗ`}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end ">
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
    </div>
  );
};

export default SelectRoomTime;
