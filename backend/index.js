const express = require("express");

const PORT = 3001;
const app = express();
const cors = require("cors");
const { fetchAvgPrice } = require("./controllers/stock_apis");

app.use(express.json());

app.use(cors());

app.get("/average_price", fetchAvgPrice);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
