const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load task from localStorage if available 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render task on page
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Create actions wrapper
        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Complete button
        const completeBtn = document.createElement("button");
        completeBtn.className = "completeBtn";
        completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeBtn.title = "Mark as complete";
        completeBtn.addEventListener("click", () => toggleComplete(index));

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.title = "Edit task";
        editBtn.addEventListener("click", () => editTask(index));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.title = "Delete task";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add task
addBtn.addEventListener("click", () => {
    if(taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }
    tasks.push({ text: taskInput.value.trim(), completed: false });
    taskInput.value = "";
    renderTasks();
});

// Mark task as complete/incomplete
const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Edit task
const editTask = (index) => {
    let newTask = prompt("Edit task:", tasks[index].text);
    if(newTask != null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        renderTasks();
    }
};

// Delete task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

renderTasks();