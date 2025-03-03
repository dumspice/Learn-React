# Redux vs React-Context:

1. Debugging Capabilities:
2. Middleware
3. Addons and extensibility
4. Cross-platform and cross-framework usage
5. Depending on your app's set up, much better than working with just Context.

-> Context được dùng cho dự án vừa, nhỏ. Trong trường hợp set lại state không nhiều

# Bài toán Todo List:

///Provider

```jsx
import Context from "./Context";
import { useReducer } from "react";
import reducer, { initialState } from "./reducer";
import logger from "./logger";

function Provider({ children }) {
  const [state, dispatch] = useReducer(logger(reducer), initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export default Provider;
```

//Context

```jsx
import { createContext } from "react";

const Context = createContext();

export default Context;
```

///reducer

```jsx
import { constants } from ".";

export const initialState = {
  todos: [],
  todoInput: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case constants.SET_TODO:
      return {
        ...state,
        todoInput: action.payload,
      };
    case constants.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case constants.DELETE_TODO:
      let newTodos = [...state.todos];
      newTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: newTodos,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export default reducer;
```

//constants

```jsx
export const SET_TODO = "set_todo";
export const ADD_TODO = "add_todo";
export const DELETE_TODO = "delete_todo";
```

//actions

```jsx
import { SET_TODO, ADD_TODO, DELETE_TODO } from "./constants";

export const setTodo = (payload) => {
  return {
    type: SET_TODO,
    payload,
  };
};
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};
```

//logger

```jsx
function logger(reducer) {
  return (prevState, action) => {
    console.group(action.type);
    console.log("Prev State: ", prevState);
    console.log("action: ", action);

    const nextState = reducer(prevState, action);

    console.log("Next State: ", nextState);
    console.groupEnd();
    return nextState;
  };
}

export default logger;
```

//index.js

```jsx
export { default as StoreProvider } from "./Provider";
export { default as StoreContext } from "./Context";
export { useStore } from "./hooks";
export * as actions from "./actions";
export * as constants from "./constants";
```

- Tạo ra index này để rút gọn việc import vào các component cho đỡ rối

//App

```jsx
import { useStore, actions } from "./Store";
function App() {
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;
  const { setTodo, addTodo, deleteTodo } = actions;

  const handleSubmit = (todoInput) => {
    dispatch(addTodo(todoInput));
    dispatch(setTodo(""));
  };

  const handleDelete = (index) => {
    dispatch(deleteTodo(index));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>To do list</h1>
      <input
        value={todoInput}
        onChange={(e) => dispatch(setTodo(e.target.value))}
        placeholder="Type something..."
      />
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => handleSubmit(todoInput)}
      >
        ADD
      </button>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              {todo}
              <span
                style={{ marginLeft: 5, cursor: "pointer" }}
                onClick={() => handleDelete(index)}
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

export default App;
```

# Custom Hook để import code dễ hơn:

```jsx
import Context from "./Context";
import { useContext } from "react";

export const useStore = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};
```
