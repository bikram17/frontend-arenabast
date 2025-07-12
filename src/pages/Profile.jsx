import React from "react";
import { Tabs, Input, Button, Upload, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Profile = () => {
    const { fname, mname, lname, email, } = useSelector((state) => state.auth);
    const { TabPane } = Tabs;

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-green-600 mb-4">Edit Profile</h1>
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Profile Picture */}
                    <div className="flex flex-col items-center w-full md:w-1/3 border-b md:border-r md:border-b-0 md:pr-4 mb-4 md:mb-0">
                        <Avatar
                            size={128}
                            icon={<UserOutlined />}
                            className="bg-green-200 mb-2"
                        />
                        <span className="text-green-600 font-bold text-lg">Owner</span>
                        <p className="text-gray-600 mt-2">{email}</p>
                    </div>

                    {/* Right Side: Tabs */}
                    <div className="flex-1 md:pl-6">
                        <Tabs defaultActiveKey="1" className="ant-tabs-green">
                            {/* Personal Info Tab */}
                            <TabPane tab="Personal Info" key="1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700">First Name</label>
                                        <Input value={fname} placeholder="Admin" className="border-green-500" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Middle Name</label>
                                        <Input value={mname} placeholder="Enter Your Middle Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Last Name</label>
                                        <Input value={lname} placeholder="Enter Your Last Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Email</label>
                                        <Input value={email} disabled />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Upload>
                                        <Button icon={<UploadOutlined />} className="bg-green-500 text-white">
                                            Choose file here
                                        </Button>
                                    </Upload>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Please upload a valid image file. Size of image should not
                                        be more than 2MB.
                                    </p>
                                </div>
                                <Button
                                    type="primary"
                                    className="mt-6 bg-green-500 border-green-500 hover:bg-green-600"
                                >
                                    Save Changes
                                </Button>
                            </TabPane>

                            {/* Change Password Tab */}
                            <TabPane tab="Change Password" key="2">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-gray-700">Old Password</label>
                                        <Input.Password placeholder="Enter Old Password" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">New Password</label>
                                        <Input.Password placeholder="Enter New Password" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Confirm Password</label>
                                        <Input.Password placeholder="Confirm New Password" />
                                    </div>
                                </div>
                                <Button
                                    type="primary"
                                    className="mt-6 bg-green-500 border-green-500 hover:bg-green-600"
                                >
                                    Change Password
                                </Button>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
