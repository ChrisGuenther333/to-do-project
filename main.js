const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');

// array lists contains objects {listName: name, items: []}
const lists = []

//When button is clicked it creates new list and calls display()
newListBtn.addEventListener('click', () => {
    if (newListName.value !== '') {
        lists.push({listName: newListName.value, items: []});
        newListName.value = '';
    }
    else {
        window.alert('Please enter a list name.');
    }

    display();
});
//Defaults to displaying first list
let currentList = lists[0]


function display() {
    //Display list of lists
    let listsHTML = ''
    lists.forEach(list => {
        listsHTML += `<li class="list-group-item-action ">${lists.listName}</li>`;
    })
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