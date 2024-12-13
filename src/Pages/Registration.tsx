import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import CoverImage from '../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_3.jpg';
import GoogleImage from '../Assets/Images/google.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../Apis/authApi';
import { apiResponse } from '../Interfaces';
import inputHelper from '../Taghelper/inputHelper';
import toastNotify from '../Taghelper/toastNotify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Registration() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'user';
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    city: '',
    country: '',
    pincode: '',
    role: initialRole,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempdata = inputHelper(e, formData);
    setFormData(tempdata);
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName: string, value: string) => {
    const errors: { [key: string]: string } = {};
  
    switch (fieldName) {
      case 'username':
        if (!value) errors.username = 'Username is required.';
        else if (!/^[a-zA-Z0-9]*$/.test(value)) errors.username = 'Username can only contain letters and numbers.';
        break;
      case 'firstName':
        if (!value) errors.firstName = 'First Name is required.';
        else if (value.length > 50) errors.firstName = 'First Name cannot be longer than 50 characters.';
        break;
      case 'middleName':
        if (value.length > 50) errors.middleName = 'Middle Name cannot be longer than 50 characters.';
        break;
      case 'lastName':
        if (!value) errors.lastName = 'Last Name is required.';
        else if (value.length > 50) errors.lastName = 'Last Name cannot be longer than 50 characters.';
        break;
      case 'city':
        if (value.length > 100) errors.city = 'City cannot be longer than 100 characters.';
        break;
      case 'country':
        if (value.length > 100) errors.country = 'Country cannot be longer than 100 characters.';
        break;
      case 'pincode':
        if (value && !/^\d{5,6}$/.test(value)) errors.pincode = 'Pincode must be a 5 or 6-digit number.';
        break;
      case 'email':
        if (!value) errors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) errors.email = 'Email is invalid.';
        break;
      case 'password':
        if (!value) errors.password = 'Password is required.';
        else if (value.length < 6) errors.password = 'Password must be at least 6 characters long.';
        break;
      default:
        break;
    }
  
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors, ...errors };
      if (!errors[fieldName]) delete newErrors[fieldName]; // Remove the error if it's corrected
      return newErrors;
    });
  };
  

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
        validateField(key, formData[key as keyof typeof formData]);
        if (formErrors[key]) {
            errors[key] = formErrors[key];
        }
    });
    return Object.keys(errors).length === 0;
};


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const response: apiResponse = await registerUser({
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      city: formData.city,
      country: formData.country,
      pincode: formData.pincode,
      role: formData.role,
    });

    if (response.data) {
      console.log(response.data);
      toastNotify("The otp has sent to the Mail")
      navigate('/otpverificationPage', { state: { email: formData.email } });
    } else if (response.error) {
      const errorData = response.error.data.errors;
      const flattenedErrors: string[] = [];

      Object.keys(errorData).forEach((key) => {
        errorData[key].forEach((message: string) => {
          flattenedErrors.push(message);
        });
      });
      setApiErrors(flattenedErrors);
      toastNotify("Some Error has occured","error");
      console.log(flattenedErrors); 
    }
    setLoading(false);
  };
  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-start'>
            <div className='w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col relative'>
                <div className='absolute inset-0 bg-black/30'></div>
                <div className='absolute top-[25%] left-[10%] flex flex-col p-4 lg:p-0'>
                    <h1 className='text-xl lg:text-2xl text-white font-bold my-4'>Unlock Your Career Potential!</h1>
                    <p className='text-base lg:text-xl text-white font-normal max-w-[700px]'>
                        Join our platform to connect with top companies, showcase your skills, and explore endless job opportunities tailored just for you. Start your journey to success today!
                    </p>
                </div>
                <img src={CoverImage} className='w-full h-full object-cover' alt="Cover" />
            </div>

            <div className='w-full lg:w-1/2 h-full mx-auto bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center'>
                <h1 className='text-lg lg:text-xl max-w-[500px] text-[#060606] font-semibold mr-auto mb-5'>Job Seeker</h1>
                
                {/* Registration Form */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2 '>
                        <h3 className='text-2xl lg:text-3xl font-semibold mb-4'>Register</h3>
                        <p className='text-sm lg:text-base mb-2'>Create your account to start your job search journey.</p>
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
                            type='text'
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                        />
                        {formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
                        
                        <input
                            type='email'
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                        />
                        {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                        
                        <div className='w-full flex flex-col'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="flex items-center">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                                />
                                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='ml-2'>
                                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                        </div>
                        
                        <input
                            type='text'
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                        />
                        {formErrors.firstName && <span className="text-red-500">{formErrors.firstName}</span>}
                        
                        {/* Middle Name and Last Name on the same line */}
                        <div className='w-full flex flex-col lg:flex-row gap-4'>
                            <input
                                type='text'
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                placeholder="Middle Name"
                                className='w-full lg:w-1/2 text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                            />
                            {formErrors.middleName && <span className="text-red-500">{formErrors.middleName}</span>}
                            <input
                                type='text'
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className='w-full lg:w-1/2 text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                            />
                            {formErrors.lastName && <span className="text-red-500">{formErrors.lastName}</span>}
                        </div>
                        
                        <div className='w-full flex flex-col lg:flex-row gap-4'>
                            <input
                                type='text'
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Country (Optional)"
                                className='w-full lg:w-1/2 text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                            />
                            <input
                                type='text'
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City (Optional)"
                                className='w-full lg:w-1/2 text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                            />
                        </div>
                        
                        <input
                            type='text'
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="Pincode (Optional)"
                            className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                        />
                        {formErrors.pincode && <span className="text-red-500">{formErrors.pincode}</span>}
                    </div>

                    <div className='w-full flex items-center justify-between my-4'>
                        <div className='w-full flex items-center'>
                            <input type="checkbox" className='w-4 h-4 mr-2' />
                            <p className='text-sm'>I agree to the <span className='underline cursor-pointer'>Terms and Conditions</span></p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col my-5'>
                        <button type="submit" className='w-full bg-[#060606] font-semibold text-white my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3] transition duration-300'>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <Link to="/login" className='w-full bg-white font-semibold text-[#060606] border border-black my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-black hover:border-white transition duration-300'>
                            Login
                        </Link>
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className='text-lg absolute text-black/80 bg-[#f5f5f5] px-2'>or</p>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button className='w-full bg-white rounded-md border border-gray-400 px-4 py-2 flex items-center hover:bg-[#FCECD3] transition duration-300'>
                            <img src={GoogleImage} className='w-4 h-4 mr-2' alt="Google" />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default Registration;
