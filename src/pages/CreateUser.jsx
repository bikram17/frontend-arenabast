import React, { useState } from "react";
import { Input, Button, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../api/userApi";




const validationSchema = Yup.object({
  name: Yup.string()
  .required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const CreateUser = ({
  setIsCreate,
  fetchAllAdmins,
}) => {

  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { status } = await createUser(values);
        if (status === 200 || status === 201) {
          notification.success({
            message: "Created Admin",
            description: "The admin has been created successfully.",
          });
          fetchAllAdmins();
          setIsCreate(false);
         
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

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formik;

  


  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4">
        
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



        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="green-button h-10 w-full sm:w-auto"
          >
            Create Admin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
