import React, { useEffect } from 'react'
import Form from '../Form'
import { useDispatch, useSelector } from "react-redux"
import { register, resetStatus } from '../../../store/authSlice';
import { STATUS } from '../../../globals/components/Status';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle register
  const handleRegister = (data) => {
    dispatch(register(data)); // Dispatch the register action
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      alert("Artist registration is pending approval. You will get the response soon in the email");
      dispatch(resetStatus()); // Reset status after registration
      navigate("/login"); // Navigate to login page
    } else if (status === STATUS.ERROR) {
      alert("An error occurred during registration.");
      dispatch(resetStatus()); // Reset status after error
    }
  }, [status, dispatch, navigate]);

  return (
    <>
      <Form type="register" onSubmit={handleRegister} />
    </>
  );
}

export default Register;
