def get_median(numbers):
  # sort the array
  sorted_numbers = merge_sort(numbers)
  middle_index = len(numbers) / 2

    # pick out the middle index
  if is_odd(len(numbers)):
    return sorted_numbers[middle_index]
  # or the average of the two middle indexes
  else:
    return (sorted_numbers[middle_index - 1] +
     sorted_numbers[middle_index]) / 2.0