import React, { useState } from "react";
import { FiFileText, FiUser, FiLayers, FiChevronLeft } from "react-icons/fi";
import "./DashboardLayout.css";
import { useAuth } from "../Authentication/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: <FiFileText />, label: "CV của tôi", path: "my-cv" },
    { icon: <FiUser />, label: "Thông tin cá nhân", path: "profile" },
    { icon: <FiLayers />, label: "Templates CV", path: "templates" },
  ];

  const handleClick = (item) => {
    if (item.path === "templates") {
      // Nếu là Templates → điều hướng sang AllTemplates
      navigate("/all-templates");
    } else {
      setActive(item.path);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="user-info">
          <img
            src={user?.photo || "https://i.imgur.com/6VBx3io.png"}
            alt="avatar"
            className="avatar"
          />
          {!collapsed && (
            <div className="user-text">
              <h4>{user?.name || "User Name"}</h4>
              <p>{user?.email}</p>
            </div>
          )}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`menu-item ${active === item.path ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
          <div className="menu-item logout-btn" onClick={handleLogout}>
            {!collapsed && <span>Đăng xuất</span>}
          </div>
        </nav>

        <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FiChevronLeft className={collapsed ? "rotated" : ""} />
        </div>
      </aside>

      <main className="dashboard-content">{children(active)}</main>
    </div>
  );
};

export default DashboardLayout;
