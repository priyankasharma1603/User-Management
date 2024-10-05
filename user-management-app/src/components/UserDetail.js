import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/api';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserById(id);
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  return (
    <div className="user-detail-page">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address.street}, {user.address.city}</p>
          <p>Company: {user.company.name}</p>
          <p>Website: {user.website}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetailPage;
