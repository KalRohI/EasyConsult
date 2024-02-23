const mongoose = require('mongoose');

// Define the Diagnosis schema
const diagnosisSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: true,
  },
  symptoms: [String], // Array of symptom strings
  prescription: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription', // Reference to a "Prescription" model
    },
  ],
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;