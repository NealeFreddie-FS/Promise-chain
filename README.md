# Math Module with Jest Testing

## Overview

This project implements a simple math module with various arithmetic operations. It demonstrates the implementation of unit tests using Jest to verify the functionality of the math module.

## Features

- Basic arithmetic operations (add, subtract, multiply, divide)
- Advanced math operations using JavaScript's Math object (sqrt, max)
- Comprehensive test suite with Jest
- Error handling for edge cases

## Code Structure

- `src/math.js` - Math module implementation
- `src/__tests__/math.test.js` - Jest test suite for the math module

## Running the Project

To run the tests:

```bash
# Run Jest tests
npm test
```

## Math Module Functions

### Basic Arithmetic

- `add(a, b)` - Adds two numbers and returns the sum
- `subtract(a, b)` - Subtracts the second number from the first and returns the difference
- `multiply(a, b)` - Multiplies two numbers and returns the product
- `divide(a, b)` - Divides the first number by the second and returns the quotient
  - Throws an error when attempting to divide by zero

### Math Object Functions

- `sqrt(a)` - Calculates the square root of a number using Math.sqrt()
  - Throws an error when attempting to calculate the square root of a negative number
- `max(a, b)` - Returns the larger of two numbers using Math.max()

## Test Suite

The test suite verifies all functions with multiple test cases, including:

- Basic operations with positive, negative, and zero values
- Decimal number handling
- Error handling for division by zero
- Error handling for square root of negative numbers
- Edge cases

## Implementation Details

### Error Handling

The module includes proper error handling for invalid operations:

- Division by zero throws: `Division by zero is not allowed`
- Square root of negative number throws: `Cannot calculate square root of negative number`

### Type Handling

The functions handle different numeric types including:

- Integers
- Negative numbers
- Decimal values
- Zero
