const express = require('express');
const router = express.Router();

const {addUser} = require('../controllers/resgister.controller');

router.post("/adduser", addUser);

module.exports = router;