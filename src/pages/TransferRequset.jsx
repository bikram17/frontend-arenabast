import React, { useEffect } from 'react'
import { getallTransferUserRequest } from '../api/transferApi';

const TransferRequset = () => {

   

  useEffect (()=>{

    const fetchTransferReq=async()=>{
    try {
       const {status}=await getallTransferUserRequest();
       if(status===200){

       }
    } catch (error) {
      
    }
    }

    fetchTransferReq();

  },[])


  // const columns = [
  //   {
  //     title: 'Staff ID',
  //     dataIndex: 'staff_id',
  //     key: 'staff_id',
  //   },
  //   {
  //     title: 'Full Name',
  //     dataIndex: 'F_name',
  //     key: 'F_name',
  //     render: (text, record) => `${record.F_name} ${record.L_name}`,
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: 'Phone',
  //     dataIndex: 'phone',
  //     key: 'phone',
  //   },
  //   {
  //     title: 'Designation',
  //     dataIndex: 'designation',
  //     key: 'designation',
  //   },
  //   {
  //     title: 'Cadre',
  //     dataIndex: 'cadre',
  //     key: 'cadre',
  //   },
  //   {
  //     title: 'Active Status',
  //     dataIndex: 'active_status',
  //     key: 'active_status',
  //     render: (status) => (status === 0 ? 'Inactive' : 'Active'),
  //   },
  //   {
  //     title: 'Transferable',
  //     dataIndex: 'transferable',
  //     key: 'transferable',
  //     render: (transferable) => (transferable === 1 ? 'Yes' : 'No'),
  //   },
  //   {
  //     title: 'Created At',
  //     dataIndex: 'created_at',
  //     key: 'created_at',
  //   },
  //   {
  //     title: 'Updated At',
  //     dataIndex: 'updated_at',
  //     key: 'updated_at',
  //   },
  // ];
  


  return (
    <div 
    >
      <div className='bg-white rounded-md shadow-sm p-4'>

      </div>
    </div>
  )
}

export default TransferRequset