const TrainingProgramPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Chương trình đào tạo
        </h2>
      </div>

      <div className="flex flex-col gap-5 p-8">
        <div>
          <h3 className="text-xl font-bold text-[#5483B3]">Môn đại cương</h3>

          <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                    STT
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                    Mã học phần
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                    Tên học phần
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 text-center">
                    Số TC
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
                    Học phần tiên quyết
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">AD205</td>
                  <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                        AD233
                      </span>
                      <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                        AD233
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">AD205</td>
                  <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      AD233
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">AD205</td>
                  <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      AD233
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">4</td>
                  <td className="px-6 py-4">AD205</td>
                  <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      AD233
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">AD205</td>
                  <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      AD233
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#5483B3]">Môn chuyên ngành</h3>

          <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                    STT
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                    Mã học phần
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                    Tên học phần
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 text-center">
                    Số TC
                  </th>
                  <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
                    Học phần tiên quyết
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">IT301</td>
                  <td className="px-6 py-4">Cấu trúc dữ liệu và giải thuật</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      IT201
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">IT301</td>
                  <td className="px-6 py-4">Cấu trúc dữ liệu và giải thuật</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      IT201
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT301</td>
                  <td className="px-6 py-4">Cấu trúc dữ liệu và giải thuật</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      IT201
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">4</td>
                  <td className="px-6 py-4">IT301</td>
                  <td className="px-6 py-4">Cấu trúc dữ liệu và giải thuật</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      IT201
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">IT301</td>
                  <td className="px-6 py-4">Cấu trúc dữ liệu và giải thuật</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                      IT201
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramPage;
