import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from "../../store/authStore"
import { BiMenuAltLeft } from "react-icons/bi";
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { headerDropdown } from "../../utils/constant"
import iconMap from "../../utils/icon";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import useUiStore from '../../store/uiStore';
import { logoutFn } from '../../api/services/authService';



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  

  const filteredMenu = headerDropdown[user?.role] || [];

  // const openModal = useUiStore((state) => state.openModal);
   const { openModal, openSidebar } = useUiStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleLogout = () => {
    openModal({
      desc: "Are you sure you want to logout?",
      buttonName: "Logout",
      color: "bg-primary",
      actionType: "logout", // used in switch
      onConfirm: () => {
        try {
          logoutFn();
          logout(); // clear Zustand user state
          // optionally redirect to login page
          navigate("/login")
        } catch (error) {
          console.error("Logout failed", error);
        }
      }
    })
  };

  // console.log(user);

  return (
    <div className='h-15 flex sm:justify-end justify-between items-center py-2 px-4' >
      <div className='sm:hidden' onClick={() => openSidebar(true)}><BiMenuAltLeft className='w-8 h-8' /></div>
      {/* <div className='flex items-center gap-1'>
        <div className='w-9 h-9 bg-gray-300 rounded-full'></div>
        <p className='text-sm'>{user?.firstName}</p>
      </div> */}
      <div
        onClick={toggleDropdown} ref={dropdownRef}
        className='flex items-center gap-2 border border-[#eae7f9] rounded p-1 cursor-pointer relative'
      >
        <div className='bg-background w-8 h-8 flex items-center justify-center rounded'>
          <FaUser />
        </div>
        <div>
          <p className='text-xs font-semibold mb-[-1px]'>{user?.firstName}</p>
          <p className='text-xs'>{user?.role}</p>
        </div>
        {/* <div className='border-l-2 h-6 border-gray-200/50 mx-1' /> */}
        <IoIosArrowDown className={`w-3 h-3 ml-5 ${isOpen ? "rotate-180" : ""}`} />

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded z-50">
            <ul className="text-sm p-1">
              {filteredMenu.map((item, index) => {

                const isActive = item.path === location.pathname;
                const Icon = item.icon ? iconMap[item.icon] : null;

                return (

                  <Link to={item.path} key={index}
                    className={`p-2 flex items-center gap-2 
                    ${isActive
                        ? "border-l-4 border-primary bg-[#eae7f9] text-primary"
                        : "border-l-4 border-white hover:bg-[#eae7f9] hover:text-primary hover:border-primary"} `}>
                    <div className={`bg-white rounded-sm p-1`}>{Icon && <Icon className="w-5 h-5 text-primary" />}</div>
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              <div onClick={handleLogout} className="p-2 flex items-center gap-2 border-l-4 border-white hover:bg-[#eae7f9] hover:text-primary hover:border-primary">
                <div className="bg-white rounded-sm p-1"><MdOutlineLogout className="w-5 h-5 text-primary" /></div>
                <span>Logout</span>
              </div>

            </ul>
          </div>
        )}
      </div>


    </div>
  )
}

export default Header