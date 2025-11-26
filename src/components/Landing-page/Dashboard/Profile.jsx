import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);

  const [name, setName] = useState("Nguyệt Thiên");
  const [email, setEmail] = useState("thien@gmail.com");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Khi component load → lấy dữ liệu từ localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      setName(savedProfile.name || "");
      setEmail(savedProfile.email || "");
      setPhone(savedProfile.phone || "");
      setAddress(savedProfile.address || "");
      setAvatar(savedProfile.avatar || null);
    }
  }, []);

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  // Lưu vào localStorage
  const saveProfile = () => {
    const profileData = {
      name,
      email,
      phone,
      address,
      avatar
    };

    localStorage.setItem("profile", JSON.stringify(profileData));
    alert("Đã lưu thay đổi!");
  };

  return (
    <div className="page">
      <h2>Thông tin cá nhân</h2>

      <div className="profile-card">

        <div className="avatar-section">
          <img src={avatar || "/default-avatar.png"} alt="avatar" />
          <label className="avatar-upload">
            Chọn ảnh
            <input type="file" onChange={onUpload} hidden />
          </label>
        </div>

        <div className="form-section">
          <label>Họ và tên</label>
          <input
            type="text"
            value={name}
            placeholder="Nhập họ tên"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Số điện thoại</label>
          <input
            type="text"
            value={phone}
            placeholder="0123 456 789"
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Địa chỉ</label>
          <input
            type="text"
            value={address}
            placeholder="Thành phố, quốc gia..."
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="btn-save" onClick={saveProfile}>
            Lưu thay đổi
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
