const PatientService = require('../services/patient')

class PatientController {

  static async getOneByRegNoAPI(req, res) {
    let patient = await PatientService.findByRegNo(req.params.patient_reg_no)
    res.json(patient)
  }

  static async getAllpatientsPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let patients = await PatientService.findByName(req.query.search) 
      return res.render('patients', {patients}) 
    }
    let patients = await PatientService.findAll()
    res.render('patients', {patients})
  }
 
  static async createPatientPage(req, res) {
    res.render('patients-new', {error_msg: req.flash('error_msg'), errors: []})
  }

  static async createPatient(req, res) {
    let dao = req.body
    try {
      await PatientService.create(dao)
      res.redirect('/patients')
    } catch (err) {
      console.log(err)
      res.redirect('/patients')
    }
  }

  static async removePatient(req, res) {
    try {
      await PatientService.removeOne(req.params.patient_id)
      res.redirect('/patients')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/patients')
    }
  }

}

module.exports = PatientController