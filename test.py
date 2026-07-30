obj = {"name": "John", "age": 30}

if "name" in obj:
    print("Name exists in the object.")
else:
    print("Name does not exist in the object.")

if obj["name"] == "John":
    print("The name is John.")
    
if "name" in obj:
    print("The name is John.")
    
    