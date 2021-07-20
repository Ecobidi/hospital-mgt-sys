const mongoose = require('mongoose')

let MedicalReportSchema = new mongoose.Schema({
  patient_reg_no: {
    type: String,
    required: true,
  },
  doctor_username: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
  },
  prescription: {
    type: String,
  },
  more_info: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('diagnosis', MedicalReportSchema)