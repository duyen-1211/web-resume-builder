// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/App.scss";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { AuthProvider } from "./components/Authentication/useAuth";

import Header from "./components/Landing-page/Header/Header";
import Hero from "./components/Landing-page/Hero/Hero";
import About from "./components/Landing-page/About/About";
import Features from "./components/Landing-page/Features/Features";
import Templates from "./components/Landing-page/Templates/Templates";
import Contact from "./components/Landing-page/Contact/Contact";
import Footer from "./components/Landing-page/Footer/Footer";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Dashboard from "./components/Authentication/Dashboard";
import AllTemplates from "./components/Landing-page/AllTemplates/AllTemplates";
import CVViewer from "./page/CVViewer";

import jsonData from "./data.json";
import Form from "./components/Form";
import Resume from "./components/Resume";

const Layout = () => {
  const location = useLocation();
  const editingCV = location.state?.editingCV || null;
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/dashboard" ||
    (location.pathname === "/resume-builder" && editingCV !== null);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]); // lưu CV của user

  const [color, setColor] = useState({
    primary: "#009688",
    background: "#ebf5f4",
    skills: "#e5f4f3",
  });

  const [previewColor, setPreviewColor] = useState(color);
  const [templateId, setTemplateId] = useState("modern");

  useEffect(() => {
    setData(jsonData);
  }, []);

  const TemplateWrapper = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editingCV = location.state?.editingCV || null;

    const [formData, setFormData] = useState(editingCV?.data || data);

    useEffect(() => {
      if (location.state?.color) setColor(location.state.color);
      if (location.state?.templateId) setTemplateId(location.state.templateId);
    }, [location.state]);

    const addResume = (cvData) => {
      setFormData(cvData); // cập nhật live preview

      if (editingCV) {
        setResumes(prev =>
          prev.map(cv => cv.id === editingCV.id ? { ...cv, data: cvData } : cv)
        );
      } else {
        const newCV = {
          id: Date.now(),
          title: cvData.personalInfo?.name || "CV mới",
          date: new Date().toLocaleDateString(),
          data: cvData,
        };
        setResumes(prev => [...prev, newCV]);
      }
    };

    return (
      <div className="resume-builder-page">
        <div className="builder-left">
          <div className="builder-scroll">
            {editingCV && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")} // ← dẫn về Myresume
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = "#1976d2"}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = "#2196f3"}
                >
                  Back
                </button>
              </div>
            )}
            <Form
              data={formData}
              setData={setFormData}
              color={color}
              setColor={setColor}
              setPreviewColor={setPreviewColor}
              addResume={addResume}
              editingCV={editingCV}
            />
          </div>
        </div>
        <div className="builder-right">
          <div className="builder-scroll">
            <Resume
              data={formData}      // live preview
              color={previewColor}
              templateId={templateId}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Hero />
                  <About />
                  <Features />
                  <Templates />
                  <Contact />
                </>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<Dashboard resumes={resumes} setResumes={setResumes} />}
            />
            <Route path="/resume-builder" element={<TemplateWrapper />} />
            <Route path="/all-templates" element={<AllTemplates />} />

            {/* THÊM ĐÚNG Ở ĐÂY — KHÔNG LỒNG ROUTES */}
            <Route path="/cv-viewer" element={<CVViewer />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
