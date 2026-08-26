const express = require('express');
const router = express.Router();

const {register} = require('../controllers/auth.controller');


router.post("/adduser", register);

module.exports = router;