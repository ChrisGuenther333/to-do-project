//Global-scope variables
const newListName = document.querySelector(".enterListName");
let listOfLists = document.querySelector(".listOfLists");
let docCurrentList = document.querySelector(".currentList");
let docCurrentListItems = document.querySelector(".currentListItems");
//lists contains objects {listID: id, listName: name, items: []}
let lists = [];
let currentList = '';
let searchedItems;
let completedTasks = [];

//Enter key creates new list
newListName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addList();
    }
});
//Global eventListener checking for clicks on dynamically created buttons
document.addEventListener("click", (event) => {
    //Checking if list was clicked
    if (event.target.classList.contains(`list`)) {
        lists.forEach(list => {
            const findID = document.getElementById(list.listID);
            if (findID === event.target) {
                currentList = list;
            }
        })
    }
    //Checking if button to delete list was clicked
    else if (event.target.classList.contains("dltListBtn")) {
        lists.forEach(list => {
            const findID = document.getElementById(list.listID);

            if (findID.id === event.target.parentNode.id) {

                // Removes completed tasks from array before deleting list
                completedTasks = completedTasks.filter(task => !list.items.includes(task))
                const deletedList = lists.filter(aList => aList.listID == findID.id);
                lists = lists.filter(aList => aList.listID !== deletedList[0].listID)

                if (currentList.listID === deletedList[0].listID) {
                    currentList = "";
                }
            }
        })
    }
    //Checking if task was clicked
    else if (event.target.classList.contains("item")) {
        currentList.items.forEach(item => {
            const findID = document.getElementById(item.taskID);

            if (findID && (findID.id === event.target.id || findID.id === event.target.parentNode.id || findID.id === event.target.parentNode.parentNode.id || findID.id === event.target.parentNode.parentNode.parentNode.id)) {
                if (item.complete === false) {
                    item.complete = true;
                    completedTasks.push(item);
                }
                else {
                    item.complete = false;
                    completedTasks = completedTasks.filter(task => task.taskID !== item.taskID)
                }
            }
        })
    }
    //Checking if button to delete task was clicked
    else if (event.target.classList.contains("dltTaskBtn")) {
        currentList.items.forEach(item => {
            const findID = document.getElementById(item.taskID);
            
            // Removes completed tasks from array before deleting task
            completedTasks = completedTasks.filter(task => task.taskID != event.target.parentNode.parentNode.parentNode.id)
            currentList.items = currentList.items.filter(anItem => anItem.taskID != event.target.parentNode.parentNode.parentNode.id)
        })
    }
    //Checking if button to edit task was clicked
    else if (event.target.classList.contains("editTaskBtn")) {
        currentList.items.forEach(item => {
            const findID = document.getElementById(item.taskID);

            if (findID.id === event.target.parentNode.parentNode.parentNode.id) {
                let updateTaskName = window.prompt("Enter Task Name");
                if (updateTaskName !== "" && updateTaskName !== null) {
                    item.task = updateTaskName;
                }
            }
        })
    }
    //Checking if Clear Completed button was clicked
    else if (event.target.classList.contains("clearComplete")) {
        currentList.items.forEach(item => {
            const removeTask = completedTasks.filter(task => task.taskID === item.taskID)
            if (removeTask[0] !== null && removeTask[0] !== undefined) {
                completedTasks = completedTasks.filter(task => task.taskID !== removeTask[0].taskID)
                currentList.items = currentList.items.filter(anItem => anItem.taskID !== removeTask[0].taskID)
            }
        })
    }
    else {
        return;
    }
    displayLists();
});
//Global eventListener checking for keydown on dynamically created objects
document.addEventListener("keydown", (event) => {
    //Enter key creates new task
    if (event.key === "Enter") {
        if (event.target.classList.contains("enterTaskName")) {
            addTask();
        }
    }
});
//Global eventListener checking for input on dynamically created objects
document.addEventListener("input", (event) => {
    //Checking if text is being entered in task search bar
    if (event.target.classList.contains("searchTaskField")) {
        //Compares search bar text to item list and adds matches to array
        const searchBar = document.querySelector(".searchTaskField");
        searchedItems = [];
        if (searchBar.value !== "") {
            currentList.items.forEach(item => {
                if (item.task.toUpperCase().includes(searchBar.value.toUpperCase())) {
                    searchedItems.push(item);
                }
            })
            displayItemSearch();
        }
        else {
            displayListItems();
        }
    }
});

//Creates new list and calls displayLists()
function addList() {
    let newListID = Math.floor(Math.random() * 1000);
    if (newListName.value !== "") {
        if (lists.length > 0) {
            lists.forEach(list => {
                if (list.listID === newListID) {
                    newListID = Math.floor(Math.random() * 1000);
                }
            })
        }
        lists.push({
            listID: newListID,
            listName: newListName.value,
            items: []
        });
        newListName.value = "";
    } else {
        window.alert("Please enter a list name.");
    }
    displayLists();
}
//Creates new task and calls displayLists()
function addTask() {
    const newTaskName = document.querySelector(".enterTaskName");
    let newTaskID = Math.floor(Math.random() * 1000);
    if (newTaskName.value !== "") {
        for (let key in currentList.items) {
            if (currentList.items[key].taskID === newTaskID) {
                newTaskID = Math.floor(Math.random() * 1000);
            }
        }
        currentList.items.push({
            taskID: newTaskID,
            task: newTaskName.value,
            complete: false,
        });
        newTaskName.value = "";
    } else {
        window.alert("Please enter a task.");
    }
    displayLists();
}
//Renders list of lists, and current list
function displayLists() {
    // save();
    //Display list of lists
    let listsHTML = "";
    if (lists.length > 0) {
        lists.forEach(list => {
            listsHTML += `
            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 ${currentList.listID === list.listID ? "active" : ""} list" id="${list.listID}">${list.listName}
                <button type="button" class="btn-close me-3 dltListBtn" aria-label="Close"></button>
            </li>`;
        });
    }

    listOfLists.innerHTML = listsHTML;
    //Setting up currentList
    let currentListHTML = "";
    if (currentList !== "") {
        //Display current list name and Add Task button
        currentListHTML += `<span class="fs-1"></>${currentList.listName}</span>`;
        currentListHTML += `
        <div class="d-flex">
            <div class="form-floating w-25 my-3 me-5">
                <input type="text" class="form-control enterTaskName" id="enterTaskName" placeholder="Enter Task">
                <label for="enterTaskName">Enter Task</label>
            </div>
            <div class="form-floating w-25 my-3 ms-5">
                <input type="text" class="form-control searchTaskField" id="searchTaskField" placeholder="Search For A Task">
                <label for="searchTaskField">Search For A Task</label>
            </div>
        </div>`;
    }
    docCurrentList.innerHTML = currentListHTML;
    displayListItems();
}
//Renders current list's items
function displayListItems() {
    //Setting up currentList items
    let itemsHTML = "";
    if (currentList !== "") {
        // Display items of current list
        itemsHTML += '<ul class="list-group list-group-flush list-unstyled">';
        currentList.items.forEach(item => {
            itemsHTML += `
            <li class="list-group-item list-group-item-action text-start py-2 item ${item.complete ? "text-success" : ""}" id="${item.taskID}">
                <div class="d-flex align-items-center item">
                    <div class="w-50 me-5 item">${item.task}</div>
                    <div class="px-5 d-flex align-items-center item">
                        <button type="button" class="btn btn-light me-5 editTaskBtn">Edit</button>
                        <button type="button" class="btn-close me-5 dltTaskBtn" aria-label="Close"></button>
                        ${item.complete ? `<span class="border border-success rounded-pill px-2">Completed</span>` : ""}
                    </div>
                </div>
            </li>`;
        });
        itemsHTML += "</ul>";
        itemsHTML +=
            '<button type="button" class="btn btn-dark mt-2 clearComplete">Clear Completed</button>';
    }

    docCurrentListItems.innerHTML = itemsHTML;
}
//Renders searched items
function displayItemSearch() {
    //Setting up currentList items
    let itemsHTML = "";
    if (currentList !== "") {
        // Display items of current list
        itemsHTML += '<ul class="list-group list-group-flush list-unstyled">';
        searchedItems.forEach(item => {
            itemsHTML += `
            <li class="list-group-item list-group-item-action text-start py-2 item ${item.complete ? "text-success" : ""}" id="${item.taskID}">
                <div class="d-flex align-items-center item">
                    <div class="w-50 me-5 item">${item.task}</div>
                    <div class="px-5 d-flex align-items-center item">
                        <button type="button" class="btn btn-light me-5 editTaskBtn">Edit</button>
                        <button type="button" class="btn-close me-5 dltTaskBtn" aria-label="Close"></button>
                        ${item.complete ? `<span class="border border-success rounded-pill px-2">Completed</span>` : ""}
                    </div>
                </div>
            </li>`;
        });
        itemsHTML += "</ul>";
        itemsHTML +='<button type="button" class="btn btn-dark mt-2 clearComplete">Clear Completed</button>';
    }
    docCurrentListItems.innerHTML = itemsHTML;
}
//Save list of lists and current list
function save() {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("currentList", JSON.stringify(currentList));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
//Gets saved lists and current list and makes sure they are not undefined/null
function retrieve() {
    const storedLists = localStorage.getItem("lists");
    if (storedLists !== undefined && storedLists !== null) {
        lists = JSON.parse(storedLists);
    }
    const storedCurrentList = localStorage.getItem("currentList");
    if (storedCurrentList !== undefined && storedCurrentList !== null) {
        currentList = JSON.parse(storedCurrentList);
    }
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks !== undefined && storedCompletedTasks !== null) {
        completedTasks = JSON.parse(storedCompletedTasks);
    }
    displayLists();
}

//Checks to see if there is any stored lists/currentList when page initializes
// retrieve();