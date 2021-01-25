const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/rates", async (req, res, next) => {
  try {
    console.log(req.query);
    let api = "https://api.exchangeratesapi.io/latest?";

    if (req.query.base) {
      api = `${api}base=${req.query.base}`;
    }
    if (req.query.currency) {
      api = `${api}&symbols=${req.query.currency}`;
    }
    console.log(api);
    const response = await axios.get(api);

    res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
