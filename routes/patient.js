const router = require('express').Router()
const PatientController = require('../controllers/patient')

router.get('/', PatientController.getAllpatientsPage)

router.get('/new', PatientController.createPatientPage)

router.post('/new', PatientController.createPatient)

router.get('/remove/:patient_id', PatientController.removePatient)

module.exports = router