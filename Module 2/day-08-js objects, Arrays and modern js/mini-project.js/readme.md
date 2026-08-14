
# TeleBirr Transaction Report

A JavaScript mini-project that processes TeleBirr transactions for an Addis shop.

## Features

- Models transactions as objects
- Uses `filter()` to separate credits and debits
- Uses `reduce()` to calculate transaction totals
- Uses `map()` with destructuring to create formatted receipt strings
- Uses spread syntax to update a transaction without mutating the original
- Splits the application into reusable ES modules

## Modules

### transactions.js
Contains and exports the transaction data.

### report.js
Contains and exports functions for filtering, totaling, formatting, and correcting transactions.

### app.js
Imports the transaction data and report functions, then generates and prints the final report.

## How to Run

Run the following command:

```bash
node app.js