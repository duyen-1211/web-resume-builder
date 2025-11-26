import React, { useRef } from "react";
import "../styles/Template2.scss"; // Vẫn dùng file CSS này (hoặc tạo mới nếu muốn)
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RightContent2 = ({ data, color, hideActions = false }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    activities,
  } = data || {};

  const resumeRef = useRef();

  // ----------------- DOWNLOAD PDF -----------------
  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${personalInfo?.name || "CV"}.pdf`);
  };

  // ----------------- SHARE CV LINK -----------------
  const handleShareLink = () => {
    try {
      if (!data || Object.keys(data).length === 0) {
        alert("❌ CV đang trống — không thể tạo link!");
        return;
      }
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      const shareUrl = `${window.location.origin}/cv-viewer?data=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      alert("✔ Link chia sẻ CV đã được copy vào clipboard!");
    } catch (err) {
      alert("❌ Lỗi khi tạo link chia sẻ!");
      console.error(err);
    }
  };

  return (
    <div className="resume-right-wrapper right-content-2">
      <div
        className="resume-right"
        ref={resumeRef}
        style={{
          backgroundColor: color?.background || "#fff",
          color: color?.primary || "#000",
          transition: "all 0.3s ease",
          padding: "30px", // Tăng padding một chút cho thoáng
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column", // Bố cục chính là cột dọc
          gap: "20px"
        }}
      >
        {/* --- PHẦN HEADER (Chiếm trọn chiều ngang) --- */}
        <header style={{ borderBottom: `2px solid ${color?.primary || "#eee"}`, paddingBottom: "20px", marginBottom: "10px" }}>
          <h1 style={{ color: color?.primary, fontSize: "28px", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>
            {personalInfo?.name || "Your Name"}
          </h1>
          <h2 style={{ color: "#555", fontSize: "18px", marginBottom: "15px", fontWeight: "500" }}>
            {personalInfo?.title || "Professional Title"}
          </h2>
          
          {/* Thông tin liên hệ nằm ngang hàng */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "13px", color: "#666" }}>
            {personalInfo?.email && <span>📧 {personalInfo.email}</span>}
            {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo?.link && <span>🔗 {personalInfo.link}</span>}
          </div>

          {/* SUMMARY nằm ngay trong Header luôn */}
          {summary && (
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>{summary}</p>
            </div>
          )}
        </header>

        {/* --- PHẦN NỘI DUNG CHÍNH (Chia 2 cột) --- */}
        <div className="content-body" style={{ display: "flex", gap: "30px" }}>
          
          {/* CỘT TRÁI (Kinh nghiệm & Dự án - Chiếm nhiều diện tích hơn) */}
          <div className="main-column" style={{ flex: 2 }}>
            
            {/* EXPERIENCE */}
            {(experience || []).length > 0 && (
              <section style={{ marginBottom: "25px" }}>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Experience
                </h3>
                {(experience || []).map((exp, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3px" }}>
                      <strong style={{ fontSize: "14px" }}>{exp.title}</strong>
                      <span style={{ fontSize: "12px", color: "#777", fontStyle: "italic" }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#555", marginBottom: "5px" }}>{exp.company}</div>
                    <ul style={{ fontSize: "13px", paddingLeft: "18px", margin: "0", color: "#444", lineHeight: "1.5" }}>
                      {(exp.responsibilities || []).map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* PROJECTS */}
            {(projects || []).length > 0 && (
              <section style={{ marginBottom: "25px" }}>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Projects
                </h3>
                {projects.map((p, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <strong style={{ fontSize: "14px" }}>{p.title}</strong>
                    </div>
                    <p style={{ fontSize: "13px", marginTop: "5px", color: "#444", lineHeight: "1.5" }}>{p.description}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* CỘT PHẢI (Học vấn, Kỹ năng, Chứng chỉ - Chiếm ít diện tích hơn) */}
          <div className="sidebar-column" style={{ flex: 1 }}>
            
            {/* EDUCATION */}
            {(education || []).length > 0 && (
              <section style={{ marginBottom: "25px" }}>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Education
                </h3>
                {(education || []).map((edu, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{edu.school}</div>
                    <div style={{ fontSize: "13px", marginTop: "2px" }}>{edu.degree}</div>
                    <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{edu.year} | {edu.location}</div>
                    {edu.description && <p style={{ fontSize: "12px", marginTop: "5px", color: "#555" }}>{edu.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* SKILLS */}
            {(skills || []).length > 0 && (
              <section style={{ marginBottom: "25px" }}>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Skills
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ 
                      backgroundColor: color?.skills || "#f0f0f0", 
                      padding: "4px 10px", 
                      borderRadius: "4px", 
                      fontSize: "12px", 
                      color: "#333" 
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {(certifications || []).length > 0 && (
              <section style={{ marginBottom: "25px" }}>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Certifications
                </h3>
                {certifications.map((c, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "13px" }}>{c.title}</div>
                    <p style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{c.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* ACTIVITIES */}
            {(activities || []).length > 0 && (
              <section>
                <h3 style={{ color: color?.primary, fontSize: "16px", borderBottom: "1px solid #ddd", paddingBottom: "5px", marginBottom: "15px", textTransform: "uppercase" }}>
                  Activities
                </h3>
                <ul style={{ paddingLeft: "15px", margin: 0, fontSize: "13px", color: "#444" }}>
                  {activities.map((a, i) => (
                    <li key={i} style={{ marginBottom: "5px" }}>{a.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

        </div>
      </div>

      {!hideActions && (
        <div className="download-wrapper">
          <button onClick={handleDownload}>Download PDF</button>
          <button onClick={handleShareLink}>Share Link</button>
        </div>
      )}
    </div>
  );
};

export default RightContent2;