// Array for adding tasks
let tasks = [];
let editIdx = null  // taking global idx for keep track

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

document.addEventListener('DOMContentLoaded', () => {
    const storeData = JSON.parse(localStorage.getItem('tasks'))
    if (storeData) {
        storeData.forEach(element => {
            tasks.push(element)
        });
        updateTask()
        updateStatus()
    }
})

// Function for adding a task
function addTask() {
    let taskInput = document.getElementById('taskInput');
    let text = taskInput.value.trim();
    if (text) {
        if (editIdx !== null) {
            tasks[editIdx].text = text
            editIdx = null
        }
        else {
            // Add new task
            tasks.push({ text: text, completed: false });
        }
        taskInput.value = "";
        updateTask();
        updateStatus();
        saveData();
    }
    else{
        alert("Enter todo first!")
    }
}

// Function to toggle the completed status of a task
const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    let keep = document.getElementById('keep')
    setTimeout(() => {
        keep.innerText = "Add todo"
    }, 900)
    keep.innerText = "keep it up!"
    updateTask();
    updateStatus();
    saveData();
}

// Function to edit a task
const editTask = (index) => {
    let textInput = document.getElementById('taskInput');
    textInput.value = tasks[index].text;
    editIdx = index
    updateTask();
    updateStatus();
    saveData();
}

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTask();
    updateStatus();
    saveData();
}

const updateStatus = () => {
    let completedTask = tasks.filter(task => task.completed).length;
    let allTask = tasks.length;
    let ratio = (completedTask / allTask) * 100;
    let progress = document.querySelector('.progress')
    progress.style.width = `${ratio}%`

    let dontTasks = document.getElementById('number')
    dontTasks.innerText = `${completedTask} / ${allTask}`

    if (tasks.length > 0 && completedTask === allTask) {
        complete();
    }
}

// Function to update the task list
const updateTask = () => {
    let lists = document.getElementById('task-list');
    lists.innerHTML = ""; // Clear the list before updating

    tasks.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="task-items">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="Assets/edit.png" alt="edit" id= "editBtn" onclick="editTask(${index})">
                    <img src="Assets/delete.png" alt="delete" onclick="deleteTask(${index})">
                </div>
            </div>
        `;
        lists.appendChild(listItem);
    });
}

// Add event listener to the add button
let addBtn = document.getElementById('addTask');
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});


let keyInput = document.getElementById('taskInput')
keyInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
})

// confetti
function complete() {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}