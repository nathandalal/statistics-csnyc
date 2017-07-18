def get_mode(numbers):
  # initialize dictionary
  nums_counts = {}

  # count occurences
  for number in numbers:
    if number in nums_counts:
      nums_counts[number] += 1
    else:
      nums_counts[number] = 1
  
  # find number with most occurences
  max_number = numbers[0]
  for number in nums_counts.keys():
    if nums_counts[number] > nums_counts[max_number]:
      max_number = number

  return max_number
