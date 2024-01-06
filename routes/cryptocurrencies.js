const express = require("express");
const cryptocurrenciesRouter = express.Router();
const {getCryptoCurrencies} =require("../controllers/apiController")


cryptocurrenciesRouter.get("/",getCryptoCurrencies );

module.exports = cryptocurrenciesRouter;
