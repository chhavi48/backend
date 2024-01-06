
const asyncHandler =require('express-async-handler');
const axios = require("axios");

// @description  Get all Crypto Currencies
// @route GET /api/cryptocurrencies
// @access public

const getCryptoCurrencies =asyncHandler(async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
  
      const cryptocurrencies = response.data.map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
      }));
  
      res.json(cryptocurrencies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }});



    // @description  converts crypto into desired currency representation
// @route POST /api/convert
// @access public

const convertCryptoCurrency =asyncHandler(async (req, res) => {
    try {
      const { currencyId, amount, targetCurrency } = req.body;
  
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: currencyId,
            vs_currencies: targetCurrency,
          },
        }
      );
  
      const exchangeRate = response.data[currencyId][targetCurrency];
  
      const convertedAmount = amount * exchangeRate;
  
      res.json({ convertedAmount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



  module.exports = {convertCryptoCurrency,getCryptoCurrencies};
