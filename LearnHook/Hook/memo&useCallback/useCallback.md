# Tránh tạo ra hàm mới không cần thiết với useCallback:

# Kiến thức cần có trước khi học:

- Reference types
- React memo

# Cú pháp:

```jsx
useCallback(() => {}, []);
```

- () => {}: callback function
- []: deps, hoạt động tương tư như useEffect.

# Tình huống khi phải dùng useCallback:

- Tạo ra nhiều hàm không cần thiết -> Khiến component bị re-render mặc dù đã dùng React memo

* App

```jsx
const [count, setCount] = useState(0);

const handleIncrease = () => {
  setCount((prevCount) => prevCount + 1);
};

return (
  <div style={{ padding: "10px 30px" }}>
    <Content onIncrease={handleIncrease} />
    <p>{count}</p>
  </div>
);
```

- Content

```jsx
function Content({ onIncrease }) {
  console.log("re-render");
  return (
    <>
      <h2>Hello Anh Em F8</h2> <button onClick={onIncrease}>Click me!</button>
    </>
  );
}
```

- Tình huống:

  - Trong Content không có sử dụng dữ liệu, có sử dụng memo nhưng component vẫn re-render.

- Giải thích tình huống:

  - Trong App, khi khởi tạo func handleIncrease -> tạo ra một tham chiếu mới.

  - Khi func handleIncrease thực hiện setState -> component re-render -> tạo ra một phạm vi mới -> func handleIncrease tạo tham chiếu mới.

  - Trong Content, memo kiểm tra props onIncrease -> nhận thấy có sự thay đổi -> re-render

- Khi tạo hàm mới thì hàm sẽ lưu một tham chiếu mới, mỗi hàm có một tham chiếu khác nhau.

# Khắc phục:

```jsx
const handleIncrease = useCallback(() => {
  setCount((prevCount) => prevCount + 1);
}, []);
```

- Khi ứng dụng bắt đầu chạy, useCallback sẽ nhận được callback của nó -> nhận hàm -> tạo tham chiếu -> lưu ra ngoài phạm vi của hàm App -> return tham chiếu cho biến handleIncrease.

- Khi đi render, nếu deps trống thì sẽ trả lại tham chiếu cũ -> không thay đổi -> memo k cho re-render.
