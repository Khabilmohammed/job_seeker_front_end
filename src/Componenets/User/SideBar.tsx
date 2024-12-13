import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications, IoIosLogOut } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { MdOutlineConstruction } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from "../../Apis/authApi"
import { initialState, setLoggedInUser } from "../../Storage/Redux/UserAuthSlice";
import signalrService from '../../Apis/signalrConnection/signalrService';

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation(); 

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      signalrService.stopConnection(); 
            localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      dispatch(setLoggedInUser({...initialState}));
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menus = [
    { name: "Home", link: "home", icon: FaHome },
    { name: "Notification", link: "notificationPage", icon: IoMdNotifications },
    { name: "Messages", link: "messagePage", icon: FaMessage },
    { name: "stories", link: "storyManagementpage", icon: FaMessage },
    { name: "Jobs", link: "jobListingsPage", icon: MdOutlineConstruction, margin: true },
    { name: "Applied job", link: "appliedJobsPage", icon: IoIosPaper },
    { name: "My Network", link: "myNetwork", icon: IoIosPeople },
    { name: "Profile", link: "userProfile", icon: IoIosPeople, margin: true  },
    { name: "Saved", link: "savedPage", icon: AiOutlineHeart},
    { name: "Logout", link: "#", icon: IoIosLogOut, onClick: handleLogout },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="flex gap-6 ">
    {/* Sidebar */}
    <div
      className={`bg-[#1a1a1a] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4 sticky top-16 h-screen  z-10`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`${
              menu.margin && "mt-5"
            } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            onClick={menu.onClick}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  
    {/* Header Bar */}
    <header className="bg-gray-800 p-4 h-16 w-full fixed top-0 left-0 z-20">
      <h1 className="text-white">Header Bar</h1>
      {/* Additional header content */}
    </header>
  
    {/* Other Content Here */}
    <div className="flex-grow mt-16"> {/* Adjust margin-top based on header height */}
      {/* Main content area */}
    </div>
  </div>
  );
}

export default SideBar;
