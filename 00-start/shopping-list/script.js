const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
    console.log(button);


}

function createButton (classes) {
    const button = document.createElement('button');
    button.className = classes;
    return button;

}



//  Event Listeners
itemForm.addEventListener('submit' , addItem);




