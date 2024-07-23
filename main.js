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
        for (let key in lists) {
            const findID = document.getElementById(lists[key].listID);
            if (findID === event.target) {
                currentList = lists[key];
            }
        }
    }
    //Checking if button to delete list was clicked
    else if (event.target.classList.contains("dltListBtn")) {
        for (let key in lists) {
            const findID = document.getElementById(lists[key].listID);
            if (findID === event.target.parentNode) {
                //Removes completed tasks from array before deleting list
                // const findTask = completedTasks.filter(task =>
                //     task.id === key.id)
                // completedTasks.splice(findTask, 1);

                const deletedList = lists.splice(key, 1);
                if (currentList.listID === deletedList[0].listID) {
                    currentList = "";
                }
            }

        }
        // console.log(completedTasks)
    }
    //Checking if task was clicked
    else if (event.target.classList.contains("item")) {
        for (let curkey in currentList.items) {
            const findID = document.getElementById(currentList.items[curkey].taskID);
            if (findID && (findID.id === event.target.id || findID.id === event.target.parentNode.id || findID.id === event.target.parentNode.parentNode.id || findID.id === event.target.parentNode.parentNode.parentNode.id)) {
                if (currentList.items[curkey].complete === false) {
                    currentList.items[curkey].complete = true;
                    completedTasks.push(currentList.items[curkey]);
                } else {
                    currentList.items[curkey].complete = false;
                    for (let compkey in completedTasks) {
                        if (completedTasks[compkey].taskID === currentList.items[curkey].taskID) {
                            completedTasks.splice(compkey, 1);
                        }
                    }
                }
            }
        }
        // console.log(completedTasks)
    }
    //Checking if button to delete task was clicked
    else if (event.target.classList.contains("dltTaskBtn")) {
        for (let key in currentList.items) {
            //Removes completed tasks from array before deleting task
            // const findTask = completedTasks.filter(task =>
            //     task.id === key.id)
            // completedTasks.splice(findTask, 1);

            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode.parentNode.parentNode) {
                currentList.items.splice(key, 1);
            }
        }
        console.log(completedTasks)
    }
    //Checking if button to edit task was clicked
    else if (event.target.classList.contains("editTaskBtn")) {
        for (let key in currentList.items) {
            const findID = document.getElementById(currentList.items[key].taskID);
            if (findID === event.target.parentNode.parentNode.parentNode) {
                let updateTaskName = window.prompt("Enter Task Name");
                if (updateTaskName !== "" && updateTaskName !== null) {
                    currentList.items[key].task = updateTaskName;
                }
            }
        }
    }
    //Checking if Clear Completed button was clicked
    else if (event.target.classList.contains("clearComplete")) {
        for (let compkey in completedTasks) {
            for (let curkey in currentList.items) {
                if (completedTasks[compkey].taskID === currentList.items[curkey].taskID) {
                    currentList.items.splice(curkey, 1);
                    completedTasks.splice(compkey, 1);
                }
            }
        }
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
            for (let key in currentList.items) {
                if (currentList.items[key].task.toUpperCase().includes(searchBar.value.toUpperCase())) {
                    searchedItems.push(currentList.items[key]);
                }
            }
            displayItemSearch();
        } else {
            displayListItems();
        }
    }
});

//Creates new list and calls displayLists()
function addList() {
    let newListID = Math.floor(Math.random() * 1000);
    if (newListName.value !== "") {
        if (lists.length > 0) {
            for (let key in lists) {
                if (lists[key].listID === newListID) {
                    newListID = Math.floor(Math.random() * 1000);
                }
            }
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
    save();
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
        currentList.items.forEach((item) => {
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
        searchedItems.forEach((item) => {
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
//Gets saved lists and current list and makes sure they
function retrieve() {
    const storedLists = localStorage.getItem("lists");
    if (
        storedLists !== undefined &&
        storedLists !== "undefined" &&
        storedLists !== null &&
        storedLists !== "null"
    ) {
        lists = JSON.parse(storedLists);
    }
    const storedCurrentList = localStorage.getItem("currentList");
    if (
        storedCurrentList !== undefined &&
        storedCurrentList !== "undefined" &&
        storedCurrentList !== null &&
        storedCurrentList !== "null"
    ) {
        currentList = JSON.parse(storedCurrentList);
    }
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (
        storedCompletedTasks !== undefined &&
        storedCompletedTasks !== "undefined" &&
        storedCompletedTasks !== null &&
        storedCompletedTasks !== "null"
    ) {
        completedTasks = JSON.parse(storedCompletedTasks);
    }
    displayLists();
}

//Checks to see if there is any stored lists/currentList when page initializes
retrieve();