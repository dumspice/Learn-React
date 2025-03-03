# Khái niệm của useMemo:

- Tên giống với memo trong react, cũng dùng để ghi nhớ nhưng có công dụng khác memo.

# So sánh useMemo với memo:

- memo là một Higher Order Component, còn useMemo là một hook.
- memo được dùng để wrap một component, còn useMemo dùng bên trong một function component.
- memo dùng để tránh component bị re-render trong những tình huống không cần thiết, useMemo giúp tránh thực hiện lại một logic nào đó không cần thiết.

# Bài toán:

- Cho 2 thẻ input nhập tên và giá của sản phẩm.
- Khi nhập tên và giá của sản phẩm thì bấm button Add.
- Sản phẩm sẽ hiển thị ở bên dưới Total.

* Vấn đề:

- Khi tính tổng giá các sản phẩm, component bị re-render liên tục -> không cần thiết.

# Cú pháp:

```jsx
useMemo(callback, deps);
```

- Nguyên lý hoạt động của deps giống useEffect háy useCallback.

# Các mẹo convert chuỗi sang số:

- Dùng Number(biến):

```jsx
const handleSubmit = () => {
  setProducts(...products, {
    name,
    price: Number(price),
  });
};
```

- Dùng parseInt, parseFloat...:

```jsx
const handleSubmit = () => {
  setProducts(...products, {
    name,
    price: parseInt(price),
  });
};
```

- Dùng một dấu + đặt trước số:

```jsx
const handleSubmit = () => {
  setProducts(...products, {
    name,
    price: +price,
  });
};
```
