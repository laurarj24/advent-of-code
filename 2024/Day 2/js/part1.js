const fs = require("fs");
const path = require("path");

const MOST_DIFFERENCE_LEVEL_ALLOW = 3;
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
  //The code takes the raw data string, splits it into lines, 
  //removes extra whitespace around each line, and filters out any empty or invalid lines.
  const lines = data.split("\n").map((line) => line.trim()).filter(Boolean);
  let validReports = 0;

  for (const line of lines) {
    const digits = line.split(/\s+/).map(Number);
    if (isIncreasing(digits) || isDecreasing(digits)) {
      validReports++;
    }
  }

  console.log(`Number of valid reports: ${validReports}`);
};

/**
 * Checks if the digits array is strictly increasing with allowed differences.
 * @param {number[]} digitsArray - Array of digits.
 * @returns {boolean} - True if the array is increasing.
 */
const isIncreasing = (digitsArray) => {
  return digitsArray.every((num, i, arr) => {
    return i === 0 || (num > arr[i - 1] && differenceWithinLimit(num, arr[i - 1]));
  });
};

/**
 * Checks if the digits array is strictly decreasing with allowed differences.
 * @param {number[]} digitsArray - Array of digits.
 * @returns {boolean} - True if the array is decreasing.
 */
const isDecreasing = (digitsArray) => {
  return digitsArray.every((num, i, arr) => {
    return i === 0 || (num < arr[i - 1] && differenceWithinLimit(num, arr[i - 1]));
  });
};

/**
 * Calculates the absolute difference between two numbers and checks if it's within the allowed limit.
 * @param {number} num1 - First number.
 * @param {number} num2 - Second number.
 * @returns {boolean} - True if the difference is within the allowed limit.
 */
const differenceWithinLimit = (num1, num2) => {
  return Math.abs(num1 - num2) <= MOST_DIFFERENCE_LEVEL_ALLOW;
};

// Main execution
readFile(filePath)
  .then((data) => solvePuzzle(data))
  .catch((error) => console.log(error));
