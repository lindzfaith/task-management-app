import React from "react";
import '../styles/Sidebar.css';
import cx from 'classnames';

function Sidebar({lists, onAdd, onDelete, onSelect}) {
    const add = () => {
        onAdd(document.getElementById("task-lists").value);
        document.getElementById("task-lists").value = "";
    }
    const remove = (event) => {
        onDelete(event.currentTarget.id);
    }
    return (
        <aside>
            <ul>
                {lists?.map((list) => (
                    <li key={list.title} className="task-list-a">
                        <label onClick={() => onSelect(list.title)}>{list.title}</label>
                        <div>
                            <button id={list.title} onClick={(e) => remove(e)}>x</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="task-list-b">
                <input
                type="text"
                placeholder="Create a new list..."
                className="task-input"
                id="task-lists"
                />
                <button className="create-button" onClick={add}>
                +
                </button>
        </div>
        </aside>
    );
}

export default Sidebar;