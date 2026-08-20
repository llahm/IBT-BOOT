
// exercise 1

const heading = document.querySelector("#heading");
const headingBtn = document.querySelector("#heading-btn");

headingBtn.addEventListener("click", () => {
    heading.textContent = "Heading Changed with JavaScript!";
    heading.classList.toggle("highlight");
});

// exercise 2

const cities = [
    "Addis Ababa",
    "Bahir Dar",
    "Hawassa"
];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = city;

    cityList.append(li);
});


// exercise 3

const bubbleBtn = document.querySelector("#bubble-btn");
const buttonWrapper = document.querySelector("#button-wrapper");

bubbleBtn.addEventListener("click", (event) => {
    console.log("Button listener:");
    console.log(event.target);
});

buttonWrapper.addEventListener("click", (event) => {
    console.log("Div listener:");
    console.log(event.target);
});

// exercise 4

const deleteList = document.querySelector("#delete-list");

deleteList.addEventListener("click", (event) => {
    if (event.target.matches(".delete-btn")) {
        event.target.closest("li").remove();
    }
});


// exercise 5

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

itemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = itemInput.value.trim();

    if (!value) {
        return;
    }

    const li = document.createElement("li");

    li.textContent = value;

    itemList.append(li);

    itemInput.value = "";
});
