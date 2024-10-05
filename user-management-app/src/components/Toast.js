import React, { useEffect } from 'react';

const Toast = ({ message, closeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 3000); // Auto-hide after 3 seconds

    return () => clearTimeout(timer);
  }, [closeToast]);

  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg toast-container">
      {message}
    </div>
  );
};

export default Toast;
