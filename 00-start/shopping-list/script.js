const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const ClearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUi();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }


    //  Create item DOM element
    addItemToDOM(newItem);

    //  Add item to local storage
    addItemToStorage(newItem);


    checkUi();

    itemInput.value = '';
}

function addItemToDOM(item) {
    //  Create List
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton ('remove-item btn-link text-red')
    li.appendChild(button);


    //  Add li to the DOM
    itemList.appendChild(li);
}








function createButton (classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-plus');
    button.appendChild(icon);
    return button;

}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    
    //  Add new itm to array
    itemsFromStorage.push(item);

    //  Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage () {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));

    }

    return itemsFromStorage

}

function removeItem (e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are You Sure?'))  {
            e.target.parentElement.parentElement.remove();

            checkUi();
        }   
    }
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);

        checkUi();

    }
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';

        } else {
            item.style.display = 'none';
        }

    });
}




function checkUi () {
    const items = itemList.querySelectorAll('li');
    console.log(items);
    if (items.length === 0) {
        ClearBtn.style.display = 'none';
        itemFilter.style.display = 'none';

    } else {
        ClearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

}

//  Initialize app
function init() {
    //  Event Listeners
itemForm.addEventListener('submit' , onAddItemSubmit);
itemList.addEventListener('click', removeItem);
ClearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);


checkUi();
}

init();







