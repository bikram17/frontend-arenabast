
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, isProtected, }) => {
  const { isLoggedIn} = useSelector((state) => state.auth);




  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && isProtected) {
      console.log("User Not Logged In");
      navigate("/", { state: { from: location } });
    }
  }, [isLoggedIn, isProtected, location, navigate]);




  // Check if the user is logged in and has an allowed role
  if (isProtected && (!isLoggedIn)) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" href="/">
            Go to Home
          </Button>
        }
      />
    );
  }






  // Render the component for authenticated and verified users
  return <Component />;
};

export default ProtectedRoute;