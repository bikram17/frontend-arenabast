import React, { useEffect, useState } from "react";
import { Table, Button, Switch, Space, Input, Modal, Upload, Tag, notification } from "antd";
import { GoPlus } from "react-icons/go";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { deleteUserById, } from "../features/userSlice";
import {  getAllPlayers } from "../api/userApi";
import dayjs from "dayjs";
import CreatePlayer from "./CreatePlayer";

const Players = () => {

  const [isCreate, setIsCreate]=useState(false);
  const dispatch = useDispatch();
  const [alluser, setAllUser]=useState([]);


 


  // const handleUpload = (info) => {
  //   console.log("File uploaded:", info.file);
  //   // Add file processing logic here
  // };


  // fetch all users
  const fetchAllPlayers=async()=>{
    try {
      const {data}= await getAllPlayers();
      if(data.status){
      setAllUser(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchAllPlayers();
  }, []);


  // delete users
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

  

  // Function to handle the switch state change
  const handleStatusChange = (id, checked) => {
    console.log(`Staff ID: ${id}, Active: ${checked}`);
    // Update logic for the switch state can be added here, e.g., making an API call
  };



  const columns = [
    {
      title: "Player ID",
      dataIndex: "playerId",
      key: "playerId",
    },
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => address || "-",
    },
    {
      title: "Assigned Agent",
      dataIndex: "agentName",
      key: "agentName",
    },
    {
      title: "Assigned Admin",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (dob) => (dob ? dayjs(dob).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Last Login",
      dataIndex: "playerLastLoginDate",
      key: "playerLastLoginDate",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "-"),
    },
    {
      title: "Onboarded Date",
      dataIndex: "onboardedDate",
      key: "onboardedDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active) =>
        active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} type="link" />
          <Button
            // onClick={() => navigate(`/edit/${record.id}`)}
            icon={<EditOutlined />}
            type="link"
          />
          <Button
            onClick={() => handleDeleteUser(record.id)}
            icon={<DeleteOutlined />}
            type="link"
            danger
          />
        </Space>
      ),
      align: "center",
    },
  ];
  


  


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
          <h2 className="text-xl font-semibold text-center">Create Player</h2>
          <p className="text-sm text-center mt-2">
          Fill in the required details below to create a new user account. Ensure all fields are accurate to successfully register the user in the system.
          </p>
        </div>
         <div className="p-6">
          <CreatePlayer fetchAllPlayers={fetchAllPlayers} setIsCreate={setIsCreate} />
         </div>

    
      </Modal>
    </div>
  );
};

export default Players;
