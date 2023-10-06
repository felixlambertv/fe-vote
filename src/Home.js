import React, { useEffect } from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const { role } = userData ? JSON.parse(userData) : { role: null };

  if (role == null) {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Space size="large">
        {role === "admin" && (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/users")}
          >
            Go to Users
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          onClick={() =>
            navigate(role === "admin" ? "/polls/admin" : "/polls/user")
          }
        >
          Go to Polls
        </Button>
        <Button type="primary" size="large" onClick={handleLogout}>
          Logout
        </Button>
      </Space>
    </div>
  );
}

export default Home;
