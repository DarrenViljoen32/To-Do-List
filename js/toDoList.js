//load objects from localStorage or create an empty array
let list = JSON.parse(localStorage.getItem(`todoList`)) || []
let idCounter = list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 0

//assign both sort and add buttons to variables.
let addButton = document.querySelector(`#addBtn`)
let sortButton = document.querySelector(`#sortBtn`)

//an event listener for the add button.
//when add buttn is clicked a new object will be created and pushed to list array.
addButton.addEventListener(`click`, function(){
    let inputValue = document.querySelector(`#inputValue`).value
    let checkValid = document.querySelector(`#validation`)
    checkValid.innerHTML = ``

    //create a blank object.
    let obj = {
        id: 0,
        name: inputValue,
        date: Date().toLocaleString(),
        completed: false
    }

    //check for validation.
    if(inputValue.trim() !== `` && inputValue[0] == inputValue[0].toUpperCase() && inputValue.length >=3){
        obj.id =idCounter++
        list.push(obj)
        document.querySelector(`#inputValue`).value = ``
        console.log(list)
        displayList()
    }
    else{
        //display the validation message.
        checkValid.innerHTML = `Please Enter An Item that Starts With A Capital Letter and is More Than Three Letters.`            
        // alert(`Please Enter An Item that Starts With A Capital Letter and is More Than Three Letters.`)
    }
        
})

//event listener for the sort button.
sortButton.addEventListener(`click`, sortList)

//when sort button is clicked it triggers the sortList function that will sort the objects in alphabetical order.
function sortList(){
    list.sort((a, b) => a.name.localeCompare(b.name))
    saveToLocalStorage()
    displayList()
}

//function to display the objects in the array.
function displayList(){
    let displayList = document.querySelector(`#display`)
    displayList.innerHTML = ``

    //create html elements for each object.
    list.forEach(function(obj){
        let tab = document.createElement(`tr`)

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = obj.completed
        checkbox.addEventListener('change', function(){
            //change the completion status when the checkbox is clickd.
            toggleCompleted(obj.id)                
        });

        let itemName = document.createElement('span')
        itemName.textContent = obj.name

        tab.appendChild(checkbox)
        tab.appendChild(itemName)

        if (obj.completed) {
            tab.classList.add('completed')
        }

        //delete an object when the x button is clicked.
        let deleteBtn = document.createElement(`button`)
        deleteBtn.textContent = `x`
        deleteBtn.addEventListener(`click`, function(){
            deleteItem(obj.id)
        })

        tab.appendChild(deleteBtn)
        displayList.appendChild(tab)
    })
}

//a function to change the completion status of the checkbox when it is clickedd.
function toggleCompleted(id){
    list = list.map(item => {
        if (item.id === id) {
            item.completed = !item.completed
        }
        return item
    })
    saveToLocalStorage()
    displayList()
}

//a function to remove an object in the array when the x button is clicked.
function deleteItem(id){
    list = list.filter(item => item.id !== id)
    saveToLocalStorage()
    displayList()
}

//function to save the current list to localStorage
function saveToLocalStorage(){
    localStorage.setItem(`todoList`, JSON.stringify(list))
}

//display of list
displayList()
