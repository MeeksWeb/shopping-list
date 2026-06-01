const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
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

// REMOVE ITEM FUNCTION
// I will be using event delegation to target the parent(ui) to get to the child(li)
function removeItem(e) {
  const targetParent = e.target.parentElement;
  if (targetParent.classList.contains("remove-item")) {
    // e.target; // gives you the icon
    // e.target.parentElement; // gives you the icon parent (button)
    // e.target.parentElement.parentElement; // gives you the button parent (li)

    // confirm is a built in method, pops up when you click the remove btn
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUi();
    }
  }
}

function clearItems() {
  // itemList.innerHTML = "" // fast method

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
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUi();
}

//  a function to display the CLEAR ALL BTN and FILTER ITEMS only if there's an item in ul
function checkUi() {
  const li = document.querySelectorAll(".item");
  if (li.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);

checkUi();
