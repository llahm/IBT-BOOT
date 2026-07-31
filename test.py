obj = {"name": "John", "age": 30}

class a:
    def __init__(self, name):
        self.subs = []
        self.name = name
    @staticmethod
    def observe(class_instance):
        if class_instance is not None:
            self.subs.append(class_instance)
    @staticmethod
    def notify(event=None, ):
        if self is not None and event is not None:
            for sub in self.subs:
                sub.update(event)
            print(f"{self.name} notified all subscribers about event: {event}")

class b:
    def __init__(self, name):
        self.name = name
        a.observe(class_instance=self)
    def update(self, event):
        print(f"{self.name} received event: {event}")
        
a_instance = a("A1")
b_instance1 = b("B1")

a_instance.notify("Event 1")

print(a_instance.subs)  # Should show that b_instance1 is subscribed

    
    