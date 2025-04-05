const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.first.org/data/v1/countries");
    const data = await response.json();

    const transformed = Object.entries(data.data).map(([code, value]) => ({
      code: code,
      country: value.country,
      region: value.region
    }));

    res.json(transformed);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});