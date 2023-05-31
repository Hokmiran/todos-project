import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, toggleTodo } from '../slice/todoSlice';
import Footer from './Footer';

function Todos() {
    const { todos } = useSelector((state) => state.reducer);

    const dispatch = useDispatch();

    const [filter, setFilter] = useState('all');

    const handleTodoDelete = (id) => {
        dispatch(removeTodo(id));
    };

    const handleTodoDone = (id) => {
        dispatch(toggleTodo(id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') {
            return !todo.completed;
        }
        if (filter === 'completed') {
            return todo.completed;
        }
        return true;
    });

    const activeCount = todos.filter((todo) => !todo.completed).length;
    const completedCount = todos.filter((todo) => todo.completed).length;

    return (
        <>
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>

                <ul className="todo-list">
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((todo) => (
                            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                                <div className="view">
                                    <input
                                        className="toggle"
                                        type="checkbox"
                                        checked={todo.completed || false}
                                        onChange={() => handleTodoDone(todo.id)}
                                    />
                                    <label>{todo.text}</label>
                                    <button onClick={() => handleTodoDelete(todo.id)} className="destroy"></button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                            {filter === 'all' ? 'No todos' : filter === 'active' ? 'No active todos' : 'No completed todos'}
                        </h3>
                    )}
                </ul>
            </section>

            <Footer setFilter={setFilter} filter={filter} activeCount={activeCount} completedCount={completedCount} />
        </>
    );
}

export default Todos;
