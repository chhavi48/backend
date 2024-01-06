const express = require("express");
const axios = require("axios");
const convertRouter = express.Router();
const {convertCryptoCurrency} =require("../controllers/apiController")

convertRouter.post("/",convertCryptoCurrency );

module.exports = convertRouter;
