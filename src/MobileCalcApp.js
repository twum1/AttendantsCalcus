import { useState } from "react";
import "./MobileCalcApp.css";

// Function to safely evaluate expressions
const safeEvaluate = (expression) => {
  try {
    // Remove any characters that aren't numbers, +, -, *, /, or parentheses
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, "");

    // Use JavaScript's built-in Function constructor safely
    return Function(`"use strict"; return (${sanitizedExpression})`)();
  } catch {
    return "";
  }
};

export default function MobileCalcApp() {
  const [inputs, setInputs] = useState({ oldMeter: "", newMeter: "", price: "1" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const oldValue = safeEvaluate(inputs.oldMeter);
  const newValue = safeEvaluate(inputs.newMeter);
  const priceValue = safeEvaluate(inputs.price);

  const totalSales = newValue - oldValue;
  const result = totalSales * priceValue;

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Meter Calculator</h1>
        <div className="inputGroup">
          <label className="label">Old Meter:</label>
          <input
            type="text"
            name="oldMeter"
            value={inputs.oldMeter}
            onChange={handleChange}
            placeholder="Enter a number or equation"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">New Meter:</label>
          <input
            type="text"
            name="newMeter"
            value={inputs.newMeter}
            onChange={handleChange}
            placeholder="Enter a number or equation"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Price:</label>
          <input
            type="text"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="Enter a number or equation"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Total Sales:</label>
          <input type="text" value={totalSales} readOnly className="readOnlyInput" />
        </div>
        <div className="inputGroup">
          <label className="label">Result (Total Sales × Price):</label>
          <input type="text" value={result} readOnly className="readOnlyInput" />
        </div>
      </div>
    </div>
  );
}
