import React, { useState } from 'react';
import { Form, Input, Button, notification, Col, Card, Row, Divider, Space, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../services/authService';
import { AxiosError } from 'axios';
import { login } from '../../services/authService';
import { useAuth } from '../Context/authContext2';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const token = await login(values);
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });
      authLogin(token);
      navigate('/');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        notification.error({
          message: 'Login Failed',
          description: axiosError.message || 'Invalid credentials',//axiosError.response.data.message
        });
      } else {
        notification.error({
          message: 'Login Failed',
          description: 'An unknown error occurred',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{marginTop:"250px" }} >
      {/* style={{ minHeight: '100vh' }}> */}
      <Card style={{ justifyContent:'center', alignItems:'center', width: 500, backgroundColor: "#bae0ff"}} >
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >  
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
          <Row align='middle' justify="center">
            Don't have an account?<Link to="/register"><Button type="link">Register</Button></Link>
          </Row>
          
        </Form>
      </Card>
    </Row>
  );
};

export default Login;