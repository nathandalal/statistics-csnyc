def get_mean(numbers):
  '''Divides sum by count of numbers to get the mean.'''
  # keep track of sum and count of elements
  sum_of_numbers = 0
  count_of_numbers = 0

  # sum all numbers by gradually adding
  for number in numbers:
    sum_of_numbers += number
    count_of_numbers += 1

  # divide for the mean
  mean = float(sum_of_numbers) / amount_of_numbers
  return mean
