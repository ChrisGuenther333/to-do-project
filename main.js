const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');
let docCurrentList = document.querySelector('.currentList');

// array lists contains objects {listName: name, items: []}
const lists = []

//Defaults to displaying first list
let currentList = lists[0];

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
            if (lists[key].listName === event.target.innerText.trim()) {
                currentList = lists[key];
                display();
            }
        } 
    }
    
    //Checking if delete list button was clicked
    else if (event.target.classList.contains('dltListBtn')) {
        for (let key in lists) {
            if (lists[key].listName === event.target.parentNode.innerText.trim()) {
                lists.splice(lists[key], 1);
                display();
            }
        } 
    }

    else if (event.target.classList.contains('enterTaskBtn')) {
        addTask();
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
    let alreadyList = false;
    if (newListName.value !== '') {
        for (item in lists) {
            if (lists[item].listName === newListName.value) {
                alreadyList = true;
            }
        }
        if (alreadyList === false) {
            lists.push({listName: newListName.value, items: []});
            newListName.value = '';
        }
        else {
            window.alert(`You've already created a list with that name`);
            newListName.value = '';
        }
    }
    else {
        window.alert('Please enter a list name.');
    }

    display();
}

//Creates new task and calls display()

function addTask() {
    const newTask = document.querySelector('.enterTaskName');
    if (newTask.value !== '') {
        currentList.items.push({task: newTask.value, complete: false});
        newTask.value = '';
    }
    else {
        window.alert('Please enter a task.');
    }
    display();
}

function deleteTask() {

}

function markTaskComplete() {

}
//Renders list of lists, current list, its tasks, and buttons
function display() {
    //Display list of lists
    let listsHTML = ''
    lists.forEach(list => {
        listsHTML += `<li class="list-group-item-action list">${list.listName}
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
    itemsHTML +=  '<ul class="list-group-flush">'
    currentList.items.forEach(item => {
        itemsHTML += `<li class="list-group-item-action">${item.task}</li>`;
    });
    itemsHTML += '</ul>'
    docCurrentList.innerHTML += itemsHTML;
}