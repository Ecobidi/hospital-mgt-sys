const mongoose = require('mongoose')

let DoctorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: Date,
    required: true,
    default: Date.now
  },
  first_name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
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

})

module.exports = mongoose.model('doctor', DoctorSchema)