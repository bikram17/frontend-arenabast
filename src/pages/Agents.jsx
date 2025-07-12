import React, { useEffect, useState } from "react";
import { Table, Button,  Space, Input, Modal, Tag, notification, Dropdown } from "antd";
import { GoPlus } from "react-icons/go";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useDispatch,} from "react-redux";
import { deleteUserById, } from "../features/userSlice";
import { getAllAgents } from "../api/userApi";
import dayjs from "dayjs";
import CreateAgent from "./CreateAgent";
import AddWalletBalance from "../components/AddWalletBalance";
import { BsThreeDots } from "react-icons/bs";
import { addWalletBalanceToAdmin } from "../api/walletApi";

const Agents = () => {


  const [isCreate, setIsCreate]=useState(false);
  const dispatch = useDispatch();
  const [alluser, setAllUser]=useState([]);
  const [isWallet, setIsWallet]=useState("");
  const [userInfo, setUserInfo]=useState(null);
  const [walletLoading, setWalletLoading]=useState(false);
  const [balance, setBalance]=useState("");


  const fetchAllAgents=async()=>{
    try {
      const {data}= await getAllAgents();
      if(data.status){
      setAllUser(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
     fetchAllAgents();
  }, []);

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        dispatch(deleteUserById(id))
          .then(() => {
            notification.success({
              message: 'User Deleted',
              description: 'The user has been successfully deleted.',
            });
          })
          .catch(() => {
            notification.error({
              message: 'Delete Failed',
              description: 'An error occurred while trying to delete the user.',
            });
          });
      },
    });
  };


  const handleAddWalletModalOpen = (record) => {
    setIsWallet(true);
    setUserInfo(record);
  };

  const handleAddWalletModalClose=()=>{
    setIsWallet(false);
    setUserInfo(null)
    setBalance("")
  }
  




  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "roleType",
      key: "roleType",
      render: (role) => (
        <Tag color={"green"}>{role}</Tag>
      ),
    },
    {
      title: "Onboarded Date",
      dataIndex: "onboardedDate",
      key: "onboardedDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },

    {
      title: "Admin",
      dataIndex: "onboardedDate",
      render: (text, item) => (
        <div >
           {item.adminName}({item.adminId})
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active) =>
        active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "",
      key: "",
      width: 150,
      render: (text, record) => {
        const items = [
          {
            key: "AddWalletBalance",
            label: (
              <span
               onClick={() => handleAddWalletModalOpen(record)}
              >
                Add Wallet Balance
              </span>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <BsThreeDots className="text-xl text-zinc-600 cursor-pointer" />
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} type="link" />
          <Button
          //  onClick={()=>navigate(`/edit/${record.staff_id}`)}
           icon={<EditOutlined />} type="link" />
          <Button
           onClick={()=>handleDeleteUser(record.staff_id)}
           icon={<DeleteOutlined />} type="link" danger />
        </Space>
      ),
      align: "center",
    },
  ];






  

  const addAdminWalletBalance = async () => {
    setWalletLoading(true);
    try {
       const payload={
        userId: userInfo.id,
        amount: balance,
       }
      const {data}=await addWalletBalanceToAdmin(payload);
      console.log("Data", data)
      if(data.status){
        setWalletLoading(false);
        notification.success({
          message: 'Success',
          description: 'Wallet balance has been added successfully.',
        });
        handleAddWalletModalClose();
      }   
    } catch (error) {
      setWalletLoading(false);
      notification.error({
        message: 'Error',
        description: 'Failed to add wallet balance. Please try again.',
      });
    }
  };

  return (
    <div className=" p-4 md:p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4">
        <h1 className="heading">Manage Users</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={()=>setIsCreate(true)}
            className="green-button flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base"
          >
            <span>
              <GoPlus className="text-lg sm:text-xl" />
            </span>
            <span>Add</span>
          </button>
          <button
            className="green-outline-button flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base"
            // onClick={handleModalOpen}
          >
            <span>
              <GoPlus className="text-lg sm:text-xl" />
            </span>
            <span>Bulk Upload</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-2 md:p-6">
        {/* Search and Excel Upload */}
        <div className="flex flex-col sm:flex-row justify-end items-center mb-4 px-2 gap-2 sm:gap-4">
          {/* Search Input */}
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="w-full sm:w-1/3 rounded-md focus:ring-green-600 focus:border-green-600"
          />
          {/* Excel Export Button */}
          <Button
            className="green-button h-10 w-full sm:w-auto"
            icon={<FileExcelOutlined />}
          >
            Export to Excel
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={alluser}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>

     




      <Modal
        open={isCreate}
        onCancel={()=>setIsCreate(false)}
        footer={null}
        className="rounded-lg shadow-lg p-0 max-w-lg"
        centered
        closable={false}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 text-white rounded-t-lg">
          <h2 className="text-xl font-semibold text-center">Create Agent</h2>
          <p className="text-sm text-center mt-2">
          Fill in the required details below to create a new user account. Ensure all fields are accurate to successfully register the user in the system.
          </p>
        </div>
         <div className="p-6">
          <CreateAgent  fetchAllAgents={fetchAllAgents} setIsCreate={setIsCreate}  />
         </div>

    
      </Modal>

      <AddWalletBalance 
       isWallet={isWallet}
       onClose={handleAddWalletModalClose}
       userInfo={userInfo}
       balance={balance}
       setBalance={setBalance}
       walletLoading={walletLoading}
       addBalance={addAdminWalletBalance}
     />
    </div>
  );
};

export default Agents;
