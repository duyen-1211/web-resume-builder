// Templates.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Templates.css";

// Import ảnh đúng đường dẫn
import td3 from "../../../assets/td-3.png";
import td4 from "../../../assets/td-4.png";
import td1 from "../../../assets/td-1.png";

const templates = [
  { id: "modern", title: "Modern", image: td3, color: { primary: "#009688", background: "#ebf5f4", skills: "#e5f4f3" } },
  { id: "minimal", title: "Minimalist", image: td4, color: { primary: "#2196f3", background: "#e8f4fe", skills: "#e2f2ff" } },
  { id: "classic", title: "Classic", image: td1, color: { primary: "#3f51b5", background: "#ebedf7", skills: "#e1e3f8" } },
];

export default function Templates() {
  return (
    <section className="templates-section container py-5" id="Templates">
      <div className="text-center mb-4">
        <h2 className="templates-title">Chọn Mẫu Của Bạn</h2>

        <p className="templates-desc">
          Chọn một mẫu và bắt đầu tùy chỉnh theo phong cách của bạn.
        </p>

        {/* 🔵 Nút "Tất cả CV" đã chỉnh đẹp & đồng bộ */}
        <Link to="/all-templates" className="btn-all-cv">
          Xem tất cả các mẫu
        </Link>
      </div>

      <div className="templates-grid">
        {templates.map((tpl) => (
          <div className="template-card" key={tpl.id}>
            <div className="template-image">
              <img src={tpl.image} alt={tpl.title} loading="lazy" />
            </div>

            <div className="template-content">
              <h5>{tpl.title}</h5>

              <Link
                to="/resume-builder"
                state={{ templateId: tpl.id, color: tpl.color }}
                className="btn-template"
              >
                Tạo CV
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
