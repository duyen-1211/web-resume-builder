import React from "react";
import RightContent from "./RightContent";
import RightContent2 from "./RightContent2";
import RightContent3 from "./RightContent3";
import "../styles/Resume.scss";

const Resume = ({ data, color, templateId }) => {
  // Chọn component theo templateId
  const renderTemplate = () => {
    switch (templateId) {
      case "minimal": // Minimalist → RightContent3
        return <RightContent3 data={data} color={color} />;
      case "classic": // Classic → RightContent2
        return <RightContent2 data={data} color={color} />;
      default: // Modern → RightContent
        return <RightContent data={data} color={color} />;
    }
  };

  return <div className="resume" id="resume">{renderTemplate()}</div>;
};

export default Resume;
