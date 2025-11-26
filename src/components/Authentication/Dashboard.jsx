// Dashboard.jsx
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../Authentication/useAuth";
import Profile from "../Landing-page/Dashboard/Profile";
import MyResumes from "../Landing-page/Dashboard/MyResumes";
import Form from "../Form";
import RightContent from "../RightContent";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ resumes, setResumes }) => {
  const { user } = useAuth();
  const [editingCV, setEditingCV] = useState(null);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  // Khi bấm "Chỉnh sửa"
  const handleEdit = (cv) => {
    setEditingCV(cv);
    setFormData(cv); // Lấy dữ liệu CV đã lưu làm dữ liệu Form + RightContent
    navigate("/resume-builder", { state: { editingCV: cv } });
  };

  // Khi bấm "Lưu" trong Form
  const handleSave = () => {
    setResumes((prev) =>
      prev.map((cv) =>
        cv.id === editingCV.id ? { ...cv, ...formData } : cv
      )
    );
    setEditingCV(null);
    setFormData(null);
  };

  // Khi bấm Hủy chỉnh sửa
  const handleCancel = () => {
    setEditingCV(null);
    setFormData(null);
  };

  return (
    <DashboardLayout>
      {(active) => {
        switch (active) {
          case "dashboard":
            return <HomeDashboard user={user} resumes={resumes} />;

          case "my-cv":
            if (editingCV) {
              return (
                <div className="edit-cv-container" style={{ display: "flex", gap: "2rem" }}>
                  {/* Form bên trái */}
                  <div style={{ flex: 1 }}>
                    <button onClick={handleCancel} className="btn-cancel" style={{ marginBottom: "10px" }}>
                      Hủy
                    </button>
                    <Form
                      data={editingCV?.data || formData} 
                      setData={setFormData}
                      editingCV={editingCV}   // chỉ cần edit CV
                      updateResume={(updatedCV) => { 
                        setResumes(prev => prev.map(cv => cv.id === updatedCV.id ? updatedCV : cv));
                      }}
                    />
                    <button onClick={handleSave} style={{ marginTop: "10px" }}>Lưu CV</button>
                  </div>

                  {/* RightContent bên phải live preview */}
                  <div style={{ flex: 1 }}>
                    <RightContent data={formData} />
                  </div>
                </div>
              );
            } else {
              return (
                <MyResumes
                  resumes={resumes}
                  setResumes={setResumes}
                  onEdit={handleEdit}
                />
              );
            }

          case "profile":
            return <Profile />;

          default:
            return <div>Đang phát triển...</div>;
        }
      }}
    </DashboardLayout>
  );
};

const HomeDashboard = ({ user, resumes }) => (
  <div className="dashboard-home">
    <div className="welcome-box">
      <h2>👋 Chào mừng trở lại, {user?.name || "bạn"}!</h2>
      <p>Quản lý CV, chỉnh sửa hồ sơ và khám phá mẫu thiết kế chuyên nghiệp.</p>
    </div>

    <div className="cards-grid">
      <div className="dash-card">
        <div className="icon-box">📊</div>
        <h3>Tiến độ hồ sơ</h3>
        <p>Hoàn thành 60% thông tin cá nhân</p>
      </div>

      <div className="dash-card">
        <div className="icon-box">📄</div>
        <h3>CV đã tạo</h3>
        <p>{resumes.length} CV</p>
      </div>

      <div className="dash-card">
        <div className="icon-box">🎨</div>
        <h3>Gợi ý Template</h3>
        <p>5 mẫu phù hợp với ngành của bạn</p>
      </div>
    </div>

    <div className="suggest-box">
      ✨ <b>Mẹo hôm nay:</b> Thêm kỹ năng nổi bật để tăng điểm ATS.
    </div>
  </div>
);

export default Dashboard;
