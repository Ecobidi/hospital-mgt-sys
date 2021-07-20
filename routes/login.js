const router = require('express').Router()
const UserService = require('../services/user')
const DoctorService = require('../services/doctor')

router.get('/', async (req, res) => {
  res.render('login', {error_msg: req.flash('error_msg')})
})

router.post('/', async (req,res) => {
  let loginType = req.body.type
  let dao = req.body
  try {
    let user
    if (loginType  == 'admin') {
      user = await UserService.findByUsername(dao.username)
    } else {
      user = await DoctorService.findByUsername(dao.username)
    }

    // check for password match
    if (user && user.password == dao.password) {
      req.session.loggedIn = true
      req.session.user = user
      res.redirect('/dashboard')
    } else {
      req.flash('error_msg', 'Incorrect Login Details')
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
    req.flash('error_msg', 'Last Operation Failed')
    res.redirect('/login')
  }
})

module.exports = router