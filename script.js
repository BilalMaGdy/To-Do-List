document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-btn");
    const inputField = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    function showPopup(message, type) {
        Swal.fire({
            title: message,
            icon: type,
            confirmButtonText: 'OK'
        });
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => {
            createTask(taskText);
        });
    }

    function createTask(taskText) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        
        const taskParagraph = document.createElement("p");
        taskParagraph.textContent = taskText;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        
        removeButton.addEventListener("click", () => {
            Swal.fire({
                title: 'Are you sure you want to delete this task?',
                text: "This action cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    todoList.removeChild(todoItem);
                    updateLocalStorage();
                    showPopup("Task removed!", "success");
                }
            });
        });

        todoItem.appendChild(taskParagraph);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);
    }

    function updateLocalStorage() {
        const tasks = [];
        const taskElements = document.querySelectorAll(".todo-item p");
        taskElements.forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addButton.addEventListener("click", () => {
        const taskText = inputField.value.trim();
        if (taskText) {
            createTask(taskText);
            updateLocalStorage();
            showPopup("Task added!", "success");
            inputField.value = "";
        } else {
            showPopup("Please enter a task!", "error");
        }
    });

    loadTasks();
});
