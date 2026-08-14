
// 1. calculate subtotal using reduce
const subtotal = (...prices) =>
  prices.reduce((total, price) => total + price, 0);

// 2. discount factory returning an arrow function
const discountBy = (rate) => (amount) =>
  amount * (1 - rate);

// 3. pure helper: add VAT
const withVat = (amount) =>
  amount * 1.15;

// 4. pure helper: format as ETB
const toETB = (amount) =>
  amount.toFixed(2);

// 5. receipt maker with private running order number
const makeReceiptMaker = () => {
  let orderNumber = 0;

  return (...prices) => {
    orderNumber++;

    const sub = subtotal(...prices);
    const discounted = discountBy(0.1)(sub); // 10% member discount
    const total = withVat(discounted);

    return `#${orderNumber}: ${toETB(total)} ETB`;
  };
};

// create one receipt maker
const makeReceipt = makeReceiptMaker();

// test orders
console.log(makeReceipt(100, 200));
console.log(makeReceipt(500, 250));
console.log(makeReceipt(1000));