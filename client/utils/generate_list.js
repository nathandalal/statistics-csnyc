/*
 * generateList(size = 8, min = 0, max = 25)
 *
 * Generates a list of the given size with a minimum and maximum value.
 * Uses Math.random() for random number generation.
 *
 * Returns the generated list.
 */
module.exports = {
  generateList: (size = 8, max = 25, min = 0) => (
    Array(size).fill(0).map(() => parseInt(min + (Math.random() * (max - min)), 10))
  ),
}
