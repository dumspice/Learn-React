# Context là gì:

- Ngữ cảnh: tạo ra một phạm vi cho phép truyền dữ liệu trong phạm vi đó.

  - ví dụ: context ôm compA thì từ compA có thể truyền dữ liệu đi khắp comp con.

- Đây là khái niệm giúp dev đơn giản hoá việc truyền dữ liệu từ component cha xuống các component con mà không cần dùng tới props.

- Ví dụ: truyền dữ liệu từ A => B => C

  - Thông thường phải truyền props từ A đến B rồi đến C.
  - Dùng khái niệm context thì có thể truyền thẳng từ A => C.

- Trong React, có thể tạo ra vô số context khác nhau, mỗi lần gọi createContext sẽ tạo ra một context cụ thẻ.

# Ví dụ trong bài: Chuyển theme dark / light:

- Vấn đề là thằng component B chỉ đứng trung gian, trong trường hợp không dùng đến props thì không cần nhận.

# Các bước để học context:

- Bước 1: Create context.
- Bước 2: Nắm được khái niệm Provider. (cung cấp dữ liệu)
- Bước 3: Nắm được khái niệm Consumer. (Sử dụng dữ liệu)

# Sử dụng context:

- Khai báo context.
- Provider ôm component cha.

```jsx
const ThemeContext = createContext()

<ThemeContext.Provider value={theme}>
  <div style={{ padding: "10px 20px" }}>
    <button onClick={toggleChange}>Change Theme</button>
    <Content theme={theme} />
  </div>
</ThemeContext.Provider>
```

- Khi truyền value vào, tất cả children của thằng Provider sẽ nhận được value ở đây là theme.

- Muốn nhận dữ liệu của ThemeContext.Provider thì phải lấy được chính ThemeContext

- Consumer nhận lại dữ liệu từ Provider:

```jsx
import { useContext } from "react";
import { ThemeContext } from "./App";

function Paragraph() {
  const theme = useContext(ThemeContext);

  console.log(theme);

  return (
    <p className={theme}>
      Nhóm ReactJS - Việt Nam trước đây (không phải nhóm của F8) đã bị chủ sở
      hữu cũ bán, nhóm không còn chất lượng vì có nhiều tin bán hàng, quảng cáo.
    </p>
  );
}

export default Paragraph;
```

- Có sử dụng useContext, trong hook này đã có sẵn Consumer nên cứ thế mà dùng.

- Truyền ThemeContext vào bên trong useContext() -> Consumer nhận dữ liệu từ Provider

# Tái cấu trúc:

- Thông thường sẽ dùng Context ở file to nhất, cấp bao quát nhất.

//ThemeContext

```jsx
import { useState, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
```

- ThemeProvider đóng vai trò là Provider bao các component trong index.js

//index.js

```jsx
<React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</React.StrictMode>
```

//App.js

```jsx
function App() {
  const context = useContext(ThemeContext);

  return (
    <div style={{ padding: "10px 20px" }}>
      <button onClick={context.toggleTheme}>Change Theme</button>
      <Content />
    </div>
  );
}
```

- Trong App.js gọi hook useContext(ThemeContext) với mục đích dùng value của context

//Paragraph.js

```jsx
function Paragraph() {
  const context = useContext(ThemeContext);

  return (
    <p className={context.theme}>
      Nhóm ReactJS - Việt Nam trước đây (không phải nhóm của F8) đã bị chủ sở
      hữu cũ bán, nhóm không còn chất lượng vì có nhiều tin bán hàng, quảng cáo.
    </p>
  );
}
```
