
const btn = document.querySelector('.btn');
const addTaskBar = document.getElementById('add-task-bar');
const ul = document.querySelector('ul');
const filter = document.querySelector('.filter');
const btnClr = document.querySelector('.btn-clear');


btn.addEventListener('click', addTask);
document.body.addEventListener('click', removeTask);
filter.addEventListener('keyup', filterTasks);
btnClr.addEventListener('click', clearTasks);
document.addEventListener('DOMContentLoaded', getTasks);

// Add Task
function addTask(e) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  
  li.className = 'item';

  ul.appendChild(li);
  li.appendChild(document.createTextNode(addTaskBar.value));
  li.appendChild(link);

  link.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  addTasktoLocalStorage(addTaskBar.value);
  
  addTaskBar.value = '';

  e.preventDefault();
}

// Add Task to LS
function addTasktoLocalStorage(task) {
  let tasks;
  
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from LS after reloading page
function getTasks() {
  let tasks;
  
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
  const link = document.createElement('a');
  
  li.className = 'item';

  ul.appendChild(li);
  li.appendChild(document.createTextNode(task));
  li.appendChild(link);

  link.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  })
}

// Remove Task
function removeTask(e) {
  if(e.target.className === 'fa-solid fa-xmark') {
    e.target.parentElement.parentElement.remove();
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  
  e.preventDefault();
}

// Remove Task from LS
 function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 
  
  if(taskItem.textContent === task) {
      tasks.forEach(function(task, index){
        task.splice(index, 1);
      })
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
 }

// Filter through Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('li').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex'
    } else {
      task.style.display = 'none'
    }
  })
}

// Clear Tasks
function clearTasks() {
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

