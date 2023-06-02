import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    count: 0,
    todos: [],
    active: "all"
};

export const getAllData = createAsyncThunk("fetch/todos", async () => {
    const res = await axios.get("http://localhost:8000/todos/api");
    return res.data;
  });
  export const postTodo = createAsyncThunk("post/todos", async (obj) => {
    const res = await axios.post("http://localhost:8000/todos/api", obj);
    return res.data;
  });
  export const deleteTodo = createAsyncThunk("delete/todo", async (id) => {
    const res = await axios.delete("http://localhost:8000/todos/api/" + id);
    return res.data;
  });
  export const handleCheckTodo = createAsyncThunk(
    "handleCheck/todo",
    async (payload) => {
      const res = await axios.put(
        "http://localhost:8000/todos/api/" + payload.id,
        payload.updatedObj
      );
      return res.data;
    }
  );
  export const deleteCompletedTodoAction = createAsyncThunk(
    "deleteCompleted/todos",
    async (completedTodos, { dispatch }) => {
      await axios
        .put("http://localhost:8000/todos/api/delete/completed", completedTodos)
        .then(() => dispatch(getAllData()));
    }
  );


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

        addTodo: (state, action) => {
            const todo = {
                id: Math.random() * 100,
                text: action.payload,
                completed: false
            };
            state.todos = [...state.todos, todo];
            state.count += 1;
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            state.count -= 1;
        },

        toggleTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },

        removeCompletedTodos: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
            state.count = state.todos.length;
        },
        setActiveFilter: (state, action) => {
            state.active = action.payload;
        }
    },
});

export const { addTodo, removeTodo, toggleTodo, removeCompletedTodos, setActiveFilter } = todoSlice.actions;

export default todoSlice.reducer;
