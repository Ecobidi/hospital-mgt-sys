const AppointmentService = require('../services/appointment')

class AppointmentController {
  static async bookAppointment(req, res) {
    let dao = req.body
    try {
      await AppointmentService.create(dao)
      res.redirect('/appointments')
    } catch (err) {
      console.log(err)
      res.redirect('/appointments')
    }
  }

  static async deleteAppointment(req, res) {
    try {
      await AppointmentService.removeOne(req.params.appointment_id)
      res.redirect('/appointments')
    } catch (err) {
      console.log(err)
      res.redirect('/appointments')
    }
  }

  static async updateStatus(req, res) {
    try {
      await AppointmentService.updateStatus(req.params.appointment_id, req.query.status)
      res.redirect('/appointments')
    } catch (err) {
      console.log(err)
      res.redirect('/appointments')
    }
  }
}

module.exports = AppointmentController