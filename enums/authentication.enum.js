const success = {
  register: 'Register successfully',
  login: 'Login successfully',
  logout: 'Logout successfully',
  user: ''
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
  },
  user: {
    missing_user_id_param: 'Missing user_id param',
    user_not_found: 'User not found',
    when_execute: 'Error user info'
  }
}

module.exports = {
  success,
  fail
}