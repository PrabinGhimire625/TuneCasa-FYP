import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '../../../../http';
import { toast } from 'react-toastify';
import { setProfile, setToken } from '../../../../store/authSlice';
import { useDispatch } from 'react-redux';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code']);
                const { token, data: user } = result.data;
    
                // Save token and profile in Redux
                dispatch(setToken(token));
                dispatch(setProfile(user));
    
                localStorage.setItem('token', token);
    
                toast.success("Successfully logged in with Google");
                navigate('/');
            } else {
                console.log("Google login error", authResult);
            }
        } catch (err) {
            console.error("Error while requesting Google code", err);
        }
    };
    
    

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <button
                onClick={handleGoogleLogin}
                className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                <svg
                    className="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                    width="800px"
                    height="800px"
                >
                    <g fill="none" fillRule="evenodd">
                        <path fill="#FBBC05" d="M9.827 24c0-1.524.253-2.985.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.262 2.407 10.39l7.905-6.051A14.11 14.11 0 019.827 24z" />
                        <path fill="#EB4335" d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.823-5.532 7.017-9.511 13.182-9.511z" />
                        <path fill="#34A853" d="M23.714 37.867c-6.165 0-11.36-3.978-13.182-9.51l-7.909 6.038C6.445 42.156 14.427 47.467 23.714 47.467c5.732 0 11.204-2.035 15.311-5.848l-7.507-5.804a13.97 13.97 0 01-7.804 2.052z" />
                        <path fill="#4285F4" d="M46.145 24c0-1.387-.213-2.88-.533-4.267H23.714v9.066h12.605c-.63 3.091-2.345 5.468-4.8 7.014l7.507 5.804C43.34 37.614 46.145 31.649 46.145 24z" />
                    </g>
                </svg>
                <span>Continue with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
