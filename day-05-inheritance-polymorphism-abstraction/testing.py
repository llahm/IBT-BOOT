from datetime import datetime, time, timedelta, date

from numpy import equal
olddate = date(2024, 6, 1)

addeddate = date(2024, 6, 30)


equalityCheckerDate = date(2024, 7, 1)

value = olddate + timedelta(addeddate.day)

equalityValue = equalityCheckerDate == value

timedeltaValue = addeddate + timedelta(days = 30)

timedeltaEquality = timedeltaValue == value

timeDeltaDiff = timedeltaValue - timedelta(days=30)

boole = "null"

if timeDeltaDiff == addeddate:
    boole = "is"
else:
    boole = "is not"

bla = value > olddate

print(f"the result of comparing the values:\n value: {value} and equalityValue: {equalityValue} \n\tis {equalityValue} ")
print(f"the result of comparing the values:\n value: {value} and equalityValue: {olddate} \n\tis : {value} > {olddate} == {bla}")
print(f"the result of comparing the values:\n timedeltaValue: {timedeltaValue} and value: {value} \n\tis {timedeltaEquality} ")
print(f"the result of subtracting the value:\n 30 days from timedeltaValue: {timedeltaValue} \n\tis {timeDeltaDiff} which {boole} equal to the original added date: {addeddate}")

