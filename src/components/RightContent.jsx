import React, { useRef } from "react";
import "../styles/Resume.scss";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RightContent = ({ data, color, hideActions = false }) => {
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
    <div className="resume-right-wrapper">
      <div
        className="resume-right"
        ref={resumeRef}
        style={{
          backgroundColor: color?.background || "#fff",
          color: color?.primary || "#000",
          transition: "all 0.3s ease",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div className="right-content-inner">
          {/* HEADER */}
          <h1 style={{ color: color?.primary }}>{personalInfo?.name || "Your Name"}</h1>
          <h2 style={{ color: color?.primary }}>{personalInfo?.title || "Title"}</h2>
          <p>
            {personalInfo?.email || ""} | {personalInfo?.phone || ""} | {personalInfo?.location || ""}
          </p>

          {/* SUMMARY */}
          {summary && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>SUMMARY</h3>
              <p>{summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {(experience || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>EXPERIENCE</h3>
              {(experience || []).map((exp, i) => (
                <div key={i} className="job-row">
                  <div className="job-header">
                    <em className="job-title" style={{ color: color?.primary }}>
                      {exp.title || "Position"}
                    </em>
                    <span className="exp-date">{exp.period || "Period"}</span>
                  </div>
                  <div className="company-line">{exp.company || "Company"}</div>
                  <ul className="responsibility-list">
                    {(exp.responsibilities || []).length
                      ? exp.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)
                      : <li>Responsibilities</li>}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {(education || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>EDUCATION</h3>
              {(education || []).map((edu, i) => (
                <div key={i} className="edu-row">
                  <div className="edu-header">
                    <em className="school-name" style={{ color: color?.primary }}>
                      {edu.school || "School"}
                    </em>
                    <span className="edu-date">{edu.year || "Year"}</span>
                  </div>
                  <div className="degree-line">
                    {edu.degree || "Degree"} | {edu.location || ""}
                  </div>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {(skills || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>SKILLS</h3>
              <ul className="skills-list">
                {skills.map((s, i) => (
                  <li key={i} style={{ backgroundColor: color?.skills || "#eee" }}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {/* PROJECTS */}
          {(projects || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>PROJECTS</h3>
              {projects.map((p, i) => (
                <div key={i}>
                  <em style={{ color: color?.primary }}>{p.title || "Project"}</em>
                  <p>{p.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* CERTIFICATIONS */}
          {(certifications || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>CERTIFICATIONS</h3>
              {certifications.map((c, i) => (
                <div key={i}>
                  <em style={{ color: color?.primary }}>{c.title || "Certificate"}</em>
                  <p>{c.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* ACTIVITIES */}
          {(activities || []).length > 0 && (
            <section>
              <h3 style={{ borderBottom: `2px solid ${color?.primary}` }}>ACTIVITIES</h3>
              <ul>
                {activities.map((a, i) => <li key={i}>{a.title || "Activity"}</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Nút download/share chỉ hiện nếu hideActions=false */}
      {!hideActions && (
        <div className="download-wrapper">
          <button onClick={handleDownload}>Download CV</button>
          <button onClick={handleShareLink}>Share</button>
        </div>
      )}
    </div>
  );
};

export default RightContent;
