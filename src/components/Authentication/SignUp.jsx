import React from 'react';
import './Login.css';
import { useAuth } from './useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const user = await auth.signUp(data.email, data.password, data.name);

    // 🔥 Thành công → chuyển sang login
    if (user) navigate("/login");
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

          {auth.authError && <p className="text-danger">* {auth.authError}</p>}

          <div className="form-group">
            <input
              {...register("name", { required: "Vui lòng nhập họ và tên" })}
              className="form-control"
              placeholder="Họ và tên"
            />
            <span className="error">{errors.name?.message}</span>
          </div>

          <div className="form-group">
            <input
              {...register("email", { required: "Vui lòng nhập email" })}
              className="form-control"
              placeholder="Email"
            />
            <span className="error">{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <input
              type="password"
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              className="form-control"
              placeholder="Mật khẩu"
            />
            <span className="error">{errors.password?.message}</span>
          </div>

          <div className="form-group">
            <input
              type="password"
              {...register("confirm_password", {
                validate: (value) =>
                  value === watch("password") || "Mật khẩu không khớp",
              })}
              className="form-control"
              placeholder="Xác nhận mật khẩu"
            />
            <span className="error">{errors.confirm_password?.message}</span>
          </div>

          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={() => navigate("/login")}
        >
            Đăng ký
        </button>


          <div className="option text-center my-3">
            <label onClick={() => navigate("/login")}>
              Đã có tài khoản? Đăng nhập
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
