import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "../api/walletApi";
import { setWalletBalance } from "../features/authSlice";

const Dashboard = () => {
  const {name} = useSelector((state) => state.auth);
  const dispatch=useDispatch();
   
  useEffect(()=>{

    // fetch wallet balance 
    const fetchWalletBalance=async()=>{
      try {
        const {data}=await getWalletBalance();
        if(data.status){
          dispatch(setWalletBalance(data?.data.currentBalance))
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchWalletBalance()

  },[dispatch])



  return (
    <div className="min-h-screen p-6 flex justify-center items-center">
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
