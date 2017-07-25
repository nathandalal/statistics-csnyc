def selection_sort(numbers):
  '''Finds minimum and moves it to the front until sorted.'''
  # move through unsorted part of list
  for start_index, start_value in enumerate(numbers):
    # find where the minimum is
    min_index = start_index
    unsorted_part = numbers[(start_index + 1):]

    for unsorted_index, value in enumerate(unsorted_part):
      # continue to update the minimum index
      if value < numbers[min_index]:
        min_index = unsorted_index + start_index + 1

    # bring minimum value to the front by swapping
    numbers[start_index], numbers[min_index] = \
      numbers[min_index], numbers[start_index]
  
  return numbers
