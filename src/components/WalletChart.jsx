import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const WalletChart = () => {

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Income',
        data: [300, 400, 300, 500, 450, 600, 700],
        borderColor: '#10B981',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Expense',
        data: [200, 300, 250, 400, 300, 450, 500],
        borderColor: '#EF4444',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  }

  const options = {
    plugins: { legend: { display: true } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 100 } },
    },
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Weekly Summary</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default WalletChart
