const Register = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const user = {
           username: req.body.username,
           email: req.body.email,
           password: req.body.password
        }

        const result = await Register.registerUser(user);

       res.status(201).json({
            message: "Usuario creado exitosamente"
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error al crear usuario"
        });
    }
}

module.exports = {
    register,
}