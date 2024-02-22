const newListName = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');

// array lists contains objects {listName: name, items: []}
const lists = []

//When button is clicked it creates new list and calls displayListOfLists()
newListBtn.addEventListener('click', () => {
    if (newListName.value !== '') {
        lists.push({listName: newListName.value, items: []});
        newListName.value = '';
    }
    else {
        window.alert('Please enter a list name.');
    }

    displayListOfLists();
});


function displayListOfLists() {
    let inner = ''
    lists.forEach(i => {
        inner += `<li class="list-group-item-action ">${i.listName}</li>`;
    })
    listOfLists.innerHTML = inner;
}