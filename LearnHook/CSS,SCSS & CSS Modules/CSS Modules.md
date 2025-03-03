# Vấn đề tồn từ bài Use Css in React:

- Kể cả khi tách file riêng ra, component vẫn có thể bị ảnh hưởng nếu đặt trùng tên className.

# Css Module là gì:

- Là một khái niệm giúp tạo ra các file css độc lập mà không bị ảnh hưởng tới nhau.

# Giải quyết vấn đề:

- Có 2 cách:

1. Cách 1: Dùng CSS Module.

- Đầu tiên tên file css phải theo cấu trúc sau

  "tên.module.css"

- Khi tạo create-react-app mới, thì đã cấu hình cho cái css module rồi, thành một object. Chỉ cần import vào dùng.

```jsx
import styles from "./Paragraph.module.css";
```

- Trong object styles có key là các class đã đặt, nhưng giá trị đã đổi thành của thằng file css.

- Lưu ý là trong DOM cũng đổi tên class -> nên các style với class dev đặt trong file css sẽ không được áp dụng.

- Muốn lấy được class phải dùng đúng object của thằng css module chọc vào key.

- Khi sử dụng Css module, đặt tên class theo camelCase.

```jsx
<p className={styles.paragraph}>Waiting for update signal from WDS...</p>
```

2. Cách 2: Dùng thư viên styled component.

# Nhược điểm của css module:

- Không có tính kế thừa.

- Không thể sử dụng tag name trong css module.

# Không kế thừa được thfi giải quyết bằng cách nào:

- Kết hợp cả Css bình thường và Css module.

- Tạo ra một module Global dùng cho toàn trang.

- Truyền children vào rồi return children -> Mục đích để cho children nhận được style từ GlobalStyles.
  //GlobalStyles/index.js

```jsx
import "./GlobalStyles.css";

function GlobalStyles({ children }) {
  return children;
}

export default GlobalStyles;
```

//GlobalStyles/GlobalStyles.css

```jsx
.d-flex {
  display: flex;
}
```

//App.js

```jsx
<GlobalStyles>
  <div style={{ padding: 20 }}>
    <Heading />
    <Paragraph />
  </div>
  <div className="d-flex">
    <h1>Hello</h1>
    <h2>Hallo</h2>
  </div>
</GlobalStyles>
```

- Ở đây div có className là d-flex nhận style của GlobalStyles.css
