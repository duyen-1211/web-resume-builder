import React from 'react';
import './Hero.css';
import heroImage from '../../../assets/slider-icon.jpg';
import { useAuth } from '../../Authentication/useAuth';
import { Link } from 'react-router-dom';

const Hero = () => {
  const auth = useAuth();

  return (
    <section id="Hero">
      <div className="hero-container">
        {/* LEFT TEXT */}
        <div className="hero-text">
          <h1>
            Tạo CV chuyên nghiệp <br /> chỉ trong vài phút
          </h1>
          <p className="subtitle">
            Một chiếc CV tốt có thể giúp bạn nổi bật hơn khi xin việc. Hãy bắt đầu ngay hôm nay!
          </p>
          <div className="hero-buttons">
            <Link
              to={auth.user ? '/resume-builder' : '/login'}
              className="btn-primary"
            >
              Bắt đầu ngay
            </Link>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="hero-illustration">
          <img src={heroImage} alt="CV Preview" className="cv-main" />

          {/* Floating elements */}
          <div className="floating ats-badge">✅ ATS Hoàn Hảo</div>

          <div className="floating suggestion-card">
            <h5>💡 Ý tưởng từ AI:</h5>
            <ul>
              <li>Phân tích xu hướng thị trường để xác định cơ hội tăng trưởng mới.</li>
              <li>Giảm chi phí vận hành xuống 15% thông qua tối ưu hóa quy trình.</li>
            </ul>
          </div>

          <div className="floating color-dots">
            <span className="dot pink"></span>
            <span className="dot blue"></span>
            <span className="dot gray"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
