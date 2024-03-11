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
            if (currentList.items[key].task === event.target.parentNode.innerText.trim()) {
                currentList.items.splice(key, 1);
                display();
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
    let alreadyList = false;
    if (newListName.value !== '') {
        for (key in lists) {
            if (lists[key].listName.toUpperCase() === newListName.value.toUpperCase()) {
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
    const newTaskName = document.querySelector('.enterTaskName');
    if (newTaskName.value !== '') {
        let alreadyTask = false;

        for (key in currentList.items) {
            if (currentList.items[key].task.toUpperCase() === newTaskName.value.toUpperCase()) {
                alreadyTask = true;
            }
        }
        if (alreadyTask === false) {
            currentList.items.push({task: newTaskName.value, complete: false});
            newTaskName.value = '';
        }
        else {
            window.alert(`You've already created that task`);
            newTaskName.value = '';
        }
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
    itemsHTML +=  '<ul class="list-group list-group-flush list-unstyled">'
    currentList.items.forEach(item => {
        itemsHTML += `<li class="list-group-item-action">${item.task}
        <button type="button" class="btn-close dltTaskBtn" aria-label="Close"></button></li>`;
    });
    itemsHTML += '</ul>'
    docCurrentList.innerHTML += itemsHTML;
}