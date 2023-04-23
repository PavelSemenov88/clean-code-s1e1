//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".new-task__input");//Add a new task.
const addButton = document.querySelector(".new-task__add");//first button
const incompleteTaskHolder = document.querySelector(".incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.querySelector(".completed-tasks");//completed-tasks

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

//New task list item

addButton.addEventListener('click', () => {

    if (!taskInput.value) return;

    const newTodo = {
        todo: taskInput.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))



    // const taskString = taskInput.value;
    // const incompleteBlock = document.createElement('li');
    // incompleteBlock.classList.add('incomplete-block');

    // incompleteBlock.innerHTML = `
    //     <input type="checkbox">
    //     <label class="task">${taskString}</label>
    //     <input type="text" class="task">
    //     <button class="edit button">Edit</button>
    //     <button class="delete">
    //         <img src="./remove.svg" alt="remove">
    //     </button>
    // `
    // incompleteTaskHolder.append(incompleteBlock);

    taskInput.value = "";
})

function displayMessages() {
    let displayMessage = '';
    todoList.forEach((item, index) => {
        displayMessage += `
        <li class="incomplete-block">
            <input type="checkbox" id="item_${index}" ${item.checked ? 'checked' : ''}>
            <label  for="item_${index}" class="task">${item.todo}</label>
            <input type="text" class="task" id="item_${index}">
            <button class="edit button">Edit</button>
            <button class="delete">
            <img src="./remove.svg" alt="remove">
            </button>
        </li>
        `
        incompleteTaskHolder.innerHTML = displayMessage;
    })
}

incompleteTaskHolder.addEventListener('change', (e) => {
    let idInput = e.target.getAttribute('id');
    let valueLabel = incompleteTaskHolder.querySelector(`[for=${idInput}]`).innerHTML;
    console.log(valueLabel);
    let incompleteBlocks = document.querySelectorAll('.incomplete-block');

    incompleteBlocks.forEach(item => {
        console.dir(item.children[1].textContent);
        if (item.children[1].textContent === valueLabel) {
            item.checked = true;
            completedTasksHolder.append(item)
            console.log(todoList);
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })

    // todoList.forEach(item => {
    //     // console.log(item.todo === valueLabel);
    //     if (item.todo === valueLabel) {
    //         item.checked = true;
    //         console.log(incompleteBlocks);
    //     }
    // })
    // // console.log(valueLabel, incompleteBlock, todoList);
    // completedTasksHolder.append(valueLabel);
    // todoList.forEach(item => {
    //     if(item.todo === valueLabel) {
    //         item.checked = !item.checked;
    //         localStorage.setItem('todo', JSON.stringify(todoList));
    //     }
    // })
})




// var createNewTaskElement = function (taskString) {

//     var listItem = document.createElement("li");

//     //input (checkbox)
//     var checkBox = document.createElement("input");//checkbx
//     //label
//     var label = document.createElement("label");//label
//     //input (text)
//     var editInput = document.createElement("input");//text
//     //button.edit
//     var editButton = document.createElement("button");//edit button

//     //button.delete
//     var deleteButton = document.createElement("button");//delete button
//     var deleteButtonImg = document.createElement("img");//delete button image

//     label.innerText = taskString;
//     label.className = "task";
//     listItem.className = "incomplete-block";

//     //Each elements, needs appending
//     checkBox.type = "checkbox";
//     editInput.type = "text";
//     editInput.className = "task";

//     editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
//     editButton.className = "edit button";

//     deleteButton.className = "delete";
//     deleteButtonImg.src = "./remove.svg";
//     deleteButton.appendChild(deleteButtonImg);


//     //and appending.
//     listItem.appendChild(checkBox);
//     listItem.appendChild(label);
//     listItem.appendChild(editInput);
//     listItem.appendChild(editButton);
//     listItem.appendChild(deleteButton);
//     return listItem;
// }



var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    // console.log("Change "edit" to "save"");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("incomplete-block_edit");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("incomplete-block_edit");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick = addTask;
// addButton.addEventListener("click", addTask);
// addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
// for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

//     //bind events to list items chldren(tasksCompleted)
//     bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
// }




//cycle over completedTasksHolder ul list items
// for (var i = 0; i < completedTasksHolder.children.length; i++) {
//     //bind events to list items chldren(tasksIncompleted)
//     bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
// }




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.