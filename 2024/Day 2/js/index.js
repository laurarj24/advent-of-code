const fs = require("fs");
const path = require("path");

// Path to the text file
const filePath = path.join(__dirname, "../input-demo.txt");
//const filePath = path.join(__dirname, "../input-day1.txt");

/**
 * Reads a file and returns its content as a string.
 * @param {string} filePath - Path to the file to be read.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(new Error(`Error reading the file: ${err.message}`));
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Solves the puzzle by processing the content of the file.
 * @param {string} data - The content of the file.
 */
function solvePuzzle(data) {

}
// Main execution
readFile(filePath)
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
