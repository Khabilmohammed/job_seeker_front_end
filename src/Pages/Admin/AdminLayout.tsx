import { Outlet } from "react-router-dom";
import HeaderbarAdmin from "../../Componenets/Admin/Headerbar/HeaderbarAdmin";
import SidebarAdmin from "../../Componenets/Admin/sideBarAdmin/SidebarAdmin";

export const AdminLayout = () => {
  return (
    <div className="bg-gray-100">
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <HeaderbarAdmin />
      </div>

      
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40">
        <SidebarAdmin />
      </div>

     
      <div className="pt-16 pl-64 min-h-screen bg-gray-100">
        <div className="p-4 max-w-7xl mx-auto overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
