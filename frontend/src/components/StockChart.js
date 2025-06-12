import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function StockChart() {
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(null);
  const [ticker, setTicker] = useState("AAPL");

  useEffect(() => {
    fetch(
      `http://localhost:3001/average_price?ticker=${ticker}&minutes=40&aggregation=average`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.chartData);
        setAverage(data.averageStockPrice);
      })
      .catch((err) => console.error("API Error:", err));
  }, [ticker]);

  if (!data || data.length === 0) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>{ticker} Price History</h2>
      <h3>Average Price: ${average}</h3>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="lastUpdatedAt" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
