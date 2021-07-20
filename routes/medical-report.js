const router = require('express').Router()
const MedicalReportController = require('../controllers/medical_report')

router.get('/', MedicalReportController.getReportsPage)

router.get('/new', MedicalReportController.createReportPage)

router.post('/new', MedicalReportController.createReport)

router.get('/remove/:medical_report_id', MedicalReportController.removeReport)

module.exports = router
