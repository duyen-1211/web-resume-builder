// MyResumes.jsx
import React from "react";
import "./MyResumes.css";

const MyResumes = ({ resumes, setResumes, onEdit }) => {
  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((cv) => cv.id !== id));
  };

  const handleDuplicate = (cv) => {
    const newCV = {
      ...cv,
      id: Date.now(), // tạo id mới
      title: cv.personalInfo?.name + " (Copy)",
      date: new Date().toLocaleDateString(),
    };
    setResumes((prev) => [newCV, ...prev]); // thêm lên đầu danh sách
  };

  return (
    <div className="page">
      <h2>CV của tôi</h2>
      <div className="resume-grid">
        {resumes.map((cv) => (
          <div className="resume-card" key={cv.id}>
            <div className="resume-icon">📄</div>
            <h3>{cv.personalInfo?.name || "Chưa đặt tên"}</h3>
            <p>Cập nhật: {cv.date || "Chưa có"}</p>
            <div className="resume-actions">
              {/* Nút Chỉnh sửa */}
              <button className="btn-primary" onClick={() => onEdit(cv)}>
                Chỉnh sửa
              </button>

              {/* Nút Nhân bản */}
              <button className="btn-secondary" onClick={() => handleDuplicate(cv)}>
                Nhân bản
              </button>

              {/* Nút Xóa */}
              <button className="btn-danger" onClick={() => handleDelete(cv.id)}>
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResumes;
