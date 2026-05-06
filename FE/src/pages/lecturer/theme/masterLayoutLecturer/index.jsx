import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useState } from "react";

function MasterLayoutLecturer({ ...props }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div {...props} className="flex relative bg-gray-50">
      <div className="md:hidden absolute top-4 left-4 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 8V7h17v1zm17 4v1H3v-1zM3 17h17v1H3z" />
          </svg>
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="min-h-screen flex-1 pt-16 md:pt-0 w-full overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayoutLecturer;
