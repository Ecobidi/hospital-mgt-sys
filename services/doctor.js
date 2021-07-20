const DoctorModel = require('../models/doctor')

class DoctorService {

  static async findById(id) {
    return DoctorModel.findById(id)
  }

  static async findByUsername(username) {
    return DoctorModel.findOne({username})
  }
  
  static async findAll() {
    return DoctorModel.find()
  }

  static async create(doctor) {
    return DoctorModel.create(doctor)
  }

  static async updateOne(update) {
    return DoctorModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return DoctorModel.findByIdAndRemove(id)
  }

}

module.exports = DoctorService