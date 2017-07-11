const fs = require('fs')
const path = require('path')

/*
 * getPyFile(filename)
 * Returns the Python file specified in the filename.
 * Returns an object containing this file under the key "src"
 * Also including an explanation of the code under the key "doc" line-by-line
 */
let getPythonFile = (filename) => {
  let retobj = { src_str: fs.readFileSync(path.resolve(__dirname, `src/${filename}`), 'utf8') }
  retobj.src = retobj.src_str.split('\n'),
  retobj.doc = fs.readFileSync(path.resolve(__dirname, "docs/" + filename.slice(0, -3) + ".txt"), 'utf8').split('\n')

  return retobj 
}

/*
 * getAllPyFiles()
 *
 * Calls getPyFile(filename) sequentially on all files in directory and returns all results.
 */
let getAllPythonFiles = () => fs.readdirSync(path.resolve(__dirname, "src")).map(getPythonFile)

module.exports = {
  getPyFile: getPythonFile,
  getAllPyFiles: getAllPythonFiles
}