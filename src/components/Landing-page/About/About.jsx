import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about-section" id="About">
      <div className="container text-center">
        <div className="section-header mb-5">
          <h2 className="about-title">Đưa hồ sơ của bạn lên một tầm cao mới</h2>
          <div className="underline mx-auto"></div>
        </div>

        <div className="about-content">
          <p>
            Muốn có thêm nhiều công cụ hỗ trợ cho hành trình tìm việc của bạn? 
            Hãy đăng ký tài khoản <strong>Premium</strong> với chi phí thấp để tạo nhiều bản CV trực tuyến, 
            truy cập vào nhiều mẫu thiết kế chuyên nghiệp hơn hoặc tạo một bản sơ yếu lý lịch (CV) dài hơn. 
            Bạn thậm chí có thể <strong>dùng thử miễn phí</strong> các tính năng Premium trước khi quyết định.
          </p>

          <p>
            Muốn có một <strong>thư xin việc ấn tượng</strong> đi kèm CV? 
            Hãy sử dụng những mẫu thư xin việc của chúng tôi để tạo nên bộ hồ sơ hoàn chỉnh và chuyên nghiệp. 
            CV và thư xin việc của bạn sẽ có cùng phong cách thiết kế và phông chữ — 
            giúp gây ấn tượng mạnh với nhà tuyển dụng ngay từ cái nhìn đầu tiên.
          </p>

          <button className="main-button">
            <Link to="/">Khám phá thêm</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
