import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/useAuth';
import userPhoto from '../../../assets/User.png';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Cuộn mượt đến phần tương ứng
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
      setTimeout(() => {
        const newTarget = document.querySelector(targetId);
        if (newTarget) {
          window.scrollTo({
            top: newTarget.offsetTop - 70,
            behavior: 'smooth',
          });
        }
      }, 400);
    }
  };

  // Cuộn lên đầu trang khi bấm logo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  // Thay đổi màu khi cuộn
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container-fluid justify-content-between px-4">
        {/* Logo */}
        <button className="navbar-brand fw-bold logo-btn" onClick={scrollToTop}>
          Resume <span className="highlight">Builder</span>
        </button>

        {/* Nút toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu + Auth chung */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav text-center mx-auto gap-4">
            <li className="nav-item">
              <a href="#Templates" className="nav-link" onClick={(e) => handleScroll(e, '#Templates')}>Mẫu CV</a>
            </li>
            <li className="nav-item">
              <a href="#About" className="nav-link" onClick={(e) => handleScroll(e, '#About')}>Về Chúng Tôi</a>
            </li>
            <li className="nav-item">
              <a href="#Features" className="nav-link" onClick={(e) => handleScroll(e, '#Features')}>Tính Năng Nổi Bật</a>
            </li>
            <li className="nav-item">
              <a href="#ContactUs" className="nav-link" onClick={(e) => handleScroll(e, '#ContactUs')}>Liên Hệ</a>
            </li>
          </ul>

          {/* Auth */}
          <div className="auth-section mt-3 mt-lg-0 text-center text-lg-start">
            {auth.user ? (
              <>
                <div className="d-inline-flex align-items-center user-info mb-2 mb-lg-0">
                  <img
                    src={auth.user.photoURL || userPhoto}
                    alt="User"
                    className="user-avatar me-2"
                  />
                  <span className="fw-semibold">{auth.user.displayName}</span>
                </div>
                <button
                  onClick={() => auth.signOut()}
                  className="btn btn-outline-primary rounded-pill px-3 ms-lg-3 mt-2 mt-lg-0"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary rounded-pill px-4 mt-2 mt-lg-0"
                onClick={() => navigate('/signup')}
              >
                Đăng Ký
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
