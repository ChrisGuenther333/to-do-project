const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');

// array lists contains objects {listName: name, items: []}
const lists = []

//Defaults to displaying first list
let currentList = lists[0]

//Create list button
newListBtn.addEventListener('click', addList);
//Global eventListener checking for dynamically created buttons
document.addEventListener('click', event => {
    //Checking if delete list button was clicked
    if (event.target.classList.contains('dltListBtn')) {
        deleteList();
    }
});

//Creates new list and calls display()
function addList() {
    if (newListName.value !== '') {
        lists.push({listName: newListName.value, items: []});
        newListName.value = '';
    }
    else {
        window.alert('Please enter a list name.');
    }

    display();
}

function deleteList() {

}
//Creates new task and calls display()
function addTask() {
    const newTask = document.querySelector('.enterTask');
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
        listsHTML += `<li class="list-group-item-action ">${list.listName}
        <button type="button" class="btn-close dltListBtn" aria-label="Close"></button></li>`;
    });
    listOfLists.innerHTML = listsHTML;

    //Display current list
    document.querySelector('.currentList').innerHTML = currentList.listName;

    //Display items of current list
    let itemsHTML = ''
    itemsHTML +=  '<ul class="list-group-flush">'
    currentList.items.forEach(item => {
        itemsHTML += `<li class="list-group-item-action">${item.task}</li>`;
    });
    itemsHTML += '</ul>'
    document.querySelector('.currentList').innerHTML += itemsHTML;
}