import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockChart from "./components/StockChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockChart />} />
        {/* <Route path="/correlation" element={<CorrelationHeatmap />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
