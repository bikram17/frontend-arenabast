import React from 'react';
import { Avatar, Badge, Dropdown, Menu, } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaWallet } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/toggleSidebarSlice';
import userImage from "../assets/user.jpg"

const Navbar = () => {
  const { name, } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  const walletBalance = 20.56;

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex justify-end items-center px-4 py-3  mx-auto">
 
    

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          {/* Wallet */}
          <div
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 cursor-pointer hover:text-green-700 transition"
          >
            <FaWallet className="text-green-600 text-xl" />
            <span className="font-semibold text-gray-800">${walletBalance.toFixed(2)}</span>
          </div>

          {/* Notifications */}
          <Badge count={1} offset={[-2, 2]} size="small">
            <BellOutlined className="text-xl text-gray-600 cursor-pointer hover:text-green-600 transition" />
          </Badge>

          {/* User Dropdown */}
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar src={userImage} size="large" />
              <span className="text-gray-800 font-medium hidden sm:block">{name}</span>
            </div>
          </Dropdown>

          {/* Mobile Menu Icon */}
          <div
            className="text-2xl text-gray-700 cursor-pointer md:hidden"
            onClick={handleOpenSidebar}
          >
            <FaBars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
