const newList = document.querySelector('.enterListName');
let newListBtn = document.querySelector('.createListBtn');
let listOfLists = document.querySelector('.listOfLists');

newListBtn.addEventListener('click', createList);

function createList() {
    if (newList.value !== '') {
    listOfLists.innerHTML += `<li class="list-group-item-action ">${newList.value}</li>`;
    newList.value = '';
    }
    else {
        window.alert('Please enter a list name.');
    }
}