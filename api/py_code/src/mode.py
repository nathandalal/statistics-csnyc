def get_modes(numbers):
  '''Gets all of the most common numbers.'''
  # initialize dictionary
  nums_counts = {}

  # count occurences
  for number in numbers:
    if number in nums_counts:
      nums_counts[number] += 1
    else:
      nums_counts[number] = 1
  
  # find numbers with most occurences
  modes, max_count = [], 0
  for number, count in nums_counts.items():
    if count > max_count:
      modes, max_count = [number], count
    elif count == max_count:
      modes = modes + [number]

  return modes
