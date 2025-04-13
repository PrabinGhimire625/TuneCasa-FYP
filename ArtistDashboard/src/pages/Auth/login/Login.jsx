import React, { useEffect } from 'react'
import Form from '../Form'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetStatus } from '../../../store/authSlice';
import { STATUS } from '../../../globals/components/Status';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch=useDispatch();
  const  {status}=useSelector((state)=>state.auth);
  console.log(status)
  const navigate=useNavigate();

  const handleLogin=(data)=>{
    console.log(data);
    dispatch(login(data));
  }

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      console.log(status)
      toast.success("Successfully login")
      dispatch(resetStatus())
      navigate('/');
    }
  }, [status, navigate, dispatch]);

  return (
    <>
    <Form type='login' onSubmit={handleLogin}/>
    </>
  )
}

export default Login
