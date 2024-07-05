import { FieldValues } from "react-hook-form";
import { formSchema } from './validation';
import { z } from "zod";

interface ResolverResult {
  values: object;
  errors: any;
}

export type Resolver = <T extends z.Schema<any, any>>(
  schema: T
) => <TFieldValues extends FieldValues>(values: TFieldValues) => ResolverResult;

export interface ErrorMessages {
  _errors: string[];
}

export type FormSchema = z.infer<typeof formSchema>;
