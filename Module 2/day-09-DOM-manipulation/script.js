

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");


form.addEventListener("submit", (event) => {

    // Prevent page reload
    event.preventDefault();


    // Get input values
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);


    // Validate inputs
    if (!name || !price || price <= 0) {
        alert("Please enter both a valid item name and price.");
        return;
    }


    // Add the item to the list
    addRow(name, price);


    // Reset the form
    form.reset();


    // Update the total
    updateTotal();
});


function addRow(name, price) {

    // Create li
    const li = document.createElement("li");


    // Create item information container
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");


    // Create item name
    const itemName = document.createElement("strong");
    itemName.textContent = name;


    // Create price
    const itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = `${price.toFixed(2)} ETB`;


    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("del");


    // Add name and price to item info
    itemInfo.append(itemName, itemPrice);


    // Add everything to the list item
    li.append(itemInfo, deleteButton);


    // Add item to the shopping list
    list.append(li);
}


list.addEventListener("click", (event) => {

    // Delete item
    if (event.target.matches(".del")) {

        event.target.closest("li").remove();

        updateTotal();

        return;
    }


    // Find the clicked list item
    const li = event.target.closest("li");


    // Toggle bought state
    if (li && list.contains(li)) {
        li.classList.toggle("bought");
    }

});


function updateTotal() {

    let total = 0;


    // Get all item prices
    const prices = document.querySelectorAll(".item-price");


    // Add all prices
    prices.forEach((priceElement) => {

        const price = Number(
            priceElement.textContent.replace(" ETB", "")
        );

        total += price;
    });


    // Display total
    totalEl.textContent = total.toFixed(2);
}