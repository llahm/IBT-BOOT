import random

def guessing_game(lst, userInput):
    val = random.choice(lst)
    if(userInput == val):
        print("you guessed right")
    else:
        print("you guessed wrong, the correct number was", val)    

lst = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
answer = "n"
while(True):
    userInput = input("guess a number between 1 and 10\n")
    guessing_game(lst, userInput)
    answer = input("do you want to play again? (y/n): ")
    if(answer != "y"):
        break
