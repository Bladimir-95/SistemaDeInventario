const db = require("../config/db");

const register = async (user) => {
  try {
    const sql = `
        INSERT INTO users (username, email, password)
        VALUES (?,?,?)
        `;

    const value = [user.username, user.email, user.password];

    const [result] = await db.query(sql, value);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (email) => {
  try {
    const sql = `
    SELECT id, username, password FROM users 
    WHERE email = ?
    `;

    const [result] = await db.query(sql, [email])

    return result[0];
  } catch (error) {
    console.log(error);

    throw error;
  }
}

module.exports = {
  register,
  login,
}
