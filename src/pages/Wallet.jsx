import React from 'react'
import WalletHeader from '../components/WalletHeader'
import WalletChart from '../components/WalletChart'
import WalletActions from '../components/WalletActions'
import TransactionList from '../components/TransactionList'

const Wallet = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <WalletHeader />
         
          <TransactionList />
        </div>
        <div>
          <WalletActions />
          <WalletChart />
        </div>
      </div>
    </div>
  )
}

export default Wallet
