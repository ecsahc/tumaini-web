/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')
const ProfileController = () => import('#controllers/settings/profile_controller')
const AccountController = () => import('#controllers/settings/account_controller')
const WellbeingController = () => import('#controllers/wellbeing/index_controller')
const Phq9Controller = () => import('#controllers/assessment/phq_9_controller')
const Gad7Controller = () => import('#controllers/assessment/gad_7_controller')
const PsqController = () => import('#controllers/assessment/psq_controller')

router.on('/').render('pages/home')

// router.on('/jumpstart').render('pages/jumpstart').as('jumpstart')

//* AUTH -> LOGIN, REGISTER, LOGOUT
router.get('/login', [LoginController, 'show']).as('auth.login.show').use(middleware.guest())
router.post('/login', [LoginController, 'store']).as('auth.login.store').use([middleware.guest()])
router
  .get('/register', [RegisterController, 'show'])
  .as('auth.register.show')
  .use(middleware.guest())
router
  .post('/register', [RegisterController, 'store'])
  .as('auth.register.store')
  .use([middleware.guest()])
router.post('/logout', [LogoutController, 'handle']).as('auth.logout').use(middleware.auth())

//* AUTH -> FORGOT PASSWORD
router
  .get('/forgot-password', [ForgotPasswordController, 'index'])
  .as('auth.password.index')
  .use([middleware.guest()])
router
  .post('/forgot-password', [ForgotPasswordController, 'send'])
  .as('auth.password.send')
  .use([middleware.guest()])
router
  .get('/forgot-password/reset/:value', [ForgotPasswordController, 'reset'])
  .as('auth.password.reset')
  .use([middleware.guest()])
router
  .post('/forgot-password/reset', [ForgotPasswordController, 'update'])
  .as('auth.password.update')
  .use([middleware.guest()])

//* SETTINGS -> ACCOUNT
router
  .get('/settings/account', [AccountController, 'index'])
  .as('settings.account')
  .use(middleware.auth())
router
  .put('/settings/account/email', [AccountController, 'updateEmail'])
  .as('settings.account.email')
  .use(middleware.auth())
router
  .delete('/settings/account', [AccountController, 'destroy'])
  .as('settings.account.destroy')
  .use(middleware.auth())

//* SETTINGS -> PROFILE
router
  .get('/settings/profile', [ProfileController, 'index'])
  .as('settings.profile')
  .use(middleware.auth())
router
  .put('/settings/profile', [ProfileController, 'update'])
  .as('settings.profile.update')
  .use(middleware.auth())

//* WELLBEING -> INDEX

router
  .group(() => {
    router.get('/wellbeing', [WellbeingController, 'show']).as('wellbeing.show')
    router.post('/wellbeing', [WellbeingController, 'store']).as('wellbeing.store')
  })
  .middleware([middleware.auth()])

//* ASSESSMENTS -> PHQ9, GAD7, PSQ
router
  .group(() => {
    router.post('/assessments/phq9', [Phq9Controller, 'store']).as('assessments.phq9.store')
    router.post('/assessments/gad7', [Gad7Controller, 'store']).as('assessments.gad7.store')
    router.post('/assessments/psq/', [PsqController, 'store']).as('assessments.psq.store')

    router.get('/assessments/phq9/', [Phq9Controller, 'show']).as('assessments.phq9.show')
    router.get('/assessments/gad7/', [Gad7Controller, 'show']).as('assessments.gad7.show')
    router.get('/assessments/psq/', [PsqController, 'show']).as('assessments.psq.show')
  })
  .middleware([middleware.auth()])
