const mongoose = require('mongoose');

// Define the Prescription schema
const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: String,
  isMedication: Boolean,
  isActivity: Boolean,
  numberOfDays: Number,
  dosage: String,
  when: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night', 'whenrequired'],
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;