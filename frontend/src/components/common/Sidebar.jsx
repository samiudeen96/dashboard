import React from 'react'
import useAuthStore from "../../store/authStore"
import { menu } from "../../utils/constant"
import iconMap from "../../utils/icon";
import { Link, useLocation } from "react-router-dom"
import useUiStore from '../../store/uiStore';

const Sidebar = () => {

  const { user } = useAuthStore();
  const location = useLocation();
  const openSidebar = useUiStore((state) => state.openSidebar);


  const filteredMenu = menu[user?.role] || [];

  // console.log("filteredMenu", filteredMenu);

  return (
    <div className='bg-white h-full'>
      <div className='h-15 flex items-center justify-center font-bold'>
        Logo
      </div>
      <div className=' px-6 pb-6 flex flex-col gap-2'>
        {filteredMenu?.map((item, index) => {
          const Icon = item.icon ? iconMap[item.icon] : null;

          return (
            // <Link to={item.path} key={index} className={`p-2 rounded-sm flex items-center gap-2 
            // ${location.pathname === item.path 
            // ? "bg_gradient" 
            // : "hover_bg_gradient"} `}>
            //   <div className={`bg-white rounded-sm p-1`}>{Icon && <Icon className="w-5 h-5 text-primary" />}</div>
            //   <span>{item.label}</span>
            // </Link>

            <Link to={item.path} onClick={()=>openSidebar(false)} key={index} className={`p-2 flex items-center gap-2 
            ${location.pathname === item.path
                ? "border-l-4 border-primary bg-[#eae7f9] text-primary"
                : "border-l-4 border-white"} `}>
              <div className={`bg-white rounded-sm p-1`}>{Icon && <Icon className="w-5 h-5 text-primary" />}</div>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar