const Category = require('../models/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.getCategories();

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({
            message: "Categorias no obtenidas",
            error: error.message,
    })
    }
}

module.exports = {
    getCategories,
}

