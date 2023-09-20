var taskListsJson = [];
var taskLists = [];

function getTaskList() {
    taskListsJson = localStorage.getItem('taskLists');
    if (taskListsJson) {
        taskLists = JSON.parse(taskListsJson);
        return taskLists;
    } 
    return taskLists;
}

function createTaskList(title) {
    taskLists[taskLists.length] = {title: title, tasks: []};
    localStorage.setItem('taskLists', taskListsJson);
}