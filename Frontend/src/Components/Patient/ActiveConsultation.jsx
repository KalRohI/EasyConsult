import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/PatientSidebar';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const ActiveConsultation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/consultation/${id}`);
        var consultationObj = response.data
        if(response.data.isAvailableToJoin)
        {
            consultationObj.isAvailableToJoin = false;
            consultationObj.isPatientJoined = true;
            consultationObj.patientId = window.localStorage.getItem("patientID")
            const response = await axios.put(`http://localhost:3030/consultation/${id}`, consultationObj);
            console.log(response.data)
        }
        setData(response.data);
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
                <h1>{error.message}</h1>
            </div>
    
        </div>
      );
  }

  // Render the fetched data
  return (
    <div>
        <Sidebar></Sidebar>
        <div className='main-content'>
            <h1>Patient Active Consultation</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>

    </div>
  );
};

export default ActiveConsultation;
