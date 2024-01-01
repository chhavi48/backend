const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const cryptocurrenciesRouter = require("./routes/cryptocurrencies");
const convertRouter = require("./routes/convert");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Coingecko API key
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Middleware to add API key to each request
const addApiKey = (req, res, next) => {
  req.headers["Authorization"] = `Bearer ${COINGECKO_API_KEY}`;
  next();
};

// Apply the middleware to all routes
app.use(addApiKey);

// Routes
app.use("/api/cryptocurrencies", cryptocurrenciesRouter);
app.use("/api/convert", convertRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
