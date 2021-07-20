const MedicalReportModel = require('../models/medical_report')

class MedicalReportService {

  static async findByPatientRegNo(patient_reg_no) {
    return MedicalReportModel.find({patient_reg_no})
  }

  static async findByDoctor(doctor_username) {
    return MedicalReportModel.find({doctor_username})
  }
  
  static async findAll() {
    return MedicalReportModel.find()
  }

  static async findById(report_id) {
    return MedicalReportModel.findById(report_id)
  }

  static async create(report) {
    return MedicalReportModel.create(report)
  }

  static async removeOne(id) {
    return MedicalReportModel.findByIdAndRemove(id)
  }

}

module.exports = MedicalReportService