import React from "react";
import "./Contact.css";
import icon from "../../../assets/about-icon-03.png";

const Contact = () => {
  return (
    <section id="ContactUs" className="contact-section">
      <div className="container py-5">
        {/* Tiêu đề */}
        <div className="row text-center mb-5">
          <h2 className="fw-bold">Chúng tôi rất vui khi được lắng nghe bạn</h2>
        </div>

        <div className="row justify-content-center align-items-start">
          {/* Form bên trái */}
          <div className="col-lg-5 col-md-10 mb-4">
            <form className="contact-form p-3 shadow-sm rounded bg-white">
              <div className="form-group mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Địa chỉ Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Bạn biết đến chúng tôi từ đâu?</label>
                <select className="form-control" defaultValue="search">
                  <option value="friends">Bạn bè</option>
                  <option value="family">Gia đình</option>
                  <option value="search">Công cụ tìm kiếm</option>
                  <option value="ad">Quảng cáo</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Gửi lời nhắn cho chúng tôi..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary px-4">
                Gửi đi
              </button>
            </form>
          </div>

          {/* Nội dung bên phải */}
          <div className="col-lg-6 col-md-10 text-start contact-info ms-lg-5">
            <div className="mb-4">
              <img src={icon} alt="icon" className="contact-icon mb-3" />
              <h6 className="text-secondary">Hãy nói lời chào!</h6>
              <h2 className="contact-highlight text-primary">
                Liên hệ với chúng tôi qua email hoặc điện thoại
              </h2>
            </div>
            <p>
              Tầm nhìn của chúng tôi là{" "}
              <strong className="text-dark">
                Giúp mọi người chinh phục công việc mơ ước
              </strong>
              .
            </p>
            <p>
              Có câu hỏi, góp ý hay thắc mắc? Đừng ngần ngại — đội ngũ của chúng
              tôi luôn sẵn sàng lắng nghe bạn!
            </p>
            <h5>Liên hệ ngay</h5>
            <h4 className="text-info">Email: resumebuilder@gmail.com</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
