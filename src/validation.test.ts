import {
  isSixDigits,
  hasAdjacentCharacters,
  hasOnlySameOrIncreasingDigits,
  isBetweenLimits,
} from "./validation";

describe("validation", () => {
  test("should validate if value has 6 digits", () => {
    expect(isSixDigits("")).toBeFalsy();
    expect(isSixDigits("123")).toBeFalsy();
    expect(isSixDigits("12345")).toBeFalsy();
    expect(isSixDigits("12345a")).toBeFalsy();
    expect(isSixDigits("123456")).toBeTruthy();
  });

  test("should validate if value has at least 2 adjacent digits", () => {
    expect(hasAdjacentCharacters("1234")).toBeFalsy();
    expect(hasAdjacentCharacters("6546")).toBeFalsy();
    expect(hasAdjacentCharacters("09482")).toBeFalsy();
    expect(hasAdjacentCharacters("66456")).toBeTruthy();
    expect(hasAdjacentCharacters("55555")).toBeTruthy();
  });

  test("should validate if value only progresses with same or increasing digits", () => {
    expect(hasOnlySameOrIncreasingDigits("44443")).toBeFalsy();
    expect(hasOnlySameOrIncreasingDigits("54432")).toBeFalsy();
    expect(hasOnlySameOrIncreasingDigits("123450")).toBeFalsy();
    expect(hasOnlySameOrIncreasingDigits("12345")).toBeTruthy();
    expect(hasOnlySameOrIncreasingDigits("111123")).toBeTruthy();
    expect(hasOnlySameOrIncreasingDigits("22222")).toBeTruthy();
  });

  test("should validate if value is between defined limits", () => {
    expect(isBetweenLimits("4445", 2222, 4444)).toBeFalsy();
    expect(isBetweenLimits("54432", 1, 3000)).toBeFalsy();
    expect(isBetweenLimits("5", 6, 10)).toBeFalsy();
    expect(isBetweenLimits("3345", 2000, 4000)).toBeTruthy();
    expect(isBetweenLimits("1111", 1, 5000)).toBeTruthy();
    expect(isBetweenLimits("22222", 0, 30000)).toBeTruthy();
  });
});
