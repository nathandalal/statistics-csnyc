def get_mode(numbers):
  # initialize dictionary
  count_dict = {}
  for number in numbers:
    count_dict[number] = 0
      
  # count occurences
  for number in numbers:
    count_dict[number] += 1
  
  # find number with most occurences
  max_number = numbers[0]
  for number in count_dict:
    if count_dict[number] > count_dict[max_number]:
      max_number = number

  return max_number