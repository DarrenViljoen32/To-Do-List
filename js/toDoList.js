let list = [];
let idCounter = 0;

let addButton = document.querySelector(`#addBtn`);
let sortButton = document.querySelector(`#sortBtn`);

addButton.addEventListener(`click`, function(){
    let inputValue = document.querySelector(`#inputValue`).value;
    let checkValid = document.querySelector(`#validation`)
    checkValid.innerHTML = ``;

    let obj = {
        id: 0,
        name: inputValue,
        date: Date().toLocaleString(),
        completed: false
    };

    if(inputValue.trim() !== `` && inputValue[0] == inputValue[0].toUpperCase() && inputValue.length >=3){
        obj.id =idCounter++;
        list.push(obj);
        document.querySelector(`#inputValue`).value = ``;
        console.log(list);
        displayList();
    }
    else{
        checkValid.innerHTML = `Please Enter An Item that Starts With A Capital Letter and is More Than Three Letters.`;            
    }
        
});

sortButton.addEventListener(`click`, sortList);

function sortList(){
    list.sort((a, b) => a.name.localeCompare(b.name));
    displayList();
}

function displayList(){
    let displayList = document.querySelector(`#display`);
    displayList.innerHTML = ``;

    list.forEach(function(obj){
        let tab = document.createElement(`tr`);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = obj.completed;
        checkbox.addEventListener('change', function(){
            //change the completion status when the checkbox is clickd.
            toggleCompleted(obj.id);                
        });

        let itemName = document.createElement('span');
        itemName.textContent = obj.name;

        tab.appendChild(checkbox);
        tab.appendChild(itemName);

        if (obj.completed) {
            tab.classList.add('completed');
        }

        let itemName = document.createElement('span');
        itemName.textContent = obj.name;

        tab.appendChild(itemName);

        let deleteBtn = document.createElement(`button`);
        deleteBtn.textContent = `x`;
        deleteBtn.addEventListener(`click`, function(){
            deleteItem(obj.id);
        })

        tab.appendChild(deleteBtn);
        displayList.appendChild(tab);
    });
}

function toggleCompleted(id){
    list = list.map(item => {
        if (item.id === id) {
            item.completed = !item.completed;
        }
        return item;
    });
    displayList();
}

function deleteItem(id){
    list = list.filter(item => item.id !== id);
    displayList();
}

displayList();
