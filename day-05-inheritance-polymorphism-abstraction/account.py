
from abc import abstractmethod, ABC
from datetime import date, datetime, timedelta


class Account(ABC):
    def __init__(self, owner, number):
        self.owner = owner
        self.account_number = number
        self.__balance = 0
        self.__dateOfCreation = datetime.now().date()
        self.__withdrawal_limit = 0  # Default withdrawal limit for all accounts
    
    @property
    def balance(self):
        return self.__balance
    
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
    
class savingAccount(Account):
    def __init__(self, owner, number):
        super().__init__(owner, number)
        self.__interest_rate = 0.02  # 2% interest rate
        self.__num_withdrawals = {"withdrawCount": 0, "validSince": self.__dateOfCreation + timedelta(days=30)}  # Number of withdrawals made in the current month
        self.__withdrawal_limit = 5  # Limit of 5 withdrawals per month
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.calculateBalance(self.__interest_rate) + amount
            print(f"Deposited {amount} units. New balance: {self.balance} units.")
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        self.updateNumWithdrawals()
        if amount > 0 and amount <= self.__balance and self.__num_withdrawals["withdrawCount"] < self.__withdrawal_limit:
            self.__balance -= amount
            self.__num_withdrawals["withdrawCount"] += 1
            print(f"Withdrew {amount} units. New balance: {self.balance} units.")
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
            print(f"Deposited {amount} units. New balance: {self.balance} units.")
        else:
            print("Deposit amount must be greater than zero.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance + self.__overdraft_limit:
            self.__balance -= amount
            print(f"Withdrew {amount} units. New balance: {self.balance} units.")
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
            print(f"Deposited {amount} units. New balance: {self.balance} units.")
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance and self.__balance - amount >= self.__minimum_balance:
            self.__balance -= amount
            print(f"Withdrew {amount} units. New balance: {self.balance} units.")
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
            print(f"Deposited {amount} units. New balance: {self.balance} units.")
        else:
            print("Deposit amount must be greater than zero.")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance and self.calculateTimeDuration().days >= self.__minimum_time_to_withdrawal * 30:
            self.__balance -= amount
            print(f"Withdrew {amount} units. New balance: {self.balance} units.")
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
