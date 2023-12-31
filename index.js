const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

app.use(cors());
const PORT = process.env.PORT || 8080;



app.use(express.json());

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
app.use("/api/cryptocurrencies", require("./routes/cryptocurrencies"));
app.use("/api/convert", require("./routes/convert"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
