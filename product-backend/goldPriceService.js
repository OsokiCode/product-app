const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.GOLD_API_KEY;

async function getGoldPrice() {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": API_KEY,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0" 
      }
    });

    const pricePerOunce = response.data.price;
    const pricePerGram = pricePerOunce / 31.1035;

    return pricePerGram;
  } catch (error) {
    console.error("Could not get gold price, returning constant value:", error.message);
    return 65.32; 
  }
}

module.exports = { getGoldPrice };
