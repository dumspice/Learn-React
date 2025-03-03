# Css trong dự án React:

- Khi tạo dự án bằng create-react-app, trong file src sẽ có 2 file css là index.css và App.css. Hai file này ngang hàng nhau.

//App.css

```jsx
.heading {
    color: green;
}
```

//index.css

```jsx
.heading {
    font-size: 16px;
}
```

- Thẻ h1 có className là heading vừa có color là green vừa có font-size là 16px.

- Vậy nên phải cẩn thận khi tạo và dùng file css, đặt trùng className mặc dù trong nhiều file css khác nhau vẫn có thể ảnh hưởng đến element.

# Các cách sử dụng CSS:

- Cách 1: Dùng Css inline.

```jsx
<div style={{ padding: 20 }}>
  <h1>CSS</h1>
</div>
```

- Cách 2: Tạo thư mục CSS nằm trong file src rồi import vào component mà muốn dùng css

```jsx
import "./App.css";
```

- Lưu ý:

  - Khi dùng cách 2, chạy app ở môi trường development: npm start / yarn start -> css internal.

  => Chia ra nhiều file nhỏ -> Dễ quản lý hơn.

  - Khi dùng ở môi trường production: npm run build / yarn build -> css external.

  => Gom hết vào một file -> Tối ưu về hiệu năng.

# Css trong thực tế thì như nào:

- Không đặt hết vào một file.
- Tạo ra một component rồi tạo file css import trong component đó
  -> Sau này có thêm sửa xoá thì không ảnh hưởng đến file chung.
