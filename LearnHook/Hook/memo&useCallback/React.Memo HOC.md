# Cách viết:

```jsx
memo();
```

# Higher Order Component:

- Là component bậc cao,
- Không dùng ở bên trong component mà bọc ở bên ngoài component.
- Muốn sử dụng HOC thì phải dùng bên ngoài, wrap cái component vào bên trong HOC.

```jsx
export default memo(App);
```

# memo là gì?

- memo không phải là một hook.
- Là một Higher Order Component (HOC)

# Tính năng:

- Ghi nhớ lại props của một component để quyết định là có render lại component đó hay không -> tối ưu performance.

- Giúp tránh bị re-render trong các tình huống không cần thiết.

# Truòng hợp sử dụng:

- Trong trường hợp component con nằm trong component cha, cha re-render nhưng con không cần thì dùng memo ở component con.

```jsx
import { useState, memo } from "react";

function Content() {
  console.log("re-render");
  return <h2>Hello Anh Em F8</h2>;
}

export default memo(Content);
```

Ở trong trường hợp này thì Content sẽ không bị re-render nữa.

# Nguyên lý hoạt động;

- Nhận vào một component, check props của component -> nếu có props bị thay đổi giá trị -> re-render, nếu không có props bị thay đổi -> không bị re-render.

* Lưu ý: một component có thể nhận nhiều props, nếu có ít nhất một props thay đổi thì memo sẽ quyết định re-render lại component.
