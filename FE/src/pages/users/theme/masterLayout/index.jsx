import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

function MasterLaypout({ ...props }) {
  const location = useLocation();
  const hideLayout = ["/login"].includes(location.pathname);
  return (
    <div {...props} className="flex">
      {!hideLayout && <Sidebar />}
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLaypout;
