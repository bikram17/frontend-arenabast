import React from 'react';
import Sidebar from './AdminSidebar';
import Navbar from './Navbar';

const RootLayout = ({ children, showSidebar = true, showNavbar = true }) => {
  return (
    <>
      {/* Show both navbar and sidebar */}
      {showNavbar && showSidebar && (
        <div className='flex'>
          <Sidebar />
          <div className='flex-1 overflow-x-hidden bg-zinc-50'>
            <Navbar />
            <div className='bg-gray-100 h-full pt-0'>
            {children}
            </div>
          </div>
        </div>
      )}

      {/* Show only navbar */}
      {showNavbar && !showSidebar && (
        <div className='overflow-x-hidden bg-zinc-50'>
          <Navbar />
          {children}
        </div>
      )}

      {/* Show only sidebar */}
      {!showNavbar && showSidebar && (
        <div className='flex'>
          <Sidebar />
          <div className='flex-1 overflow-x-hidden bg-zinc-50'>
            {children}
          </div>
        </div>
      )}

      {/* Show no navbar and no sidebar */}
      {!showNavbar && !showSidebar && <>{children}</>}
    </>
  );
};

export default RootLayout;
