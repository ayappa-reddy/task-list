// Get UI vars
const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const filter = document.querySelector(".filter");
const taskList = document.querySelector(".task-list");
const clear = document.querySelector(".clear");

// Load all Event Listeners
loadAllEventListeners();

function loadAllEventListeners() {
  document.addEventListener("DOMContentLoaded", displayTasksFromLS);

  taskForm.addEventListener("submit", submitTask);

  taskList.addEventListener("click", deleteTask);

  filter.addEventListener("keyup", filterTasks);

  clear.addEventListener("click", clearTasks);
}

function displayTasksFromLS() {
  const tasks = getTasksFromLS();

  tasks.forEach(function(task) {
    addTask(task);
  });
}

function getTasksFromLS() {
  let tasks;

  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
}

function addTask(value) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const deleteLink = document.createElement("a");
  deleteLink.className = "delete-task";
  deleteLink.innerHTML = "&times";

  taskItem.appendChild(document.createTextNode(value));
  taskItem.appendChild(deleteLink);

  taskList.appendChild(taskItem);
}

function submitTask(e) {
  e.preventDefault();

  if (taskInput.value) {
    addTask(taskInput.value.trim());
    storeTaskInLocalStorage(taskInput.value.trim());
  }

  taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
  const tasks = getTasksFromLS();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.classList.contains("delete-task") && confirm("Are you sure?")) {
    e.target.parentElement.remove();
    deleteTaskFromLS(e.target.parentElement.firstChild.textContent);
  }
}

function deleteTaskFromLS(taskToDelete) {
  let tasks = getTasksFromLS();

  tasks.forEach(function(task, index) {
    if (task === taskToDelete) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(e) {
  const taskItems = document.querySelectorAll(".task-item");

  let searchVal = e.target.value.toLowerCase().trim();

  taskItems.forEach(function(taskItem) {
    if (taskItem.textContent.toLowerCase().indexOf(searchVal) !== -1) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}

function clearTasks() {
  if (taskList.children.length && confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    clearAllTasksFromLS();
  }
}

function clearAllTasksFromLS() {
  localStorage.clear();
}
