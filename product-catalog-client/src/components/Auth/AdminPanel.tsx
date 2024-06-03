import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState<{ email: string; password: string }>({ email: '', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:44383/api/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:44383/api/users', newUser);
      setNewUser({ email: '', password: '' });
      const response = await axios.get('http://localhost:44383/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:44383/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add New User</h3>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div>
        <h3>User List</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;