try {
  // All tests go here.
  require('./test/test.js')()

  console.log("All tests passed successfully.")
} catch (e) {
  console.error("An error prevented the test from succeeding.")
  console.error(e)
} finally {
  console.log("Exiting tester.")
}