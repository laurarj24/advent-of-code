const fs = require("fs");
const path = require("path");

// Path to the text file
const filePath = path.join(__dirname, "../input-day1.txt");

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
  let leftDigits = [];
  let rightDigits = [];

  // Split the input into lines
  const lines = data.split("\n");

  lines.forEach((line) => {
    // Split the line into two parts based on spaces
    const [left, right] = line.trim().split(/\s+/);
    if (left) leftDigits.push(Number(left));
    if (right) rightDigits.push(Number(right));
  });

  leftDigits.sort((a, b) => a - b);
  rightDigits.sort((a, b) => a - b);

  console.log("Left numbers:", leftDigits);
  console.log("Right numbers:", rightDigits);

  const sum = leftDigits.reduce((acc, num, index) => {
    return acc + Math.abs(num - rightDigits[index]);
  }, 0);

  console.log("Result:", sum);
}

// Main execution
readFile(filePath)
  .then((data) => solvePuzzle(data))
  .catch((error) => console.error(error.message));
