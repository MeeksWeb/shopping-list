const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

// LocalStorage
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  // itemsFromStorage.forEach(item => addItemToDom(item)); OR
  itemsFromStorage.forEach((item) => {
    // create list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    li.className = "item";

    // button function called
    const button = createButton("remove-item btn-link text-red");

    // icon function called
    const icon = createIcon("fa-solid fa-xmark");

    // append all
    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
  });
  checkUi();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // addItemToDom(newItem);

  //check for edit mode
  if (isEditMode) {
    //get the li been edited
    const itemToEdit = itemList.querySelector(".edit-mode");

    //remove the class
    itemToEdit.classList.remove("edit-mode");
    //remove it from localstorage
    removeItemFromStorage(itemToEdit.textContent);
    //remove from dom
    itemToEdit.remove();

    //empty input
    itemInput.value = "";

    //make editing false
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert("Item already exists!");
      return;
    }
  }

  // create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  li.className = "item";

  // button function called
  const button = createButton("remove-item btn-link text-red");

  // icon function called
  const icon = createIcon("fa-solid fa-xmark");

  // append all
  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);

  // call the localstorage function
  addItemToStorage(newItem);

  checkUi();

  // clear input after adding
  itemInput.value = "";
}

// create button function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  return button;
}

// create icon function
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// function addItemToDom(item) {
//   // create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(item));
//   li.className = "item";

//   // button function called
//   const button = createButton("remove-item btn-link text-red");

//   // icon function called
//   const icon = createIcon("fa-solid fa-xmark");

//   // append all
//   button.appendChild(icon);
//   li.appendChild(button);
//   itemList.appendChild(li);
// }

function addItemToStorage(item) {
  //create a variable and check if there are items in storage before you start adding
  // let itemsFromStorage;

  //after creating getItemFromStorage function, then change the let to const and set it to the function. Then create an event listener for when the page loads
  const itemsFromStorage = getItemsFromStorage();

  // from here (
  // if (localStorage.getItem("items") === null) {
  //   itemsFromStorage = []; // if there are none then start adding from 0
  // } else {
  //   // if there are, get them to start adding with them
  //   // itemsFromStorage = localStorage.getItem("items");
  //   // above will give you results as strings but we need them as array so we parse them
  //   itemFromStorage = JSON.parse(localStorage.getItem("items"));
  // }
  //to here )

  //READ THIS
  //ideally its advised to create function to get item from storage first, use let as initial value inside it, then create function to add item to storage and inside it first create a variable with const that holds the results gotten from getItemFromStorage function. Then you can push the item to it and send it back to localstorage as string

  itemsFromStorage.push(item); // once we get them as array, we then add ours to them

  //after adding ours we convert them back to JSON String and send back to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

// a function for two purpose depending on where was clicked
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
    // console.log(e.target.textContent);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((element) => {
    element.classList.remove("edit-mode"); // this prevents multiple gray out on click, when one is grayed out already and you click on another, the previous one changes to default black
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formBtn.style.backgroundColor = "#228b22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    //remove item from DOM
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent);

    checkUi();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //reset to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// REMOVE ITEM FUNCTION
// I will be using event delegation to target the parent(ui) to get to the child(li)
// function removeItem(e) {
//   const targetParent = e.target.parentElement;
//   if (targetParent.classList.contains("remove-item")) {
//     // e.target; // gives you the icon
//     // e.target.parentElement; // gives you the icon parent (button)
//     // e.target.parentElement.parentElement; // gives you the button parent (li)

//     // confirm is a built in method, pops up when you click the remove btn
//     if (confirm("Are you sure?")) {
//       e.target.parentElement.parentElement.remove();
//       checkUi();
//     }
//   }
// }

function clearItems() {
  if (confirm("Are you sure?")) {
    itemList.innerHTML = "" // fast method
  }

  // method 2, get all the li
  //   const li = document.querySelectorAll(".item");
  //   if (li.length > 0) {
  //     li.forEach((item) => {
  //       item.remove();
  //     });
  //   } else {
  //     console.log("Empty");
  //     return;
  //   }

  // method 3, use the ul
  // while (itemList.firstChild) {
  //   if (confirm("Are you sure?")) {

  //     itemList.removeChild(itemList.firstChild);
  // }

  // }

  //clear from localstorage

  // localStorage.clear()

  //OR

  localStorage.removeItem("items");

  checkUi();
}

// a function to filter li based on input
function filterItems(e) {
  const li = document.querySelectorAll(".item");
  const text = e.target.value.toLowerCase();

  li.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // text passed in will check the itemName and if anyone matches, we get true and if none matches it's false (-1)
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// a function to prevent item duplicate
function checkIfItemExist(item) {
  const itemFromStorage = getItemsFromStorage();

  if (itemFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}

//  a function to display the CLEAR ALL BTN and FILTER ITEMS only if there's an item in ul
function checkUi() {
  //starts here
  const li = document.querySelectorAll(".item");
  if (li.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  } // stops here

  // //for updating the add button back to default after clicking on th update item
  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// Event Listeners
itemForm.addEventListener("submit", onAddItemSubmit);
// itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", onClickItem);
clearButton.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems); // LocalStorage

checkUi();
