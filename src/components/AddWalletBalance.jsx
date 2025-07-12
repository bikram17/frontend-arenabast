import { Button, Modal } from "antd";
import React from "react";
import LazyImage from "./LazyImage";
import userIcon from "../assets/userIcon.png";
import { RxCross2 } from "react-icons/rx";

const AddWalletBalance = ({
  isWallet,
  onClose,
  userInfo,
  balance,
  setBalance,
  walletLoading,
  addBalance,
}) => {
  return (
    <Modal
      open={isWallet}
      onCancel={onClose}
      title={null}
      width={450}
      centered
      footer={null}
      closable={false}
      maskClosable={false}
      modalRender={(modal) => {
        return React.cloneElement(modal, {
          style: {
            ...modal.props.style,
            borderRadius: 12,
            padding: 0,
          },
        });
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center py-4 px-6 bg-green-700 rounded-t-lg">
        <h1 className="text-white font-semibold text-lg">
          Add Balance to Account
        </h1>
        <span
          onClick={onClose}
          className="text-white hover:text-gray-200 font-semibold text-2xl cursor-pointer"
        >
          <RxCross2 />
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">
        {/* User Info */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full border-[3px] border-green-700 overflow-hidden shadow-lg">
            <LazyImage
              className="w-full  object-cover"
              src={userIcon}
              alt="ProfileImage"
              // fallbackImage={noProfileImg}
            />
          </div>
          <h2 className="text-zinc-800 text-xl font-semibold">
            {userInfo?.name}
          </h2>
          <span className="text-zinc-500 text-sm -mt-3">{userInfo?.email}</span>
        </div>

        {/* Add Balance Form */}
        <div className="mt-6 space-y-4">
          {/* Balance Input */}
          <div>
            <label
              htmlFor="balance"
              className="text-zinc-700 font-medium block mb-2"
            >
              Balance Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-zinc-500">
                ₹
              </span>
              <input
                id="balance"
                type="number"
                min="0"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full h-12 pl-10 pr-4 border-[1px] border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            loading={walletLoading}
            onClick={addBalance}
            disabled={!balance || parseFloat(balance) <= 0 || walletLoading}
            className="w-full h-12 rounded-lg bg-green-700 text-white font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Balance
          </Button>

          <button
            onClick={onClose}
            className="w-full h-12 rounded-lg border-[2px] border-green-700 text-green-700 font-medium hover:bg-green-50 focus:ring-2 focus:ring-green-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddWalletBalance;
