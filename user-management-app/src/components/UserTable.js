import React from 'react';
import { Link } from 'react-router-dom';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-box">
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-gray-300 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 font-medium text-gray-900">
                <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">{user.name}</Link>
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4 space-x-2">
                <button 
                  className="text-indigo-600 hover:text-indigo-900 px-3 py-1.5 rounded-lg bg-white border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="text-red-600 hover:text-red-900 px-3 py-1.5 rounded-lg bg-white border border-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
