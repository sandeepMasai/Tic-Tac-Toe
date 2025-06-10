import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); 
    }
  }, [user, navigate]);

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    setErrorMessage('');
    const { success, message } = await login(email, password);
    if (success) {
      toast.success(message);
      navigate('/dashboard');
    } else {
      setErrorMessage(message);
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};

export default Login;