const PatientModel = require('../models/patient')

class PatientService {
  
  static async findAll() {
    return PatientModel.find()
  }

  static async findByName(name) {
    let nameRegex = new RegExp(name, 'ig')
    return PatientModel.find({ $or: [{surname: nameRegex}, {other_name: nameRegex}] })
  }

  static async findById(id) {
    return PatientModel.findById(id)
  }

  static async findByRegNo(reg_no) {
    return PatientModel.findOne({reg_no})
  }

  static async create(patient) {
    return PatientModel.create(patient)
  }

  static async removeOne(id) {
    return PatientModel.findByIdAndRemove(id)
  }

}

module.exports = PatientService