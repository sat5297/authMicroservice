const loginRepository = require('../repository/loginRepository');

const loginEmployee = (body) => {
    let login = loginRepository.loginEmployee(body);
    return login;
};

const logoutEmployee = () => {
    let logout = loginRepository.logoutEmployee(body);
    return logout;
};

const registerEmployee = (body) => {
    let register = loginRepository.registerEmployee(body);
    return register;
};

const updatePassword = (body) => {
    let updatePassword = loginRepository.updatePassword(body);
    return updatePassword;
};

const deleteEmployee = (body) => {
    let deleteEmployee = loginRepository.deleteEmployee(body);
    return deleteEmployee;
}

module.exports = {
    loginEmployee,
    logoutEmployee,
    registerEmployee,
    updatePassword,
    deleteEmployee
}