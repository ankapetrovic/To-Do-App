document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector(".task-input");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const taskList = document.querySelector(".task-list");
    const currentTime = document.querySelector(".current-time");

    // Buttons for theme changing
    const defaultTheme = document.querySelector(".theme-default");
    const lightTheme = document.querySelector(".theme-light");
    const darkTheme = document.querySelector(".theme-dark");

    // Loading previous theme
    const savedTheme = localStorage.getItem("theme") || "default";
    document.body.classList.add(savedTheme);

    defaultTheme.addEventListener("click", () => setTheme("default"));
    lightTheme.addEventListener("click", () => setTheme("light"));
    darkTheme.addEventListener("click", () => setTheme("dark"));

    function setTheme(theme) {
        document.body.className = "";
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }

    function updateTime() {
        const now = new Date();
        currentTime.textContent = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

    function addTask() {
        if (!taskInput.value.trim()) return;

        // Main container for task item and buttons
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        // Task item
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.textContent = taskInput.value;

        // Buttons ✔ and 🗑 (out of task item)
        const taskButtons = document.createElement("div");
        taskButtons.classList.add("task-buttons");

        const checkBtn = document.createElement("button");
        checkBtn.classList.add("check-btn");
        checkBtn.textContent = "✔";
        checkBtn.addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => {
            taskContainer.remove();
        });

        // Adding buttons to container for button
        taskButtons.appendChild(checkBtn);
        taskButtons.appendChild(deleteBtn);

        // Adding task item and buttons into main container
        taskContainer.appendChild(li);
        taskContainer.appendChild(taskButtons);

        // Adding container into list
        taskList.appendChild(taskContainer);

        // Reset input field
        taskInput.value = "";
    }
});
