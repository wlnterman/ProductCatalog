import React, { useState } from 'react';
import { assignRole } from '../../services/authService';

const AssignRole: React.FC = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const handleAssignRole = async () => {
    try {
      await assignRole(username, role);
      alert('Role assigned successfully');
    } catch (error) {
      console.error('Failed to assign role', error);
      alert('Failed to assign role');
    }
  };

  return (
    <div>
      <h2>Assign Role</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button onClick={handleAssignRole}>Assign Role</button>
    </div>
  );
};

export default AssignRole;