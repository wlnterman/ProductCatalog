

import { LoginModel } from '../../types';

import React, { useState } from 'react';
import { Form, Input, Button, notification, Col, Card, Row, Divider, Space, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../services/authService';
import { AxiosError } from 'axios';
import { login } from '../../services/authService';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values);
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });
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
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await login( (LoginModel) { email, password}).then(() => {
  //       navigate('/products');
  //     })
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

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
  //   <>
  //   <div>
  //     <h2>Login</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Email 123</label>
  //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
  //       </div>
  //       <div>
  //         <label>Password</label>
  //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  //       </div>
  //       <button type="submit"> Login </button>
  //     </form>
  //   </div>
     
  //  </>

export default Login;