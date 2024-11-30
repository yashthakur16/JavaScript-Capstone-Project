
export default class BankAccount {
    constructor(accountHolder, initialBalance = 0) {
      this.accountHolder = accountHolder;
      this.balance = initialBalance;
    }
  
    
    deposit(amount) {
      if (amount > 0) {
        this.balance += amount;
        return `Deposited $${amount}. New balance: $${this.balance}`;
      }
      return 'Deposit amount must be positive.';
    }
  
   
    withdraw(amount) {
      if (amount > 0 && this.balance >= amount) {
        this.balance -= amount;
        return `Withdrew $${amount}. New balance: $${this.balance}`;
      } else if (amount <= 0) {
        return 'Withdrawal amount must be positive.';
      } else {
        return 'Insufficient balance for this withdrawal.';
      }
    }
  
   
    checkBalance() {
      return `Current balance: $${this.balance}`;
    }
  }
  