const { validationResult } = require('express-validator')
const DoctorModel = require('../models/doctor')
const DoctorService = require('../services/doctor')
const UserService = require('../services/user')

class DoctorController {

  static async getDoctorByUsernameAPI(req, res) {
    let doctor = await DoctorService.findByUsername(req.params.doctor_username)
    res.json(doctor)
  }

  static async getAllDoctorsPage(req, res) {
    let doctors = await DoctorService.findAll()
    res.render('doctors', {doctors})
  }

  static async createDoctorPage(req, res) {
    res.render('doctors-new', { dao: new DoctorModel(), errors: req.flash('errors'), error_msg: req.flash('error_msg') || '' })
  }

  static async createDoctor(req, res) {
    let dao = req.body
    console.log(req.body)
    let validResults = validationResult(req)
    if (dao.password != dao.retype_password) {
      return res.render('doctors-new', { errors: validResults.errors, error_msg: 'Passwords Do Not Match', dao })
    }
    try {
      // check for same username
      let sameUsername = await DoctorService.findByUsername(dao.username)
      console.log(sameUsername)
      if (sameUsername) {
        return res.render('doctors-new', { error_msg: 'Username is taken', errors: [], dao })
      }
      await DoctorService.create(dao)
      res.redirect('/doctors')
    } catch (err) {
      console.log(err)
      res.redirect('/doctors')
    }

  }

  static async editDoctorPage(req, res) {
    try {
      let dao = await DoctorService.findById(req.query.doctor_id)
      res.render('doctor-edit', { dao, errors: req.flash('errors'), error_msg: req.flash('error_msg') || '' })
    } catch (err) {
        console.log(err)
        res.redirect('/doctors/edit?doctor_id=' + req.query.doctor_id)
    }
  }

  static async editDoctor(req, res) {
    let doctor_id = req.query.doctor_id
    let dao = req.body
    let editData = {}
    editData._id = doctor_id
    if (dao.password != dao.retype_password) {
      return res.render('doctor-edit', { errors: [], error_msg: 'Passwords Do Not Match', dao })
    }
    try {
      // let keysInDao = Object.keys(dao)
      for (let key in dao) {
        if (dao.hasOwnProperty(key) && dao[key]) {
          editData[key] = dao[key]
        }
      }
      await DoctorService.updateOne(editData)
      res.redirect('/doctors')
    } catch (err) {
      console.log(err)
      res.redirect('/doctors/edit?doctor_id=' + doctor_id)
    }
  }

  static async removeDoctor(req, res) {
    try {
      await DoctorService.removeOne(req.params.doctor_id)
      res.redirect('/doctors')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/doctors')
    }
  }

}

module.exports = DoctorController