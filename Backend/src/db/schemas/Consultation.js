const mongoose = require('mongoose');

// Define the Consultation schema
const consultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to a "Patient" model
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to a "Doctor" model
    required: true,
  },
  time: {
    type: Date,
  },
  // using object rather than object reference fopr consultation
  diagnosis: {
    type: Object,
    ref: 'Diagnosis', // Reference to a "Diagnosis" model
  },
  isAvailableToJoin: {
    type: Boolean,
    required: true
  },
  isPatientJoined: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
}, {
    strictPopulate: false // Set strictPopulate to false
  });

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
