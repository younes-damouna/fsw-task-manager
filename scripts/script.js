
// Note that I have watched this video https://www.youtube.com/watch?v=jfYWwQrtzzY to learn how to implement the drag and drop,
// I have changed the variable names as required for my project

// Defining input variables
let taskName = document.getElementById("task-name")
let taskColor = document.getElementById("task-color")
let taskDate = document.getElementById("task-date")
let createTask = document.getElementById("create-task-btn")

// Defining active task container

let activeTasksContainer = document.getElementsByClassName('active-tasks')[0]
let completedTasksContainer = document.getElementsByClassName('completed-tasks')[0]
let editTaskNameInput = document.getElementById("edit-task-name")
let saveBtn = document.getElementById("save-btn")
let editModal = document.getElementsByClassName("edit-modal")[0]
let alertModal = document.getElementsByClassName("alert-modal")[0]
let closeModalBtn = document.getElementById("close-modal-btn")
let closeAlertModalBtn = document.getElementById("close-modal-alert-btn")
let okBtn = document.getElementById("ok-btn")
let taskCardsContainer = document.querySelectorAll(".task-cards");

let searchBtn = document.getElementById("search-task-btn")

let taskCards = document.getElementsByClassName("task-card")

//helping functions
function closeModal(modal) {
    modal.classList.remove("active-modal")
}

// eventListeners
closeModalBtn.addEventListener('click', function () {
    closeModal(editModal)
})


closeAlertModalBtn.addEventListener("click", function () {
    closeModal(alertModal)
})

okBtn.addEventListener("click", function () {
    closeModal(alertModal)
})

searchBtn.addEventListener("click", function () {
   search()
})

let input = document.getElementById('task-search');

input.setAttribute("onkeyup","search()")

function search() {
    // Declare variables
    let  filter, text,  i, txtValue;
   
    filter = input.value.toUpperCase();
    
    cards = taskCardsContainer[0].getElementsByClassName('task-card');
    for (i = 0; i < cards.length; i++) {
      text = cards[i].getElementsByClassName("task-name")[0];
     
      txtValue = text.textContent || text.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }

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

    saveBtn.addEventListener("click", function () {
        let id = editTaskNameInput.getAttribute("task-id")
        if (editTaskNameInput.value == "") {
            alertModal.classList.add("active-modal")
        }
        else {
            let focusTask = document.getElementById(id)
            focusTask.innerText = editTaskNameInput.value
            task.name = focusTask.innerText

            console.log(document.getElementById(id).innerText)

            closeModal(editModal)
        }

    })

    if (taskName.value == "" || taskColor.value == "" || taskDate.value == "") {
        if (taskColor.value == "#ffffff") {
            // error pop up
            alert("Color Cannot be white!")

        }
        alertModal.classList.add("active-modal")

    } else {
        tasks.push(task)

        let taskContent = `
       
            <div class="left-info">
                <div class="task-name" id="task-${task.id}">
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
            editTaskNameInput.value = task.name
            editTaskNameInput.setAttribute("task-id", `task-${task.id}`)
            editModal.classList.add("active-modal")
            task.name = editTaskNameInput.value
            console.log(task)





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

        // drag and drop feature

       

        for (let i = 0; i < taskCards.length; i++) {


            taskCards[i].addEventListener("dragstart", function (e) {


                taskCards[i].setAttribute("draggable", true)
                taskCards[i].classList.add("dragged")
            })

            taskCards[i].addEventListener("dragend", function () {
                taskCards[i].classList.remove("dragged")


            });




        }



        for (let i = 0; i < taskCardsContainer.length; i++) {

            taskCardsContainer[i].addEventListener("dragover", function (e) {
                let nextCard = getNextElement(taskCardsContainer[i], e.clientY)
                let draggedCard = document.querySelector(".dragged");
                if (nextCard == null) {
                    taskCardsContainer[i].appendChild(draggedCard)

                }

                console.log(nextCard)
            });
        }
    }


})





function getNextElement(container, y) {
    let draggableCards = [...container.querySelectorAll(".task-card:not(.dragged)")]
    //loop over cards to determine the next elemnet
    return draggableCards.reduce(function (closest, child) {
        let boundingBox = child.getBoundingClientRect()
        let offset = y - boundingBox.top - boundingBox.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
