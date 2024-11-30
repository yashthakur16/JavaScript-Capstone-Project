import BankAccount from './bankAccount.js';

let currentAccount = null;
let accounts = JSON.parse(localStorage.getItem('accounts')) || {}; 

Object.keys(accounts).forEach(accountName => {
  const account = accounts[accountName];
  accounts[accountName] = new BankAccount(account.accountHolder, account.balance);
});

const loginSection = document.getElementById('login-section');
const accountSection = document.getElementById('account-section');
const accountNameInput = document.getElementById('account-name');
const depositInput = document.getElementById('deposit-amount');
const withdrawInput = document.getElementById('withdraw-amount');
const balanceDisplay = document.getElementById('balance');
const accountHolderNameDisplay = document.getElementById('account-holder-name');

document.getElementById('login-btn').addEventListener('click', () => {
  const accountName = accountNameInput.value.trim();
  if (accounts[accountName]) {
    currentAccount = accounts[accountName];
    loginSection.style.display = 'none';
    accountSection.style.display = 'block';
    accountHolderNameDisplay.innerText = currentAccount.accountHolder;
    balanceDisplay.innerText = currentAccount.balance;
  } else {
    alert('Account not found. Please create an account first.');
  }
});

document.getElementById('create-account-btn').addEventListener('click', () => {
  const accountName = accountNameInput.value.trim();
  if (accountName && !accounts[accountName]) {
    const newAccount = new BankAccount(accountName);
    accounts[accountName] = newAccount;
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Account created successfully! You can now log in.');
  } else {
    alert('Invalid name or account already exists.');
  }
});

document.getElementById('deposit-btn').addEventListener('click', () => {
  const amount = parseFloat(depositInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid deposit amount.');
  } else {
    const message = currentAccount.deposit(amount);
    balanceDisplay.innerText = currentAccount.balance;
    alert(message);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
  const amount = parseFloat(withdrawInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid withdrawal amount.');
  } else {
    const message = currentAccount.withdraw(amount);
    balanceDisplay.innerText = currentAccount.balance;
    alert(message);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  loginSection.style.display = 'block';
  accountSection.style.display = 'none';
  accountNameInput.value = '';
});
