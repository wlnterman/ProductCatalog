// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminPanel: React.FC = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [newUser, setNewUser] = useState<{ email: string; password: string }>({ email: '', password: '' });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await axios.get('http://localhost:44383/api/users');
//       setUsers(response.data);
//     };

//     fetchUsers();
//   }, []);

//   const handleAddUser = async () => {
//     try {
//       await axios.post('http://localhost:44383/api/users', newUser);
//       setNewUser({ email: '', password: '' });
//       const response = await axios.get('http://localhost:44383/api/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await axios.delete(`http://localhost:44383/api/users/${userId}`);
//       setUsers(users.filter(user => user.id !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <div>
//         <h3>Add New User</h3>
//         <input
//           type="email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={newUser.password}
//           onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//           placeholder="Password"
//           required
//         />
//         <button onClick={handleAddUser}>Add User</button>
//       </div>
//       <div>
//         <h3>User List</h3>
//         <ul>
//           {users.map(user => (
//             <li key={user.id}>
//               {user.email}
//               <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';
import { User, addUser, changePassword, deleteUser, getAllUsers, updateUser } from '../../services/userService';


const { Option } = Select;

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState<User | null>(null); //useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...user,
      role: user.role,
    });
  };

  const handleDelete = async (user: User) => {
    Modal.confirm({
      title: 'Are you sure you want to delete user ' + user.email+'?',
      onOk: async () => {
        await deleteUser(user.id);
        notification.success({ message: 'User deleted successfully' });
        fetchUsers();
      },
    });
  };

  const handleChangePassword = (user: User) => {
    setEditingUser(user);
    setIsPasswordModalVisible(true);
    passwordForm.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        const updatedValues = { ...values, id: editingUser.id };
        await updateUser(editingUser.id, updatedValues);
        notification.success({ message: 'User updated successfully' });
      } else {
        await addUser(values);
        notification.success({ message: 'User added successfully' });
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Failed to save user' });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePasswordSave = async () => {
    try {
      const values = await passwordForm.validateFields();
      if (editingUser) {
        await changePassword(editingUser.id, values.currentPassword , values.newPassword);
        notification.success({ message:'Password changed successfully'});
      }
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      notification.error({ message:'Failed to change password'});
    }
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ marginRight: 8 }}
          />
           <Button icon={<LockOutlined />} onClick={() => handleChangePassword(record)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title={editingUser ? 'Edit User '+ editingUser!.email : 'Add User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select>
              <Option value="User">User</Option>
              <Option value="AdvancedUser">Advanced User</Option>
              <Option value="Administrator">Administrator</Option>
            </Select>
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title={ "Change Password For " + editingUser!.email }
        visible={isPasswordModalVisible}
        onOk={handlePasswordSave}
        onCancel={handlePasswordCancel}
      >
        <Form form={passwordForm} layout="vertical">
        <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true, message: 'Please input current password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true, message: 'Please input the new password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;