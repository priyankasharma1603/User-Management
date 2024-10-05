import React from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import UserDetailPage from './pages/UserDetailPage';
import './styles.css'


toast.error('Failed to perform operation.');
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
