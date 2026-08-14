
// separate transactions by type
export const transactionsByType = (txns, type) =>
  txns.filter(txn => txn.type === type);


// calculate the total amount for a transaction type
export const totalByType = (txns, type) =>
  txns
    .filter(txn => txn.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);


// build formatted receipt strings using map and destructuring
export const formatReceipts = (txns) =>
  txns.map(({ customer, amount }) =>
    `${customer}: ${amount.toFixed(2)} ETB`
  );


// create an updated copy without mutating the original
export const correctTransaction = (transaction, newAmount) => ({
  ...transaction,
  amount: newAmount
});

