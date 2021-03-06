def merge_sort(arr):
  '''Sorts parts and combines sorted halves.'''

  # one element by itself is sorted
  if len(arr) == 1:
    return arr

  # sort two halves using recursion
  mid = len(arr) / 2
  first_half = merge_sort(arr[:mid])
  second_half = merge_sort(arr[mid:])

  # combine two sorted lists into one sorted list
  return merge(first_half, second_half)
