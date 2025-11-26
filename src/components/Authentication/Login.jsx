import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/dashboard");   // ⭐ CHUYỂN TRANG NGAY
  };

  const handleGoogleLogin = () => {
    navigate("/dashboard");   // ⭐ CŨNG CHUYỂN TRANG NGAY
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="text-center py-4">
          <Link to="/" className="text-info nav-link">
            <h2>Resume Builder</h2>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="py-3">
          <h1 className="lead text-center py-3">Chào mừng bạn quay lại!</h1>

          <div className="form-group">
            <input
              {...register("email")}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              placeholder="Mật khẩu"
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Đăng nhập
          </button>

          <button
            type="button"
            className="btn btn-google btn-block mt-3"
            onClick={handleGoogleLogin}
          >
            <i className="fab fa-google"></i> Đăng nhập với Google
          </button>

          <div className="option text-center my-3">
            <label onClick={() => navigate("/signup")}>Tạo tài khoản</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;