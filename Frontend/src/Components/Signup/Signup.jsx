import React, { useState } from 'react';
import './Signup.css';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Navigation } from "../Home/navigation";



const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypepassword: '',
    personType: '',
    firstName: '',
    lastName: '',
    designation: '',
    department: '',
    degree: '',
    age: '',
    gender: '',
    contactInformation: '',
    dateOfBirth: '',
    bloodgroup: '',
    medicalHistory: '',
  });
  const steps = [
    'Do you have an account?',
    'Login',
    'Select your role',
    'Doctor Signup',
    'Patient Signup',
    'Additional Information',
  ];
  

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (step === 1) {
      if (userType === 'login') {
        setStep(3); // Login page
      } else {
        setStep(3); // Select role
      }
    } else if (step === 3) {
        if(validateStep3())
        {
          if (formData.personType === 'Doctor') {
              if(userType === 'login')
              {
                setStep(2);
              }
              else{
                setStep(4); // Doctor signup form
              }
              
            } else if (formData.personType === 'Patient') {
              if(userType === 'login')
              {
                setStep(2);
              }
              else{
                setStep(5); // Patient signup form
              }
            }
        }
    } else if (step === 4 || step === 5) {
        if (validateStep4Or5()) {
            setStep(6); // Additional information submit form
          }
    }
  };

  const validateStep3 = () => {
    if (!formData.personType) {
      setErrors({ personType: 'Please select a role' });
      return false;
    }
  
    // Clear any previous errors
    setErrors({});
    return true;
  };
  
  const validateStep4Or5 = () => {
    let requiredFields = [];
    if (step === 4 && formData.personType === 'Doctor') {
      requiredFields = ['firstName', 'lastName', 'email', 'password'];
    } else if (step === 5 && formData.personType === 'Patient') {
      requiredFields = ['firstName', 'lastName', 'email', 'password'];
    }
    if (formData.password !== formData.retypepassword) {
      setErrors({ ...errors, retypepassword: 'Passwords do not match' });
      setPasswordMatch(false);
      return false;
    }
  
    // Check if all required fields are filled
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrors({ [field]: 'Required' });
        return false; // Validation failed
      }
    }
  
    // Clear any previous errors
    setErrors({});
    setPasswordMatch(true);
    return true; // Validation succeeded
  };
  const validateStep6 = () => {
    let requiredFields = [];
    if (step === 6 && formData.personType === 'Doctor') {
      requiredFields = ['age', 'designation', 'department', 'degree', 'bloodgroup'];
    } else if (step === 6 && formData.personType === 'Patient') {
      requiredFields = ['gender', 'dateOfBirth', 'contactInformation', 'medicalHistory'];
    }
  
    // Check if all required fields are filled
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrors({ [field]: 'Required' });
        return false; // Validation failed
      }
    }
  
    // Clear any previous errors
    setErrors({});
    return true; // Validation succeeded
  };

  const handleBack = () => {
    if (step === 2 || step === 3) {
      setStep(1); // Back to initial question
    } else if (step === 4 || step === 5) {
      setStep(3); // Back to role selection
    } else if (step === 6) {
      if (formData.personType === 'Doctor') {
        setStep(4); // Back to doctor signup form
      } else if (formData.personType === 'Patient') {
        setStep(5); // Back to patient signup form
      }
    }
  };

  const handleRegistration = async () => {
    debugger
    try {
      // Handle registration form submission
      if (!validateStep6()) {
        return; // Exit the function if validation fails
      }
      console.log(formData)
      let createurl = '';
      if(formData.personType == 'Doctor'){
        createurl = 'http://localhost:3030/doctor/create';
      }
      else if(formData.personType == 'Patient'){
        createurl = 'http://localhost:3030/patient/create2';
      }
      const formDataWithUsername = {
        ...formData,
        userName: formData.email,
      };
      console.log(formDataWithUsername)
      const response = await Axios.post(createurl, formDataWithUsername);
  
      if (response.status === 201) {
        console.log('Doctor created successfully:', response.data);
        if(formData.personType == 'Doctor'){
          window.location.replace('/doctor');
        }
        else if(formData.personType == 'Patient'){
          window.location.replace('/patient');
        }
       
      } else {
        console.error('Doctor creation failed:', response.data);
        alert("Could not signup, please try again later!!!")
      }
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  const handleLogin = async () => {
    try {
      let loginUrl = '';
      if (formData.personType === 'Doctor') {
        loginUrl = 'http://localhost:3030/doctor/login'; // Replace with the actual doctor login API endpoint
      } else if (formData.personType === 'Patient') {
        loginUrl = 'http://localhost:3030/patient/login'; // Replace with the actual patient login API endpoint
      }
      const loginData = {
        email: formData.email,
        password: formData.password,
        userName: formData.email,
      };
      const response = await Axios.post(loginUrl, loginData);
      if (response.status === 200) {
        // Login successful
        console.log('Login successful');
        if(formData.personType == 'Doctor'){
          window.location.replace('/doctor');
        }
        else if(formData.personType == 'Patient'){
          window.location.replace('/patient');
        }
        // You may want to redirect the user to a different page or perform other actions here
      } else {
        // Handle login failure, show an error message or perform other actions
        console.error('Login failed:', response.data);
        setErrors({ login: response.data});
      }
      // Redirect or show a success message
    } catch (error) {
      console.error('Login error:', error.response.data);
      setErrors({ login: error.response.data });
    }
  };

  const renderFormFields = () => {
    const {
      email,
      password,
      retypepassword,
      personType,
      firstName,
      lastName,
      designation,
      department,
      degree,
      age,
      gender,
      contactInformation,
      dateOfBirth,
      bloodgroup,
      medicalHistory,
    } = formData;

    if (step === 1) {
      return (
        <>
          <div className="input">
            <button
              className={`button ${userType === 'login' ? 'selected' : ''}`}
              onClick={() => setUserType('login')}
            >
              Yes
            </button>
            <button
              className={`button ${userType === 'signup' ? 'selected' : ''}`}
              onClick={() => setUserType('signup')}
            >
              No
            </button>
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="input">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="error-message">
          {errors.login && (
            <div className="error-message">
              {Object.values(errors.login).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
      </div>

        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="input">
            <label className="PersonTypeLabel">Who are you? </label>
            <button
              className={`button ${personType === 'Doctor' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, personType: 'Doctor' })}
            >
              Doctor
            </button>
            <button
              className={`button ${personType === 'Patient' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, personType: 'Patient' })}
            >
              Patient
            </button>
            <div>{errors.personType && <div className="error-message">{errors.personType}</div>}</div>
          </div>
        </>
      );
    } else if (step === 4 && personType === 'Doctor') {
      return (
        <>
            <div className="input">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            {errors.passwordName && <div className="error-message">{errors.passwordName}</div>}
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Retype Password"
                value={retypepassword}
                onChange={(e) => setFormData({ ...formData, retypepassword: e.target.value })}
              />
            {errors.retypepassword && <div className="error-message">{errors.retypepassword}</div>}
            </div>
        </>
      );
    } else if (step === 5 && personType === 'Patient') {
      return (
        <>
          <div className="input">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            {errors.passwordName && <div className="error-message">{errors.passwordName}</div>}
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Retype Password"
                value={retypepassword}
                onChange={(e) => setFormData({ ...formData, retypepassword: e.target.value })}
              />
            {errors.retypepassword && <div className="error-message">{errors.retypepassword}</div>}
            </div>
        </>
      );
    } else if (step === 6) {
        if (personType === 'Doctor') {
          return (
            <>
              <div className="input">
                <input
                  type="Number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              {errors.age && <div className="error-message">{errors.age}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />
              {errors.designation && <div className="error-message">{errors.designation}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              {errors.department && <div className="error-message">{errors.department}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Degree"
                  value={degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                />
              {errors.degree && <div className="error-message">{errors.degree}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={bloodgroup}
                  onChange={(e) => setFormData({ ...formData, bloodgroup: e.target.value })}
                />
              {errors.bloodgroup && <div className="error-message">{errors.bloodgroup}</div>}
              </div>
            </>
          );
        } else if (personType === 'Patient') {
          return (
            <>
              <div className="input">
                <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              {errors.gender && <div className="error-message">{errors.gender}</div>}
              </div>
              <div className="input">
                  <input
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
              {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={contactInformation}
                  onChange={(e) => setFormData({ ...formData, contactInformation: e.target.value })}
                />
              {errors.contactInformation && <div className="error-message">{errors.contactInformation}</div>}
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Medical History"
                  value={medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                />
              {errors.medicalHistory && <div className="error-message">{errors.medicalHistory}</div>}
              </div>
            </>
          );
        }
      }
    };

  return (
    <div className="signup-container">
      <Navigation showTitle={false} />
      <div className="header">
        <div className="text">{steps[step - 1]}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">{renderFormFields()}</div>

      <div className="submit-container">
        <button
          className="submit"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className="submit"
          onClick={
            step === 2 && userType === 'login' ? handleLogin : // Show "Login" button
            step < 6 ? handleNext : handleRegistration // Show "Next" or "Submit" button
          }
        >
          {step === 2 && userType === 'login' ? 'Login' : step < 6 ? 'Next' : 'Signup'}
        </button>
      </div>
    </div>
  );
};
  

export default Signup;
