# 📝 Ứng dụng Tạo và Chia sẻ CV Chuyên nghiệp (React Component Library)

> Dự án này là một thư viện template React dùng để tạo, xem trước và chia sẻ CV (Resume) chuyên nghiệp. Điểm mạnh là khả năng xuất CV ra định dạng PDF và chia sẻ dữ liệu qua URL được mã hóa mà không cần Database.

## ✨ Tính năng chính

* **Đa dạng bố cục:** Hỗ trợ nhiều layout CV khác nhau (Kinh điển, 2 Cột Hiện đại, Sidebar).
* **Tùy chỉnh Theme:** Dễ dàng thay đổi màu sắc chủ đạo (`themeColor`) cho từng template.
* **Xuất PDF:** Chức năng tải CV về dưới dạng PDF chuẩn A4, bảo toàn định dạng (sử dụng **html2canvas** và **jspdf**).
* **Chia sẻ dữ liệu qua URL:** Mã hóa toàn bộ dữ liệu CV (JSON) vào URL (`/cv-viewer?data=...`) để chia sẻ cho người khác xem mà không cần Database.
* **Tách biệt thiết kế:** Thiết kế CV được tách biệt hoàn toàn khỏi logic nhập liệu.

## 🛠️ Công nghệ sử dụng

| Loại | Công nghệ | Mục đích |
| :--- | :--- | :--- |
| **Frontend** | ReactJS, JavaScript (ES6+) | Giao diện người dùng và logic ứng dụng. |
| **Styling** | SCSS/CSS | Định kiểu chuyên nghiệp, tối ưu hóa bố cục in ấn. |
| **PDF Export** | `jspdf`, `html2canvas` | Chuyển đổi HTML/CSS thành file PDF. |
| **Routing** | React Router DOM | Quản lý đường dẫn `/cv-viewer`. |
| **Data Handling**| `btoa`/`atob` | Mã hóa/Giải mã dữ liệu CV cho URL. |

---

## 🏗️ Cấu trúc Template (Layouts)

Dự án cung cấp một loạt các component hiển thị CV khác nhau, tất cả đều nhận chung một mô hình dữ liệu (`data` object).

| Component | Mô tả bố cục | Chú thích |
| :--- | :--- | :--- |
| `RightContent` | Bố cục đơn giản, truyền thống (Mục theo thứ tự). | Dễ chỉnh sửa, cổ điển. |
| `RightContent2` | Bố cục **2 Cột Hiện đại**. Header/Summary chiếm trọn, phần còn lại chia 2 cột. | Tận dụng tối đa không gian. |
| **`RightContent3`** | Bố cục **Sidebar Kinh điển**. Thông tin cá nhân bên trái (màu nền), Kinh nghiệm bên phải. | Chuyên nghiệp, ấn tượng. |
| `RightContent5` | Bố cục **Minimalist Header**. Chỉ Sidebar hiển thị ở phần đầu trang, nội dung chi tiết nằm full-width phía dưới. | Thiết kế tối giản, nhấn mạnh header. |

## 💻 Cài đặt & Chạy Local

Bạn cần có [Node.js](https://nodejs.org/) và [npm] (hoặc yarn).

1.  Clone Repository:
    ```bash
    git clone your-repo-link
    cd your-repo-name
    ```
2.  Cài đặt dependencies:
    ```bash
    npm install
    ```
3.  Chạy ứng dụng:
    ```bash
    npm run dev  # (Hoặc npm start)
    ```

## ⚙️ Cách sử dụng Component (Mô hình Dữ liệu)

Để xem CV, bạn cần truyền dữ liệu vào component.

**Mô hình dữ liệu cơ bản:**

```javascript
const cvData = {
    personalInfo: { 
        name: "John Doe", 
        title: "Software Engineer", 
        email: "john.doe@example.com" 
    },
    summary: "Proven ability to...",
    experience: [{ title: "Dev", company: "ABC" }],
    education: [{ school: "University X", year: "2018-2022" }],
    skills: ["React", "NodeJS", "MongoDB", "SCSS"],
    // ... các mục khác
};
