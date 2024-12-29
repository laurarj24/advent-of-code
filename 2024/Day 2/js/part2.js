const fs = require("fs");
const path = require("path");

const MOST_DIFFERENCE_LEVEL_ALLOW = 3;
const SAFE_DIFFERENCE_LEVEL = 1;

const filePath = path.join(__dirname, "../input-demo.txt");

/**
 * Reads a file and returns its content as a string.
 * @param {string} filePath - Path to the file to be read.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
const readFile = (filePath) => {
  return fs.promises.readFile(filePath, "utf8").catch((err) => {
    throw new Error(`Error reading the file: ${err.message}`);
  });
};

/**
 * Solves the puzzle by processing the content of the file.
 * @param {string} data - The content of the file.
 */
const solvePuzzle = (data) => {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let validReports = 0;

  for (const line of lines) {
    const digits = line.split(/\s+/).map(Number);
    if (isIncreasing(digits) || isDecreasing(digits)) {
      //console.log('Valid report for line - ', line)
      validReports++;
    } else {
      console.log("** INVALID report line - ", line);
    }
  }

  console.log(`Number of valid reports: ${validReports}`);
};

const isIncreasing = (digitsArray) => {
  let mistakes = 0; // Track mistakes
  let lastValidNumber = digitsArray[0]; // Track the last valid number

  for (let i = 1; i < digitsArray.length; i++) {
    const num = digitsArray[i];

    if (
      num > lastValidNumber &&
      differenceWithinLimit(num, lastValidNumber, MOST_DIFFERENCE_LEVEL_ALLOW)
    ) {
      // Valid increase
      lastValidNumber = num;
    } else {
      // Invalid increase
      mistakes++;
      if (mistakes > SAFE_DIFFERENCE_LEVEL) {
        return false; // Too many mistakes
      }

      // Check if skipping the current number maintains the trend
      if (
        i + 1 < digitsArray.length &&
        digitsArray[i + 1] > lastValidNumber &&
        differenceWithinLimit(
          digitsArray[i + 1],
          lastValidNumber,
          MOST_DIFFERENCE_LEVEL_ALLOW
        )
      ) {
        // Skip the current number
        lastValidNumber = digitsArray[i + 1];
        i++; // Skip one step forward
      } else {
        return false; // Sequence cannot recover
      }
    }
  }

  return true; // Sequence is valid
};

const isDecreasing = (digitsArray) => {
  let mistakes = 0; // Track mistakes
  let lastValidNumber = digitsArray[0]; // Track the last valid number

  for (let i = 1; i < digitsArray.length; i++) {
    const num = digitsArray[i];

    if (
      num < lastValidNumber &&
      differenceWithinLimit(num, lastValidNumber, MOST_DIFFERENCE_LEVEL_ALLOW)
    ) {
      // Valid decrease
      lastValidNumber = num;
    } else {
      // Invalid decrease
      mistakes++;
      if (mistakes > SAFE_DIFFERENCE_LEVEL) {
        return false; // Too many mistakes
      }

      // Check if skipping the current number maintains the trend
      if (
        i + 1 < digitsArray.length &&
        digitsArray[i + 1] < lastValidNumber &&
        differenceWithinLimit(
          digitsArray[i + 1],
          lastValidNumber,
          MOST_DIFFERENCE_LEVEL_ALLOW
        )
      ) {
        // Skip the current number
        lastValidNumber = digitsArray[i + 1];
        i++; // Skip one step forward
      } else {
        return false; // Sequence cannot recover
      }
    }
  }

  return true; // Sequence is valid
};

/**
 * Calculates the absolute difference between two numbers and checks if it's within the allowed limit.
 * @param {number} num1 - First number.
 * @param {number} num2 - Second number.
 * @param {number} limit - Allowed difference limit.
 * @returns {boolean} - True if the difference is within the allowed limit.
 */
const differenceWithinLimit = (num1, num2, limit) => {
  return Math.abs(num1 - num2) <= limit;
};

// Main execution
readFile(filePath)
  .then((data) => solvePuzzle(data))
  .catch((error) => console.log(error));
