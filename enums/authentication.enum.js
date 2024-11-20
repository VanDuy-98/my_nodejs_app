const { register } = require("../services/authentication.service")

const success = {
  register: 'Register successfully',
  login: 'Login successfully',
  logout: 'Logout successfully'
}

const fail = {
  register: {
    user_existed: 'User existed',
    missing_email_and_pass_data: 'Missing email and password data',
    when_execute: 'Error register' 
  },
  login: {
    user_not_found: 'User not found',
    password_incorrect: 'Password incorrect',
    missing_email_and_pass_data: 'Missing email and password data',
    when_execute: 'Error login'
  },
  logout: {
    when_execute: 'Error logout'
  }
}

module.exports = {
  success,
  fail
}