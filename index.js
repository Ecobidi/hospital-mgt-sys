let express = require('express')
let expressSession = require('express-session')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')

let { APPNAME, domain, PORT, dbhost, dbport, dbname, sessionsecret, owner_mat_no, owner_name} = require('./config') 

// routes
const { LoginRouter, DoctorRouter, PatientRouter, UserRouter, MedicalReportRouter } = require('./routes')

// models
const DoctorModel = require('./models/doctor')
const MedicalReportModel = require('./models/medical_report')
const PatientModel = require('./models/patient')
const UserModel = require('./models/user')

const PatientController = require('./controllers/patient')

const DoctorController = require('./controllers/doctor')

// connect to mongodb database
mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())
// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
}))
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let doctor_count = await DoctorModel.count()
    let medical_report_count = await MedicalReportModel.count()
    let patient_count = await PatientModel.count()
    let user_count = await UserModel.count()
    res.render('dashboard', {doctor_count, medical_report_count, patient_count, user_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      doctor_count: 0, medical_report_count: 0,
      patient_count: 0, user_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/patients', PatientRouter)

app.use('/doctors', DoctorRouter)

app.use('/medical-reports', MedicalReportRouter)

app.use('/users', UserRouter)

app.get('/api/patients/:patient_reg_no', PatientController.getOneByRegNoAPI)

app.get('/api/doctors/:doctor_username', DoctorController.getDoctorByUsernameAPI)

app.listen(PORT, () => { console.log(`${APPNAME} running on port ${PORT}`) })