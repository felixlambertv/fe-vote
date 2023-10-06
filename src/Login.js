// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      );

      if (response.data && response.data.success) {
        const { tokens, user } = response.data.data;
        console.log(response.data, tokens, user);

        // Store the token and user data in localStorage
        localStorage.setItem("authToken", tokens.accessToken);
        localStorage.setItem("userData", JSON.stringify(user));

        navigate("/home");
      } else {
        // Handle unsuccessful login
        notification.error({
          message: "Login Failed",
          description:
            response.data.message ||
            "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      // Handle errors from the server or network issues
      notification.error({
        message: "Login Error",
        description:
          error.message || "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "40px auto" }}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
