import { Button } from 'antd'
import { FaArrowUp, FaArrowRight } from 'react-icons/fa'
import LazyImage from './LazyImage'
import walletImage from '../assets/wallletImage.jpg' // adjust the path

const QuickActions = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-md space-y-6">
      {/* Wallet Balance */}
      <div className="text-center">
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <h2 className="text-3xl font-bold text-green-700">$12,450.00</h2>
      </div>

      {/* Wallet Image */}
      <div className="flex justify-center">
        <LazyImage src={walletImage} alt="walletImage" className="w-64 object-contain" />
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
          type="default"
          icon={<FaArrowRight />}
          className="flex-1 bg-zinc-700 border-gray-300 text-white hover:border-green-600 hover:text-green-600"
          size="large"
        >
          Self Transfer
        </Button>
      </div>
    </div>
  )
}

export default QuickActions
