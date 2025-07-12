import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { name } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          🎮 {name} Dashboard
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl">
          Welcome to the Gaming & Betting Admin Panel. Monitor user activity,
          manage games and bets, handle transactions, and keep your platform
          running smoothly. Use the sidebar to navigate through reports, user
          management, and system settings.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
