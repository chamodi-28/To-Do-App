window.onload=function(){
    displayTasks();
};

document.getElementById("taskform").addEventListener("submit", function(e){
    e.preventDefault();
    addTask();
    });


function addTask(){
    let taskInput = document.getElementById("txttask");
    let taskValue = taskInput.value;

    if(taskValue === ""){
        alert("Enter a task!");
        return;
    }

    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({text: taskValue, completed: false});

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value="";

    displayTasks();

}

function displayTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let result = document.getElementById("result");
    result.innerHTML="";

    tasks.forEach((task, index) => {
        let li= document.createElement("li");
        
        li.innerHTML = `
            <span class="item" style="${task.completed ? 'text-decoration: line-through;' : ''}">
                ${task.text}
            </span>
            <button class="done" onclick="markDone(${index})">Done</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;

        result.appendChild(li);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function markDone(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // toggle completed status
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}