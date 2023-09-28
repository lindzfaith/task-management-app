import './App.css';
import React, { useState } from 'react';
import { List, Sidebar } from './components';

function App() {
  const [taskLists, setTaskLists] = useState([]);
  const [currentList, setCurrentList] = useState( 
    taskLists.length > 0 ? taskLists[0] : null );

  const updateStorage = async (lists) => {
    localStorage.setItem('taskLists', JSON.stringify(lists));
  };

  const setTitle = (oldTitle, newTitle) => {
    const copy = [...taskLists];
    for (let i = 0; i < copy.length; i++) {
      if (oldTitle === copy[i].title) {
        copy[i].title = newTitle;
        if (oldTitle === currentList.title) {
          setCurrentList(copy[i]);
        }
      }
    } 
    updateStorage(copy);
  };

  // get tasks from memory
  const getTaskList = React.useCallback(() => {
    const taskListsJson = localStorage.getItem('taskLists');
    if (taskListsJson) {
      const parsedTaskLists = JSON.parse(taskListsJson);
      setTaskLists(parsedTaskLists);
      if (!currentList && parsedTaskLists.length > 0) {
        setCurrentList(parsedTaskLists[0]);
      }
    }
  }, [currentList]);
  
  // create a task list
  const createTaskList = async (title) => {
      const copy = [...taskLists]; 
      copy.push({ title: title, tasks: [], marked: false });
      setTaskLists(copy);
      setCurrentList(copy[copy.length - 1]);
      updateStorage(copy);
  };

  const createTaskForList = async (title, text) => {
    const copy = [...taskLists];
    for (let i = 0; i < copy.length; i++) {
      if (title === copy[i].title) {
        let index = copy[i].tasks.length;
        for (let j = 0; j < copy[i].tasks.length; j++) {
          if (copy[i].tasks[j].marked && j < index) {
            index = j;
          }
        }
        copy[i].tasks.splice(index, 0, {text: text, id: `${title}-${copy[i].tasks.length}`});
        if (title === currentList.title) {
          setCurrentList(copy[i]);
        }
      }
    } 
    updateStorage(copy);
  };

  const deleteTaskList = (title) => {
    getTaskList();
    const copy = [...taskLists].filter((list) => list.title !== title);
    // set the task list to the copy
    setTaskLists(copy);

    // update the current if it is the deleted list
    if (currentList && currentList.title === title) {
      if (copy.length > 0) {
        setCurrentList(copy[0]);
      } else {
        setCurrentList(null);
      }
    }
    updateStorage(copy);
  }

  const deleteTaskFromList = (title, task) => {
    const copy = [...taskLists];
    for (let i = 0; i < copy.length; i++) {
      if (title === copy[i].title) {
        copy[i].tasks = copy[i].tasks.filter((aTask) => aTask.id !== task);
        if (title === currentList.title) {
          setCurrentList(copy[i]);
        }
      }
    }
    // set the task list to the copy
    setTaskLists(copy);
    updateStorage(copy);
  }

  const selectList = (list) => {
    for (let i = 0; i < taskLists.length; i++) {
      if (taskLists[i].title === list) {
        setCurrentList(taskLists[i]);
      }
    }
  }

  const markTaskComplete = (list, task) => {
    const copy = [...taskLists];
    for (let i = 0; i < taskLists.length; i++) {
      if (copy[i].title === list) {
        for (let j = 0; j < copy[i].tasks.length; j++) {
          if (task === taskLists[i].tasks[j].id) {
            let copyOfTask = copy[i].tasks[j];
            copyOfTask.marked = true;
            // move to end of list if it is marked out
            let copyOfTasks = [...copy[i].tasks];
            copyOfTasks.splice(j, 1);
            copyOfTasks[copyOfTasks.length] = copyOfTask;
            copy[i].tasks = [...copyOfTasks];
            setTaskLists(copy);
            setCurrentList(copy[i]);
          }
        }
      }
    }
    updateStorage(copy);
  }

  React.useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  return (
    <div className="App">
      <header>
        <h1>YourTaskFriend</h1>
      </header>
      <main>
        <Sidebar lists={taskLists} onAdd={createTaskList} onDelete={deleteTaskList} onSelect={selectList} onEdit={setTitle} />
        {currentList && <List title={currentList.title} onAdd={createTaskForList} tasks={currentList.tasks} onDelete={deleteTaskFromList} onMarked={markTaskComplete}/>}
      </main>
    </div>
  );
}

export default App;
