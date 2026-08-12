#do three numbers sum up to a target value
def target_sum(lst, target):
    """
    This function takes a list of integers and a target integer.
    It returns True if any two distinct numbers in the list add up to the target,
    otherwise it returns False.
    """
    lo, hi = 0, len(lst) - 1
    for val in lst:
        new_target = target - val
        new_lst = lst.copy()
        new_lst.remove(val)
        lo, hi = 0, len(new_lst) - 1
        while lo < hi:
            current_sum = new_lst[lo] + new_lst[hi]
            if current_sum == new_target:
                return True
            elif current_sum < new_target:
                lo += 1
            else:
                hi -= 1
        return False