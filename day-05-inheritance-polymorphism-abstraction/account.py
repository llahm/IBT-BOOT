
from abc import abstractmethod, ABC


class account(ABC):
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
    
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if(amount > 0):
            self.__balance += amount
            print(f"Deposited: {amount}. New balance: {self.__balance}")
        else:
            print("Deposit amount must be positive.")
    @abstractmethod
    def withdraw(self, amount):
        pass
    
    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance}")
    
class savingAccount(account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.__interest_rate = 0.02  # 2% interest rate
        self.__withdrawal_limit = 7  # Withdrawal limit of 7 units per month
        
class currencyAccount :
    def __init__(self, name):
        super()
        pass
    