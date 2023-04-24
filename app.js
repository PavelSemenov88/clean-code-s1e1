//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.
const main = document.querySelector('.main');
const taskInput = main.querySelector(".new-task__input");//Add a new task.
const addButton = main.querySelector(".new-task__add");//first button
const incompleteTaskHolder = main.querySelector(".incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = main.querySelector(".completed-tasks");//completed-tasks


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
        id: 'a' + Math.random().toString(16).slice(2)
    };

    console.log(todoList);
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
    taskInput.value = "";
    
})

// перерасчет при каждом изменение в todoList
function displayMessages() {

    incompleteTaskHolder.replaceChildren();
    completedTasksHolder.replaceChildren();
    let displayMessage = '';
    todoList.forEach((item) => {
        displayMessage = `
        <li class="incomplete-block">
            <input type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''}>
            <label  for="${item.id}" class="task">${item.todo}</label>
            <input type="text" class="${item.id}" value="${item.todo}">
            <button class="edit button">Edit</button>
            <button class="delete">
            <img src="./remove.svg" alt="remove">
            </button>
        </li>
        `
        if (!item.checked) {
            incompleteTaskHolder.innerHTML += displayMessage;
        } else {
            completedTasksHolder.innerHTML += displayMessage;
        }
        deleteButton();
    })
}

//объединил две переменные для отслеживание
let taskHolder = [completedTasksHolder, incompleteTaskHolder];
taskHolder.forEach(item => {
    item.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            let idInput = e.target.getAttribute('id');
            let valueLabel = main.querySelector(`[for=${idInput}]`).innerHTML;
            todoList.forEach(item => {
                if (item.todo === valueLabel) {
                    item.checked = !item.checked;
                    localStorage.setItem('todo', JSON.stringify(todoList));
                }
            })
            displayMessages();
            deleteButton();
        }
    })
})

//Delete task.
function deleteButton() {
    setTimeout(() => {
        const deleteTaskButtons = main.querySelectorAll('.delete');
        deleteTaskButtons.forEach(item => {
            item.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.remove();
                todoList.forEach(item => {
                    if (item.todo === e.target.parentNode.parentNode.children[1].textContent) {
                        const indexItem = todoList.indexOf(item);
                        todoList.splice(indexItem, 1)
                        localStorage.setItem('todo', JSON.stringify(todoList));
                    }
                })
            })
        })
        editTask();
    }, 0)
}



function editTask() {
    const editButtons = main.querySelectorAll('.edit');

    editButtons.forEach(item => {
        item.addEventListener('click', (e) => {
            let idInput = e.target.parentElement.children[0].id;
            let valueLabel = main.querySelector(`[for=${idInput}]`).innerHTML;

            let editInputValue = e.target.parentElement.children[2].value;
            let labelText = e.target.parentElement.children[1].innerText;
            if (e.target.innerText === 'Edit') {
                e.target.parentElement.classList.add('incomplete-block_edit');
                item.innerText = 'Save';
            } else {
                e.target.parentElement.classList.remove('incomplete-block_edit');
                labelText = editInputValue;
                valueLabel = editInputValue;
                item.innerText = 'Edit';
                todoList.forEach(item => {
                    if (item.id === idInput) {
                        item.todo = editInputValue;
                        
                    }
                    localStorage.setItem('todo', JSON.stringify(todoList));
                })
                displayMessages();
            }
        })
    })
}