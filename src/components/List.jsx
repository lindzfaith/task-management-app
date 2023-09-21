import React from 'react';
import '../styles/List.css'; 
import cx from 'classnames';

function TaskList({ tasks, title, onAdd, onDelete, onMarked }) {
    const add = (event) => {
        onAdd(event.currentTarget.name, document.getElementById("tasks").value);
        document.getElementById("tasks").value = "";
    }
    const remove = (event) => {
        onDelete(event.currentTarget.name, event.currentTarget.parentNode.parentNode.id);
    }
  return (
    <div className="task-list">
        <label className="task-title">{title}</label>
        <ul>
        {tasks.map((task) => (
            <li id={task.id} key={task.id} className={cx("task-item", task.marked ? "marked" : "")}>
                <label>{task.text}</label>
                <div id={task.id} className="task-item-button">
                    <button onClick={() => onMarked(title, task.id)} className="mark-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="1em" viewBox="0 0 448 512">
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                        </svg>
                    </button>
                    <button name={title} onClick={(e) => remove(e)} className="delete-button">
                        X
                    </button>
                </div>
            </li>
        ))}
        </ul>
        <div className="add-task-container">
            <input
            type="text"
            placeholder="Add a new task..."
            className="task-input"
            id={"tasks"}
            />
            <button name={title} onClick={(e) => add(e)} className="create-button">
            +
            </button>
        </div>
    </div>
  );
}

export default TaskList;