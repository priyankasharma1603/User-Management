import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api'; // Updated import
import UserTable from '../components/UserTable';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import Toast from '../components/Toast';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await fetchUsers();
      setUsers(data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch users', error);
      setError('Failed to fetch users');
      setToastMessage('Error fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      const { data } = await createUser(user);
      setUsers([...users, data]);
      setModalOpen(false);
      setToastMessage('User created successfully!');
    } catch (error) {
      console.error('Failed to create user', error);
      setToastMessage('Error creating user.');
    }
  };

  const handleEditUser = async (user) => {
    try {
      const { data } = await updateUser(user.id, user);
      setUsers(users.map(u => (u.id === user.id ? data : u)));
      setModalOpen(false);
      setToastMessage('User updated successfully!');
    } catch (error) {
      console.error('Failed to update user', error);
      setToastMessage('Error updating user.');
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setToastMessage('User deleted successfully!');
    } catch (error) {
      console.error('Failed to delete user', error);
      setToastMessage('Error deleting user.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => { setModalOpen(true); setEditingUser(null); }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create User
        </button>
      </div>

      {/* Display loading indicator */}
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <UserTable
          users={users}
          onEdit={user => { setModalOpen(true); setEditingUser(user); }} // Open edit modal with user data
          onDelete={handleDeleteUser}
        />
      )}

      {/* Modal for Create and Edit User */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">
            {editingUser ? 'Edit User' : 'Create User'} {/* Display 'Edit User' if editing */}
          </h2>
          <UserForm
            initialUser={editingUser || { name: '', email: '', phone: '', address: { street: '', city: '' }, company: { name: '' }, website: '' }} 
            onSubmit={editingUser ? handleEditUser : handleCreateUser}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}

      {/* Toast for success/error messages */}
      {toastMessage && <Toast message={toastMessage} closeToast={() => setToastMessage('')} />}
    </div>
  );
};

export default Home;
