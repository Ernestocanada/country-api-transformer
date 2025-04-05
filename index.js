const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    let allCountries = {};
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const url = `https://api.first.org/data/v1/countries?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();

      // Merge new data into allCountries
      allCountries = { ...allCountries, ...data.data };

      // If fewer than limit, we're done
      if (Object.keys(data.data).length < limit) {
        hasMore = false;
      } else {
        offset += limit;
      }
    }

    // Transform into a list
    const transformed = Object.entries(allCountries).map(([code, value]) => ({
      code: code,
      country: value.country,
      region: value.region
    }));

    res.json(transformed);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
