const authenticationService = require('../services/authentication.service');

async function getRegisterPage(req, res, next) {
  return await authenticationService.getRegisterPage(res);
}

async function register(req, res, next) {
  return await authenticationService.register(req, res)
}

async function getLoginPage(req, res, next) {
  return await authenticationService.getLoginPage(res)
}

async function login(req, res, next) {
  return await authenticationService.login(req, res);
}

async function logout(req, res, next) {
  return await authenticationService.logout(req, res);
}

module.exports = {
  getLoginPage, 
  login,
  logout,
  getRegisterPage,
  register
}