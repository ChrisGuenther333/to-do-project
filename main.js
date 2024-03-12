const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');
let docCurrentList = document.querySelector('.currentList');

// array lists contains objects {listName: name, items: []}
const lists = []

let currentList;

//Create list button
newListBtn.addEventListener('click', addList);
//Create list with enter key
newListName.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
    addList();
    }
});

//Global eventListener checking for clicks on dynamically created buttons
document.addEventListener('click', event => {
    //Checking if list was clicked
    if (event.target.classList.contains(`list`)) {
        for (let key in lists) {
            const findID = document.getElementById(lists[key].listID);
            if (findID === event.target) {
                currentList = lists[key];
                display();
            }
        } 
    }
    
    //Checking if delete list button was clicked
    else if (event.target.classList.contains('dltListBtn')) {
        for (let key in lists) {
            const findID = document.getElementById(lists[key].listID);
            if (findID === event.target) {
                lists.splice(key, 1);
                display();
            }
        } 
    }

    else if (event.target.classList.contains('enterTaskBtn')) {
        addTask();
    }

    else if (event.target.classList.contains('dltTaskBtn')) {
        for (let key in currentList.items) {
            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode) {
                currentList.items.splice(key, 1);
                display();
            }
            else {
                console.log(false)
            }
        } 
    }

    else if (event.target.classList.contains('editTaskBtn')) {
        for (let key in currentList.items) {
            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode) {
                console.log(`This will edit Task ID ${currentList.items[key].taskID}`);
            }
        } 
    }
});
//Global eventListener checking for enter key on dynamically created buttons
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        if (event.target.classList.contains('enterTaskName')) {
            addTask();
        }
    }
});

//Creates new list and calls display()
function addList() {
    let newListID = Math.floor(Math.random() * 1000)
    if (newListName.value !== '') {
        for (key in lists) {
            if (lists[key].listID === newListID) {
                newListID = Math.floor(Math.random() * 1000);
            }
        }
        lists.push({listID: newListID, listName: newListName.value, items: []});
        newListName.value = '';
    }
    else {
        window.alert('Please enter a list name.');
    }

    display();
}

//Creates new task and calls display()

function addTask() {
    const newTaskName = document.querySelector('.enterTaskName');
    let newTaskID = Math.floor(Math.random() * 1000)
    if (newTaskName.value !== '') {
        for (key in currentList.items) {
            if (currentList.items[key].taskID === newTaskID) {
                newTaskID = Math.floor(Math.random() * 1000);
            }
        }
        currentList.items.push({taskID: newTaskID, task: newTaskName.value, complete: false});
        newTaskName.value = '';
    }
    else {
        window.alert('Please enter a task.');
    }
    display();
}

function markTaskComplete() {

}
//Renders list of lists, current list, its tasks, and buttons
function display() {
    //Display list of lists
    let listsHTML = ''
    lists.forEach(list => {
        listsHTML += `<li class="list-group-item-action list" id="${list.listID}">${list.listName}
        <button type="button" class="btn-close dltListBtn" aria-label="Close"></button></li>`;
    });
    listOfLists.innerHTML = listsHTML;

    // //Display current list name and Add Task button
    let currentListHTML = ''
    currentListHTML += currentList.listName;
    currentListHTML += '<br>'
    currentListHTML += `<input class="enterTaskName" type="text" placeholder="Enter Task">`;
    currentListHTML += `<button class="enterTaskBtn">Add Task</button>`;
    docCurrentList.innerHTML = currentListHTML;

    // Display items of current list
    let itemsHTML = ''
    itemsHTML +=  '<ul class="list-group list-group-flush list-unstyled">'
    currentList.items.forEach(item => {
        itemsHTML += `<li class="list-group-item-action" id="${item.taskID}">
        ${item.task}
        <button class="editTaskBtn">Edit</button>
        <button type="button" class="btn-close dltTaskBtn" aria-label="Close"></button></li>`;
    });
    itemsHTML += '</ul>'
    itemsHTML += '<button class="clearComplete">Clear Completed</button>'
    docCurrentList.innerHTML += itemsHTML;
}

function generateID() {

}