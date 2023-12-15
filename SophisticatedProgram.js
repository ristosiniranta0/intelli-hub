/*
Filename: SophisticatedProgram.js
Description: This code simulates a virtual bank system with multiple functionalities including account creation, withdrawal, deposit, transfer, and balance inquiry.
Author: John Doe
Date: November 30, 2021
*/

// Class representing a bank account
class BankAccount {
  constructor(accountNumber, accountOwner, initialBalance) {
    this.accountNumber = accountNumber;
    this.accountOwner = accountOwner;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    this.balance += amount;
    this.transactions.push({
      type: "Deposit",
      amount: amount,
      date: new Date(),
    });
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient balance.");
    }

    this.balance -= amount;
    this.transactions.push({
      type: "Withdrawal",
      amount: amount,
      date: new Date(),
    });
  }

  transfer(amount, destinationAccount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient balance.");
    }

    this.balance -= amount;
    destinationAccount.balance += amount;

    this.transactions.push({
      type: "Transfer",
      amount: amount,
      date: new Date(),
      destinationAccount: destinationAccount.accountNumber,
    });
  }

  getBalance() {
    return this.balance;
  }

  getStatement() {
    let statement = `Account Number: ${this.accountNumber}\n`;
    statement += `Account Owner: ${this.accountOwner}\n`;
    statement += `Current Balance: ${this.balance}\n`;
    statement += "Transaction History:\n";

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      statement += `${i + 1}. ${transaction.type} of ${transaction.amount} on ${transaction.date.toLocaleString()}`;

      if (transaction.type === "Transfer") {
        statement += ` to Account ${transaction.destinationAccount}`;
      }

      statement += "\n";
    }

    return statement;
  }
}

// Usage example:
const account1 = new BankAccount("123456789", "John Doe", 1000);
const account2 = new BankAccount("987654321", "Jane Smith", 500);

account1.deposit(500);
account1.withdraw(200);
account1.transfer(300, account2);

console.log(account1.getStatement());
console.log(account2.getStatement());