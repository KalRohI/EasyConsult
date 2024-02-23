import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/DoctorSidebar';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const ActiveConsultation = () => {
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors, if any
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:3030/consultation/${id}`);
        if(response.data.isPatientJoined)
        {
            setData(response.data);
        }
        else
            setError("Patient havent joined yet. please wait until patioent joins.")
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const socket = io('http://localhost:3030'); 

    socket.on('consultationChanged', (newConsultation) => {
      console.log("Change detected.")
      fetchData(); 
    });
    fetchData();

    return () => {
      socket.disconnect();
    };
    
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='main-content'>
                <h1>Patient haven't joined yet. Please wait until the patient joins</h1>
            </div>
    
        </div>
      );
  }

  return (
    <div>
        <Sidebar></Sidebar>
        <div className='main-content'>
            <h1>Doctor Active Consultation</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>

    </div>
  );
};

export default ActiveConsultation;
