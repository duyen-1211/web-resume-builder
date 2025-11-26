import React, { useState, useEffect } from "react";

const LeftContent = ({ data, onDataChange }) => {
  // State nội bộ
  const [personalInfo, setPersonalInfo] = useState({ name: "", location: "" });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([""]);
  const [experience, setExperience] = useState([{ title: "", company: "", period: "" }]);
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);

  // Chỉ khởi tạo 1 LẦN khi component được mount
  useEffect(() => {
    if (!data) return;

    setPersonalInfo(data.personalInfo || { name: "", location: "" });
    setSummary(data.summary || "");
    setSkills(data.skills?.length ? data.skills : [""]);
    setExperience(
      data.experience?.length 
        ? data.experience 
        : [{ title: "", company: "", period: "" }]
    );
    setEducation(
      data.education?.length
        ? data.education
        : [{ school: "", degree: "", year: "" }]
    );
  }, []); // ❗ RẤT QUAN TRỌNG: Chỉ chạy 1 lần, tránh reset form

  // Gửi dữ liệu ra Resume khi mỗi input thay đổi
  useEffect(() => {
    onDataChange?.({
      personalInfo,
      summary,
      skills,
      experience,
      education,
    });
  }, [personalInfo, summary, skills, experience, education]); // cập nhật liên tục mà không reset form

  // Handlers
  const handlePersonalChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (i, value) => {
    const newSkills = [...skills];
    newSkills[i] = value;
    setSkills(newSkills);
  };

  const handleExperienceChange = (i, field, value) => {
    const updated = [...experience];
    updated[i][field] = value;
    setExperience(updated);
  };

  const handleEducationChange = (i, field, value) => {
    const updated = [...education];
    updated[i][field] = value;
    setEducation(updated);
  };

  return (
    <div className="left-content-inner">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Thông tin cá nhân</h2>
        <input
          type="text"
          placeholder="Họ và tên"
          value={personalInfo.name}
          onChange={(e) => handlePersonalChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa điểm"
          value={personalInfo.location}
          onChange={(e) => handlePersonalChange("location", e.target.value)}
        />

        <h2>Tóm tắt</h2>
        <textarea
          rows={4}
          placeholder="Tóm tắt bản thân"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <h2>Kỹ năng</h2>
        {skills.map((s, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Kỹ năng ${i + 1}`}
            value={s}
            onChange={(e) => handleSkillChange(i, e.target.value)}
          />
        ))}
        <button type="button" onClick={() => setSkills([...skills, ""])}>Thêm kỹ năng</button>

        <h2>Kinh nghiệm</h2>
        {experience.map((exp, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="Chức vụ"
              value={exp.title}
              onChange={(e) => handleExperienceChange(i, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Công ty"
              value={exp.company}
              onChange={(e) => handleExperienceChange(i, "company", e.target.value)}
            />
            <input
              type="text"
              placeholder="Thời gian"
              value={exp.period}
              onChange={(e) => handleExperienceChange(i, "period", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={() => 
          setExperience([...experience, { title: "", company: "", period: "" }])
        }>
          Thêm kinh nghiệm
        </button>

        <h2>Học vấn</h2>
        {education.map((edu, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="Trường học"
              value={edu.school}
              onChange={(e) => handleEducationChange(i, "school", e.target.value)}
            />
            <input
              type="text"
              placeholder="Chuyên ngành"
              value={edu.degree}
              onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
            />
            <input
              type="text"
              placeholder="Năm"
              value={edu.year}
              onChange={(e) => handleEducationChange(i, "year", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={() => 
          setEducation([...education, { school: "", degree: "", year: "" }])
        }>
          Thêm học vấn
        </button>
      </form>
    </div>
  );
};

export default LeftContent;
