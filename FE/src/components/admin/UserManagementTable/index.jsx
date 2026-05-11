import { useEffect, useMemo, useState } from "react";
import EditInformationUser from "../Modal/EditInformationUser";
import InformationUser from "../Modal/InformationUser";
import { toast } from "react-toastify";
import { getAllUsersAPI } from "../../../service/userService";

const UserManagementTable = ({ searchWord, selectedRole, refreshTrigger }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (word, page) => {
    try {
      setIsLoading(true);
      const apiPage = page - 1;

      const response = await getAllUsersAPI(word, apiPage);
      const { data } = response;

      if (data.code === 1000 || data.code === 200) {
        setUsers(data.result?.content || []);
        setTotalPages(data.result?.totalPages || 1);
      } else {
        toast.error(data.message || "Lỗi lấy dữ liệu người dùng");
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Lỗi fetchUsers:", error);
      toast.error("Không thể tải danh sách người dùng!");
      setUsers([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(searchWord, currentPage);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchWord, refreshTrigger, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord, selectedRole]);

  const filteredUsers = useMemo(() => {
    if (!selectedRole || selectedRole === "ALL") return users;

    return users.filter((user) => {
      return user.roles && user.roles.includes(selectedRole);
    });
  }, [users, selectedRole]);

  const formatRoles = (rolesArray) => {
    if (!rolesArray || rolesArray.length === 0) return "N/A";

    return rolesArray
      .map((role) => {
        if (role === "ROLE_ADMIN") return "Quản trị viên";
        if (role === "ROLE_USER") return "Sinh viên";
        if (role === "ROLE_LECTURER") return "Giảng viên";
        if (role === "ROLE_DEAN") return "Trưởng khoa";
        if (role === "ROLE_HOD") return "Trưởng bộ môn";
        return role;
      })
      .join(", ");
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } 
      else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } 
      else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5 whitespace-nowrap">
                STT
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15 whitespace-nowrap">
                Mã người dùng
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                Tên người dùng
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5 whitespace-nowrap">
                Email
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
                Vai trò
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-44 whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30 whitespace-nowrap">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-slate-500"
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-slate-500"
                >
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.accountId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 font-medium">
                    {formatRoles(user.roles)}
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <span className="flex items-center text-green-600 gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 100 100"
                        >
                          <path
                            fill="currentColor"
                            d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                            color="currentColor"
                          />
                        </svg>
                        Hoạt động
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 100 100"
                        >
                          <path
                            fill="currentColor"
                            d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                            color="currentColor"
                          />
                        </svg>
                        Không hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 text-[#5483B3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        className="cursor-pointer hover:text-blue-700 transition"
                        onClick={() => setEditUserId(user.accountId)}
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-blue-50 rounded-b-xl">
          <span className="text-sm text-slate-500">
            Trang{" "}
            <span className="font-bold text-[#5483B3]">{currentPage}</span> /{" "}
            {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                ${
                  currentPage === 1
                    ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                    : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m15 18l-6-6l6-6" />
              </svg>
            </button>

            {getPageNumbers().map((num, index) => (
              num === "..." ? (
                <span key={`dots-${index}`} className="px-2 text-slate-500 font-bold tracking-widest">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${num}`}
                  onClick={() => handlePageChange(num)}
                  className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all flex items-center justify-center
                    ${
                      currentPage === num
                        ? "bg-[#5483B3] text-white border-[#0A4174] shadow-md cursor-default"
                        : "border-slate-300 text-slate-600 bg-white hover:bg-blue-50 hover:text-[#5483B3] hover:border-[#5483B3] cursor-pointer"
                    }`}
                >
                  {num}
                </button>
              )
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                ${
                  currentPage === totalPages
                    ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                    : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m9 18l6-6l-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {editUserId && (
        <EditInformationUser
          id={editUserId}
          close={() => setEditUserId(null)}
          refresh={() => fetchUsers(searchWord, currentPage)}
        />
      )}
    </div>
  );
};

export default UserManagementTable;
