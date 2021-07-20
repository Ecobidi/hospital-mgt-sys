const mongoose = require('mongoose')

let AppointmentSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  patient_phone: {
    type: String,
  },
  time_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  time_due: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['complete', 'awaiting', 'cancelled'],
    default: 'awaiting'
  }
})

module.export = mongoose.model('appointment', AppointmentSchema)