import { z } from "zod";
import { MIN_LIMIT_PWD, MAX_LIMIT_PWD } from "./constants";

export const VALIDATION_ERROR_MESSAGES = {
  NOT_SIX_DIGITS: "Password must contain 6 digits",
  NO_TWO_ADJACENT_DIGITS: "Password must contain 2 adjacent digits",
  HAS_DECREASING_DIGITS:
    "Password must not contain digits in a decreasing sequence",
  NOT_WITHIN_LIMITS: `Password must be between numbers ${MIN_LIMIT_PWD} and ${MAX_LIMIT_PWD}`,
};

// Define the validation schemas
export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().superRefine((arg, ctx) => {
    if (!isSixDigits(arg)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_ERROR_MESSAGES.NOT_SIX_DIGITS,
      });
    }
    if (!hasAdjacentCharacters(arg)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_ERROR_MESSAGES.NO_TWO_ADJACENT_DIGITS,
      });
    }
    if (!hasOnlySameOrIncreasingDigits(arg)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_ERROR_MESSAGES.HAS_DECREASING_DIGITS,
      });
    }
    if (!isBetweenLimits(arg, MIN_LIMIT_PWD, MAX_LIMIT_PWD)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_ERROR_MESSAGES.NOT_WITHIN_LIMITS,
      });
    }
  }),
});

export const isSixDigits = (arg: string) => /^[0-9]{6}$/.test(arg);

export const hasAdjacentCharacters = (arg: string) => /(.)\1/.test(arg);

export const hasOnlySameOrIncreasingDigits = (arg: string) =>
  arg.split("").every((digit, i, arr) => i === 0 || digit >= arr[i - 1]);

export const isBetweenLimits = (
  arg: string,
  lowerLimit: number,
  upperLimit: number
) => parseInt(arg) >= lowerLimit && parseInt(arg) <= upperLimit;
