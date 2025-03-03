# Sử dụng nhiều class và class động trong React:

# Có 2 button, làm sao để button số 2 active với background là màu đỏ:

1. Cách 1: Dùng template string:

```jsx
<button className={`${styles.btn} ${styles.active}`}>Click me</button>
```

2. Cách 2: Dùng mảng:

```jsx
<button className={[styles.btn, styles.active].join(" ")}>Click me</button>
```

-> Xử lý làm sao để bên trong className là chuỗi, các class cách nhau 1 dấu cách.

# Nhưng cách trên thường k được dùng, thường dùng classnames hay clsx:

- Tính năng của 2 thư viện không khác nhau nhiều.
- Khác ở clsx ra mắt sau, cú pháp ngắn gọn hơn.

- Dùng clsx như sau:

```jsx
<button className={clsx(styles.btn, styles.active)}>Click me</button>
```

- Dùng bao nhiêu thì cứ thêm vào, tự clsx sẽ format cho.

- Muốn dùng clsx để làm class động, truyền một object vào vị trí muốn để class động.

```jsx
<button
  className={clsx(styles.btn, {
    [styles.active]: true,
  })}
>
  Click me
</button>
```

- true để áp dụng class, false để không áp dụng.

//Button.js

```jsx
function Button({ primary }) {
  const classes = clsx(styles.btn, {
    [styles.primary]: primary,
    "d-flex": false,
  });
  return <button className={classes}>Click me</button>;
}
```

- clsx có thể truyền chuỗi vào để làm class động như d-flex.

//App.js

```jsx
<GlobalStyles>
  <div style={{ padding: "10px 20px" }}>
    <Button primary />
    <Button />
  </div>
</GlobalStyles>
```

- Button nào có props là primary mới đổi màu
