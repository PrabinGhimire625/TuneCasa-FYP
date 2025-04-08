import React, { useEffect } from 'react'
import Form from '../Form'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetStatus } from '../../../../store/authSlice';
import { STATUS } from '../../../../globals/components/enumStatus/Status';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      toast.success("Successfully logged in!");
      dispatch(resetStatus());
      navigate('/');
    } 
    // Optional: handle error as well
    else if (status === STATUS.ERROR) {
      toast.error("Login failed! Check your email or password.");
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch]);

  return <Form type="login" onSubmit={handleLogin} />;
};

export default Login;
