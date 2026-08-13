const db = require('../config/db');

const getCategories = async () => {
    try {
        const categories = await db.query('SELECT * FROM categories');

        console.log("Obteniendo categorias:", categories);

        return categories[0]
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCategories,
}