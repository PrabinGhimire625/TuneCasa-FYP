import React, { useEffect } from 'react'
import Form from '../Form'
import { useDispatch, useSelector } from "react-redux"
import { register, resetStatus } from '../../../../store/authSlice';
import { STATUS } from '../../../../globals/components/enumStatus/Status';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle register
  const handleRegister = (data) => {
    dispatch(register(data));
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      toast.success("Successfully Register!");
      dispatch(resetStatus()); 
      navigate("/login"); 
    } else if (status === STATUS.ERROR) {
      toast.error("Registration failed");
      dispatch(resetStatus()); 
    }
  }, [status, dispatch, navigate]);

  return (
    <>
      <Form type="register" onSubmit={handleRegister} />
    </>
  );
}

export default Register;
