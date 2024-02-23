import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Sidebar from '../Sidebar/PatientSidebar';


const Appointments = () => {
  return (
    <div>
        <Sidebar/>
        <div className='main-content'>
            hello
        </div>
    </div>
  )
}



export default Appointments;