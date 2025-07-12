import React, { useState } from "react";
import { Input, Button, notification } from "antd";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/authSlice";
import { loginAdmin } from "../api/loginApi";

// Validation schema using Yup
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };


  const getNameForAdmin=(role)=>{

    if(role==="ADMIN"){
      return "Admin"
    }else if(role==="AGENT"){
      return "Agent"
    }else{
      return "Super Admin"
    }
  }

  const handelLoginAdmin = async (values) => {
    try {
      setLoading(true);
      const { data } = await loginAdmin(values);
      if (data.status) {
        setLoading(false);
        Cookies.set("adminToken", data?.data?.accessToken, { expires: 7 });
        dispatch(
          setLogin({
            name: getNameForAdmin(data?.data?.role),
            email: data?.data?.email || "example@gmail.com",
            role: data?.data?.role,
          })
        );
        notification.success({
          message: "Login Successful",
          description: "You have logged in successfully.",
          placement: "topRight",
        });
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      notification.error({
        message: "Login Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during login. Please try again.",
        placement: "topRight",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handelLoginAdmin(values);
    },
  });

  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
    formik;

  return (
    <div className="flex  min-h-screen font-[Poppins] bg-gray-50">
      {/* Left Side */}
      <div className="hidden md:flex-1 bg-gradient-to-br from-green-400 to-green-900 text-white md:flex items-center justify-center p-6 md:p-10">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome to <span className="text-yellow-300">Arena 👋</span>
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-100">
            Manage games, monitor agents, and control betting operations with
            ease. Built for admins and agents with powerful tools and real-time
            control.
          </p>
          <small className="block mt-10 text-sm text-gray-300">
            © {new Date().getFullYear()} Arena. All rights reserved.
          </small>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:flex-1  bg-white flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              
              className="text-green-600 hover:text-green-700 font-medium hover:underline"
            >
              Create a new account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 md:mt-8 flex flex-col gap-5">
            <div>
              <Input
                name="email"
                placeholder="Email address"
                prefix={<MdEmail />}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="py-2"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <Input.Password
                name="password"
                placeholder="Password"
                prefix={<MdLock />}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="py-2"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              icon={<MdLogin />}
              className="bg-green-600 hover:bg-green-700 w-full h-10 font-medium"
              loading={loading}
            >
              Login Now
            </Button>

            <button
              type="button"
              className="flex items-center justify-center border border-gray-200 bg-white px-4 py-3 rounded-lg text-sm cursor-pointer gap-2 text-gray-800 hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </button>

            <div className="text-right text-sm mt-2">
              Forgot password?{" "}
              <Link
                href="#"
                className="text-green-600 font-medium hover:underline hover:text-green-700"
              >
                Reset here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
