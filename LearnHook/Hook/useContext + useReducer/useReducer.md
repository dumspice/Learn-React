# Khái niệm useReducer:

- Học reduce() thì giúp ích rất tốt cho useReducer, hay thư viện redux.

# Dùng để làm gì:

- Cho thêm một sự lựa chọn khi sử dụng state cho function component.
- useState làm được cái gì thì useReducer làm được cái đó và ngược lại.

# Khi nào thì dùng useState, khi nào thì dùng useReducer:

- Trong hầu hết mọi trường hợp, có thể dùng useState để tạo ra trạng thái cho component.
- useState phù hợp với component có state đơn giản như chuỗi, số, boolean, hoặc object, array 1 cấp.
- useReducer được sử dụng khi state của component phức tạp hơn.

# Cú pháp của useReducer:

- Trong useReducer có tới 3 đối số, nhưng chỉ dùng 2 đối số là chính.

```jsx
useReducer(reducer, initialState);
```

- Nguyên lý hoạt động:
  - Khi component chạy lần đầu, chạy useReducer, nhận reducer, initialState rồi return 1 array. (khi chạy lần đấu sẽ k gọi reducer)
  - Reducer sẽ lấy giá trị initialState để lưu vào biến khởi tạo.

# Cách tạo Reducer:

- Reducer là một hàm, hoạt động theo nguyên tắc nhận input -> return output mới
- Dựa vào action để quyết định return state như nào.

```jsx
const reducer = (state, action) => {
  switch (action) {
    case UP_ACTION:
      return state + 1;
    case DOWN_ACTION:
      return state - 1;
    default:
      throw new Error("Invalid Action");
  }
};
```

- return dữ liệu đúng với initial state.

# Ví dụ đơn giản: Ứng dụng đếm số:

- Các bước triển khai useReducer trong bài toán:

1. Khởi tạo initial state = 0.
2. Actions: Up (state + 1) / Down (state - 1)
3. Reducer
4. Dispatch (Kích hoạt một actions)

```jsx
import { useReducer } from "react";

const initialState = 0;
const UP_ACTION = "up";
const DOWN_ACTION = "down";

const reducer = (state, action) => {
  switch (action) {
    case UP_ACTION:
      return state + 1;
    case DOWN_ACTION:
      return state - 1;
    default:
      console.error("Invalid Action");
  }
};
function App() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px 40px" }}>
      <h1>{count}</h1>
      <button onClick={() => dispatch(UP_ACTION)}>UP</button>
      <button onClick={() => dispatch(DOWN_ACTION)}>DOWN</button>
    </div>
  );
}

export default App;
```

# Ví dụ phức tạp: TodoList sử dụng useReducer:

- Nhập tên công việc -> bấm Add thì công việc hiển thị phía dưới -> bấm X -> xoá công việc -> Thêm công việc thành công -> Xoá input, focus input.

```jsx
import { useReducer, useRef } from "react";

// useReducer

// initialState
const initialState = {
  jobName: "",
  jobList: [],
};

//Action
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

//reducer
const reducer = (state, action) => {
  console.log("PrevState: ", state);
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        jobName: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobList: [...state.jobList, action.payload],
      };
      break;
    case DELETE_JOB:
      const newJobs = [...state.jobList];
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobList: newJobs,
      };
      break;
    default:
      throw new Error("Invalid Action");
  }
  console.log("New State: ", newState);
  return newState;
};

function App() {
  const [job, dispatch] = useReducer(reducer, initialState);
  const focusRef = useRef(null);

  const handleSubmit = () => {
    dispatch(addJob(jobName));
    dispatch(setJob(""));

    focusRef.current.focus();
  };

  const handleDelete = (index) => {
    dispatch(deleteJob(index));
  };

  const { jobName, jobList } = job;

  return (
    <div style={{ padding: "0 20px" }}>
      <h1>Todo List</h1>
      <input
        ref={focusRef}
        value={jobName}
        onChange={(e) => dispatch(setJob(e.target.value))}
        placeholder="Enter task..."
        style={{ marginRight: "5px" }}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobList.map((job, key) => {
          return (
            <li key={key}>
              {job} <button onClick={() => handleDelete(key)}>&times;</button>
            </li>
          );
        })}
        {/* <li>Do laundry &times;</li>
        <li>Making dinner &times;</li>
        <li>Pet Mong mong &times;</li> */}
      </ul>
    </div>
  );
}

export default App;
```

# Trong bài toán phức tạp, useReducer giúp ích như nào:

- Trong component chỉ dùng đúng một useReducer, function reducer hay initial state đều được khai báo ở bên ngoài component.
  -> Có thể tách ra thành 1 file riêng

- Có thể dùng để tổ chức file code rõ ràng hơn.

-> Bóc tách logic trong component tốt hơn useState.

- Sau khi tách file ra code trong component nhìn sẽ gọn gàng hơn.

//Constants

```jsx
export const SET_JOB = "set_job";
export const ADD_JOB = "add_job";
export const DELETE_JOB = "delete_job";
```

//Actions

```jsx
import { SET_JOB, ADD_JOB, DELETE_JOB } from "./constants";

export const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

export const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};
```

//Reducer

```jsx
import { SET_JOB, ADD_JOB, DELETE_JOB } from "./constants";

export const initialState = {
  job: "",
  jobs: [],
};

export const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case DELETE_JOB:
      let newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJobs,
      };
      break;
    default:
      throw new Error("Invalid Action");
  }
  return newState;
};
```

//index

```jsx
import { useReducer, useRef } from "react";
import { initialState, reducer } from "./reducer";
import { setJob, addJob, deleteJob } from "./actions";

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const focusRef = useRef(null);

  const { job, jobs } = state;

  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    focusRef.current.focus();
  };

  const handleDelete = (index) => {
    dispatch(deleteJob(index));
  };

  return (
    <div style={{ padding: "10px 20px" }}>
      <h1>TODO LIST</h1>
      <input
        ref={focusRef}
        value={job}
        placeholder="Enter Job"
        style={{ marginRight: "10px" }}
        onChange={(e) => dispatch(setJob(e.target.value))}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, key) => {
          return (
            <li key={key}>
              {job}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(key)}
              >
                &times;
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoApp;
```

# Viết logger cho ứng dụng Todo App:

- Dùng middleware: Dùng hàm ôm hàm

//index

```jsx
const [state, dispatch] = useReducer(logger(reducer), initialState);
```

//logger

```jsx
function logger(reducer) {
  return (prevState, action) => {
    console.group(action.type);
    console.log("prevState: ", prevState);
    console.log("Action: ", action.type);

    const newState = reducer(prevState, action);

    console.log("nextState: ", newState);
    console.groupEnd();

    return newState;
  };
}

export default logger;
```
