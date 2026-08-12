import random

customer = {
"name": "Almaz Bekele",
"balance": 1500, # ETB
"city": "Addis Ababa",
}
customer["name"] # "Almaz Bekele"
customer["balance"] = 2000 # update a value
customer.get("phone", "N/A") # safe access, no KeyError

custNames = "abebe, kebede, bekele, ayele, seyfu, fantahun"

def printNames(container):
    if(container):
        for item in container:
            print(item)

def printCustomerData(customerDictionary):
    if(customerDictionary)
        for customer in customerDictionary:
            print( f" name : {customer["name"]}")
            print( f" age : {customer["age"]}")
            print( f" balance : {customer["balance"]}")
            print( f" city : {customer["city"]}")

customers = custNames.split(", ")
cities = "addis ababa, awassa, mekele, bahir dar, bishoftu, jijiga, asosa, wolayta sodo, buta jira, kebri dar"
cities = cities.split(", ")

custormers = set(customers)

customersDict = {}

for name in customers:
    customersDict[name] = {"name": name, "age": random.randint(20, 50), "balance": round(random.uniform(1000, 100_000), 2), "city": random.choice(cities).title()}        

print(f"we have {len(customers)} customers")
print("their names are:")
printNames(customers)

sortedCustomerRecord = sorted(customersDict())