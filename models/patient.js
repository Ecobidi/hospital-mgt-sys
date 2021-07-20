const mongoose = require('mongoose')

let PatientSchema = new mongoose.Schema({
  reg_no: {
    type: String,
    unique: true,
  },
  date_registered: {
    type: Date,
    required: true,
    default: Date.now
  },
  other_name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  marital_status: {
    type: String,
    enum: ['single', 'married', 'divorced'],
    default: 'N/A'
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'N/A'
  }
})

module.exports = mongoose.model('patient', PatientSchema)