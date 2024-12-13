import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { GrUserManager } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import {  IoIosLogOut } from "react-icons/io";
import { BsPostcardHeartFill } from "react-icons/bs";
import { MdOutlineConstruction } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from '../../../Apis/authApi';
import { initialState, logoutUser as logoutUserAction, setLoggedInUser } from "../../../Storage/Redux/UserAuthSlice";

import { useDispatch } from 'react-redux';
function SidebarAdmin() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation(); 

  const handleLogout = async () => {
    try {
      const response = await logoutUser({}).unwrap();
    console.log('Logout response:', response);
            localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      dispatch(setLoggedInUser({...initialState}));
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const menus = [
    { name: "Dashboard", link: "adminHome", icon: FaHome },
    { name: "User Management", link: "usermanagement", icon: GrUserManager },
    { name: "Post Management", link: "postManagement", icon: BsPostcardHeartFill },
    { name: "Jobs", link: "jobPage", icon: MdOutlineConstruction,margin: true },
    { name: "Logout", link: "#", icon: IoIosLogOut, onClick: handleLogout },
  ];

  return (
    <div className='flex gap-6'>
      <div
        className={`bg-gray-900 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
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
              className={` ${
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
    </div>
  );
}

export default SidebarAdmin;
