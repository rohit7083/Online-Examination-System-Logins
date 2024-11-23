import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'student' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'teacher' },
    { id: 3, name: 'Mark Lee', email: 'marklee@example.com', role: 'proctor' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle adding a new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
      email: `newuser${users.length + 1}@example.com`,
      role: 'student',
    };
    setUsers([...users, newUser]);
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

        <div className="flex justify-around mb-4">
          <button onClick={() => setActiveTab('users')} className="text-lg font-semibold p-2 rounded bg-indigo-600 text-white">User Management</button>
          <button onClick={() => setActiveTab('reports')} className="text-lg font-semibold p-2 rounded bg-indigo-600 text-white">Reports</button>
        </div>

        {activeTab === 'users' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleAddUser}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add New User
            </button>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Reports</h3>
            <div className="p-4 bg-gray-200 rounded-md">
              <h4 className="font-semibold">System Usage Report</h4>
              <p>This section will include system usage and user activity reports.</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Report 1: User Login Activity</li>
                <li>Report 2: System Errors</li>
                <li>Report 3: Exam Performance</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
