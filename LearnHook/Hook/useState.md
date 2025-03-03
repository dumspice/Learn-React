# useState Hook

# Dùng khi nào:

- Khi muốn thay đổi dữ liệu thì giao diện cũng thay đổi theo (render lại theo dữ liệu).

# Cách dùng:

```jsx
import { useState } from "react";

function Component() {
  const [state, setState] = useState(false); //hook phải được gắn vào bên trong component

  console.log(state);
}
```

# Lưu ý:

    - Component được re-render sau khi `setState`.
    - initState chỉ dùng cho lần đầu.
    - Set State với callback.
    - Initial State với callback.
        - Truyền hàm vào trong useState thì state sẽ nhận return value của hàm làm initial State.
        - Sau này muốn truyền 1 tính toán nào đó làm initial state thì hãy truyền nó làm callback của useState -> tăng performance
    - Set State là thay thế state bằng giá trị mới.
