import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const User = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.role !== "admin") {
      navigate("/home");
    }

    // Define an async function
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found!");
          return;
        }

        const response = await axios.get(`${baseURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    // Invoke the async function
    fetchData();
  }, []); // The empty array means this useEffect runs once when the component mounts

  return <Table columns={columns} dataSource={data} />;
};

export default User;
