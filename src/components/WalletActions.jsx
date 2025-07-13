import { Button, notification } from "antd";
import { FaArrowUp, FaArrowRight } from "react-icons/fa";
import LazyImage from "./LazyImage";
import walletImage from "../assets/wallletImage.jpg"; // adjust the path
import { useSelector } from "react-redux";
import { adminSelfTransfer } from "../api/walletApi";
import { useState } from "react";
import AddWalletBalance from "./AddWalletBalance";

const QuickActions = ({walletBalance}) => {
  const { name, email , id} = useSelector((state) => state.auth);
  const [walletLoading, setWalletLoading] = useState(false);
  const [isWallet, setIsWallet]=useState(false);
  const [balance, setBalance]=useState("");
  const [userInfo, setUserInfo]=useState({
    name:name,
    email:email,
    id:id
  })

  // self transfer 
  const addSelfTransfer = async () => {
    setWalletLoading(true);
    try {
      const payload = {
        userId: userInfo.id,
        amount: balance,
      };
      const { data } = await adminSelfTransfer(payload);
      console.log("Data", data);
      if (data.status) {
        setWalletLoading(false);
        notification.success({
          message: "Success",
          description: "Wallet balance has been added successfully.",
        });
        handleAddWalletModalClose();
      }
    } catch (error) {
      setWalletLoading(false);
      notification.error({
        message: "Error",
        description: "Failed to add wallet balance. Please try again.",
      });
    }
  };

  


  const handleAddWalletModalOpen = () => {
    setIsWallet(true);
     
  };

  const handleAddWalletModalClose=()=>{
    setIsWallet(false);
    setBalance("")
    setUserInfo(null)
  }
  

  return (
    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-md space-y-6">
      {/* Wallet Balance */}
      <div className="text-center">
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <h2 className="text-3xl font-bold text-green-700">${walletBalance}</h2>
      </div>

      {/* Wallet Image */}
      <div className="flex justify-center">
        <LazyImage
          src={walletImage}
          alt="walletImage"
          className="w-64 object-contain"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          type="primary"
          icon={<FaArrowUp />}
          className="flex-1 bg-green-600 hover:bg-green-700"
          size="large"
        >
          Send Money
        </Button>

        <Button
          onClick={handleAddWalletModalOpen}
          type="default"
          icon={<FaArrowRight />}
          className="flex-1 bg-zinc-700 border-gray-300 text-white hover:border-green-600 hover:text-green-600"
          size="large"
        >
          Self Transfer
        </Button>
      </div>

      <AddWalletBalance
       isWallet={isWallet}
       onClose={handleAddWalletModalClose}
       userInfo={userInfo}
       balance={balance}
       setBalance={setBalance}
       walletLoading={walletLoading}
       addBalance={addSelfTransfer}
     />
    </div>
  );
};

export default QuickActions;
