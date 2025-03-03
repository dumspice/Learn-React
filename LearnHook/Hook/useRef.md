# useRef là gì:

- Là một hàm.

# Cú pháp:

```jsx
useRef(initialValue);
```

- Lưu ý:

* Chỉ sử dụng initialValue vào lần đầu tiên component mounted.
* Khi component re-render, thì không dùng initialValue nữa.
* Return 1 object có property là current.
* Khai báo biến useRef là const, vì chỉ gán lại giá trị cho property là current thôi.

# Chức năng của useRef:

- Dùng để lưu các giá trị bất kì qua một biến tham chiếu bên ngoài function component.

- Muốn clearInterval thì mình có thể truyền vào intervalID

- Mỗi khi app re-render, thì function sẽ tạo ra phạm vi mới, code ở trong function sẽ không liên quan gì đến phạm vi cũ. (Kiến thức trong javascript).

- Muốn dùng được giá trị của useRef, nhớ phải dùng property current.

VÍ DỤ:

```jsx
const ref = useRef(1)

console.log(ref.current) -> 1
```

# Vấn đề:

```jsx
function Content() {
  const [count, setCount] = useState(60);

  let timerID;

  const handleStart = () => {
    timerID = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerID);
    console.log("stop", timerID);
  };
}
```

- Ở ví dụ trên, timerID đang được khai báo là undefined. Khi đó, intervalID được gán vào timerID.

- Khi setCount, app re-render -> function App không liên quan đến phạm vi cũ nữa -> timerID = undefined.

# Sử dụng useRef để giải quyết vấn đề:

- useRef sẽ tạo một biến tham chiếu bên ngoài function component -> không ảnh hưởng đến phạm vi của function nữa.

```jsx
const [count, setCount] = useState(60);
let timerID = useRef();

const handleStart = () => {
  timerID.current = setInterval(() => {
    setCount((prevCount) => prevCount - 1);
  }, 1000);
};

const handleStop = () => {
  clearInterval(timerID.current);
  console.log("stop", timerID);
};
```

# Ví dụ 1: Muốn biết giá trị hiện tại của state và giá trị trước đó (trước một lần render) của state:

```jsx
const [count, setCount] = useState(60);
const timerID = useRef();
const prevCount = useRef();

useEffect(() => {
  prevCount.current = count;
}, [count]);

const handleStart = () => {
  timerID.current = setInterval(() => {
    setCount((prevCount) => prevCount - 1);
  }, 1000);
};

const handleStop = () => {
  clearInterval(timerID.current);
};

console.log(count, prevCount.current);

return (
  <div style={{ padding: 20 }}>
    <p>{count}</p>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
  </div>
);
```

# Muốn lấy thuộc tính của DOM element:

- Lấy kích thước, toạ độ của Dom element

```jsx
useEffect(() => {
  const rect = pRef.current.getBoundingClientRect();

  console.log(rect);
});

return (
  <div style={{ padding: 20 }}>
    <p ref={pRef}>{count}</p>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
  </div>
);
```
