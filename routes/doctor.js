const router = require('express').Router()
const { body } = require('express-validator')
const DoctorController = require('../controllers/doctor')

router.get('/', DoctorController.getAllDoctorsPage)

router.get('/new', DoctorController.createDoctorPage)

router.post('/new', body(['first_name', 'surname', 'username', 'password', 'role'], 'All Fields are required').isNumeric(), body('password').equals('retype_password'), DoctorController.createDoctor)

router.get('/edit', DoctorController.editDoctorPage)

router.post('/edit', body('password').equals('retype_password'), DoctorController.editDoctor)

router.get('/remove/:doctor_id', DoctorController.removeDoctor)

module.exports = router