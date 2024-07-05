import { z } from "zod";
import { MIN_LIMIT_PWD, MAX_LIMIT_PWD } from "./constants";

export const VALIDATION_ERROR_MESSAGES = {
  NOT_SIX_DIGITS: "Senha deve conter 6 dígitos",
  NO_TWO_ADJACENT_DIGITS: "Senha deve conter 2 dígitos adjacentes iguais",
  HAS_DECREASING_DIGITS:
    "Senha deve conter dígitos em uma sequencia crescente ou de mesmo valor",
  NOT_WITHIN_LIMITS: `Senha deve estar entre os números ${MIN_LIMIT_PWD} e ${MAX_LIMIT_PWD}`,
};

// Define the validation schemas
export const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Endereço de email inválido" }),
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
