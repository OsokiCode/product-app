const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { getGoldPrice } = require("./goldPriceService");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/products", async (req, res) => {
  try {
    const rawData = fs.readFileSync("products.json");
    const products = JSON.parse(rawData);
    const goldPrice = await getGoldPrice();

    const enriched = products.map(p => {
      const price = ((p.popularityScore + 1) * p.weight * goldPrice).toFixed(2);
      return {
        ...p,
        price: parseFloat(price),
        popularityScore5: (p.popularityScore * 5).toFixed(1)
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/products`);
});
