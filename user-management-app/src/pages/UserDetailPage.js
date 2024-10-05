import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../services/api';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then((response) => setUser(response.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Add more user details */}
    </div>
  );
};

export default UserDetailPage;
