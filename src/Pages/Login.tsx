import React, { ChangeEvent, FormEvent, useState } from 'react';
import CoverImage from '../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_1 (1).jpg';
import GoogleImage from '../Assets/Images/google.svg';
import { Link, useNavigate } from 'react-router-dom';
import inputHelper from '../Taghelper/inputHelper';
import { apiResponse, userModel } from '../Interfaces';
import { useLoginUserMutation } from '../Apis/authApi';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/UserAuthSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signalrService from '../Apis/signalrConnection/signalrService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempdata = inputHelper(e, formData);
    setFormData(tempdata);
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response: apiResponse = await loginUser({
        email: formData.email,
        password: formData.password,
      });
  
      if (response.data) {
        console.log(response.data);
        const token = response.data.result.result.token;
        console.log("Token received:", token);
        if (token) { 
          const { username, email, role }: userModel = jwtDecode<userModel>(token);
          
          const id = response.data.result.result.id;
          dispatch(setLoggedInUser({ username, email, role, id }));
          localStorage.setItem("token", token); // Save the token
          localStorage.setItem("userRole", role);
          signalrService.startConnection(); 
          if (role === "admin") {
            navigate("/admin/adminHome"); // Redirect admin to UserManagement page
          } else if (role === "user") {
            navigate("/user/home"); // Redirect regular user to home
          } else if (role === "company") {
            
            navigate("/company/companyHome"); // Redirect company user to dashboard
          }
        } else {
          setApiErrors(['Token not received. Please try again.']);
        }
      } else if (response.error && response.error.data && response.error.data.errors) {
        const errorData = response.error.data.errors;
        const flattenedErrors: string[] = [];
  
        Object.keys(errorData).forEach((key) => {
          errorData[key].forEach((message: string) => {
            flattenedErrors.push(message);
          });
        });
        setApiErrors(flattenedErrors); 
        console.log(flattenedErrors);
      } else {
        setApiErrors(['An unexpected error occurred. Please try again later.']);
      }
    } catch (error) {
      console.error(error);
      setApiErrors(['An unexpected error occurred. Please try again later.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-start'>
    {/* Left Section */}
    <div className='w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col relative'>
      <div className='absolute inset-0 bg-black/30'></div>
      <div className='absolute top-[25%] left-[10%] flex flex-col p-4 lg:p-0'>
        <h1 className='text-xl lg:text-2xl text-white font-bold my-4'>Unlock Your Career Potential!</h1>
        <p className='text-base lg:text-xl text-white font-normal max-w-[700px]'>
          Join our platform to connect with top companies, showcase your skills, and explore endless job opportunities tailored just for you. Start your journey to success today!
        </p>
      </div>
      <img src={CoverImage} className='w-full h-full object-cover' alt='Cover' />
    </div>

    {/* Right Section */}
    <div className='w-full lg:w-1/2 h-full mx-auto bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center'>
      <h1 className='text-lg lg:text-xl max-w-[500px] text-[#060606] font-semibold mr-auto mb-5'>Job Seeker</h1>
      
      {/* Login Form */}
      <form onSubmit={handleSubmit} className='w-full flex flex-col max-w-[500px]'>
        <div className='w-full flex flex-col mb-2'>
          <h3 className='text-2xl lg:text-3xl font-semibold mb-4'>Login</h3>
          <p className='text-sm lg:text-base mb-2'>Welcome Back! Please enter your details.</p>
        </div>

        {apiErrors.length > 0 && (
          <div className='text-red-500 mb-4'>
            {apiErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className='w-full flex flex-col'>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
            disabled={loading}
            className={`w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />

          <div className='relative'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              disabled={loading}
              className={`w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            <span
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              onClick={loading ? undefined : () => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className='w-full flex items-center justify-between my-4'>
          <div className='w-full flex items-center'>
            <input
              type='checkbox'
              disabled={loading}
              className={`w-4 h-4 mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <p className={`text-sm ${loading ? 'opacity-50' : ''}`}>Remember Me for 30 days</p>
          </div>
          <p
            className={`text-sm font-medium whitespace-nowrap underline underline-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={loading ? undefined : () => navigate("/forgetPassword")}
          >
            Forget Password
          </p>
        </div>

        <div className='w-full flex flex-col my-5'>
          <button
            type='submit'
            disabled={loading}
            className={`w-full font-semibold my-2 rounded-md p-4 text-center flex items-center justify-center transition duration-300 ${
              loading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-[#060606] text-white cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3]'
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
          <Link
            to={loading ? '#' : '/registration'}
            className={`w-full font-semibold border my-2 rounded-md p-4 text-center flex items-center justify-center transition duration-300 ${
              loading
                ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                : 'bg-white text-[#060606] border-black cursor-pointer hover:bg-[#FCECD3] hover:text-black hover:border-white'
            }`}
            onClick={loading ? (e) => e.preventDefault() : undefined}
          >
            Register
          </Link>
        </div>

        <div className='w-full flex items-center justify-center relative py-2'>
          <div className='w-full h-[1px] bg-black/40'></div>
          <p className='text-lg absolute text-black/80 bg-[#f5f5f5] px-2'>or</p>
        </div>
        <div
          className={`w-full flex justify-center items-center border rounded-md p-4 transition duration-300 ${
            loading
              ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
              : 'border-black/20 cursor-pointer hover:bg-[#060606] hover:text-white hover:border-black'
          }`}
          onClick={loading ? undefined : () => {/* Add Google sign-in logic here */}}
        >
          <img src={GoogleImage} className='h-6 mr-2' alt='Google Logo' />
          <p className={`text-lg font-medium ${loading ? 'text-gray-400' : 'text-black hover:text-white'}`}>
            Sign in with Google
          </p>
        </div>
      </form>

      {/* Already have an account */}
      <div className='w-full max-w-[500px] flex justify-between text-sm lg:text-base font-light mt-6'>
        <p className={`text-gray-700 ${loading ? 'opacity-50' : ''}`}>Don't have an account?</p>
        <Link
          to={loading ? '#' : '/registration'}
          className={`font-semibold ${
            loading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-black hover:underline'
          }`}
          onClick={loading ? (e) => e.preventDefault() : undefined}
        >
          Sign up for free
        </Link>
      </div>
    </div>
  </div>
  );
}

export default Login;
