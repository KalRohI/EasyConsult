import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/PatientSidebar';
import './DoctorDetails.css';

const DoctorDetails = () => {
  const { id } = useParams();

  // Assuming you have an array of doctors
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      department: 'Cardiology',
      location: 'New York, NY',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      bio: 'Dr. John Doe is a highly experienced cardiologist based in New York. He specializes in treating heart-related diseases and has a successful track record of helping patients lead healthier lives.',
      officeHours: 'Monday: 9:00 AM - 5:00 PM\nTuesday: 9:00 AM - 5:00 PM\nWednesday: 9:00 AM - 5:00 PM\nThursday: 9:00 AM - 5:00 PM\nFriday: 9:00 AM - 3:00 PM',
      availability: [
        { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
        { day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
      ],
      id: 2,
      name: 'Dr. John Doe',
      department: 'Gynacologist',
      location: 'New York, NY',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      bio: 'Dr. John Doe is a highly experienced cardiologist based in New York. He specializes in treating heart-related diseases and has a successful track record of helping patients lead healthier lives.',
      officeHours: 'Monday: 9:00 AM - 5:00 PM\nTuesday: 9:00 AM - 5:00 PM\nWednesday: 9:00 AM - 5:00 PM\nThursday: 9:00 AM - 5:00 PM\nFriday: 9:00 AM - 3:00 PM',
      availability: [
        { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
        { day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
      ],
    },
    // Add more doctors
  ];

  // Find the doctor with the matching ID
  const doctor = doctors.find((doc) => doc.id.toString() === id);

  if (!doctor) {
    // Handle case where doctor is not found
    return(
      <div>
        <Sidebar />
        <div className='main-content'>
          <Link to="/patient/searchdoctor" className="back-button">
            Back to Search
          </Link>
          <div>
          Doctor Details not found
          </div>
        </div>
      </div>
    
    );
  }

  const { name, department, location, email, phone, bio, officeHours, availability } = doctor;

  const handleSlotBooking = (day, slot) => {
    // Implement booking functionality here
    console.log(`Booked slot on ${day} at ${slot}`);
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1>Doctor Information</h1>
        <Link to="/patient/searchdoctor" className="back-button">
          Back to Search
        </Link>
        <div className="doctor-info">
          <img src="/doctor-profile-image.jpg" alt="Doctor's Profile" />
          <div className="doctor-details">
            <h2>{name}</h2>
            <p>Specialty: {department}</p>
            <p>Location: {location}</p>
            <p>Contact: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>
        <h2>Doctor's Bio</h2>
        <p>{bio}</p>
        <h2>Office Hours</h2>
        <p>{officeHours}</p>
        <h2>Appointments</h2>
        <p>
          To schedule an appointment with Dr. {name}
          <p>
            {availability.map((day) => (
              <div key={day.day}>
                {day.day}:{' '}
                {day.slots.map((slot) => (
                  <button key={slot} onClick={() => handleSlotBooking(day.day, slot)}>
                    {slot}
                  </button>
                ))}
              </div>
            ))}
          </p>
        </p>
      </div>
    </div>
  );
};

export default DoctorDetails;
