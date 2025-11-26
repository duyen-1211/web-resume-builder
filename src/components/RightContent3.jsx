import React, { useRef } from "react";
import "../styles/Template3.scss"; // File CSS bạn vừa cung cấp
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RightContent3 = ({ data, color, hideActions = false }) => {
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

  // ----------------- DOWNLOAD PDF & SHARE LINK (Giữ nguyên) -----------------
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

  const handleShareLink = () => {
    try {
      if (!data || Object.keys(data).length === 0) {
        alert("❌ CV đang trống!");
        return;
      }
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      const shareUrl = `${window.location.origin}/cv-viewer?data=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      alert("✔ Link đã copy!");
    } catch (err) {
      console.error(err);
    }
  };

  const themeColor = color?.primary || "#008080"; // Màu chủ đạo Teal

  // Áp dụng màu chủ đạo (themeColor) vào biến CSS cho các section
  const inlineStyle = {
    "--color": themeColor,
  };

  return (
    <div className="resume-right-wrapper right-content-3">
      <div
        className="template3" // Class chính từ SCSS
        ref={resumeRef}
        style={inlineStyle} // Áp dụng biến màu chủ đạo
      >
        {/* ================= CỘT TRÁI (SIDEBAR: CONTACT, SKILLS, ACTIVITIES) ================= */}
        <div className="left">
          
          {/* 🛑 CODE ĐÃ XÓA: Avatar Placeholder đã được loại bỏ 🛑 */}
          
          {/* Contact Info */}
          <div className="left-section">
            <h2 style={{ color: '#fff' }}>CONTACT</h2>
            <p>📧 {personalInfo?.email}</p>
            <p>📞 {personalInfo?.phone}</p>
            <p>📍 {personalInfo?.location}</p>
            {personalInfo?.link && <p>🔗 {personalInfo.link}</p>}
          </div>

          {/* SKILLS */}
          {(skills || []).length > 0 && (
            <div className="left-section">
              <h2>SKILLS</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                {skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTIVITIES */}
          {(activities || []).length > 0 && (
            <div className="left-section">
              <h2>ACTIVITIES</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                {activities.map((a, i) => (
                  <li key={i}>{a.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ================= CỘT PHẢI (MAIN CONTENT: HEADER, SUMMARY, EXPERIENCE, EDUCATION) ================= */}
        <div className="right">
          
          {/* HEADER CHÍNH (Tên và Chức danh) */}
          <h1 className="name" style={{ color: themeColor }}>{personalInfo?.name || "Your Name"}</h1>
          <h2 className="position">{personalInfo?.title || "Professional Title"}</h2>
          
          {/* SUMMARY */}
          {summary && (
            <section>
              <h3 className="section-title">PROFILE SUMMARY</h3>
              <p>{summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {(experience || []).length > 0 && (
            <section>
              <h3 className="section-title">EXPERIENCE</h3>
              {(experience || []).map((exp, i) => (
                <div key={i} className="experience-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ color: themeColor }}>{exp.title} at {exp.company}</h3>
                    <span className="time">{exp.period}</span>
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                    {(exp.responsibilities || []).map((r, idx) => <li key={idx}>{r}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {(education || []).length > 0 && (
            <section>
              <h3 className="section-title">EDUCATION</h3>
              {(education || []).map((edu, i) => (
                <div key={i} className="experience-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ color: themeColor }}>{edu.school}</h3>
                    <span className="time">{edu.year}</span>
                  </div>
                  <p style={{ margin: '4px 0' }}>{edu.degree} | {edu.location}</p>
                  {edu.description && <p style={{ fontSize: '14px' }}>{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {(projects || []).length > 0 && (
            <section>
              <h3 className="section-title">PROJECTS</h3>
              {projects.map((p, i) => (
                <div key={i} className="experience-item">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </section>
          )}
          
          {/* CERTIFICATIONS */}
          {(certifications || []).length > 0 && (
            <section>
              <h3 className="section-title">CERTIFICATIONS</h3>
              {certifications.map((c, i) => (
                <div key={i} className="experience-item">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Nút download/share */}
      {!hideActions && (
        <div className="download-wrapper">
          <button onClick={handleDownload}>Download PDF</button>
          <button onClick={handleShareLink}>Share Link</button>
        </div>
      )}
    </div>
  );
};

export default RightContent3;