import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addTodo } from "../slice/todoSlice";


function Header() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleAddTodo = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
    };

    return (
        <>
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={handleAddTodo}>
                    <input onInput={(e) => setInput(e.target.value)} className="new-todo" placeholder="What needs to be done?" autoFocus />
                </form>
            </header>
        </>
    )
}

export default Header;