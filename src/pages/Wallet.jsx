import React from 'react'
import WalletHeader from '../components/WalletHeader'
import WalletChart from '../components/WalletChart'
import WalletActions from '../components/WalletActions'
import TransactionList from '../components/TransactionList'
import { useSelector } from 'react-redux'

const Wallet = () => {
  const {walletBalance ,name} = useSelector((state) => state.auth);
  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Section (Header + Transactions) */}
        <div className="lg:col-span-2 space-y-4">
          <WalletHeader walletBalance={walletBalance.toFixed(2)} userName={name} />
          <TransactionList  />
        </div>

        {/* Right Section (Actions + Chart) */}
        <div className="space-y-4">
          <WalletActions walletBalance={walletBalance.toFixed(2)} />
          <WalletChart />
        </div>
      </div>
    </div>
  )
}

export default Wallet
