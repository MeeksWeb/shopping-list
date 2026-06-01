const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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


  // clear input after adding
  // itemInput.value = ""
  newItem = ""
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
