

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 100 },
];


let productNames = products.map( obj => {
        return obj.name
    }
)

for( let product of productNames)
{
    console.log(product)
}

console.log("Product Names:", productNames)

let filteredObj = products.filter(obj => obj.price > 200)
console.log("Filtered Products:", filteredObj)

let foundObj = products.find(obj => obj.price > 200)
console.log(foundObj)

let reducedPrice = products.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price
}, 0)

console.log("Total Price:", reducedPrice)


