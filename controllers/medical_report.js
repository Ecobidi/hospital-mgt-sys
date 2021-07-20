const MedicalReportService = require('../services/medical_report')
const MedicalReportModel = require('../models/medical_report')
const PatientService = require('../services/patient')
const DoctorService = require('../services/doctor')

class MedicalReportController {

  static async getAReport(req, res) {
    try {
      let report = await MedicalReportService.findById(req.query.report_id)
      res.render('a-medical-report', { report})
    } catch (err) {
      console.log(err)
      res.redirect('/medical-reports')
    }
  }

  static async getReportsPage(req, res) {
    let id_type = req.query.id_type
    try {
      let reports
      switch (id_type) {
        case 'patient': {
          reports = await MedicalReportService.findByPatientRegNo(req.query.search)
          break
        }
        case 'doctor': {
          reports = await MedicalReportService.findByDoctor(req.query.search)
          break
        }
        default: {
          reports = await MedicalReportService.findAll()
          break
        }
      }
      res.render('medical-reports', { reports : reports ? reports : [] })
    } catch (err) {
      console.log(err)
      res.redirect('/medical-reports')
    }
  }

  static async createReportPage(req, res) {
    res.render('medical-report-new', { errors: req.flash('errors'), error_msg: req.flash('error_msg') || '', dao: new MedicalReportModel() } )
  }

  static async createReport(req, res) {
    try {
      let dao = req.body
      let patient = await PatientService.findByRegNo(dao.patient_reg_no)
      let doctor = await DoctorService.findByUsername(dao.doctor_username)
      if (!patient || !doctor) {
        let error_msg
        if (!patient) error_msg = 'No Patient With This Registration Number'
        if (!doctor) error_msg = 'No Doctor With This Doctor ID Found!'
        return res.render('medical-report-new', {dao, error_msg})
      }
      await MedicalReportService.create(dao)
      res.redirect('/medical-reports')
    } catch (err) {
      console.log(err)
      res.redirect('/medical-reports/new')
    }
  }

  static async removeReport(req, res) {
    try {
      await MedicalReportService.removeOne(req.params.medical_report_id)
      res.redirect('/medical-reports')
    } catch (err) {
      console.log(err)
      res.redirect('/medical-reports')
    }
  }

}

module.exports = MedicalReportController