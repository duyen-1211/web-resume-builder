import React, { useState, useEffect } from "react";
import "../styles/Form.scss";
import Tip from "./Tip";

const themes = [
  { name: "Sea Green", color: { primary: "#009688", background: "#ebf5f4", skills: "#e5f4f3" } },
  { name: "Blue", color: { primary: "#2196f3", background: "#e8f4fe", skills: "#e2f2ff" } },
  { name: "Grey", color: { primary: "#4d5050ff", background: "#f0f0f0", skills: "#e0e0e0" } },
  { name: "Indigo", color: { primary: "#3f51b5", background: "#ebedf7", skills: "#e1e3f8" } }
];

const Form = ({ data, setData, color, setColor, addResume, setPreviewColor, editingCV }) => {
  const [formData, setFormData] = useState({
    personalInfoInput: {},
    summaryInput: "",
    experienceInput: [],
    educationInput: [],
    skillsInput: [],
    projectsInput: [],
    certificationsInput: [],
    activitiesInput: []
  });

  const [tempColor, setTempColor] = useState(color || themes[0].color);

  // Đồng bộ dữ liệu từ App
  useEffect(() => {
    if (editingCV) {
      const source = editingCV.data;
      setFormData({
        personalInfoInput: source.personalInfo || {},
        summaryInput: source.summary || "",
        experienceInput: source.experience || [],
        educationInput: source.education || [],
        skillsInput: source.skills?.map(s => ({ name: s })) || [],
        projectsInput: source.projects || [],
        certificationsInput: source.certifications || [],
        activitiesInput: source.activities || []
      });
    } else if (data) {
      setFormData(prev => ({
        personalInfoInput: prev?.personalInfoInput || data.personalInfoInput || {},
        summaryInput: prev?.summaryInput || data.summaryInput || "",
        experienceInput: prev?.experienceInput || data.experienceInput || [],
        educationInput: prev?.educationInput || data.educationInput || [],
        skillsInput: prev?.skillsInput || data.skillsInput || [],
        projectsInput: prev?.projectsInput || data.projectsInput || [],
        certificationsInput: prev?.certificationsInput || data.certificationsInput || [],
        activitiesInput: prev?.activitiesInput || data.activitiesInput || []
      }));
    }
  }, [data, editingCV]);

  // updateField
  const updateField = (section, key, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...(prev[section] || {}), [key]: value } }));
  };

  // updateListItem
  const updateListItem = (section, index, key, value) => {
    setFormData(prev => {
      const updatedList = [...(prev[section] || [])];
      updatedList[index] = { ...updatedList[index], [key]: value };
      return { ...prev, [section]: updatedList };
    });
  };

  // addListItem
  const addListItem = (section, template) => {
    setFormData(prev => ({ ...prev, [section]: [...(prev[section] || []), template] }));
  };

  // removeListItem
  const removeListItem = (section, index) => {
    setFormData(prev => ({ ...prev, [section]: (prev[section] || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mappedData = {
      personalInfo: formData.personalInfoInput,
      summary: formData.summaryInput || "",
      experience: formData.experienceInput.map(exp => ({
        title: exp.position,
        company: exp.company,
        period: exp.year,
        responsibilities: exp.description ? [exp.description] : []
      })),
      education: formData.educationInput.map(ed => ({
        school: ed.institution,
        degree: ed.degree,
        year: ed.year,
        location: ed.location || "",
        description: ed.description || ""
      })),
      skills: formData.skillsInput.map(sk => sk.name),
      projects: formData.projectsInput,
      certifications: formData.certificationsInput,
      activities: formData.activitiesInput
    };

    if (editingCV) {
      // CHỈNH SỬA: cập nhật CV hiện tại trong danh sách resumes
      addResume(mappedData, editingCV.id); // truyền ID của CV
      alert("CV đã được cập nhật!");
    } else {
      // TẠO MỚI: thêm CV mới
      addResume(mappedData);
      alert("CV mới đã được lưu!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">

      {/* Theme selector */}
      <h3>Chọn màu theme</h3>
      <div className="theme-selector" style={{ display: "flex", marginBottom: "16px" }}>
        {themes.map((t, idx) => (
          <button
            key={idx}
            type="button"
            style={{
              backgroundColor: t.color.primary,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
              cursor: "pointer",
              padding: 0,
            }}
            onClick={() => {
              setTempColor(t.color); // chỉ dùng cho UI nút
              if (setPreviewColor) setPreviewColor(t.color); // gửi màu tạm sang RightContent
            }}
          />
        ))}
      </div>

      {/* Thông tin cá nhân */}
      <h3>Thông tin cá nhân</h3>
      <input
        placeholder="John Doe"
        value={formData.personalInfoInput.name || ""}
        onChange={e => updateField("personalInfoInput", "name", e.target.value)}
      />
      <input
        placeholder="Full Stack Developer"
        value={formData.personalInfoInput.title || ""}
        onChange={e => updateField("personalInfoInput", "title", e.target.value)}
      />
      <input
        placeholder="johndoe@example.com"
        value={formData.personalInfoInput.email || ""}
        onChange={e => updateField("personalInfoInput", "email", e.target.value)}
      />
      <input
        placeholder="+84 912345678"
        value={formData.personalInfoInput.phone || ""}
        onChange={e => updateField("personalInfoInput", "phone", e.target.value)}
      />
      <input
        placeholder="Hà Nội, Việt Nam"
        value={formData.personalInfoInput.location || ""}
        onChange={e => updateField("personalInfoInput", "location", e.target.value)}
      />

      {/* Tóm tắt */}
      <h3>Tóm tắt</h3>
      <textarea
        placeholder="Viết một đoạn tóm tắt về bản thân"
        value={formData.summaryInput || ""}
        onChange={e => {
          setFormData(prev => {
            const updated = { ...prev, summaryInput: e.target.value };
            if (setData) setData(updated); // đồng bộ lên App
            return updated;
          });
        }}
      />
      {/* Kinh nghiệm */}
      <h3>Kinh nghiệm làm việc <Tip section="experience" /></h3>
      {formData.experienceInput.map((exp, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="Công ty ABC"
            value={exp.company || ""}
            onChange={e => updateListItem("experienceInput", idx, "company", e.target.value)}
          />
          <input
            placeholder="Frontend Developer"
            value={exp.position || ""}
            onChange={e => updateListItem("experienceInput", idx, "position", e.target.value)}
          />
          <input
            placeholder="06/2022 - Hiện tại"
            value={exp.year || ""}
            onChange={e => updateListItem("experienceInput", idx, "year", e.target.value)}
          />
          <textarea
            placeholder="Mô tả công việc"
            value={exp.description || ""}
            onChange={e => updateListItem("experienceInput", idx, "description", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("experienceInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("experienceInput", { company: "", position: "", year: "", description: "" })}>
        + Thêm kinh nghiệm
      </button>

      {/* Học vấn */}
      <h3>Học vấn <Tip section="education" /></h3>
      {formData.educationInput.map((ed, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="Đại học Bách Khoa Hà Nội"
            value={ed.institution || ""}
            onChange={e => updateListItem("educationInput", idx, "institution", e.target.value)}
          />
          <input
            placeholder="Cử nhân Công nghệ Thông tin"
            value={ed.degree || ""}
            onChange={e => updateListItem("educationInput", idx, "degree", e.target.value)}
          />
          <input
            placeholder="2018 - 2022"
            value={ed.year || ""}
            onChange={e => updateListItem("educationInput", idx, "year", e.target.value)}
          />
          <textarea
            placeholder="Mô tả học vấn"
            value={ed.description || ""}
            onChange={e => updateListItem("educationInput", idx, "description", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("educationInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("educationInput", { institution: "", degree: "", year: "", description: "" })}>
        + Thêm học vấn
      </button>

      {/* Kỹ năng */}
      <h3>Kỹ năng <Tip section="skills" /></h3>
      {formData.skillsInput.map((sk, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="HTML5"
            value={sk.name || ""}
            onChange={e => updateListItem("skillsInput", idx, "name", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("skillsInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("skillsInput", { name: "" })}>+ Thêm kỹ năng</button>

      {/* Dự án */}
      <h3>Dự án <Tip section="projects" /></h3>
      {formData.projectsInput.map((pj, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="Tên dự án"
            value={pj.title || ""}
            onChange={e => updateListItem("projectsInput", idx, "title", e.target.value)}
          />
          <textarea
            placeholder="Mô tả dự án"
            value={pj.description || ""}
            onChange={e => updateListItem("projectsInput", idx, "description", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("projectsInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("projectsInput", { title: "", description: "" })}>+ Thêm dự án</button>

      {/* Chứng chỉ */}
      <h3>Chứng chỉ <Tip section="certifications" /></h3>
      {formData.certificationsInput.map((cc, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="Tên chứng chỉ"
            value={cc.title || ""}
            onChange={e => updateListItem("certificationsInput", idx, "title", e.target.value)}
          />
          <textarea
            placeholder="Mô tả chứng chỉ"
            value={cc.description || ""}
            onChange={e => updateListItem("certificationsInput", idx, "description", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("certificationsInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("certificationsInput", { title: "", description: "" })}>+ Thêm chứng chỉ</button>

      {/* Hoạt động */}
      <h3>Hoạt động <Tip section="activities" /></h3>
      {formData.activitiesInput.map((act, idx) => (
        <div key={idx} className="block">
          <input
            placeholder="Hoạt động"
            value={act.title || ""}
            onChange={e => updateListItem("activitiesInput", idx, "title", e.target.value)}
          />
          <button type="button" onClick={() => removeListItem("activitiesInput", idx)}>Xóa</button>
        </div>
      ))}
      <button type="button" onClick={() => addListItem("activitiesInput", { title: "" })}>+ Thêm hoạt động</button>

      <div
        className="form-submit"
        style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          type="button"
          onClick={() => {
            const mappedData = {
              personalInfo: formData.personalInfoInput,
              summary: formData.summaryInput || "",
              experience: formData.experienceInput.map(exp => ({
                title: exp.position,
                company: exp.company,
                period: exp.year,
                responsibilities: exp.description ? [exp.description] : []
              })),
              education: formData.educationInput.map(ed => ({
                school: ed.institution,
                degree: ed.degree,
                year: ed.year,
                location: ed.location || "",
                description: ed.description || ""
              })),
              skills: formData.skillsInput.map(sk => sk.name),
              projects: formData.projectsInput,
              certifications: formData.certificationsInput,
              activities: formData.activitiesInput
            };

            if (setData) setData(mappedData); // cập nhật live preview
            alert("Thông tin đã hiển thị bên CV preview!");
          }}
        >
          Hoàn tất
        </button>

        <button
          type="button"
          onClick={() => {
            const mappedData = {
              personalInfo: formData.personalInfoInput,
              summary: formData.summaryInput || "",
              experience: formData.experienceInput.map(exp => ({
                title: exp.position,
                company: exp.company,
                period: exp.year,
                responsibilities: exp.description ? [exp.description] : []
              })),
              education: formData.educationInput.map(ed => ({
                school: ed.institution,
                degree: ed.degree,
                year: ed.year,
                location: ed.location || "",
                description: ed.description || ""
              })),
              skills: formData.skillsInput.map(sk => sk.name),
              projects: formData.projectsInput,
              certifications: formData.certificationsInput,
              activities: formData.activitiesInput
            };
            if (addResume) addResume(mappedData); // chỉ lưu MyResumes
            alert(editingCV ? "CV đã được cập nhật!" : "CV mới đã được lưu!");
          }}
        >
          Lưu CV
        </button>
      </div>
    </form>
  );
};

export default Form;
