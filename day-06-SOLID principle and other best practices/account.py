
import json
from abc import abstractmethod, ABC
from datetime import date, datetime, timedelta

from django.utils import json


class Account(ABC):
    def __init__(self, owner, number):
        self.owner = owner
        self.account_number = number
        self.__balance = 0
        self.__dateOfCreation = datetime.now().date()
        self.__withdrawal_limit = 0  # Default withdrawal limit for all accounts
        self.subscribed = []  # List of subscribed observers for logging and alerts
        self.__phone_number = None  # Placeholder for phone number, can be set later
    
    @property
    def balance(self):
        return self.__balance
    
    def subscribe(self, observer):
        self.subscribed.append(observer)
    
    @balance.setter
    def balance(self, value):
        self.__balance = value

    @abstractmethod
    def deposit(self, amount):
        pass
            
    @abstractmethod
    def withdraw(self, amount):
        pass
    
    @abstractmethod
    def statement(self):
        pass
    
    def calculateBalance(self, interest):
        return self.__balance * (1 + interest * self.calculateTimeDuration().days / 365)
    
    def calculateTimeDuration(self):
        return (datetime.now() - self.__dateOfCreation)
    
    def observe(self):
        pass  # Placeholder for observer pattern implementation, can be overridden in subclasses
    
    # Notify subscribed observers about an event
    def notify(self, event):
        if self.subscribed:
            for observer in self.subscribed:
                observer.observe(event)

           
class savingAccount(Account):
    def __init__(self, owner, number):
        super().__init__(owner, number)
        self.__interest_rate = 0.02  # 2% interest rate
        self.__num_withdrawals = {"withdrawCount": 0, "validSince": self.__dateOfCreation + timedelta(days=30)}  # Number of withdrawals made in the current month
        self.__withdrawal_limit = 5  # Limit of 5 withdrawals per month
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.calculateBalance(self.__interest_rate) + amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "deposit", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        self.updateNumWithdrawals()
        if amount > 0 and amount <= self.__balance and self.__num_withdrawals["withdrawCount"] < self.__withdrawal_limit:
            self.__balance -= amount
            self.__num_withdrawals["withdrawCount"] += 1
            self.notify({ "name": self.owner, "account": self.account_number, "event": "withdrawal", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print('''Withdrawal amount must be:
                \n1. greater than zero 
                \n2. less than or equal to the current balance, and 
                \n3. within the monthly withdrawal limit.''')
    
    def updateNumWithdrawals(self):
        current_date = datetime.now().date()
        if current_date > self.__num_withdrawals["validSince"] + timedelta(days=30):
            self.__num_withdrawals["validSince"] = current_date
            self.__num_withdrawals["withdrawCount"] = 0
    
    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} units")
        print(f"Date of Creation: {self.__dateOfCreation}")
        print(f"Number of Withdrawals this Month: {self.__num_withdrawals['withdrawCount']}")
    
class checkingAccount(Account):
    def __init__(self, owner, number):
        super().__init__(owner, number)
        self.__overdraft_limit = 500  # Overdraft limit of 500 units
        self.__interest_rate = 0.01  # 1% interest rate
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.calculateBalance(self.__interest_rate) + amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "deposit", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print("Deposit amount must be greater than zero.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance + self.__overdraft_limit:
            self.__balance -= amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "withdrawal", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print('''Withdrawal amount must be: 
                \n1. greater than zero 
                \n2. less than or equal to the current balance plus the overdraft limit.''')
    
    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} units")
        print(f"Date of Creation: {self.__dateOfCreation}")
        print(f"Overdraft Limit: {self.__overdraft_limit} units")
    
class MoneyMarketAccounts(Account):
    def __init__(self, owner, number):
        super().__init__(owner, number)
        self.__check_per_month = 6  # Limit of 6 checks per month
        self.__minimum_balance = 10000  # Minimum balance of 10000 units
        self.__interest_rate = 0.05  # 5% interest rate
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.calculateBalance(self.__interest_rate) + amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "deposit", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance and self.__balance - amount >= self.__minimum_balance:
            self.__balance -= amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "withdrawal", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print('''Withdrawal amount must be: 
                \n1. greater than zero 
                \n2. less than or equal to the current balance, and 
                \n3. must not cause the balance to fall below the minimum balance.''')

    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} units")
        print(f"Date of Creation: {self.__dateOfCreation}")
        print(f"Minimum Balance Requirement: {self.__minimum_balance} units")
        
class CertificatesOfDeposit(Account):
    def __init__(self, owner, number):
        super().__init__(owner, number)
        self.__minimum_time_to_withdrawal = 12  # Minimum time to withdrawal in months
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "deposit", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance and self.calculateTimeDuration().days >= self.__minimum_time_to_withdrawal * 30:
            self.__balance -= amount
            self.notify({ "name": self.owner, "account": self.account_number, "event": "withdrawal", "amount": amount, "balance": self.balance, "phone_number": self.__phone_number })
        else:
            print('''Withdrawal amount must be: 
                \n1. greater than zero 
                \n2. less than or equal to the current balance, and 
                \n3. must not be attempted before the minimum time to withdrawal.''')
    
    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} units")
        print(f"Date of Creation: {self.__dateOfCreation}")
        print(f"Minimum Time to Withdrawal: {self.__minimum_time_to_withdrawal} months")

# down are other utility classes for logging and sending SMS alerts
# use observer pattern to log the transactions and send SMS alerts
class AuditLog:
    __init__ = None
    transaction_history = None
    
    def log(self, message):
        try:
            with open("log.txt", "a") as file:
                file.write(f"{datetime.now()}: {message}\n")
        except Exception as e:
            print(f"Failed to log transaction: {e}")

    def observe(self, event):
        message = f"{event['name']} performed a {event['event']} of amount {event['amount']} on account {event['account']}. New balance: {event['balance']}"
        self.log(message)

#sms alert class to send sms alerts to the user
class SMSAlert:
    def __init__(self):
        self.failed_attempts = []
    
    def observe(self, event):
            message = f"Alert: {event['event']} of amount {event['amount']} on account {event['account']}. New balance: {event['balance']}"
            self.send_sms(event['phone_number'], message)
    
    def send_sms(self, phone_number, message):
        # Simulate sending an SMS
        try:
            print(f"Sending SMS to {phone_number}: {message}")
        except Exception as e:
            print(f"Failed to send SMS: {e}")
            self.failed_attempts.append((phone_number, message))

#account factory class to create different types of accounts
class AccountFactory:
    @staticmethod
    def create_account(account_type, owner, number, **kwargs):
        if account_type == "saving":
            return savingAccount(owner, number)
        elif account_type == "checking":
            return checkingAccount(owner, number)
        elif account_type == "money_market":
            return MoneyMarketAccounts(owner, number)
        elif account_type == "certificates_of_deposit":
            return CertificatesOfDeposit(owner, number)
        else:
            raise ValueError("Invalid account type")

#a singleton class to load the bank configuration from a json file
class BankConfig:
    _instance = None  # Class variable to hold the singleton instance
    def __init__(self, config_file = None):
        self.config_file = config_file
        self.config = self.load_config()
        
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:  # Check if an instance already exists
            cls._instance = super(BankConfig, cls).__new__(cls) # Create a new instance if it doesn't exist
        return cls._instance # Return the existing instance if it does exist

    def load_config(self):
        try:
            if self.config_file:
                with open (self.config_file, 'r') as file:
                    self.config = json.load(file)
            else:
                self.config = {
                    "saving": {"interest_rate": 0.02, "withdrawal_limit": 5},
                    "checking": {"interest_rate": 0.01, "overdraft_limit": 500},
                    "money_market": {"interest_rate": 0.05, "minimum_balance": 10000},
                    "certificates_of_deposit": {"minimum_time_to_withdrawal": 12}
                }
        except FileNotFoundError:
            raise FileNotFoundError(f"Configuration file {self.config_file} not found.")
        
        # For simplicity, we'll return a hardcoded dictionary here
        return {self.config}
    
    def save_config(self):
        if self.config_file:
            try:
                with open(self.config_file, 'w') as file:
                    json.dump(self.config, file, indent=4)
            except Exception as e:
                print(f"Failed to save configuration: {e}")
        else:
            print("No configuration file specified. Creating default configuration file.")
            try:
                with open('bank_config.json', 'w') as file: # create a default config file if not provided
                    json.dump(self.config, file, indent=4)
            except Exception as e:
                print(f"Failed to create configuration: {e}")

    def get_account_config(self, account_type):
        return self.config.get(account_type, {})
