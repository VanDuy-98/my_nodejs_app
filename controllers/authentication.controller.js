const authenticationService = require('../services/authentication.service');

async function getLoginPage(req, res, next) {
  try {
    return await authenticationService.getLoginPage(req, res)
  } catch (err) {
    console.error('Error while get login page: ', err.message)
    next(err)
  }
}

async function login(req, res, next) {
  try {
    return await authenticationService.login(req, res);
  } catch (err) {
    console.error(`Error while logging: `, err.message);
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    return await authenticationService.logout(req, res)
  } catch (err) {
    console.error(`Error while logout: `, err.message);
    next(err);
  }
}

module.exports = {
  getLoginPage, 
  login,
  logout
}