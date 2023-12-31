const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Middleware to add API key to each request
const addApiKey = (req, res, next) => {
  req.headers["Authorization"] = `Bearer ${COINGECKO_API_KEY}`;
  next();
};

// Applying the middleware to all routes
app.use(addApiKey);

app.get("/api/cryptocurrencies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
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
  }
});

app.post("/api/convert", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});