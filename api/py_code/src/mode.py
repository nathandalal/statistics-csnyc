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
  
  # find number with most occurences
  modes = []
  max_count = 0
  for number in nums_counts.keys():
    if nums_counts[number] > max_count:
      if modes:
        modes = [number]
        max_count = nums_counts[number]
      else:
        modes = modes + [number]

  return modes
