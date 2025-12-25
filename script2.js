let tasks = [];
let currentTab = "today";

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("taskDate").value;
  const priority = document.getElementById("taskPriority").value;

  if(!text || !date) return alert("Enter task and date!");

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
    addedAt: new Date(),
    dueDate: new Date(date),
    priority: priority
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  const today = new Date();
  today.setHours(0,0,0,0);

  tasks.forEach(task => {
    const li = document.createElement("div");
    li.className = "task-card " + (task.completed ? "completed-task" : "");

    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})">
        <span class="task-name">${task.text}</span>
        <span class="task-date">${task.dueDate.toDateString()}</span>
        <span class="priority ${task.priority}"></span>
      </div>
      <div class="actions">
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    if(task.completed) {
      completedList.appendChild(li);
    } else {
      if(currentTab === "today" && isSameDate(task.dueDate, today)) taskList.appendChild(li);
      else if(currentTab === "pending" && task.dueDate >= today) taskList.appendChild(li);
      else if(currentTab === "overdue" && task.dueDate < today) taskList.appendChild(li);
    }
  });
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  const newDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate.toISOString().split('T')[0]);
  if(newText && newDate) {
    task.text = newText;
    task.dueDate = new Date(newDate);
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function showTab(tabName){
  currentTab = tabName;
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add("active");
  renderTasks();
}

function isSameDate(d1, d2){
  return d1.getFullYear()===d2.getFullYear() &&
         d1.getMonth()===d2.getMonth() &&
         d1.getDate()===d2.getDate();
}

renderTasks();
