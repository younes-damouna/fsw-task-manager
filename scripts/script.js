// Defining input variables
let taskName = document.getElementById("task-name")
let taskColor = document.getElementById("task-color")
let taskDate = document.getElementById("task-date")
let createTask = document.getElementById("create-task-btn")

// Defining active task container

let activeTasksContainer = document.getElementsByClassName('active-tasks')[0]
let completedTasksContainer = document.getElementsByClassName('completed-tasks')[0]




let id = 0
let tasks = []
createTask.addEventListener("click", function () {
    let task = {
        id: id,
        name: taskName.value,
        color: taskColor.value,
        date: taskDate.value,
        active: true
    }

    // if (taskName.value == "" || taskColor.value == "" || taskDate.value == "") {
    //     if (taskColor.value == "#ffffff") {
    //         // error pop up

    //     }
    //     alert()

    // } else {
    tasks.push(task)

    let taskContent = `
       
            <div class="left-info">
                <div class="task-name">
                    ${task.name}
                </div>
                <div class="task-date">
                   ${task.date}

                </div>
            </div>
            <div class="task-action-btns">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `
    let taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    taskCard.innerHTML = taskContent
    taskCard.style.backgroundColor = task.color
    // taskCard.setAttribute("id",`${task.id}-1`)

    let clickableCard = taskCard.getElementsByClassName("left-info")[0]
    let deleteBtn = taskCard.getElementsByClassName("delete-btn")[0]
    let editBtn = taskCard.getElementsByClassName("edit-btn")[0]
    
    deleteBtn.addEventListener("click", function (event) {
        if (!task.active) {
            completedTasksContainer.removeChild(taskCard)
            console.log("delete")
            task.active = false
        } else {
            activeTasksContainer.removeChild(taskCard)
        }

    })


    editBtn.addEventListener("click", function (event) {
        console.log(event)
        
        if (!task.active) {
          
        } else {
            
        }
        console.log("edit")
    })
    function setTaskAsActive(e) {

        task.active = false
        console.log("activating")
        //Adding the task to the completed tasks container
        clickableCard.removeEventListener("click", setTaskAsActive)
        completedTasksContainer.appendChild(taskCard)
        taskCard.style.backgroundColor = "green"









    }
    clickableCard.addEventListener("click",

        setTaskAsActive

    )
    activeTasksContainer.append(taskCard)



    console.log(tasks)

    taskName.value = ""
    taskColor.value = "#000000"
    taskDate.value = ""

    id++
    // }


})


// Defining functions
function emptyInput(value) {
    console.log(value)
    value = ""

}
