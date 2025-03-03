# Dùng để làm gì:

- Giúp tuỳ chỉnh được ref của một funciton component.
- Đảm bảo tính đóng gói của component -> Tránh để lộ những phương thức của component ra bên ngoài.

# Bài toán: Làm một trình phát video có thể bấm play và pause

//Video.js

```jsx
import video1 from "./video/video1.mp4";
import { forwardRef, useImperativeHandle, useRef } from "react";
function Video(props, ref) {
  const videoRef = useRef();
  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    pause() {
      videoRef.current.pause();
    },
  }));

  return <video ref={videoRef} src={video1} width={350}></video>;
}

export default forwardRef(Video);
```

- Sử dụng useImperativeHandle để tạo ra 2 phương thức play và pause trong component Video.
- Tránh sử dụng ở bên ngoài function App.
- Ngoài ra còn sử dụng HOC forwardRef, để khi truyền ref từ App vào Video, thì forwardRef sẽ nhận ref trước rồi truyền vào video để dùng.

//App.js

```jsx
import { useImperativeHandle, useRef } from "react";
import Video from "./Video";

function App() {
  const videoRef = useRef();

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  useEffect(() => {
    console.log("videoRef", videoRef.current);
  });

  return (
    <div>
      <Video ref={videoRef} />
      <button onClick={videoRef.current.play}>Play</button>
      <button onClick={videoRef.current.pause}>Pause</button>
    </div>
  );
}
export default App;
```
