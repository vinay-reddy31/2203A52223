const axios = require("axios");

const HEADERS = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzEyMzUzLCJpYXQiOjE3NDk3MTIwNTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNjZmRmNjgxLTk3YTgtNDg4OS05ZWU1LWY1NDZlYjhjM2MxNyIsInN1YiI6InZpbmF5YXJ1a2FsYTMzM0BnbWFpbC5jb20ifSwiZW1haWwiOiJ2aW5heWFydWthbGEzMzNAZ21haWwuY29tIiwibmFtZSI6ImFydWthbGEgdmluYXkgdGVqYSIsInJvbGxObyI6IjIyMDNhNTIyMjMiLCJhY2Nlc3NDb2RlIjoiTVZHd0VGIiwiY2xpZW50SUQiOiJjY2ZkZjY4MS05N2E4LTQ4ODktOWVlNS1mNTQ2ZWI4YzNjMTciLCJjbGllbnRTZWNyZXQiOiJlU1RGYmFha2d4a3phdWpGIn0.2KaipO7kKlPKnxGW8gkGg0JB0xr2cRlojBIHZaate9c",
  },
};

exports.fetchAvgPrice = async (req, res) => {
  const { ticker, minutes, aggregation } = req.query;

  try {
    const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}&aggregation=${aggregation}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzE0ODc4LCJpYXQiOjE3NDk3MTQ1NzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNjZmRmNjgxLTk3YTgtNDg4OS05ZWU1LWY1NDZlYjhjM2MxNyIsInN1YiI6InZpbmF5YXJ1a2FsYTMzM0BnbWFpbC5jb20ifSwiZW1haWwiOiJ2aW5heWFydWthbGEzMzNAZ21haWwuY29tIiwibmFtZSI6ImFydWthbGEgdmluYXkgdGVqYSIsInJvbGxObyI6IjIyMDNhNTIyMjMiLCJhY2Nlc3NDb2RlIjoiTVZHd0VGIiwiY2xpZW50SUQiOiJjY2ZkZjY4MS05N2E4LTQ4ODktOWVlNS1mNTQ2ZWI4YzNjMTciLCJjbGllbnRTZWNyZXQiOiJlU1RGYmFha2d4a3phdWpGIn0.ZQh3xQHSlmom59ZCTfvmrz4NHnl3nDq0HE0xPujvKzo", // Ensure "Bearer " prefix
      },
    });

    const data = await response.json();
    console.log("data", data);
    const priceHistory = Array.isArray(data)
      ? data
      : Array.isArray(data.priceHistory)
      ? data.priceHistory
      : null;

    if (!priceHistory) {
      return res
        .status(400)
        .json({ error: "priceHistory data not found or invalid format" });
    }

    const average =
      priceHistory.reduce((sum, item) => sum + item.price, 0) /
      priceHistory.length;

    res.json({
      averageStockPrice: average.toFixed(2),
      chartData: priceHistory,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch the Avg Price" });
  }
};
