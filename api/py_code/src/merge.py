def merge(sorted_list1, sorted_list2):
  '''Merges two sorted lists into one sorted list.'''

  merged_list = []

  # reverse our lists to remove from the end of them
  sorted_list1.reverse()  
  sorted_list2.reverse()  

  # pull smallest element from each list until one is empty
  while sorted_list1 and sorted_list2:
    # compare last element of each list to see which to pull
    if sorted_list1[-1] < sorted_list2[-1]:
      merged_list.append(first_sorted_list.pop())
    else:
      merged_list.append(second_sorted_list.pop())

  # pull elements from the list that is not empty
  while first_sorted_list:
    merged_list.append(first_sorted_list.pop())
  while second_sorted_list:
    merged_list.append(second_sorted_list.pop())

  # we pulled out all elements in sorted order!
  return merged_list
