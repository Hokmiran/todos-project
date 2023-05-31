import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeCompletedTodos } from '../slice/todoSlice';

function Footer({ setFilter, filter, activeCount, completedCount }) {
    const { count } = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    const handleClearCompleted = () => {
        dispatch(removeCompletedTodos());
    };
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{count}</strong> items left
            </span>

            <ul className="filters">
                <li>
                    <button
                        className={filter === 'all' ? 'selected' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        className={filter === 'active' ? 'selected' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        className={filter === 'completed' ? 'selected' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </li>
            </ul>

            {count > 0 && (
                <button className="clear-completed" onClick={handleClearCompleted}>
                    Clear Completed
                </button>
            )}
        </footer>
    )
}

export default Footer

