import React from "react";
import "./Features.css";
import icon1 from "../../../assets/about-icon-01.png";
import icon2 from "../../../assets/about-icon-02.png";
import icon3 from "../../../assets/about-icon-03.png";
import icon4 from "../../../assets/about-icon-02.png";
import icon5 from "../../../assets/about-icon-03.png";
import icon6 from "../../../assets/about-icon-01.png";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section id="Features" className="features-section">
      <div className="container text-center">
        <h2 className="features-title">
          Tại sao sử dụng Trình tạo Hồ sơ của <span>Resume Builder</span>?
        </h2>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon1} alt="icon" className="feature-icon" />
              <h5>Mẫu hiện đại</h5>
              <p>Chọn từ hơn 40 mẫu chuyên nghiệp cho mọi công việc và cấp độ kinh nghiệm.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon2} alt="icon" className="feature-icon" />
              <h5>Hồ sơ thân thiện với ATS</h5>
              <p>Hồ sơ của bạn vượt qua phần mềm sàng lọc ứng viên mà các công ty thường sử dụng.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon3} alt="icon" className="feature-icon" />
              <h5>Nội dung viết sẵn</h5>
              <p>Sử dụng gợi ý nội dung giúp tiết kiệm thời gian và tránh lỗi khi tự viết từ đầu.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon4} alt="icon" className="feature-icon" />
              <h5>Dễ dàng với AI</h5>
              <p>AI giúp gợi ý từ khóa và cách viết thông minh, làm nổi bật kỹ năng của bạn.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon5} alt="icon" className="feature-icon" />
              <h5>Vượt qua đối thủ</h5>
              <p>Nổi bật với hồ sơ ấn tượng, thể hiện điểm mạnh và kinh nghiệm chuyên sâu.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <img src={icon6} alt="icon" className="feature-icon" />
              <h5>Được trả lương cao hơn</h5>
              <p>Một hồ sơ chuyên nghiệp giúp bạn dễ dàng nhận được lời mời làm việc tốt hơn.</p>
            </div>
          </div>
        </div>

        <Link to="/all-templates" className="main-button mt-4">
          Tạo Hồ Sơ Của Tôi
        </Link>
      </div>
    </section>
  );
};

export default Features;
