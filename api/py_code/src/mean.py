def get_mean(numbers):
  # keep track of sum and amount of elements
  sum_of_numbers = 0
  amount_of_numbers = 0

  # sum all numbers by gradually adding
  for number in numbers:
    sum_of_numbers += number
    amount_of_numbers += 1

  # divide for the average
  answer = float(sum_of_numbers) / amount_of_numbers
  return answer