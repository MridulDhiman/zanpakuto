const express = require('express');

const router = express.Router();
const { homeController } = require("../controllers/home.controller.js")


router.get("/", homeController)

module.exports = router;