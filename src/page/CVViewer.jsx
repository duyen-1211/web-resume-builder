// src/page/CVViewer.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import RightContent from "../components/RightContent";

const CVViewer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encodedData = params.get("data");

  let cvData = null;
  try {
    if (encodedData) {
      // decode an toàn cho tiếng Việt
      cvData = JSON.parse(decodeURIComponent(escape(atob(encodedData))));
    }
  } catch (err) {
    console.error("Lỗi decode CV:", err);
  }

  if (!cvData) return <div>❌ Không tìm thấy CV</div>;

  return (
    <div
      style={{
        width: "210mm", // chuẩn A4
        minHeight: "297mm",
        margin: "auto",
        backgroundColor: "#fff",
        padding: "20mm 15mm",
        boxSizing: "border-box",
      }}
    >
      {/* Chỉ render CV, không có header/footer */}
      <RightContent data={cvData} color={cvData.color || { primary: "#000", background: "#fff", skills: "#eee" }} hideButtons />
    </div>
  );
};

export default CVViewer;
