const bcrypt = require('bcrypt');
const User = require('../models/Auth');

const registerUser = async (user) => {
    const hashedPasword = await bcrypt.hash(user.password, 12);

    const newUser = {
        username: user.username,
        email: user.email,
        password: hashedPasword,
    }

    const result = await User.register(newUser);

    return result;
}

module.exports = {
    registerUser,
}