const AppointmentModel = require('../models/appointment')

class AppointmentService {
  static async create(dao) {
    return AppointmentModel.create(dao)
  }

  static async findAll() {
    return AppointmentModel.find()
  }

  static async findByDoctor(doctor_id) {
    return AppointmentModel.find({doctor_id})
  }

  static async updateStatus(appointment_id, status) {
    return AppointmentModel.findByIdAndUpdate(appointment_id, {$set: { status }})
  }

  static async removeOne(id) {
    return AppointmentModel.findByIdAndRemove(id)
  }
}

module.export = AppointmentService