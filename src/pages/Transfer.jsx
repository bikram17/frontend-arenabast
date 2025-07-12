import React, { useEffect } from "react";
import { Table, Button, Switch, Input, Tag} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/userSlice";
import { TbTransfer } from "react-icons/tb";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Function to handle the switch state change
  const handleStatusChange = (id, checked) => {
    console.log(`Staff ID: ${id}, Active: ${checked}`);
    // Update logic for the switch state can be added here, e.g., making an API call
  };


  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staff_id",
      key: "staff_id",
    },
    {
      title: "IPPIS No",
      dataIndex: "ippis_no",
      key: "ippis_no",
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
      title: "Active",
      dataIndex: "active_status",
      key: "active_status",
      render: (isActive, record) => (
        <Switch
          checked={isActive === true}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: "Transferable",
      dataIndex: "transferable",
      key: "transferable",
      render: (transferable) => (
        <Tag color={transferable === true ? "green" : "blue"}>
          {transferable === true ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Grade Level",
      dataIndex: "grade_level",
      key: "grade_level",
      render: (grade) => (grade ? grade : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button icon={<TbTransfer/>} className="green-button" > 
          Transfer
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className=" p-4 md:p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4">
        <h1 className="heading">Transfer Users</h1>
  
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
        </div>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>

    </div>
  );
};

export default Users;
