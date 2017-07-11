/*
 * generateList(size = 8, min = 0, max = 25)
 * 
 * Generates a list of the given size with a minimum and maximum value.
 * Uses Math.random() for random number generation.
 *
 * Returns the generated list.
 */
let generateList = (size, min = 0, max = 25) => Array(size).fill(0).map(i => parseInt(min + (Math.random() * max), 10))

export default generateList