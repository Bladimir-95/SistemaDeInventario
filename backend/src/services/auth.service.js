const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');

const registerUser = async (user) => {
    const hashedPasword = await bcrypt.hash(user.password, 12);

    const newUser = {
        username: user.username,
        email: user.email,
        password: hashedPasword,
    }

    const result = await Auth.register(newUser);

    return result;
};

const loginUser = async (email, password) => {
    const user = await Auth.login(email);
   
    if(!user) {
        throw new Error("Credenciales incorrectas");
    };

    const correctPassword = bcrypt.compare(password, user.password);

    if(!correctPassword) {
        throw new Error("Credenciales incorrectas");
    };

    return user;
}

module.exports = {
    registerUser,
    loginUser,
}