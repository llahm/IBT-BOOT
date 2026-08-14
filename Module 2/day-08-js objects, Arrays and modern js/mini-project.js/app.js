
import { transactions } from "./transactions.js";

import {
  transactionsByType,
  totalByType,
  formatReceipts,
  correctTransaction
} from "./report.js";


// Separate credits and debits using filter
const credits = transactionsByType(transactions, "credit");
const debits = transactionsByType(transactions, "debit");


// Calculate totals using reduce
const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");


// Build receipt strings using map with destructuring
const receipts = formatReceipts(transactions);


// Update one transaction using spread
const originalTransaction = transactions[2];

const correctedTransaction = correctTransaction(
  originalTransaction,
  200
);


// Print report
console.log("===== TELEBIRR TRANSACTION REPORT =====\n");

console.log("CREDITS:");
console.log(credits);

console.log("\nDEBITS:");
console.log(debits);

console.log(`\nTotal Credits: ${totalCredits.toFixed(2)} ETB`);
console.log(`Total Debits: ${totalDebits.toFixed(2)} ETB`);

console.log("\nRECEIPTS:");
receipts.forEach(receipt => console.log(receipt));

console.log("\nTRANSACTION CORRECTION:");
console.log("Original:", originalTransaction);
console.log("Corrected:", correctedTransaction);

console.log("\nOriginal transaction remains unchanged:");
console.log(originalTransaction);
