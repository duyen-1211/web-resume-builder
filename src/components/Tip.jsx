import React, { useState } from "react";
import tipData from "../tip.json"; // import file JSON
import "../styles/Tip.scss";

const Tip = ({ section }) => {
  const [open, setOpen] = useState(false);

  // Lấy dữ liệu tương ứng từ JSON dựa trên prop 'section'
  const tip = tipData[section];

  if (!tip) return null; // nếu section không tồn tại thì không render

  return (
    <div className="tip-container">
      <button
        type="button"
        className={`tip-btn ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="tip-icon">💡</span>
        <span className="tip-label">{tip.label}</span>
        <span className="tip-arrow"></span>
      </button>

      {open && (
        <div className="tip-dropdown">
          <h4>{tip.label}</h4>
          {tip.good && tip.good.length > 0 && (
            <div className="tip-section tip-good">
              {tip.good.map((item, idx) => (
                <p key={idx}>✅ {item}</p>
              ))}
            </div>
          )}
          {tip.bad && tip.bad.length > 0 && (
            <div className="tip-section tip-bad">
              {tip.bad.map((item, idx) => (
                <p key={idx}>❌ {item}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tip;
