const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const ClearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //  Create List
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton ('remove-item btn-link text-red')
    li.appendChild(button);


    //  Add li to the DOM
    itemList.appendChild(li);

    checkUi();

    itemInput.value = '';


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



//  Event Listeners
itemForm.addEventListener('submit' , addItem);
itemList.addEventListener('click', removeItem);
ClearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);



checkUi();




