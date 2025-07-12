import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/authSlice";
import { Avatar, Modal } from "antd";
import { TbTransfer } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { MdLogout } from "react-icons/md";
import userPhoto from "../assets/user.jpg";
import { FaWallet } from "react-icons/fa6";
const AdminSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.mobileSidebar);
  const { name, email, role,} = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Check if the menu item is active
  const isActive = (path) => location.pathname === path;

  // Handle window resizing to detect mobile/tablet screens
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true); // Set isMobile to true for mobile/tablet
    } else {
      setIsMobile(false); // Set isMobile to false for larger screens
    }
  };

  // Add resize event listener
  useEffect(() => {
    handleResize(); // Initialize on load
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  // Confirmation for logout
  const confirmationLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "green", borderColor: "green" },
      },
      onOk: () => {
        dispatch(setLogout());
        navigate("/");
      },
    });
  };



  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <FaHome />,
      to: "/dashboard",
      roles: ["ADMIN", "AGENT", "SUPER_ADMIN"],
    },
    {
      key: "admins",
      label: "Admins",
      icon: <FaUsers />,
      to: "/admins",
      roles: ["SUPER_ADMIN"],
    },
    {
      key: "agents",
      label: "Agents",
      icon: <FaUsers />,
      to: "/agents",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      key: "players",
      label: "Players",
      icon: <FaUsers />,
      to: "/players",
      roles: ["ADMIN", "AGENT", "SUPER_ADMIN"],
    },
    {
      key: "mywallet",
      label: "My Wallet",
      icon: <FaWallet />,
      to: "/wallet",
      roles: ["ADMIN", "AGENT", "SUPER_ADMIN"],
    },
    {
      key: "transfer",
      label: "Transfer",
      icon: <TbTransfer />,
      to: "/transfer",
      roles: ["ADMIN", "AGENT"],
    },
    {
      key: "history",
      label: "History",
      icon: <IoDocumentTextOutline />,
      to: "/history",
      roles: ["ADMIN", "AGENT", "SUPER_ADMIN"],
    },
    {
      key: "transfer-request",
      label: "Transfer Request",
      icon: <TbTransfer />,
      to: "/transfer-request",
      roles: ["SUPER_ADMIN"],
    },
  ];



  return (
    <>
      {/* Mobile Sidebar (render only when isSidebarOpen is true) */}
      {isMobile && isSidebarOpen && (
        <Sidebar
          style={{
            backgroundColor: "#0a4820",
            color: "#fff",
            height: "100vh",
            position: "fixed",
            transform: isSidebarOpen ? "translateX(0%)" : "translateX(-100%)",
            top: 0,
            left: 0,
            width: "35%",
            zIndex: 1000,
            animation: isSidebarOpen
              ? "slideIn 0.3s ease-in-out forwards"
              : "slideOut 0.3s ease-in-out forwards",
            overflow: "hidden",
            paddingTop: "2rem",
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? "#007500" : "#0a4820",
                color: "#fff",
                fontSize: "1em",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#007500",
                  color: "#fff",
                },
              }),
              icon: {
                color: "#fff",
                fontSize: "1.5em",
              },
              label: {
                color: "#fff",
              },
            }}
          >
 

            {/* Dynamically render based on role */}
            {menuItems
              .filter((item) => item.roles.includes(role))
              .map((item) => (
                <MenuItem
                  key={item.key}
                  icon={item.icon}
                  component={<Link to={item.to} />}
                  active={isActive(item.to)}
                >
                  {item.label}
                </MenuItem>
              ))}

            {}
          </Menu>

          <div className="px-5 pb-5 space-y-4 border-t border-green-700 absolute bottom-5 w-full">
            {/* User Profile */}
            <div
              className={`flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-md mt-3 ${
                 "justify-center"
              }`}
            >
              <Avatar
                src={userPhoto}
                size={48}
                className="shadow-md object-cover"
              />
              { (
                <div className="overflow-hidden">
                  <h3 className="text-white font-bold text-lg">
                    {name}
                  </h3>
                  <p className="text-gray-300 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {email}
                  </p>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={confirmationLogout}
              className={`w-full flex items-center justify-center gap-x-4 px-2 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
                 "justify-center"
              }`}
            >
              <MdLogout className="text-2xl" />
              {<span className="font-semibold">Log Out</span>}
            </button>
          </div>
        </Sidebar>
      )}

      {/* Desktop Sidebar (only render when not on mobile screen) */}
      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          style={{
            backgroundColor: "#0a4820",
            color: "#fff",
            height: "100vh",
            position: "sticky", // Fix sidebar in place
            top: 0,
            left: 0,
            width: collapsed ? "80px" : "250px", // Adjust width based on collapse state
            zIndex: 1000,
            overflow: "hidden",
            transition: "width 0.3s ease",
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? "#007500" : "#0a4820",
                color: "#fff",
                fontSize: "1em",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#007500",
                  color: "#fff",
                },
              }),
              icon: {
                color: "#fff",
                fontSize: "1.5em",
              },
              label: {
                color: "#fff",
              },
            }}
          >
            <MenuItem
              icon={<FaBars />}
              onClick={toggleSidebar}
              style={{
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              {collapsed ? (
                ""
              ) : (
                <img src={logo} alt="logo" className="w-32   object-cover" />
              )}
            </MenuItem>

            {/* Dynamically render based on role */}
            {menuItems
              .filter((item) => item.roles.includes(role))
              .map((item) => (
                <MenuItem
                  key={item.key}
                  icon={item.icon}
                  component={<Link to={item.to} />}
                  active={isActive(item.to)}
                >
                  {item.label}
                </MenuItem>
              ))}

            {}
          </Menu>

          <div className="px-5 pb-5 space-y-4 border-t border-green-700 absolute bottom-5 w-full">
            {/* User Profile */}
            <div
              className={`flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-md mt-3 ${
                !collapsed && "justify-center"
              }`}
            >
              <Avatar
                src={userPhoto}
                size={!collapsed? 48 : 32}
                className="shadow-md object-cover"
              />
              {!collapsed && (
                <div className="overflow-hidden">
                  <h3 className="text-white font-bold text-lg">
                    {name}
                  </h3>
                  <p className="text-gray-300 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {email}
                  </p>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={confirmationLogout}
              className={`w-full flex items-center justify-center gap-x-4 px-2 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
                !collapsed && "justify-center"
              }`}
            >
              <MdLogout className="text-2xl" />
              {!collapsed && <span className="font-semibold">Log Out</span>}
            </button>
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default AdminSidebar;
