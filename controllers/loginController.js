const loginService = require('../services/loginService');

const loginEmployee = async (req,res) => {
    const login = await loginService.loginEmployee(req.body);
    res.send(login);
};

const logoutEmployee = async (req,res) => {
    const logout = await loginService.logoutEmployee(req.body);
    res.send(logout);
};

const registerEmployee = async (req,res) => {
    const register = await loginService.registerEmployee(req.body);
    res.send(register);
};

const updatePassword = async (req,res) => {
    const updatePassword = await loginService.updatePassword(req.body);
    console.log(updatePassword);
    res.send(updatePassword);
};

module.exports = {
    loginEmployee,
    logoutEmployee,
    registerEmployee,
    updatePassword
};