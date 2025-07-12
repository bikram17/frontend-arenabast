import LazyImage from './LazyImage'
import moneyMenImage from '../assets/boy.png'

const WalletHeader = () => (
  <div className="bg-gradient-to-r from-green-900 to-green-400 p-6 rounded-xl shadow-md text-white">
    <div className="flex justify-between items-center gap-6">
      
      {/* Left - Profile Image */}
      <LazyImage src={moneyMenImage} alt="User Profile" className="object-cover w-28" />

      {/* Right - Balance Info */}
      <div>
        <p className="text-sm text-white/80">Available Balance</p>
        <h1 className="text-4xl font-extrabold tracking-wide mt-1">$673,412.66</h1>
        <p className="text-sm text-white/70 mt-2">Welcome back, <span className="font-medium">William Fayson</span></p>
      </div>
    </div>
  </div>
)

export default WalletHeader
