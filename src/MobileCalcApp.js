import { useState } from "react";
import "./MobileCalcApp.css";

export default function MobileCalcApp() {
  const [inputs, setInputs] = useState({ oldMeter: "", newMeter: "", price: "1" });

  const evaluateExpression = (value) => {
    try {
      const sanitizedValue = value.replace(/[^-+*/0-9().]/g, "");
      return sanitizedValue ? new Function(`return ${sanitizedValue}`)() : 0;
    } catch {
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const oldValue = evaluateExpression(inputs.oldMeter);
  const newValue = evaluateExpression(inputs.newMeter);
  const priceValue = evaluateExpression(inputs.price);

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
