import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Home from './pages/Home';
import Deposit from './pages/Deposit';

const AppRoutes = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      {currentUser ? (
        <Layout>
          {currentUser.role === "buyer" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductForm />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          )}
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRoutes;
