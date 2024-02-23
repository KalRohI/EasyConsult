const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactInformation: {
    phone: String,
    address: String,
  },
  medicalHistory: {
    type: [String]
  },
  consultations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation', // Reference to the "Consultation" model
    },
  ]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
