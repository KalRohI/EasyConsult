const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  consultations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation', // Reference to a "Consultation" model
    },
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', // Reference to a "Patient" model
    },
  ],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
