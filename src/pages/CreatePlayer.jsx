import React, { useEffect, useState } from "react";
import { Input, Select, Button, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createPlayer,
  getAdminAndAgents,
  getAllAdmins,
  getAllAgents,
} from "../api/userApi";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  agentId: Yup.string().required("Agent selection is required"),
  adminId: Yup.string().required("Admin selection is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  phone: Yup.string(),
  address: Yup.string(),
});

const CreatePlayer = ({
  fetchAllPlayers,
  setIsCreate,
}) => {
  const [loading, setLoading] = useState(false);
  const [allAdminWithAgent, setAllAdminWithAgent] = useState([]);
  const [agentsForSelectedAdmin, setAgentsForSelectedAdmin] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      agentId: "",
      adminId: "",
      phone: "",
      address: "",
      dateOfBirth: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { status } = await createPlayer(values);
        if (status === 200 || status === 201) {
          notification.success({
            message: "User Created",
            description: "The user has been created successfully.",
          });
          setIsCreate(false);
          fetchAllPlayers();
        } else {
          notification.error({
            message: "Creation Failed",
            description: "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Error",
          description: "An error occurred during user creation.",
        });
      } finally {
        setLoading(false);
      }
    },
  });



  const fetchAllAdminsWithAgents = async () => {
    try {
      const { data } = await getAdminAndAgents();
      if (data.status) {
        setAllAdminWithAgent(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllAdminsWithAgents();
  }, []);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  const handleAdminChange = (value) => {
    setFieldValue("adminId", value);
    setFieldValue("agentId", undefined); // reset previous agentId

    const selectedAdmin = allAdminWithAgent.find(
      (admin) => admin.adminId === value
    );

    if (selectedAdmin) {
      const agents = selectedAdmin.agents || [];
      setAgentsForSelectedAdmin(agents);

      if (agents.length === 1) {
        // auto-select if only one agent
        setFieldValue("agentId", agents[0].agentId);
      }
    } else {
      setAgentsForSelectedAdmin([]);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <Input
            name="name"
            placeholder="Enter name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.name && errors.name ? "error" : ""}
          />
          {touched.name && errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block mb-1">Date of Birth</label>
          <Input
            type="date"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.dateOfBirth && errors.dateOfBirth ? "error" : ""}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <Input
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.email && errors.email ? "error" : ""}
          />
          {touched.email && errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <Input.Password
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.password && errors.password ? "error" : ""}
          />
          {touched.password && errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <Input
            name="phone"
            placeholder="Enter phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.phone && errors.phone ? "error" : ""}
          />
          {touched.phone && errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div>
          <label className="block mb-1">address</label>
          <Input
            name="address"
            placeholder="Enter address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            status={touched.address && errors.address ? "error" : ""}
          />
          {touched.address && errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>

        {/* Admin Dropdown */}
        <div>
          <label className="block mb-1">Select Admin</label>
          <Select
            name="adminId"
            value={values.adminId}
            onChange={handleAdminChange}
            onBlur={handleBlur}
            placeholder="Select an admin"
            size="large"
            className="w-full"
            allowClear
            showSearch
            optionFilterProp="children"
            status={touched.adminId && errors.adminId ? "error" : ""}
          >
            {allAdminWithAgent.map((admin) => (
              <Option key={admin.adminId} value={admin.adminId}>
                {admin.adminName}
              </Option>
            ))}
          </Select>
          {touched.adminId && errors.adminId && (
            <span className="text-red-500 text-sm">{errors.adminId}</span>
          )}
        </div>

         <div>
         <label className="block mb-1">Select Agent</label>
         <Select
          name="agentId"
          value={values.agentId}
          onChange={(value) => formik.setFieldValue("agentId", value)}
          onBlur={handleBlur}
          placeholder="Select an Agent"
          size="large"
          className="w-full"
          allowClear
          showSearch
          optionFilterProp="children"
          status={touched.agentId && errors.agentId ? "error" : ""}
          disabled={!agentsForSelectedAdmin.length} // disable if no agents
        >
          {agentsForSelectedAdmin.map((agent) => (
            <Option key={agent.agentId} value={agent.agentId}>
              {agent.agentName}
            </Option>
          ))}
        </Select>
        {touched.agentId && errors.agentId && (
            <span className="text-red-500 text-sm">{errors.agentId}</span>
          )}
         </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="green-button h-10 w-full sm:w-auto"
          >
            Create Player
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayer;
