const { query } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authEnum = require('../enums/authentication.enum');
const helpers = require('../helpers/helper');

const userRepository = require('../repositories/users/users.repository');

async function getRegisterPage(res) {
  try {
    return await res.status(200).render('../views/authentications/register');
  } catch (err) {
    console.error('Error get register page: ', err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function userInfo(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return res.status(400).json({ data: authEnum.fail.user.missing_user_id_param });
    }

    const user = await userRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ data: authEnum.fail.user.user_not_found });
    }

    res.status(200).json({ 
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        username: user.username
      }
     })
    
  } catch (err) {
    console.error(`${authEnum.fail.user.when_execute}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function register(req, res) {
  try {
    if(req.body) {
      const {firstName, lastName, address, username, email, password} = req.body;

      if (!email || !password) {
        return res.status(400).json({ data: authEnum.fail.register.missing_email_and_pass_data });
      }

      const userData = await userRepository.getUserByEmail(email);

      if(userData) {
        return res.status(400).json({ data: authEnum.fail.register.user_existed });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const dataStore = {
        firstName,
        lastName, 
        username,
        address,
        email,
        password: hashedPassword
      }

      await userRepository.store(dataStore)
      const token = await createToken(email, hashedPassword);
      
      res.status(201).json({
        data: authEnum.success.register,
        token: token
      });
    }
  } catch (err) {
    console.error(`${authEnum.fail.register.when_execute}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function getLoginPage(res) {
  try {
    return await res.status(200).render('../views/authentications/login');
  } catch (err) {
    console.error('Error get login page: ', err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function login(req, res) {
  try {
    const {email, password} = req.body;
    
    if (email || password) {
      const userData = await userRepository.getUserByEmail(email);

      if(!userData) {
        return res.status(404).json({ data: authEnum.fail.login.user_not_found });
      } else {
        const isCorrectPass = await bcrypt.compare(password, userData.password)
        if(isCorrectPass) {
          const token = await createToken(email, password)
          res.status(200).json({
            data: authEnum.success.login,
            token: token
          }).end();
        } else {
          return res.status(401).json({ data: authEnum.fail.login.password_incorrect });
        }
      }
    } else {
      return res.status(400).json({ data: authEnum.fail.login.missing_email_and_pass_data });
    }
  } catch (err) {
    console.error(`${authEnum.fail.login.when_execute}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function logout(req, res, next) {
  try {
    await req.session.destroy();
    res.json({ data: authEnum.success.logout }).end();
  } catch (err) {
    console.error(`${authEnum.fail.logout.when_execute}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function createToken(email, password) {
  return await jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  login,
  getLoginPage,
  logout,
  getRegisterPage,
  register,
  userInfo
}