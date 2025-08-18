import React from 'react'
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import { Outlet } from "react-router-dom"
import { useCurrentUser } from './hooks/authHook';

const Layout = () => {

  const { isFetching, isLoading } = useCurrentUser();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (

    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[270px] max-[940px]:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-4 bg-background h-full">
          {/* Replace this with <Outlet /> if using nested routing */}
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout;