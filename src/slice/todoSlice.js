import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    todos: [],
    active: "all"
};


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
