/**
 * Math module with basic arithmetic operations
 */

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts second number from the first
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides first number by the second
 * @param {number} a - First number (dividend)
 * @param {number} b - Second number (divisor)
 * @returns {number} Quotient of a and b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

/**
 * Calculates square root of a number
 * @param {number} a - Input number
 * @returns {number} Square root of the input
 */
function sqrt(a) {
  if (a < 0) {
    throw new Error("Cannot calculate square root of negative number");
  }
  return Math.sqrt(a);
}

/**
 * Returns the larger of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The maximum value
 */
function max(a, b) {
  return Math.max(a, b);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  sqrt,
  max,
};
