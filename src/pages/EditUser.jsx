import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker, Button, notification, Modal } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { getByDetails, updateUser } from "../api/userApi";
import { RxCross2 } from "react-icons/rx";
const { Option } = Select;

const validationSchema = Yup.object({
  staff_id: Yup.string(),

  //   ippis_no: Yup.string()
  //     .required("IPPIS number is required")
  //     .matches(/^\d{6}$/, "IPPIS number must be exactly 6 digits"),

  f_Name: Yup.string()
    .required("First name is required")
    .max(50, "First name must not exceed 50 characters"),

  m_Name: Yup.string()
    .optional()
    .max(50, "Middle name must not exceed 50 characters"),

  l_Name: Yup.string()
    .required("Last name is required")
    .max(50, "Last name must not exceed 50 characters"),


  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),



  job_Title: Yup.string()
    .required("Job Title is required")
    .max(100, "Job Title must not exceed 100 characters"),

  designation: Yup.string()
    .required("Designation is required")
    .max(100, "Designation must not exceed 100 characters"),

  cadre: Yup.string()
    .required("Cadre is required")
    .max(50, "Cadre must not exceed 50 characters"),

  date_of_current_posting: Yup.date()
    .required("Date of current posting is required")
    .typeError("Invalid date format"),

  date_of_MDA_posting: Yup.date()
    .required("Date of MDA posting is required")
    .typeError("Invalid date format"),

  date_of_last_promotion: Yup.date()
    .required("Date of last promotion is required")
    .typeError("Invalid date format"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(
      ["male", "female", "other"],
      "Gender must be one of 'male', 'female', or 'other'"
    ),


  recovery_email: Yup.string()
    .required("Recovery email is required")
    .email("Enter a valid recovery email address"),

  grade_level: Yup.string()
    .required("Grade level is required")
    .matches(
      /^(1[0-9]|20|[1-9])$/,
      "Grade level must be a number between 1 and 20"
    ),
});

const generateStaffId = () => {
  return `STAFF${Math.floor(100000 + Math.random() * 900000)}`;
};

const EditUser = () => {
  // Initial values for the form fields

  const { id } = useParams();

  const [staffId, setStaffId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState({
    total_user: 0,
    total_department: 0,
    employee_performance_rating_by_grade_level: 0,
    employee_performance_rating_score_by_department: 0,
    top_30_employees_by_performance_rating: 0,
    bottom_30_employees_by_performance_rating: 0,
    report_on_overall_training_needs: 0,
    report_on_training_needs_by_department: 0,
    report_on_employees_percentage_distribution: 0,
  });

  const menuItems = [
    { key: "total_user", label: "Total User" },
    { key: "total_department", label: "Total Department" },
    {
      key: "employee_performance_rating_by_grade_level",
      label: "Employee Performance Rating By Grade Level",
    },
    {
      key: "employee_performance_rating_score_by_department",
      label: "Employee Performance Rating Score By Department",
    },
    {
      key: "top_30_employees_by_performance_rating",
      label: "Top 30 Employees By Performance Rating",
    },
    {
      key: "bottom_30_employees_by_performance_rating",
      label: "Bottom 30 Employees By Performance Rating",
    },
    {
      key: "report_on_overall_training_needs",
      label: "Report On Overall Training Needs",
    },
    {
      key: "report_on_training_needs_by_department",
      label: "Report On Training Needs By Department",
    },
    {
      key: "report_on_employees_percentage_distribution",
      label: "Report On Employees Percentage Distribution",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setStaffId(generateStaffId());
  }, []);

  const initialValues = {
    staff_id: staffId,
    ippis_no: "",
    f_Name: "",
    m_Name: "",
    l_Name: "",
    email: "",
    phone: "",
    job_Title: "",
    designation: "",
    cadre: "",
    date_of_current_posting: null,
    date_of_MDA_posting: null,
    date_of_last_promotion: null,
    gender: "",
    organization: "Federal Ministry of Education",
    recovery_email: "",
    grade_level: "",
    permission: null,
  };

  const handleCreateUser = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        staff_id: staffId,
        date_of_current_posting: dayjs(values.date_of_current_posting).format(
          "DD/MM/YYYY"
        ),
        date_of_MDA_posting: dayjs(values.date_of_MDA_posting).format(
          "DD/MM/YYYY"
        ),
        date_of_last_promotion: dayjs(values.date_of_last_promotion).format(
          "DD/MM/YYYY"
        ),
        permission: permissions,
      };

      const { status } = await updateUser(id, payload);

      if (status === 201 || status === 200) {
        setLoading(false);
        notification.success({
          message: "Update Created Successfully",
          description: "The user has been update successfully.",
        });
        navigate(`/users`);
      } else {
        setLoading(false);
        notification.error({
          message: "Update Creation Failed",
          description: "There was an issue creating the user.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification.error({
        message: "Error Occurred",
        description: "Something went wrong while creating the user.",
      });
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleCreateUser(values);
    },
  });

  // Destructure Formik's properties for easier use
  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;

  useEffect(() => {
    const getDetailsUser = async () => {
      try {
        const { data, status } = await getByDetails(id);
        if (status === 200) {
          console.log(data?.data);

          // Extract the user data
          const user = data?.data[0];

          const formatDate = (date) => {
            const parsedDate = dayjs(date);
            return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : "";
          };


          formik.setValues({
            ippis_no: user?.ippis_no || "",
            f_Name: user?.f_name || "",
            m_Name: user.m_name || "",
            l_Name: user.l_name || "",
            email: user.email || "",
            phone: user.phone || "",
            job_Title: user.job_title || "",
            designation: user.designation || "",
            cadre: user.cadre || "",
            date_of_current_posting: formatDate(user.date_of_current_posting),
            date_of_MDA_posting: formatDate(user.date_of_MDA_posting),
            date_of_last_promotion: formatDate(user.date_of_last_promotion),
            gender: user.gender || "",
            organization: user.organization || "Federal Ministry of Education",
            grade_level: user.grade_level || "",
            recovery_email: user.recovery_email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getDetailsUser();
  }, [id]);

  // Handle checkbox change
  const handlePermissionChange = (key) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [key]: prevPermissions[key] === 1 ? 0 : 1,
    }));
  };

  // Save Permissions
  const savePermissions = () => {
    console.log("Updated Permissions:", permissions);
    setIsAdmin(false);
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 pb-4">
          <Link to={"/users"} className="heading">
            <IoMdArrowRoundBack className="text-3xl" />
          </Link>
          <h1 className="heading">Edit User</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-sm p-4"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1">IPPIS Number</label>
              <Input
                disabled
                name="ippis_no"
                value={values.ippis_no}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.ippis_no && errors.ippis_no ? "error" : ""}
                placeholder="Enter IPPIS Number"
              />

              {touched.ippis_no && errors.ippis_no ? (
                <span className="text-red-500 text-sm">{errors.ippis_no}</span>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Staff Id</label>
              <Input value={staffId} disabled />
            </div>

            {/* Row 2 */}
            <div>
              <label className="block mb-1">First Name</label>
              <Input
                name="f_Name"
                value={values.f_Name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.f_Name && errors.f_Name ? "error" : ""}
                placeholder="Enter First Name"
              />
              {touched.f_Name && errors.f_Name ? (
                <span className="text-red-500 text-sm">{errors.f_Name}</span>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Middle Name</label>
              <Input
                name="m_Name"
                value={values.m_Name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.m_Name && errors.m_Name ? "error" : ""}
                placeholder="Enter Middle Name"
              />

              {touched.m_Name && errors.m_Name ? (
                <span className="text-red-500 text-sm">{errors.m_Name}</span>
              ) : null}
            </div>

            {/* Row 3 */}
            <div>
              <label className="block mb-1">Last Name</label>
              <Input
                name="l_Name"
                value={values.l_Name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.l_Name && errors.l_Name ? "error" : ""}
                placeholder="Enter Last Name"
              />
              {touched.l_Name && errors.l_Name ? (
                <span className="text-red-500 text-sm">{errors.l_Name}</span>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">E-Mail Address</label>
              <Input
                disabled
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.email && errors.email ? "error" : ""}
                placeholder="Enter E-Mail Address"
                type="email"
              />
              {touched.email && errors.email ? (
                <span className="text-red-500 text-sm">{errors.email}</span>
              ) : null}
            </div>

            {/* Row 4 */}
            <div>
              <label className="block mb-1">Phone Number</label>
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.phone && errors.phone ? "error" : ""}
                placeholder="Enter Phone Number"
                type="tel"
              />

              {touched.phone && errors.phone ? (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              ) : null}
            </div>


            {/* Row 5 */}
            <div>
              <label className="block mb-1">Job Title</label>
              <Input
                name="job_Title"
                value={values.job_Title}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.job_Title && errors.job_Title ? "error" : ""}
                placeholder="Enter Job Title"
              />
              {touched.job_Title && errors.job_Title ? (
                <span className="text-red-500 text-sm">{errors.job_Title}</span>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Designation</label>
              <Input
                placeholder="Enter Designation"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.designation && errors.designation ? "error" : ""
                }
              />

              {touched.designation && errors.designation ? (
                <span className="text-red-500 text-sm">
                  {errors.designation}
                </span>
              ) : null}
            </div>

            {/* Row 6 */}
            <div>
              <label className="block mb-1">Cadre</label>
              <Input
                placeholder="Enter Cadre"
                name="cadre"
                value={values.cadre}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.cadre && errors.cadre ? "error" : ""}
              />

              {touched.cadre && errors.cadre ? (
                <span className="text-red-500 text-sm">{errors.cadre}</span>
              ) : null}
            </div>

            <div>
              <label className="block mb-1">Date of Current Posting</label>
              <DatePicker
                name="date_of_current_posting"
                value={
                  values.date_of_current_posting
                    ? dayjs(values.date_of_current_posting, "DD/MM/YYYY")
                    : null
                }
                onChange={(date) =>
                  setFieldValue(
                    "date_of_current_posting",
                    date ? date.format("DD/MM/YYYY") : ""
                  )
                }
                onBlur={handleBlur}
                status={
                  touched.date_of_current_posting &&
                    errors.date_of_current_posting
                    ? "error"
                    : ""
                }
                className="w-full"
                format="DD/MM/YYYY"
              />
              {touched.date_of_current_posting &&
                errors.date_of_current_posting ? (
                <span className="text-red-500 text-sm">
                  {errors.date_of_current_posting}
                </span>
              ) : null}
            </div>

            {/* Row 7 */}
            <div>
              <label className="block mb-1">Date of MDA Posting</label>
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                name="date_of_MDA_posting"
                value={
                  values.date_of_MDA_posting
                    ? dayjs(values.date_of_MDA_posting, "DD/MM/YYYY")
                    : null
                }
                onChange={(date) =>
                  setFieldValue(
                    "date_of_MDA_posting",
                    date ? date.format("DD/MM/YYYY") : ""
                  )
                }
                onBlur={handleBlur}
                status={
                  touched.date_of_MDA_posting && errors.date_of_MDA_posting
                    ? "error"
                    : ""
                }
              />

              {touched.date_of_MDA_posting && errors.date_of_MDA_posting ? (
                <span className="text-red-500 text-sm">
                  {errors.date_of_MDA_posting}
                </span>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Date of Last Promotion</label>
              <DatePicker
                name="date_of_last_promotion"
                value={
                  values.date_of_last_promotion
                    ? dayjs(values.date_of_last_promotion, "DD/MM/YYYY")
                    : null
                }
                onChange={(date) =>
                  setFieldValue(
                    "date_of_last_promotion",
                    date ? date.format("DD/MM/YYYY") : ""
                  )
                }
                onBlur={handleBlur}
                status={
                  touched.date_of_last_promotion &&
                    errors.date_of_last_promotion
                    ? "error"
                    : ""
                }
                className="w-full"
                format="DD/MM/YYYY"
              />
              {touched.date_of_last_promotion &&
                errors.date_of_last_promotion ? (
                <span className="text-red-500 text-sm">
                  {errors.date_of_last_promotion}
                </span>
              ) : null}
            </div>

            {/* Row 8 */}
            <div>
              <label className="block mb-1">Gender</label>
              <Select
                name="gender"
                value={values.gender}
                onChange={(date) => setFieldValue("gender", date)}
                onBlur={handleBlur}
                status={touched.gender && errors.gender ? "error" : ""}
                className="w-full"
                placeholder="Select Gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>

              {touched.gender && errors.gender ? (
                <span className="text-red-500 text-sm">{errors.gender}</span>
              ) : null}
            </div>

            <div>
              <label className="block mb-1">Grade Level</label>
              <Select
                name="grade_level"
                value={values.grade_level}
                onChange={(date) => setFieldValue("grade_level", date)}
                onBlur={handleBlur}
                status={
                  touched.grade_level && errors.grade_level ? "error" : ""
                }
                className="w-full"
                placeholder="Select Grade Level"
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <Option key={i + 1} value={`${i + 1}`}>
                    {`Level-${i + 1}`}
                  </Option>
                ))}
              </Select>

              {touched.grade_level && errors.grade_level ? (
                <span className="text-red-500 text-sm">
                  {errors.grade_level}
                </span>
              ) : null}
            </div>

            {/* Row 9 */}
            <div>
              <label className="block mb-1">Organization</label>
              <Input
                name="organization"
                value={values.organization}
                onBlur={handleBlur}
                status={
                  touched.grade_level && errors.grade_level ? "error" : ""
                }
                disabled
              />
            </div>


            {/* Row 10 */}
            <div>
              <label className="block mb-1">Recovery Email</label>
              <Input
                name="recovery_email"
                value={values.recovery_email}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.recovery_email && errors.recovery_email ? "error" : ""
                }
                placeholder="Enter Recovery Email"
                type="email"
              />

              {touched.recovery_email && errors.recovery_email ? (
                <span className="text-red-500 text-sm">
                  {errors.recovery_email}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end py-4 items-center gap-2">
            <Button
              onClick={() => formik.resetForm()}
              className="green-outline-button w-[20%] sm:w-[10%] h-9"
            >
              <span>Cancel</span>
            </Button>
            <Button
              loading={loading}
              htmlType="submit"
              className="green-button w-[20%] sm:w-[10%] h-9"
            >
              <span>Save</span>
            </Button>
          </div>
        </form>
      </div>

      <Modal
        open={isAdmin}
        onCancel={() => setIsAdmin(false)}
        title={null}
        width={400}
        centered
        footer={null}
        closable={false}
        maskClosable={false}
        modalRender={(modal) => {
          return React.cloneElement(modal, {
            style: {
              ...modal.props.style,
              ...{ borderRadius: 10, padding: 0 },
            },
          });
        }}
      >
        <div className="flex justify-between items-center py-2 px-4 border-b-[1px] border-b-zinc-300">
          <h1 className="text-zinc-700 font-semibold text-xl">
            Dashboard Menu
          </h1>
          <span
            onClick={() => setIsAdmin(false)}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>
        <div className="p-4">
          {/* <h2 className="text-lg font-semibold text-zinc-800 mb-4">Admin: {staffDetails.F_Name} {staffDetails.L_Name}</h2> */}
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.key}
                className="flex items-center gap-2 text-zinc-600 mb-2"
              >
                <input
                  type="checkbox"
                  checked={permissions[item.key] === 1}
                  onChange={() => handlePermissionChange(item.key)}
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button
              onClick={savePermissions}
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditUser;
