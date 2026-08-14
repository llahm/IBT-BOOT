
// exercise 1
const prices = [500, 750, 900, 1000, 1200];

const grandTotal = prices
  .map(price => price * 1.15)       // Add 15% VAT
  .filter(price => price < 1000)    // Keep prices under 1000
  .reduce((total, price) => total + price, 0); // Calculate total

console.log("Exercise 1:", grandTotal);

// exercise 2

const customer = {
  name: "LAMUA",
  city: "Addis Ababa",
  balance: 5000
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}


// exercise 3

// Destructure name and city in one line
const { name, city } = customer;

console.log("Exercise 3:", name, city);

// Parameter destructuring
function greet({ name }) {
  return `Hello, ${name}!`;
}

console.log(greet(customer));

// exercise 4

const updatedCustomer = {
  ...customer,
  city: "Hawassa",
  phone: "0912345678"
};

console.log("Original customer:", customer);
console.log("Updated customer:", updatedCustomer);