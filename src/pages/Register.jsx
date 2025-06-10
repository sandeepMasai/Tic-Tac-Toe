import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); 
    }
  }, [user, navigate]);

  const handleRegister = async ({ username, email, password }) => {
    setIsLoading(true);
    setErrorMessage('');
    const { success, message } = await register(username, email, password);
    if (success) {
      toast.success(message);
      navigate('/login');
    } else {
      setErrorMessage(message);
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};

export default Register;