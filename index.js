import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { appSettings } from "./firebaseDB.js"

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const booksInDB = ref(database, "books")

const inputFieldEl = document.getElementById('input-field')
const addBtnEl = document.getElementById('add-btn')
const shoppingListEl = document.getElementById('shopping-list')

// onValue(booksInDB, function(snapshot){
//     let booksArray = Object.values(snapshot.val())
//     clearShoppingListEl()
//     booksArray.map(book => appendItemToShoppingListEl(book))
// })

// Fetch data from the firebase
onValue(shoppingListInDB, (snapshot) => {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        itemsArray.map(item => appendItemToShoppingListEl(item))
    }
    else{
        shoppingListEl.innerHTML = 'No items here...'
    }
})

addBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item){
    let [itemID, itemValue] = item
    let newEl = document.createElement('li')
    newEl.textContent = itemValue 
    newEl.addEventListener('click', function(){
        const exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}