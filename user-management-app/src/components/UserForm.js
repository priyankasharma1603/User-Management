import React, { useState } from 'react';

const UserForm = ({ initialUser, onSubmit, onClose }) => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name || user.name.length < 3) newErrors.name = 'Name must be at least 3 characters long.';
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Invalid email format.';
    if (!user.phone || user.phone.length < 10) newErrors.phone = 'Phone number must be at least 10 digits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onSubmit(user);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">{initialUser.id ? 'Edit User' : 'Add User'}</h2>
      
      <div className="space-y-4">
        <div>
          <input 
            type="text" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            placeholder="Name" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            placeholder="Email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input 
            type="tel" 
            name="phone" 
            value={user.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {initialUser.id ? 'Update' : 'Create'}
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
