import React from 'react'
import { Table, Tag } from 'antd'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const transactions = [
  { name: 'Angela Moss', date: 'July 10, 2025', amount: '+$1,200', type: 'income' },
  { name: 'Popo Store', date: 'July 9, 2025', amount: '-$450', type: 'expense' },
  { name: 'John Smith', date: 'July 8, 2025', amount: '+$2,350', type: 'income' },
  { name: 'Amazon Purchase', date: 'July 7, 2025', amount: '-$789', type: 'expense' },
  { name: 'Freelance Project', date: 'July 6, 2025', amount: '+$3,200', type: 'income' },
  { name: 'Netflix', date: 'July 5, 2025', amount: '-$15', type: 'expense' },
  { name: 'Upwork Payment', date: 'July 4, 2025', amount: '+$1,500', type: 'income' },
  { name: 'Zara Store', date: 'July 3, 2025', amount: '-$240', type: 'expense' },
  { name: 'Client Transfer', date: 'July 2, 2025', amount: '+$4,100', type: 'income' },
  { name: 'Utility Bill', date: 'July 1, 2025', amount: '-$320', type: 'expense' },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span className="font-medium text-gray-800">{text}</span>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <span className="text-gray-500 text-sm">{text}</span>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => (
      <Tag
        color={type === 'income' ? 'green' : 'red'}
        className="text-sm px-3 py-1 rounded-full flex items-center gap-1 w-full xl:w-[60%]"
      >
        <span className="flex items-center gap-1">
          {type === 'income' ? (
            <FaArrowDown className="green" />
          ) : (
            <FaArrowUp className="red" />
          )}
          <span>{type === 'income' ? 'Credit' : 'Debit'}</span>
        </span>
      </Tag>
    ),
  },
  
  
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (text, record) => (
      <span
        className={`font-bold  ${
          record.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {text}
      </span>
    ),
  },
]

const TransactionList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Last 10 Transactions</h2>
      <Table
        columns={columns}
        dataSource={transactions}
        pagination={false}
        rowKey={(record, index) => index}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  )
}

export default TransactionList
