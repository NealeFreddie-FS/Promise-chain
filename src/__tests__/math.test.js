const math = require("../math");

describe("Math Module Tests", () => {
  // Basic arithmetic function tests
  describe("Basic Arithmetic Functions", () => {
    test("add function adds two numbers correctly", () => {
      expect(math.add(2, 3)).toBe(5);
      expect(math.add(-1, 1)).toBe(0);
      expect(math.add(0, 0)).toBe(0);
      expect(math.add(5.5, 4.5)).toBe(10);
    });

    test("subtract function subtracts two numbers correctly", () => {
      expect(math.subtract(5, 3)).toBe(2);
      expect(math.subtract(1, 1)).toBe(0);
      expect(math.subtract(0, 5)).toBe(-5);
      expect(math.subtract(10.5, 5.5)).toBe(5);
    });

    test("multiply function multiplies two numbers correctly", () => {
      expect(math.multiply(2, 3)).toBe(6);
      expect(math.multiply(-2, 3)).toBe(-6);
      expect(math.multiply(0, 5)).toBe(0);
      expect(math.multiply(2.5, 2)).toBe(5);
    });

    test("divide function divides two numbers correctly", () => {
      expect(math.divide(6, 3)).toBe(2);
      expect(math.divide(5, 2)).toBe(2.5);
      expect(math.divide(0, 5)).toBe(0);
      expect(math.divide(-6, 3)).toBe(-2);
    });

    test("divide function throws error when dividing by zero", () => {
      expect(() => math.divide(5, 0)).toThrow(
        "Division by zero is not allowed"
      );
    });
  });

  // JavaScript Math object function tests
  describe("JavaScript Math Object Functions", () => {
    test("sqrt function calculates square root correctly", () => {
      expect(math.sqrt(4)).toBe(2);
      expect(math.sqrt(9)).toBe(3);
      expect(math.sqrt(0)).toBe(0);
      expect(math.sqrt(2)).toBeCloseTo(1.414, 3);
    });

    test("sqrt function throws error for negative inputs", () => {
      expect(() => math.sqrt(-4)).toThrow(
        "Cannot calculate square root of negative number"
      );
    });

    test("max function returns the larger of two numbers", () => {
      expect(math.max(5, 10)).toBe(10);
      expect(math.max(-5, -10)).toBe(-5);
      expect(math.max(0, 0)).toBe(0);
      expect(math.max(3.14, 2.71)).toBe(3.14);
    });
  });

  // Edge cases and type handling
  describe("Edge Cases and Type Handling", () => {
    test("functions work with decimal numbers", () => {
      expect(math.add(0.1, 0.2)).toBeCloseTo(0.3, 5);
      expect(math.subtract(0.3, 0.1)).toBeCloseTo(0.2, 5);
      expect(math.multiply(0.1, 0.2)).toBeCloseTo(0.02, 5);
      expect(math.divide(0.4, 0.2)).toBeCloseTo(2, 5);
    });
  });
});
