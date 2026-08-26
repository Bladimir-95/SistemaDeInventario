const Auth = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const result = await Auth.registerUser(user);

    res.status(201).json({
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al crear usuario",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.loginUser(email, password);

    res.status(201).json({
        message: "Login exitoso",
        user: {
            id: user.id,
            username: user.username,
            password: user.password
        },
    });
  } catch (error) {
    console.error(error)
    throw new Error("Error al momento de logearse");
  }
};
module.exports = {
  register,
  login,
};
