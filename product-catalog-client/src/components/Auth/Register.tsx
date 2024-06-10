import React, { useState } from 'react';
import { Form, Input, Button, Select, notification, Row, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserRoles } from '../../types';
import { register } from '../../services/authService';
import { AxiosError } from 'axios';

const { Option } = Select;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await register(values);
      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully registered!',
      });
      navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError;
      notification.error({
        message: 'Registration Failed',
        description: axiosError.message,
      });
    } finally {
      setLoading(false);
    }
  };  

  return (
    <Row justify="center" align="middle" style={{marginTop:"150px"}} >
      {/* style={{ minHeight: '100vh' }}> */}
      <Card style={{ justifyContent:'center', alignItems:'center', width: 500}} >

        <Form
        name="register"
        onFinish={onFinish}
        initialValues={{ role: UserRoles.User }}
        layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select a role">
              <Option value={UserRoles.User}>User</Option>
              <Option value={UserRoles.AdvancedUser}>Advanced User</Option>
              <Option value={UserRoles.Administrator}>Administrator</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
          <Row align='middle' justify="center">
            Already have an account?<Link to="/login"><Button type="link">Login</Button></Link>
          </Row>
        </Form>
      </Card>
    </Row>
  );
}

export default Register;