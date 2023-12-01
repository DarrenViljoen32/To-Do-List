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

function deleteItem(id){
    list = list.filter(item => item.id !== id);
    displayList();
}

displayList();
