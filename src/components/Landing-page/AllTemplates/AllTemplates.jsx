// AllTemplates.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- thêm
import "./AllTemplates.css";

import td1 from "../../../assets/td-1.png";
import td3 from "../../../assets/td-3.png";
import td4 from "../../../assets/td-4.png";

const allTemplates = [
  { id: "classic", title: "Classic", category: ["tatca", "donian", "coanh"], image: td1, color: { primary: "#3f51b5", background: "#ebedf7", skills: "#e1e3f8" } },
  { id: "modern", title: "Modern", category: ["tatca", "hiendai", "motcot"], image: td3, color: { primary: "#009688", background: "#ebf5f4", skills: "#e5f4f3" } },
  { id: "minimal", title: "Minimalist", category: ["tatca", "coanh"], image: td4, color: { primary: "#2196f3", background: "#e8f4fe", skills: "#e2f2ff" } },
];

const filters = [
  { id: "tatca", label: "Tất cả Mẫu", icon: "📁" },
  { id: "donian", label: "Đơn giản", icon: "⭐" },
  { id: "hiendai", label: "Hiện đại", icon: "⏱️" },
  { id: "motcot", label: "Một cột", icon: "📄" },
  { id: "coanh", label: "Có ảnh", icon: "🖼️" },
];

export default function AllTemplates() {
  const [activeFilter, setActiveFilter] = useState("tatca");
  const navigate = useNavigate(); // <-- hook navigate

  const filteredTemplates =
    activeFilter === "tatca"
      ? allTemplates
      : allTemplates.filter((tpl) => tpl.category.includes(activeFilter));

  const handleSelectTemplate = (tpl) => {
    navigate("/resume-builder", { state: { templateId: tpl.id, color: tpl.color } });
  };

  return (
    <div className="all-templates-container">
      {/* TITLE */}
      <div className="at-header">
        <h1 className="at-title">Mẫu hồ sơ xin việc</h1>
        <p className="at-desc">
          Mẫu hồ sơ dễ sử dụng và sẵn sàng trong vài phút – hãy dùng thử miễn phí ngay bây giờ.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`filter-btn ${activeFilter === f.id ? "active" : ""}`}
            onClick={() => setActiveFilter(f.id)}
          >
            <span className="icon">{f.icon}</span> {f.label}
          </button>
        ))}
      </div>

      {/* TEMPLATE GRID */}
      <div className="templates-grid-full">
        {filteredTemplates.map((tpl) => (
          <div className="template-card-big" key={tpl.id}>
            <img src={tpl.image} alt={tpl.title} />
            
            {/* Nút chọn overlay giống nút Tạo CV */}
            <button 
              className="btn-select-template"
              onClick={() => handleSelectTemplate(tpl)}
            >
              Chọn CV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
