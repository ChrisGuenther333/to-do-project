//Global-scope variables
const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');
let docCurrentList = document.querySelector('.currentList');
let docCurrentListItems = document.querySelector('.currentListItems');
// array lists contains objects {listName: name, items: []}
const lists = [];
let currentList;
let searchedItems;

//Button that creates new list
newListBtn.addEventListener('click', addList);
//Enter key creates new list
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
                displayLists();
            }
        } 
    }
    //Checking if button to delete list was clicked
    else if (event.target.classList.contains('dltListBtn')) {
        for (let key in lists) {
            const findID = document.getElementById(lists[key].listID);
            if (findID === event.target.parentNode) {
                const deletedList = lists.splice(key, 1);
                if (currentList === deletedList[0]) {
                    currentList = undefined
                }
                displayLists();
            }
        } 
    }
    //Checking if button to add task was clicked
    else if (event.target.classList.contains('enterTaskBtn')) {
        addTask();
    }
    //Checking if button to delete task was clicked
    else if (event.target.classList.contains('dltTaskBtn')) {
        for (let key in currentList.items) {
            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode) {
                currentList.items.splice(key, 1);
                displayLists();
            }
        } 
    }
    //Checking if button to edit task was clicked
    else if (event.target.classList.contains('editTaskBtn')) {
        for (let key in currentList.items) {
            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode) {
                currentList.items[key].task = window.prompt('Enter Task Name');
                displayLists();
            }
        } 
    }
});
//Global eventListener checking for keydown on dynamically created objects
document.addEventListener('keydown', event => {
    //Enter key creates new task
    if (event.key === 'Enter') {
        if (event.target.classList.contains('enterTaskName')) {
            addTask();
        }
    }
});
//Global eventListener checking for input on dynamically created objects
document.addEventListener('input', event => {
    //Checking if text is being entered in task search bar
    if (event.target.classList.contains('searchTaskField')) {
        //Compares search bar text to item list and adds matches to array
        const searchBar = document.querySelector('.searchTaskField')
        searchedItems = []
        if(searchBar.value !== '') {
            for (let key in currentList.items) {
                if (currentList.items[key].task.toUpperCase().includes(searchBar.value.toUpperCase())) {
                    searchedItems.push(currentList.items[key]);
                }
            }
            displayItemSearch();
        }
        else {
            displayListItems();
        }
    }
});


//Creates new list and calls display()
function addList() {
    let newListID = Math.floor(Math.random() * 1000)
    if (newListName.value !== '') {
        for (let key in lists) {
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

    displayLists();
}
//Creates new task and calls display()
function addTask() {
    const newTaskName = document.querySelector('.enterTaskName');
    let newTaskID = Math.floor(Math.random() * 1000)
    if (newTaskName.value !== '') {
        for (let key in currentList.items) {
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
    displayLists();
}
function markTaskComplete() {

}
//Renders list of lists, current list, its tasks, and buttons
function displayLists() {
    //Display list of lists
    let listsHTML = ''
    lists.forEach(list => {
        listsHTML += `<li class="list-group-item-action list" id="${list.listID}">${list.listName}
        <button type="button" class="btn-close dltListBtn" aria-label="Close"></button></li>`;
    });
    listOfLists.innerHTML = listsHTML;
    //Setting up currentList
    let currentListHTML = ''
    if (currentList != undefined) {
        // //Display current list name and Add Task button
        currentListHTML += currentList.listName;
        currentListHTML += '<br>'
        currentListHTML += `<input class="enterTaskName" type="text" placeholder="Enter Task">`;
        currentListHTML += `<button class="enterTaskBtn">Add Task</button>`;
        currentListHTML += `<input class="searchTaskField" type="text" placeholder="Search For A Task">`; 
    }
    docCurrentList.innerHTML = currentListHTML;
    displayListItems();
}
function displayListItems() {
    //Setting up currentList items
    let itemsHTML = ''
    if (currentList !== undefined) {
        // Display items of current list
        itemsHTML +=  '<ul class="list-group list-group-flush list-unstyled">'
        currentList.items.forEach(item => {
            itemsHTML += `<li class="list-group-item-action" id="${item.taskID}">
            ${item.task}
            <button class="editTaskBtn">Edit</button>
            <button type="button" class="btn-close dltTaskBtn" aria-label="Close"></button></li>`;
        });
        itemsHTML += '</ul>'
        itemsHTML += '<button class="clearComplete">Clear Completed</button>'  
    }
    docCurrentListItems.innerHTML = itemsHTML;
}
function displayItemSearch() {
    //Setting up currentList items
    console.log(searchedItems)
    let itemsHTML = ''
    if (currentList !== undefined) {
        // Display items of current list
        itemsHTML +=  '<ul class="list-group list-group-flush list-unstyled">'
        searchedItems.forEach(item => {
            itemsHTML += `<li class="list-group-item-action" id="${item.taskID}">
            ${item.task}
            <button class="editTaskBtn">Edit</button>
            <button type="button" class="btn-close dltTaskBtn" aria-label="Close"></button></li>`;
        });
        itemsHTML += '</ul>'
        itemsHTML += '<button class="clearComplete">Clear Completed</button>'  
    }
    docCurrentListItems.innerHTML = itemsHTML;
}
