const authenticationService = require('../services/authentication.service');

async function getRegisterPage(req, res, next) {
  return await authenticationService.getRegisterPage(req, res);
}

async function register(req, res, next) {
  return await authenticationService.register(req, res)
}

async function getLoginPage(req, res, next) {
  return await authenticationService.getLoginPage(req, res)
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
  logout,
  getRegisterPage,
  register
}